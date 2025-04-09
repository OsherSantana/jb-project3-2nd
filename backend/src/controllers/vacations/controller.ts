// backend/controllers/vacations/controller.ts
import socket from "../../io/io";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Op, FindOptions, Sequelize, QueryTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import sequelize from "../../db/sequelize";
import Vacation from "../../models/vacation";
import VacationTag from "../../models/tag";
import User from "../../models/user";
import AppError from "../../errors/app-error";

// Helper to include tag counts in vacation queries
// Fix: correctly structure the FindOptions for Sequelize
const getVacationIncludesWithTagCount = (): FindOptions => {
    return {
        include: [{
            model: User,
            as: 'taggedByUsers',
            attributes: ['id'], // Only need IDs for counting
            through: { attributes: [] } // Don't include join table attributes
        }],
        attributes: {
            include: [
                [
                    sequelize.literal('(SELECT COUNT(*) FROM vacation_tags WHERE vacation_tags.vacation_id = Vacation.id)'),
                    'tagCount'
                ]
            ]
        }
    };
};

// Get all vacations with optional filtering
export async function getAllVacations(req: Request, res: Response, next: NextFunction) {
    try {
        const {
            minPrice,
            maxPrice,
            startDate,
            endDate,
            destination,
            followedOnly,
            activeOnly,
            page = "1"
        } = req.query;

        const allVacations = await Vacation.findAll(getVacationIncludesWithTagCount());

        // Get all tags for the current user (if logged in)
        let userTags = [];
        if (req.userId) {
            userTags = await VacationTag.findAll({
                where: { userId: req.userId },
                attributes: ["vacationId"]
            });
        }

        const followedIds = userTags.map(tag => tag.vacationId);
        const now = new Date();

        // Filter vacations manually
        let filtered = allVacations.filter(vac => {
            const v = vac.get({ plain: true });

            if (minPrice && v.price < +minPrice) return false;
            if (maxPrice && v.price > +maxPrice) return false;

            if (startDate && new Date(v.startDate) < new Date(startDate as string)) return false;
            if (endDate && new Date(v.endDate) > new Date(endDate as string)) return false;

            if (destination && !v.destination.toLowerCase().includes((destination as string).toLowerCase())) {
                return false;
            }

            if (activeOnly === "true") {
                if (new Date(v.startDate) > now || new Date(v.endDate) < now) return false;
            }

            if (followedOnly === "true") {
                if (!followedIds.includes(v.id)) return false;
            }

            return true;
        });

        // Pagination
        const pageNumber = parseInt(page as string);
        const pageSize = 10;
        const offset = (pageNumber - 1) * pageSize;
        const paginated = filtered.slice(offset, offset + pageSize);

        // Add isTagged flag
        const result = paginated.map(vac => {
            const v = vac.get({ plain: true }) as any;
            v.isTagged = req.userId ? followedIds.includes(v.id) : false;
            return v;
        });

        res.json(result);
    } catch (e) {
        next(e);
    }
}


// Get a single vacation by ID
export async function getVacationById(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;

        const vacation = await Vacation.findByPk(id, getVacationIncludesWithTagCount());

        if (!vacation) {
            return next(new AppError(StatusCodes.NOT_FOUND, 'Vacation not found'));
        }

        // Add isTagged property if user is authenticated
        const plainVacation = vacation.get({ plain: true });

        if (req.userId) {
            const tag = await VacationTag.findOne({
                where: {
                    userId: req.userId,
                    vacationId: id
                }
            });

            plainVacation.isTagged = !!tag;
        }

        res.json(plainVacation);
    } catch (e) {
        next(e);
    }
}

// Create a new vacation (admin only)
export async function createVacation(req: Request, res: Response, next: NextFunction) {
    try {
        const { destination, description, startDate, endDate, price } = req.body;

        if (!req.imageFileName) {
            return next(new AppError(StatusCodes.BAD_REQUEST, 'Image is required'));
        }

        // Create vacation record
        const vacation = await Vacation.create({
            destination,
            description,
            startDate,
            endDate,
            price,
            imageFileName: req.imageFileName
        });

        // Emit socket event for new vacation
        socket.emit('newVacation', vacation);

        res.status(StatusCodes.CREATED).json(vacation);
    } catch (e) {
        next(e);
    }
}

// Update an existing vacation (admin only)
export async function updateVacation(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const { destination, description, startDate, endDate, price } = req.body;

        const vacation = await Vacation.findByPk(id);

        if (!vacation) {
            return next(new AppError(StatusCodes.NOT_FOUND, 'Vacation not found'));
        }

        // Prepare update object
        const updateData: any = {};

        if (destination) updateData.destination = destination;
        if (description) updateData.description = description;
        if (startDate) updateData.startDate = startDate;
        if (endDate) updateData.endDate = endDate;
        if (price) updateData.price = price;

        // Update image if provided
        if (req.imageFileName) {
            // Delete old image if it exists
            const oldImagePath = path.join(__dirname, '../../../uploads', vacation.imageFileName);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }

            updateData.imageFileName = req.imageFileName;
        }

        // Update vacation record
        await vacation.update(updateData);

        // Emit socket event for updated vacation
        socket.emit('vacationUpdated', vacation);

        res.json(vacation);
    } catch (e) {
        next(e);
    }
}

// Delete a vacation (admin only)
export async function deleteVacation(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;

        const vacation = await Vacation.findByPk(id);

        if (!vacation) {
            return next(new AppError(StatusCodes.NOT_FOUND, 'Vacation not found'));
        }

        // Delete the image file
        const imagePath = path.join(__dirname, '../../../uploads', vacation.imageFileName);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        // Store vacation data before deletion for socket event
        const vacationData = vacation.get({ plain: true });

        // Delete vacation record (will cascade delete tags)
        await vacation.destroy();

        // Emit socket event for deleted vacation
        socket.emit('vacationDeleted', vacationData);

        res.json({ success: true, message: 'Vacation deleted successfully' });
    } catch (e) {
        next(e);
    }
}
import { NextFunction, Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import sequelize from "../../db/sequelize";
import Vacation from "../../models/vacation";
import User from "../../models/user";
import VacationTag from "../../models/tag";
import AppError from "../../errors/app-error";
import { Parser } from "json2csv";

// Get statistics on tagged vacations for admins
export async function getTagStats(req: Request, res: Response, next: NextFunction) {
    try {
        // Get all vacations with their tag counts
        const vacations = await Vacation.findAll({
            attributes: [
                'id',
                'destination',
                'startDate',
                'endDate',
                'price',
                'imageFileName',
                [sequelize.fn('COUNT', sequelize.col('taggedByUsers.id')), 'tagCount']
            ],
            include: [{
                model: User,
                as: 'taggedByUsers',
                attributes: [],
                through: { attributes: [] }
            }],
            group: ['Vacation.id'],
            order: [[sequelize.literal('tagCount'), 'DESC']]
        });

        res.json(vacations);
    } catch (e) {
        next(e);
    }
}

// Get detailed report on who is tagging specific vacations
export async function getVacationTagDetails(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;

        // Verify vacation exists
        const vacation = await Vacation.findByPk(id);
        if (!vacation) {
            return next(new AppError(StatusCodes.NOT_FOUND, 'Vacation not found'));
        }

        // Get all users who tagged this vacation
        const vacation_with_users = await Vacation.findByPk(id, {
            include: [{
                model: User,
                as: 'taggedByUsers',
                attributes: ['id', 'firstName', 'lastName', 'email'],
                through: { attributes: ['createdAt'] }
            }]
        });

        res.json(vacation_with_users);
    } catch (e) {
        next(e);
    }
}

// Get most popular destinations by tag count
export async function getPopularDestinations(req: Request, res: Response, next: NextFunction) {
    try {
        // Get aggregate counts by destination
        const result = await Vacation.findAll({
            attributes: [
                'destination',
                [sequelize.fn('COUNT', sequelize.col('taggedByUsers.id')), 'tagCount']
            ],
            include: [{
                model: User,
                as: 'taggedByUsers',
                attributes: [],
                through: { attributes: [] }
            }],
            group: ['destination'],
            order: [[sequelize.literal('tagCount'), 'DESC']],
            limit: 5
        });

        res.json(result);
    } catch (e) {
        next(e);
    }
}

// Get user tag activity, i.e., which users are tagging the most
export async function getUserTagActivity(req: Request, res: Response, next: NextFunction) {
    try {
        // Get aggregate counts by user
        const result = await User.findAll({
            attributes: [
                'id',
                'firstName',
                'lastName',
                'email',
                [sequelize.fn('COUNT', sequelize.col('taggedVacations.id')), 'tagCount']
            ],
            include: [{
                model: Vacation,
                as: 'taggedVacations',
                attributes: [],
                through: { attributes: [] }
            }],
            group: ['User.id'],
            order: [[sequelize.literal('tagCount'), 'DESC']],
            limit: 10
        });

        res.json(result);
    } catch (e) {
        next(e);
    }
}

// Get monthly tag activity to analyze trends
export async function getMonthlyTagActivity(req: Request, res: Response, next: NextFunction) {
    try {
        // Extract year and month from tag creation date and count
        const result = await VacationTag.findAll({
            attributes: [
                [sequelize.fn('YEAR', sequelize.col('created_at')), 'year'],
                [sequelize.fn('MONTH', sequelize.col('created_at')), 'month'],
                [sequelize.fn('COUNT', sequelize.col('*')), 'tagCount']
            ],
            group: [
                sequelize.fn('YEAR', sequelize.col('created_at')),
                sequelize.fn('MONTH', sequelize.col('created_at'))
            ],
            order: [
                [sequelize.fn('YEAR', sequelize.col('created_at')), 'ASC'],
                [sequelize.fn('MONTH', sequelize.col('created_at')), 'ASC']
            ]
        });

        res.json(result);
    } catch (e) {
        next(e);
    }
}

export async function downloadTagStatsCsv(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const stats = await Vacation.findAll({
            attributes: [
                'destination',
                [sequelize.fn('COUNT', sequelize.col('taggedByUsers.id')), 'followers']
            ],
            include: [
                {
                    model: User,
                    as: 'taggedByUsers',
                    attributes: [],
                    through: { attributes: [] }
                }
            ],
            group: ['destination'],
            raw: true,
        });

        const parser = new Parser({ fields: ['destination', 'followers'] });
        const csv = parser.parse(stats);

        res.header("Content-Type", "text/csv");
        res.attachment("vacation-followers.csv");
        res.send(csv);
    } catch (error) {
        next(error);
    }
}


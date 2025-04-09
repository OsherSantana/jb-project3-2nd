import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useService from "../../../hooks/useService";
import UserVacationsService from "../../../services/auth-aware/UserVacations";
import { useEffect, useState } from "react";
import Vacation from "../../../models/vacation/Vacation";
import "./EditVacation.css";

export default function EditVacation(): JSX.Element {
    const { vacationId } = useParams();
    const service = useService(UserVacationsService);
    const navigate = useNavigate();
    const [original, setOriginal] = useState<Vacation | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        (async () => {
            try {
                const vacation = await service.getVacationById(vacationId!);
                setOriginal(vacation);
                Object.entries(vacation).forEach(([key, value]) => {
                    setValue(key as any, value);
                });
            } catch (err) {
                alert("Vacation not found");
                navigate("/profile");
            }
        })();
    }, []);

    async function submit(data: any) {
        const formData = new FormData();

        formData.append("destination", data.destination);
        formData.append("description", data.description);
        formData.append("startDate", data.startDate);
        formData.append("endDate", data.endDate);
        formData.append("price", data.price);
        formData.append("isDraft", data.isDraft ? "true" : "false");

        if (data.imageFile?.[0]) {
            formData.append("image", data.imageFile[0]);
        }

        try {
            await service.updateVacation(vacationId!, formData);
            navigate("/profile");
        } catch (err) {
            alert("Failed to update vacation");
            console.error(err);
        }
    }

    if (!original) return <div>Loading...</div>;

    return (
        <div className="EditVacation">
            <form onSubmit={handleSubmit(submit)}>
                <input placeholder="Destination" {...register("destination", { required: true })} />
                <textarea placeholder="Description" {...register("description", { required: true })} />

                <input type="date" {...register("startDate", { required: true })} />
                <input type="date" {...register("endDate", { required: true })} />

                <input
                    type="number"
                    placeholder="Price"
                    {...register("price", { required: true, min: 0, max: 10000 })}
                />

                <label>Replace Image:
                    <input type="file" {...register("imageFile")} />
                </label>

                <label>
                    <input type="checkbox" {...register("isDraft")} />
                    Save as draft
                </label>

                <button type="submit">Update Vacation</button>
            </form>
        </div>
    );
}

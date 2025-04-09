import { useEffect } from 'react';
import './VacationFeed.css';
import VacationCard from '../vacation/Vacation';
import useTitle from '../../../hooks/useTitle';
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { initVacations, setVacationNewContent } from '../../../redux/vacationFeedSlice';
import Loading from '../../common/loading/Loading';
import useService from '../../../hooks/useService';
import VacationFeedService from '../../../services/auth-aware/VacationFeed';
import Vacation from '../../../models/vacation/Vacation';

export default function Feed() {
    useTitle('Vacation Feed');

    const dispatch = useAppDispatch();
    const following = useAppSelector(state => state.userFollowing.userFollowing);
    const vacations = useAppSelector(state => state.vacationFeed.vacations);


    const feedService = useService(VacationFeedService);

    useEffect(() => {
        reload({ page: 1 });
    }, []);

    async function reload(filters: {
        page?: number;
        followedOnly?: boolean;
        activeOnly?: boolean;
        destination?: string;
    }) {
        try {
            const updatedVacations = await feedService.getFeed(filters);
            dispatch(initVacations(updatedVacations));
            // depending on your slice name
        } catch (e) {
            alert(e);
        }
    }

    return (
        <div className="Feed">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const formData = new FormData(form);

                    const filters = {
                        page: parseInt(formData.get("page") as string),
                        followedOnly: formData.get("followedOnly") === "on",
                        activeOnly: formData.get("activeOnly") === "on",
                        destination: formData.get("destination") as string,
                    };

                    reload(filters);
                }}
            >
                <label>
                    <input type="checkbox" name="followedOnly" />
                    Followed only
                </label>

                <label>
                    <input type="checkbox" name="activeOnly" />
                    Active only
                </label>

                <input type="text" name="destination" placeholder="Search destination" />

                <input type="number" name="page" defaultValue="1" min="1" />

                <button type="submit">Apply Filters</button>
            </form>

            {vacations.length === 0 ? (
                <Loading />
            ) : (
                vacations.map((v: Vacation, i: number) => (
                    <VacationCard key={i} vacation={v} />

                ))

            )}
        </div>
    );
}
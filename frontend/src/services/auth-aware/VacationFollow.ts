import Vacation from "../../models/vacation/Vacation";
import AuthAware from "./AuthAware";
import User from "../../models/user/User"; // if needed

export default class TaggedVacations extends AuthAware {
    async getTaggedByUser(userId: string): Promise<Vacation[]> {
        const response = await this.axiosInstance.get<Vacation[]>(
            `${import.meta.env.VITE_REST_SERVER_URL}/users/${userId}/tagged-vacations`
        );
        return response.data;
    }

    async getFollowing(): Promise<User[]> {
        const response = await this.axiosInstance.get<User[]>(
            `${import.meta.env.VITE_REST_SERVER_URL}/following`
        );
        return response.data;
    }
    async getFollowers(): Promise<User[]> {
        const response = await this.axiosInstance.get<User[]>(
            `${import.meta.env.VITE_REST_SERVER_URL}/followers`
        );
        return response.data;
    }

    async follow(vacationId: string): Promise<void> {
        await this.axiosInstance.post(`/tags/tag/${vacationId}`);
    }

    async unfollow(vacationId: string): Promise<void> {
        await this.axiosInstance.delete(`/tags/untag/${vacationId}`);
    }

}

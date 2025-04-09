import Tag from "../tag/Tag";
import User from "../user/User";

export default interface Vacation {
    id: string;
    title: string;
    body: string;
    destination: string;
    startDate: string;
    endDate: string;
    price: number;
    imageFileName: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
    isDraft?: boolean;
    user: User;
    tags: Tag[];
}

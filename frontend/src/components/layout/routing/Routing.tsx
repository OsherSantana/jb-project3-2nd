import { Navigate, Route, Routes } from "react-router-dom";
import Profile from "../../vacations/profile/UserVacations";
import Feed from "../../vacations/feed/VacationFeed";
import NotFound from "../not-found/NotFound";
import EditPost from "../../vacations/edit/EditVacation";
import AdminReports from "../../vacations/admin reports/AdminReports";

export default function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/admin/reports" element={<AdminReports />} />
            <Route path="/" element={<Navigate to="/profile" />} />
            {/* <Route path="/" element={<Profile />} /> */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/edit/:id/" element={<EditPost />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

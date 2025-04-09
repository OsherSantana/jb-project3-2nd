import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, LabelList } from "recharts";
import useService from "../../../hooks/useService";
import UserVacationsService from "../../../services/auth-aware/UserVacations";
import "./AdminReports.css";

interface ReportData {
    destination: string;
    followers: number;
}

export default function AdminReports(): JSX.Element {
    const [data, setData] = useState<ReportData[]>([]);
    const service = useService(UserVacationsService);

    useEffect(() => {
        (async () => {
            try {
                const response = await service.getVacationReport();
                setData(response);
            } catch (err) {
                alert("Failed to load report");
                console.error(err);
            }
        })();
    }, []);

    return (
        <div className="AdminReports">
            <h2>Vacation Followers Report</h2>

            <div className="chart-container">
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="destination" angle={-30} textAnchor="end" interval={0} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="followers" fill="#8884d8">
                            <LabelList dataKey="followers" position="top" />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <a
                href={`${import.meta.env.VITE_REST_SERVER_URL}/reports/vacation-followers.csv`}
                target="_blank"
                rel="noopener noreferrer"
                download
            >
                <button className="download-button">Download CSV</button>
            </a>
        </div>
    );
}

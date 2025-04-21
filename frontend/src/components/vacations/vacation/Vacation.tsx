import Vacation from "../../../models/vacation/Vacation";
import "./Vacation.css";
import { useAppSelector } from "../../../redux/hooks";
import useService from "../../../hooks/useService";
import VacationFollowService from "../../../services/auth-aware/VacationFollow";
import { useState } from "react";

interface VacationProps {
  vacation: Vacation;
  isAllowActions?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onTag?: () => void;
}

export default function VacationCard({
  vacation,
  isAllowActions = true,
  onEdit,
  onDelete,
  onTag
}: VacationProps): JSX.Element {


  const [followers, setFollowers] = useState(vacation.taggedByUsers?.length ?? 0);
  const auth = useAppSelector((state) => state.auth);
  const service = useService(VacationFollowService);
  const [isTagged, setIsTagged] = useState<boolean>(!!vacation.taggedByUsers?.find(user => auth.user && auth.user.id === user.id))
  const canTag = auth.user && auth.user.role === "user";
  const canEdit = auth.user?.role === "admin" && isAllowActions;

  async function toggleTag() {
    try {
      if (isTagged) {
        await service.unfollow(vacation.id);
        setIsTagged(false);
        setFollowers(prev => prev - 1);
        onTag?.();
      } else {
        await service.follow(vacation.id);
        setIsTagged(true);
        setFollowers(prev => prev + 1);
        onTag?.();
      }
    } catch (err: any) {
      if (err.response?.status === 409) {
        setIsTagged(true);
        setFollowers(prev => prev + 1);
      } else {
        alert("Failed to update tag");
        console.error(err);
      }
    }
  }

  return (
    <div className="VacationCard">
      <div className="follower-count">{followers} followers</div>

      <img
        src={`${import.meta.env.VITE_REST_SERVER_URL}/uploads/${vacation.imageFileName}`}
        alt={vacation.destination}
      />

      <h3>{vacation.destination}</h3>
      <p>{vacation.description}</p>
      <p>
        {vacation.startDate} - {vacation.endDate}
      </p>
      <p>${Number(vacation.price).toFixed(2)}</p>

      {canTag && isAllowActions && (
        <button onClick={toggleTag}>
          {isTagged ? "Unfollow" : "Follow"}
        </button>
      )}

      {canEdit && (
        <div className="admin-actions">
          <button onClick={() => {
            onEdit?.();
          }}>✏️ Edit</button>

          <button onClick={() => {
            onDelete?.();
          }}>🗑 Delete</button>
        </div>
      )}
    </div>
  );
}

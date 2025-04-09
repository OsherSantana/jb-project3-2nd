import VacationModel from "../../../models/vacation/Vacation";
import "./Vacation.css";

interface VacationProps {
  vacation: VacationModel;
  isAllowActions?: boolean;
}

export default function Vacation({ vacation, isAllowActions }: VacationProps): JSX.Element {
  return (
    <div className="Vacation">
      <h3>{vacation.title}</h3>
      <p>{vacation.body}</p>
      <img src={vacation.imageUrl} alt={vacation.title} />
      <p>Start: {vacation.startDate}</p>
      <p>End: {vacation.endDate}</p>
      <p>Price: ${vacation.price}</p>
      {isAllowActions && (
        <div className="actions">
          <button>Edit</button>
          <button>Delete</button>
        </div>
      )}
    </div>
  );
}

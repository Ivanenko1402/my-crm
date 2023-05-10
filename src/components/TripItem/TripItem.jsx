import { Link } from "react-router-dom";
import { DeleteIcon } from "../icons/DeleteIcon";
import { InformationIcon } from "../icons/InformationIcon";
import { useDispatch } from "react-redux";
import { actions } from "../../store/slices/tripsSlice";

export const TripItem = ({ trip, index }) => {
  const { id, from, to, driver, passengers } = trip;

  const dispatch = useDispatch();

  return (
    <tr key={id}>
      <td>{index + 1}</td>
      <td>{from}</td>
      <td>{to}</td>
      <td>{driver.displayName}</td>
      <td>
        {passengers.length > 1
          ? `${passengers.length} people`
          : `${passengers.length} person`}
      </td>
      <td className="text-center">
        <Link to={`/trips/${trip.id}`}>
          <InformationIcon />
        </Link>
      </td>
      <td className="text-center">
        <Link onClick={() => dispatch(actions.removeTrip(trip.id))}>
          <DeleteIcon />
        </Link>
      </td>
    </tr>
  );
};

import { Link } from "react-router-dom";
import { InformationIcon, DeleteIcon } from "../../../icons";

export const TripItem = ({ trip, index }) => {
  const { id, from, to, driver, passengers } = trip;

  const deleteTrip = async () => {
  }

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
        <Link onClick={deleteTrip}>
          <DeleteIcon />
        </Link>
      </td>
    </tr>
  );
};

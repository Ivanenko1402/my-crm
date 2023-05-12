import { Link } from "react-router-dom";
import { InformationIcon, DeleteIcon } from "../../../icons";
import { getDatabase, ref, set } from "firebase/database";
import { useDispatch } from "react-redux";
import { init as tripInit } from '../../../../store/slices/tripsSlice';

export const TripItem = ({ trip, index }) => {
  const { id, from, to, driver, passengers } = trip;
  const db = getDatabase();
  const dispatch = useDispatch();

  const deleteTrip = async () => {
    await set(ref(db, `trips/${id}`), null);
    dispatch(tripInit());
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

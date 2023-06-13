import { Link } from "react-router-dom";
import { InformationIcon, DeleteIcon } from "../../../icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteTrip } from "../../../../store/slices/tripsSlice";

export const TripItem = ({ trip, index }) => {
  const { people } = useSelector(store => store.people);
  const {
    id,
    tripDeparture,
    tripDestination, 
    tripDriver,
    tripPassengers
  } = trip;
  const dispatch = useDispatch();

  const deleteTargetTrip = (data) => {
    dispatch(deleteTrip(data));
  }

  return (
    <tr key={id}>
      <td>{index + 1}</td>
      <td>{tripDeparture}</td>
      <td>{tripDestination}</td>
      <td>{people.find(p => p.id === +tripDriver).userName ?? ''}</td>
      <td>
        {tripPassengers.length > 1
          ? `${tripPassengers.length} people`
          : `${tripPassengers.length} person`}
      </td>
      <td className="text-center">
        <Link to={`/trips/${trip.id}`}>
          <InformationIcon />
        </Link>
      </td>
      <td className="text-center">
        <Link onClick={() => deleteTargetTrip(trip)}>
          <DeleteIcon />
        </Link>
      </td>
    </tr>
  );
};

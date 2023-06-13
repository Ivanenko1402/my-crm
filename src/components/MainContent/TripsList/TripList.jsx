import { useEffect } from "react";
import { Alert, Button, Spinner, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TripItem } from './TripItem';
import { getTrips, setTargetTrip } from "../../../store/slices/tripsSlice";
import { getPersons } from "../../../store/slices/peopleSlice";

const tableHeader = ['#', 'Departure ', 'Destination', 'Driver', 'Passengers', 'Info', 'Action']

export const TripList = () => {
  const { trips, isLoading, error } = useSelector(state => state.trips);
  const { people } = useSelector(state => state.people);
  const dispatch = useDispatch();
  const showList = trips.length > 0 && !error && !isLoading;
  const listIsEmpty = !trips.length && !error && !isLoading;
  const errorNotification = error && !isLoading;

  useEffect(() => {
    if (!people.length) {
      dispatch(getPersons());
    }
  })

  useEffect(() => {
    dispatch(getTrips());
    dispatch(setTargetTrip(null));
  }, [dispatch])

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Trips list</h1>
        <Link to="/trips/new">
          <Button variant="success">Add new trip</Button>
        </Link>
      </div>
      {isLoading && (
        <div className='d-flex justify-content-center align-items-center h-100 w-100'>
          <Spinner animation="border" role="status" />
        </div>
      )}
      {showList && (
        <>
          <Table striped bordered hover size="sm" responsive>
            <thead>
              <tr>
                {tableHeader.map((cell, i) => (
                  <th className="text-center" key={cell + i}>
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {trips.map((trip, i) => (
                <TripItem trip={trip} index={i} key={trip.id} />
              ))}
            </tbody>
          </Table>
        </>
      )}
      {listIsEmpty && (
        <Alert variant='warning'>
          There are no people in the list! Press add new person.
        </Alert>
      )}
      {errorNotification && (
        <Alert variant='danger'>
          {error}
        </Alert>
      )}
    </>
  )
}
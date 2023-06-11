import { useEffect, useState } from "react";
import { Alert, Button, Spinner, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TripItem } from './TripItem';
import { getTrips, setTargetTrip } from "../../../store/slices/tripsSlice";

const tableHeader = ['#', 'Departure ', 'Destination', 'Driver', 'Passengers', 'Info', 'Action']

export const TripList = () => {
  const { trips, isLoading, error } = useSelector(state => state.trips);
  const [list, setList] = useState(trips);
  const dispatch = useDispatch();
  const showList = list.length > 0 && !error && !isLoading;
  const listIsEmpty = !list.length && !error && !isLoading;
  const errorNotification = error && !isLoading;

  useEffect(() => {
    dispatch(getTrips());
    dispatch(setTargetTrip(null));
  }, [dispatch])

  useEffect(() => {
    setList(trips)
  }, [trips])

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
              {list.map((trip, i) => (
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
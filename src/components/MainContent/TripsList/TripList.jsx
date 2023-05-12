import { useEffect, useState } from "react";
import { Alert, Button, Spinner, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { TripItem } from './TripItem';
import { init as tripInit } from "../../../store/slices/tripsSlice";

const tableHeader = ['#', 'Departure ', 'Destination', 'Driver', 'Passengers', 'Info', 'Action']

export const TripList = () => {
  const dispatch = useDispatch();
  const { trips, isTripsLoading, error } = useSelector(state => state.trips);
  const [list, setList] = useState(trips);

  useEffect(() => {
    dispatch(tripInit())
  }, [dispatch])

  useEffect(() => {
    setList(trips)
  }, [trips])

  return (
    <>
      {isTripsLoading && (
        <div className='d-flex justify-content-center align-items-center h-100 w-100'>
          <Spinner animation="border" role="status" />
        </div>
      )}
      {list.length > 0 && !error && !isTripsLoading && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>Trips list</h1>
            <Link to="/trips/new">
              <Button variant="success">Add new trip</Button>
            </Link>
          </div>
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
      {!list.length && !error && !isTripsLoading && (
        <Alert variant='warning'>
          There are no people in the list! Press add new person.
        </Alert>
      )}
      {(error && !isTripsLoading) && (
        <Alert variant='danger'>
          {error}
        </Alert>
      )}
    </>
  )
}
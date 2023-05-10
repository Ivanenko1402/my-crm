import { useEffect, useState } from "react";
import { Alert, Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TripItem } from "../../TripItem/TripItem";

const tableHeader = ['#', 'Departure ', 'Destination', 'Driver', 'Passengers', 'Info', 'Action']

export const TripColection = () => {
  const { trips } = useSelector(state => state.trips);
  const [list, setList] = useState(trips);

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
      {Boolean(list.length) && (
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
      )}
      {Boolean(!list.length) && (
        <Alert variant='danger'>
          There are no active trips in the list!
        </Alert>
      )}
    </>
  )
}
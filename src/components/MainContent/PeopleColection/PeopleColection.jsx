import { useEffect, useState } from "react";
import { Table, Alert, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PeopleItem } from "../../PeopleItem/PeopleItem";

export const PeopleCollection = () => {
  const { people } = useSelector(state => state.people);
  const [list, setList] = useState(people);
  const tableHeader = ['#', 'Name', 'Email', 'Phone', 'Role', 'Edit', 'Delete' ];

  useEffect(() => {
    setList(people);
  }, [people])

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>People list</h1>
        <Link to="/people/new">
          <Button variant="success">Add new person</Button>
        </Link>
      </div>
      {Boolean(list.length) && (
        <Table striped bordered hover size="sm" responsive>
          <thead>
            <tr>
              {tableHeader.map(cell => (
                <th style={{ textAlign: 'center' }} key={cell}>
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {list.map((person, index) => (
              <PeopleItem person={person} index={index} key={person.userId} />
            ))}
          </tbody>
        </Table>
      )}
      {Boolean(!list.length) && (
        <Alert variant='danger'>
          There are no people in the list!
        </Alert>
      )}
    </>
  )
}
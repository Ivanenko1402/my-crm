import { useEffect, useState } from "react";
import { Table, Alert, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { PersonItem } from './PersonItem';
import { getPersons, setTargetPerson } from "../../../store/slices/peopleSlice";

export const PersonList = () => {
  const { isLoading, people, error } = useSelector(state => state.people);
  const [list, setList] = useState(people);
  const tableHeader = ['#', 'Name', 'Phone', 'Role', 'Edit', 'Delete' ];
  const dispatch = useDispatch();

  const showList = list.length > 0 && !error && !isLoading;
  const listIsEmpty = !list.length && !error && !isLoading;
  const errorNotification = error && !isLoading;

  useEffect(() => {
    dispatch(setTargetPerson(null))
    dispatch(getPersons());
  }, [dispatch]);

  useEffect(() => {
    setList(people)
  }, [people])

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>People list</h1>
        <Link to="/people/new">
          <Button variant="success">Add new person</Button>
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
              {people.map((person, index) => (
                <PersonItem person={person} index={index} key={person.id} />
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
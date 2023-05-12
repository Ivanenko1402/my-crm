import { useEffect, useState } from "react";
import { Table, Alert, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { PersonItem } from './PersonItem';
import { init } from "../../../store/slices/peopleSlice";

export const PersonList = () => {
  const { isLoading, peopleList, error } = useSelector(state => state.people);
  const [list, setList] = useState([]);
  const tableHeader = ['#', 'Name', 'Phone', 'Role', 'Edit', 'Delete' ];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(init())
  }, [dispatch]);

  useEffect(() => {
    setList(peopleList)
  }, [peopleList]);

  return (
    <>
      {isLoading && (
        <div>Loading...</div>
      )}
      {list.length > 0 && !error && !isLoading && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1>People list</h1>
            <Link to="/people/new">
              <Button variant="success">Add new person</Button>
            </Link>
          </div>
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
                <PersonItem person={person} index={index} key={person.userId} />
              ))}
            </tbody>
          </Table>
        </>
      )}
      {!list.length && !error && !isLoading && (
        <Alert variant='warning'>
          There are no people in the list! Press add new person.
        </Alert>
      )}
      {(error && !isLoading) && (
        <Alert variant='danger'>
          {error}
        </Alert>
      )}
    </>
  )
}
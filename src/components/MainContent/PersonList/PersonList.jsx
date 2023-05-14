import { useEffect, useState } from "react";
import { Table, Alert, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { PersonItem } from './PersonItem';
import { init } from "../../../store/slices/peopleSlice";

export const PersonList = () => {
  const { isLoading, peopleList, error } = useSelector(state => state.people);
  const [list, setList] = useState([]);
  const tableHeader = ['#', 'Name', 'Phone', 'Role', 'Edit', 'Delete' ];
  const dispatch = useDispatch();

  const showList = list.length > 0 && !error && !isLoading;
  const listIsEmpty = !list.length && !error && !isLoading;
  const errorNotification = error && !isLoading;

  useEffect(() => {
    dispatch(init())
  }, [dispatch]);

  useEffect(() => {
    setList(peopleList)
  }, [peopleList]);

  return (
    <>
      {isLoading && (
        <div className='d-flex justify-content-center align-items-center h-100 w-100'>
          <Spinner animation="border" role="status" />
        </div>
      )}
      {showList && (
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
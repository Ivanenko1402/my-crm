import { Link } from "react-router-dom";
import { InformationIcon } from '../../../icons/InformationIcon';
import { DeleteIcon } from '../../../icons/DeleteIcon';
import { deletePerson, getPersons } from "../../../../store/slices/peopleSlice";
import { useDispatch } from "react-redux";

export const PersonItem = ({ person, index }) => {
  const dispatch = useDispatch();
  const { id, userName, userPhone, userRole } = person;

  const removePerson = (data) => {
    dispatch(deletePerson(data))
    dispatch(getPersons());
  }

  return (
    <tr key={id}>
      <td>{index + 1}</td>
      <td>{userName}</td>
      <td>{userPhone}</td>
      <td>{userRole}</td>
      <td className="text-center">
        <Link to={`/people/${id}`}>
          <InformationIcon />
        </Link>
      </td>
      <td className="text-center">
        <Link onClick={() => removePerson(person)}>
          <DeleteIcon />
        </Link>
      </td>
    </tr>
  );
};

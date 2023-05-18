import { Link } from "react-router-dom";
import { InformationIcon } from '../../../icons/InformationIcon';
import { DeleteIcon } from '../../../icons/DeleteIcon';
import { deletePerson, getPersons } from "../../../../store/slices/peopleSlice";
import { useDispatch } from "react-redux";

export const PersonItem = ({ person, index }) => {
  const dispatch = useDispatch();
  const { userId, displayName, phoneNumber, role } = person;

  const removePerson = (data) => {
    dispatch(deletePerson(data))
    dispatch(getPersons());
  }

  return (
    <tr key={userId}>
      <td>{index + 1}</td>
      <td>{displayName}</td>
      <td>{phoneNumber}</td>
      <td>{role}</td>
      <td className="text-center">
        <Link to={`/people/${userId}`}>
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

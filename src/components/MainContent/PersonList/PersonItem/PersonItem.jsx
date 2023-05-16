import { Link } from "react-router-dom";
import { InformationIcon } from '../../../icons/InformationIcon';
import { DeleteIcon } from '../../../icons/DeleteIcon';
import { useDispatch } from "react-redux";
import { deletePerson } from '../../../../store/slices/peopleSlice';

export const PersonItem = ({ person, index }) => {
  const { userId, displayName, phoneNumber, role } = person;
  const dispatch = useDispatch();

  const removePerson = () => {
    dispatch(deletePerson(userId));
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
        <Link onClick={removePerson}>
          <DeleteIcon />
        </Link>
      </td>
    </tr>
  );
};

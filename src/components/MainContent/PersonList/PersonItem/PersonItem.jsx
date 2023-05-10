import { useDispatch } from "react-redux";
import { actions } from '../../../../store/slices/peopleSlice';
import { Link } from "react-router-dom";
import { InformationIcon } from '../../../icons/InformationIcon';
import { DeleteIcon } from '../../../icons/DeleteIcon';

export const PersonItem = ({ person, index }) => {
  const dispatch = useDispatch();
  const { userId, displayName, phoneNumber, role } = person;

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
        <Link onClick={() => dispatch(actions.deletePerson(userId))}>
          <DeleteIcon />
        </Link>
      </td>
    </tr>
  );
};

import { Link } from "react-router-dom";
import { InformationIcon } from "../../../icons/InformationIcon";
import { DeleteIcon } from "../../../icons/DeleteIcon";
import { actions } from '../../../store/slices/peopleSlice';
import { useDispatch } from "react-redux";


export const PeopleItem = ({ person, index }) => {
  const dispatch = useDispatch();
  const {
    userId,
    displayName,
    email,
    phoneNumber,
    role,
  } = person;

  return (
  <tr key={userId}>
    <td>{index + 1}</td>
    <td>{displayName}</td>
    <td>{email}</td>
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

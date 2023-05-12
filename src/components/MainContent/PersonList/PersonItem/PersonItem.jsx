import { useDispatch } from "react-redux";
import { actions, init } from '../../../../store/slices/peopleSlice';
import { Link } from "react-router-dom";
import { InformationIcon } from '../../../icons/InformationIcon';
import { DeleteIcon } from '../../../icons/DeleteIcon';
import { getDatabase, ref, set } from "firebase/database";

export const PersonItem = ({ person, index }) => {
  const dispatch = useDispatch();
  const db = getDatabase();
  const { userId, displayName, phoneNumber, role } = person;

  const deletePerson = async () => {
    await set(ref(db, `people/${userId}`), null);
    dispatch(init());
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
        <Link onClick={deletePerson}>
          <DeleteIcon />
        </Link>
      </td>
    </tr>
  );
};

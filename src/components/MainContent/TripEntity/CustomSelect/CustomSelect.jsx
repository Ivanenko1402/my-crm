import { useState } from 'react';
import './CustomSelect.css';

export const CustomSelect = ({
  list,
  defaultSatate,
  isInvalid,
  onChange,
}) => {
  const [state, setState] = useState(defaultSatate);

  const changeCheckedPerson = (person) => {
    const updatedState = state.includes(person.userId)
      ? state.filter((p) => p !== person.userId)
      : [...state, person.userId];

    const event = {
      target: {
        name: 'tripPassengers',
        type: 'my-select',
        value: updatedState,
      },
    };

    setState(updatedState);
    onChange(event);
  };

  return (
    <div className='select'>
      <p className='select_title'>Passengers:</p>
      <div className={isInvalid ? 'select_conteiner-invalid' : 'select_conteiner'}>
        {list.map(person => (
          <label
            className={state.includes(person.userId) ? 'select_conteiner_person select_conteiner_person-active' : 'select_conteiner_person'}
            key={person.userId}
          >
            {`${person.displayName} tel:${person.phoneNumber}`}
            <input
              type="checkbox"
              className='select_conteiner_person_checkbox'
              checked={state.includes(person.userId)}
              onChange={() => changeCheckedPerson(person)}
            />
          </label>
        ))}
      </div>
      {(
        <p className='select_error'>
          {isInvalid}
        </p>
      )}
    </div>
    )
}

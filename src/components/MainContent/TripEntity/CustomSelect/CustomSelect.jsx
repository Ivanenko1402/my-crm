export const CustomSelect = ({
  items,
  isInvalid,
  checkedModel,
  onCheckedModelChange,
}) => {

  return (
    <div>
      <p className='mb-2'>Passengers:</p>
      <div
        className={
          isInvalid
            ? 'border border-danger rounded'
            : 'h-100 border rounded'
        }
        style={{
          maxHeight: '100px',
          overflowY: 'scroll'
        }}
      >
        {items.map(person => (
          <label
            className={checkedModel && checkedModel.includes(person.userId) ? 'd-flex justify-content-between align-items-center p-1 bg-light' : 'd-flex justify-content-between align-items-center p-1'}
            key={person.userId}
          >
            {`${person.displayName} tel:${person.phoneNumber}`}
            <input
              type="checkbox"
              checked={checkedModel && checkedModel.includes(person.userId)}
              onChange={() => onCheckedModelChange(person)}
            />
          </label>
        ))}
      </div>
      {isInvalid && (
        <p className='text-danger'>
          {isInvalid}
        </p>
      )}
    </div>
  )
}

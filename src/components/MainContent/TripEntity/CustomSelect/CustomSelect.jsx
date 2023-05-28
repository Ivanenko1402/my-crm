export const CustomSelect = ({
  children,
  isInvalid,
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
        {children}
      </div>
      <p className='text-danger'>
        {isInvalid}
      </p>
    </div>
    )
}

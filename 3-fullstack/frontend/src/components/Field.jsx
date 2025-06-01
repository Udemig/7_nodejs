const Field = ({ label, value }) => {

  return (
    <p>
      <span className='font-semibold me-2'>{label}:</span>
      <span className='p-2 bg-gray-200 px-4 font-semibold rounded-full'>{value}</span>
    </p>
  )
}

export default Field;
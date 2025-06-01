const ListField = ({ label, values }) => {

  return (
    <div>
        <h3 className="font-semibold mb-1">{label}:</h3>

        <div className="flex gap-3 flex-wrap">
            {
                values.map((item)=>(
                    <span className="p-2 bg-gray-200 px-4 rounded-full font-semibold">
                        {item}
                    </span>
                ))
            }
        </div>
    </div>
  )
}

export default ListField;
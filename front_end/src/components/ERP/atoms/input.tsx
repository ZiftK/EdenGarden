export default function Input({
    label,
    name,
    type,
    required = false,
    placeholder = "",
    className = "",
    ...props
}: {
    label: string
    name: string
    type: string
    required?: boolean
    placeholder?: string
    className?: string
}) {
    return (
        <div className={`flex flex-col ${className}`}>
            <label htmlFor={name} className="text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                required={required}
                placeholder={placeholder}
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                {...props}
            />
        </div>
    )
}
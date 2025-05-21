import EmployeeDetails from './components/EmployeeDetails'

export default function Page({ params }: { params: { empleado: string } }) {
	return <EmployeeDetails employeeId={params.empleado} />
}

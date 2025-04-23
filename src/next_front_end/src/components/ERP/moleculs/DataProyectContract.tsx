interface DataProyectContractProps {
    name: string;
    price: number;
    startDate: string;
    endDate: string;
    teem: string;
}

export default function DataProyectContract({data}: {data: DataProyectContractProps[]}) {
    return (
        <div className="flex flex-col gap-5">
            {data.slice(0,2).map((item, index) => (
            <div key={index} className="">

                <div className="flex justify-between items-center ">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="relative text-sm font-light befor after:content-[''] after:absolute after:-left-3.5 after:top-1/2 after:-translate-y-1/2 after:rounded-full after:bg-[var(--green-dark-500)] after:w-2 after:h-2">${item.price}</p>
                </div>

                <p className="text-xs px-6 text-[var(--green-dark-500)]">{item.teem}</p>
                <p className="text-xs px-6 text-gray-200/20">{item.startDate} - {item.endDate}</p>
            </div>
        ))}</div>
    )
}
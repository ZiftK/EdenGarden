export default function Title(
    {
        title,
        btn
    }:{
    
        title: string,
        btn:{
            active: boolean,
            path: string
        }
}) 
{
    return(
        <>
            <h2 className="text-md font-bold mb-4 inline-block mr-3">{title}</h2>
            {btn.active && 
                <button className="bg-[var(--bg-card-obscure)] w-6 h-6 items-center rounded-full justify-center text-center place-items-center cursor-pointer">
                    +
                </button>
            }
        </>
    )
}

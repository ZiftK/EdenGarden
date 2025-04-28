export default function DashboardLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>){
    return(
        <div className="grid grid-cols-1 md:grid-cols-[1fr_350px] lg:grid-cols-[200px_1fr_250px] lg:grid-rows-[55px_250px_1fr]  min-h-full lg:pt-2 pt-20  gap-4 pr-5 pl-2 py-4">
            {children}
        </div>
    )
}
export default function Dashboard() {
  return (
    <div className="min-h-[75dvh]">
      <div className="flex flex-col gap-10 px-5 md:px-10 lg:px-20 pb-30">
        <h2 className=" py-10 md:py-15 text-2xl md:text-5xl text-center border-b uppercase font-semibold">admin dashboard</h2>
        <div className="grid md:grid-cols-11 gap-5">
          {/* SIde Menu */}
          <div className="md:col-span-4 lg:col-span-3 bg-red-400 rounded-md">
            <h2>
              Dashboard
            </h2>
          </div>

          {/* Main Container */}
          <div className="md:col-span-7 lg:col-span-8 bg-amber-300 rounded-md">
            <h2>container</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

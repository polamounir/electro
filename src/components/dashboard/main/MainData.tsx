import OrdersOverview from "./OrdersOverview";
// import SalesOverview from "./SalesOverview";

export default function MainData() {
  return (
    <div className="flex flex-col gap-15">
      <OrdersOverview />
      {/* <SalesOverview /> */}
    </div>
  )
}

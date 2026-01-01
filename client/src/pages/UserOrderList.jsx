import MaxWidthContainer from "../components/MaxWidthContainer"
import OrderList from "./admin/OrderList"

const UserOrderList = () => {
  return (
    <MaxWidthContainer className="my-10 min-h-[60vh]">
        <OrderList />
    </MaxWidthContainer>
  )
}
export default UserOrderList
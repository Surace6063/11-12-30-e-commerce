import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import MaxWidthContainer from "../MaxWidthContainer";
import { Button } from "../ui/Button";
import { MdRemoveShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const CartEmptyState = () => {
    const navigate = useNavigate()
    
  return (
    <MaxWidthContainer>
        <Empty>
          <EmptyHeader>
            <EmptyMedia>
              <MdRemoveShoppingCart size={60} className="text-gray-600" />
            </EmptyMedia>
            <EmptyTitle>Your cart is empty!</EmptyTitle>
            <EmptyDescription>
             Look like you haven't added anything to your cart yet.
            </EmptyDescription>
          </EmptyHeader>

          <EmptyContent>
            <Button onClick={() => navigate('/products')}>
              Countinue shooping
            </Button>
          </EmptyContent>
        </Empty>
      </MaxWidthContainer>
  )
}
export default CartEmptyState
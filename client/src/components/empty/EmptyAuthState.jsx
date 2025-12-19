import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import MaxWidthContainer from "../MaxWidthContainer";
import AuthDialog from "../AuthDialog";
import { MdOutlinePersonOff } from "react-icons/md";

const EmptyAuthState = () => {
  return (
     <MaxWidthContainer>
        <Empty>
          <EmptyHeader>
            <EmptyMedia>
              <MdOutlinePersonOff size={60} className="text-gray-600" />
            </EmptyMedia>
            <EmptyTitle>Please log in</EmptyTitle>
            <EmptyDescription>
              You need to be logged in to view your cart and continue shopping.
            </EmptyDescription>
          </EmptyHeader>

          <EmptyContent>
            <AuthDialog />
          </EmptyContent>
        </Empty>
      </MaxWidthContainer>
  )
}
export default EmptyAuthState
import { useQuery } from "@tanstack/react-query"
import { apiRequest } from "../../libs/apiRequest"

const UserList = () => {
  const {data:users,isLoading,isError,error} = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await apiRequest.get('/auth/users/')
      return response.data
    }
  })

  console.log(users)
  
  return (
    <div>UserList</div>
  )
}
export default UserList
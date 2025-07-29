import axios from "axios";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

//  this is api url
  const api_url = "https://68219a2d259dad2655afc2ba.mockapi.io";

// this is type of var
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

// this to git data from api
const getUser = async (): Promise<User[]> => {
  try {
    const res = await axios.get<User[]>(`${api_url}/user`);
    console.log("Getting users was successful");
    return res.data;
  } catch (err) {
    console.error(`Can't get users:`, err);
    throw "";
  }
};
// this to use useQuery
function useGitUsers(): UseQueryResult<User[]> {
  const query = useQuery({ queryKey: ["users"], queryFn: getUser });
  return query;
}

export default useGitUsers;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const api_url = "https://68219a2d259dad2655afc2ba.mockapi.io";

const deleteUser = async (id: number) => {
  try {
    const res = await axios.delete(`${api_url}/user/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

function useDeleteUser() {
  const queryClint = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClint.invalidateQueries({
        queryKey: ["user"],
        exact: false,
      });
    },
  });
}

export default useDeleteUser;

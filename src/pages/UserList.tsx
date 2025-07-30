import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import useGitUsers from "@/hooks/useGitUsers";
import useDeleteUser from "@/hooks/useDeleteUser";

function UserList() {

  const deleteUser = useDeleteUser();

  const { isLoading, isError, data } = useGitUsers();
  if (isLoading) {
    <div className="flex flex-col gap-4 w-full  items-start justify-center">
      <div className="w-20 h-20 border-4 border-transparent text-black text-4xl animate-spin flex items-center justify-center border-t-black  rounded-full">
        <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-black  rounded-full"></div>
      </div>
    </div>;
  }
  if (isError) {
    <div className="flex flex-row gap-2 min-h-screen justify-center items-center    ">
      <div>
        <p>their is no data</p>
      </div>
    </div>;
  }
  return (
    <div className="p-4 max-w-screen min-h-screen">
      <p className="text-2xl font-bold mb-4">User Info</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead className="text-center">action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>
                <div className="flex gap-2 justify-center">
                  <Button className="bg-yellow-500 hover:bg-yellow-600">
                    edit
                  </Button>
                  <Button
                    className="bg-red-500 hover:bg-red-700"
                    onClick={() => deleteUser.mutate(user.id)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default UserList;
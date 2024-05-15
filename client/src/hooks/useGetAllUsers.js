import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { makeRequest } from "../requestMethod";

function useGetAllUsers() {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    setIsLoading(true);
    try {
      const res = await makeRequest.get("user/get");
      if (!res.data) {
        return toast.error("Not Found Users 😥");
      } else setUsers(res.data);
    } catch (error) {
      toast.error(`${error.message} 😥`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return { isLoading, users, getAllUsers };
}

export default useGetAllUsers;

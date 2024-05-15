import classes from "./profile.module.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/userSlice";
import { makeRequest } from "../../requestMethod";
import { toast } from "react-toastify";

function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  // Get user
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const { data } = await makeRequest.get(`/user/find/${id}`);
        if (!data) {
          return toast.error("User Not Found 😥");
        } else setUser(data);
      } catch (error) {
        toast.error(`${error.message} 😥`);
      }
    };
    getUserProfile();
  }, []);

  // Edit Data
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState(user.username || "");
  const [name, setName] = useState(user.address || "");
  const [email, setEmail] = useState(user.email || "");

  useEffect(() => {
    setUsername(user.username);
    setEmail(user.email);
    setName(user.name);
  }, [user]);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await makeRequest.put(`/user/update/${id}`, {
        username,
        email,
        name,
      });
      dispatch(updateUser({ _id: id, username, email, name }));
      toast.success("Updated Success 😍");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.details}>
        <h1>User Profile</h1>

        {user ? (
          <form className={classes.inputsCont} onSubmit={handleUpdateUser}>
            <input
              type="text"
              className={classes.inputCurrentUser}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="text"
              className={classes.inputCurrentUser}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              className={classes.inputCurrentUser}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button type="submit" className={classes.btnUpdate}>
              {isLoading ? "Loading... " : "Update"}
            </button>
          </form>
        ) : (
          <p>No profile found</p>
        )}
      </div>
    </div>
  );
}

export default Profile;

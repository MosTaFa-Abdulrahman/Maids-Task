import "./users.css";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import useGetAllUsers from "../../hooks/useGetAllUsers";
import { addUser, deleteUser } from "../../redux/userSlice";
import { makeRequest } from "../../requestMethod";
import { NavLink } from "react-router-dom";

function Users() {
  const { isLoading: loadingGet, users, getAllUsers } = useGetAllUsers();
  const dispatch = useDispatch();

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // ADD USER
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleAddUser = async () => {
    try {
      const { data } = await makeRequest.post("user/create", {
        username,
        email,
        name,
      });
      dispatch(addUser(data));
      getAllUsers();
      toast.success(`Created Success ${data.username} 😍`);
      setIsModalOpen(false);
    } catch (error) {
      toast.error(`${error.message} 😥`);
    }
  };

  // Delete User
  const handleDelete = async (userId) => {
    try {
      const confirmed = window.confirm(`Are You Sure Delete This User ?`);
      if (!confirmed) return;

      await makeRequest.delete(`user/delete/${userId}`);
      dispatch(deleteUser(userId));
      getAllUsers();
      toast.success(`Deleted Success 😍`);
      setIsModalOpen(false);
    } catch (error) {
      toast.error(`${error.message} 😥`);
    }
  };

  // Search
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const searchUsers = async () => {
      try {
        const { data } = await makeRequest.get(`/user/search/${searchTerm}`);
        setSearchResults(data);
      } catch (error) {
        toast.error(`${error.message} 😥`);
      }
    };

    if (searchTerm) {
      searchUsers();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  return (
    <div className="container">
      <h1>User Profiles</h1>
      <button id="addUserBtn" className="btn" onClick={openModal}>
        Add User
      </button>

      <input
        type="text"
        placeholder="Search For User... 🥰"
        style={{ marginTop: "5px" }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {searchTerm
            ? searchResults.map((user) => (
                <tr key={user._id}>
                  <NavLink to={`/user/${user._id}`}>
                    <td>{user.username}</td>
                  </NavLink>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      className="deleteBtn btn"
                      style={{
                        margin: "0px 5px",
                        color: "red",
                      }}
                      onClick={() => handleDelete(user._id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            : loadingGet
            ? "Loading.. "
            : users.map((user) => (
                <tr key={user._id}>
                  <NavLink to={`/user/${user._id}`}>
                    <td>{user.username}</td>
                  </NavLink>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      className="deleteBtn btn"
                      style={{
                        margin: "0px 5px",
                        color: "red",
                      }}
                      onClick={() => handleDelete(user._id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Add User</h2>

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button onClick={handleAddUser}>Add</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Users() {
  const [userData, setUserData] = useState([]);
  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "https://coffee-store-server-kzk1yfqrb-rashidrock558-gmailcom.vercel.app/user"
      );
      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  const handleDeleteUser = (id) => {
    fetch(
      `https://coffee-store-server-kzk1yfqrb-rashidrock558-gmailcom.vercel.app/user/${id}`,
      {
        method: "DELETE",
      }
    )
      .then(() => fetchUserData())
      .then((data) => console.log(data));
  };

  console.log(userData);
  return (
    <div className="min-h-screen">
      <h2>this is USERS ${userData.length}</h2>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Image</th>
              <th>Create Time</th>
              <th>User Settings</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, idx) => (
              <tr key={user._id}>
                <th>{idx + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                {/* <td>{user.image.length > 10 ? user.image.slice(0,10)}</td> */}
                <td>
                  {user?.image?.length > 10
                    ? user?.image.slice(0, 40) + "..."
                    : user?.image}
                </td>
                <td>{user.creatTime || "NO TIME"}</td>
                <td>
                  <div className=" join join-vertical lg:join-horizontal">
                    <Link to={`/userUpdate/${user._id}`}>
                      <button className="bg-green-500 hover:bg-green-500 btn join-item">
                        Edit
                      </button>
                    </Link>
                    <Link onClick={() => handleDeleteUser(user._id)}>
                      <button className="bg-red-500 btn join-item hover:bg-red-500">
                        Delete
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;

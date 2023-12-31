import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UserEditor() {
  const { id } = useParams();
  const [singleUser, setSingleUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const singleUserFetch = async () => {
      try {
        const response = await axios.get(
          `https://coffee-store-server-kzk1yfqrb-rashidrock558-gmailcom.vercel.app/user/${id}`
        );
        setSingleUser(response.data);
        setLoading(false); // Mark loading as complete
      } catch (err) {
        setError(err);
        setLoading(false); // Mark loading as complete even in case of an error
      }
    };
    singleUserFetch();
  }, [id]);

  const { name, email, image } = singleUser;

  const handleUpdateUser = (e) => {
    e.preventDefault();
    console.log("updating");
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const name = form.get("name");
    const image = form.get("image");
    const updatedinfoUser = { name, email, image };
    axios
      .put(
        `https://coffee-store-server-kzk1yfqrb-rashidrock558-gmailcom.vercel.app/user/${id}`,
        updatedinfoUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => console.log(res.data));
  };

  return (
    <div className="w-full max-w-md p-6 mx-auto mt-10 border rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl">Update User for {name}</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>An error occurred: {error.message}</p>
      ) : (
        <form onSubmit={handleUpdateUser}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold" htmlFor="name">
              Name:
            </label>
            <input
              className="w-full p-2 border rounded"
              type="text"
              name="name"
              defaultValue={name}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold" htmlFor="email">
              Email:
            </label>
            <input
              className="w-full p-2 border rounded"
              type="email"
              name="email"
              defaultValue={email}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold" htmlFor="image">
              Image URL:
            </label>
            <input
              className="w-full p-2 border rounded"
              type="text"
              name="image"
              defaultValue={image}
            />
          </div>
          <button
            className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
            type="submit"
          >
            Update User
          </button>
        </form>
      )}
    </div>
  );
}

export default UserEditor;

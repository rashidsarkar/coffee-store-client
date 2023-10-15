import { Link, useLocation, useNavigate } from "react-router-dom";
import { SiGoogle } from "react-icons/si"; // Import the Google icon
import { createContext, useContext } from "react";
import { AuthContext } from "../../FireBase/AuthProvider";
import swal from "sweetalert";
export const PreveLoca = createContext(null);

function Login() {
  const { loginEmPAss, googleSing, user } = useContext(AuthContext);
  const preveLocation = useLocation();
  const navigat = useNavigate();
  // console.log("login ", preveLocation);
  <PreveLoca.Provider value={preveLocation}></PreveLoca.Provider>;
  console.log(preveLocation);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    loginEmPAss(email, password)
      .then((user) => {
        swal("Success", "Login successful!", "success");

        navigat(preveLocation?.state || "/");
        console.log(user.user);
      })
      .catch((error) => {
        console.log(error.message);
        swal("Error", error.message, "error");
      });
  };
  const handleGoogleSignIn = () => {
    googleSing()
      .then((user) => {
        swal("Success", "Login successful!", "success");
        navigat(preveLocation?.state || "/");
        console.log(user.user, 1);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  console.log(user);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-700">
      <div className="p-8 bg-white rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-4 text-[#FF444A]">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:ring focus:ring-[#FF444A] focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:ring focus:ring-[#FF444A] focus:ring-opacity-50"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#FF444A] w-full text-white py-2 px-4 rounded-md hover:bg-[#FF3333] transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          <span className="text-sm text-gray-400">or</span>
        </p>
        <button
          onClick={handleGoogleSignIn}
          className="mt-4 w-full bg-[#4285F4] text-white py-2 px-4 rounded-md hover:bg-[#357AE8] transition duration-300 flex items-center justify-center"
        >
          <SiGoogle className="w-6 h-6 mr-2" /> {/* Google icon */}
          Sign In with Google
        </button>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?
          <Link to="/signup" className="text-[#FF444A] hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

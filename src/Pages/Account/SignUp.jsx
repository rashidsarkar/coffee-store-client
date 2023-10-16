import { Link, useLocation, useNavigate } from "react-router-dom";
import { SiGoogle } from "react-icons/si"; // Import the Google icon
import { FaImage } from "react-icons/fa"; // Import the image icon
import { AuthContext } from "../../FireBase/AuthProvider";
import { createContext, useContext, useEffect } from "react";
import { PreveLoca } from "./Login";
import swal from "sweetalert";
import axios from "axios";

function SignUp() {
  const { singupWithEmalPass, googleSing, user, setUser, updateProfiles } =
    useContext(AuthContext);

  const preveLocation = useLocation();

  const navigat = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    const name = form.get("name");
    const image = form.get("image");
    // Password validation criteria

    if (password.length < 6) {
      console.log("Password must be at least 6 characters.");
      swal(
        "Password Error",
        "Password must be at least 6 characters.",
        "error"
      );
    } else if (!/[A-Z]/.test(password)) {
      console.log("Password must contain at least one capital letter.");
      swal(
        "Password Error",
        "Password must contain at least one capital letter.",
        "error"
      );
    } else if (!/[!@#$%^&*()_+[\]{};':"\\|,.<>?~]/.test(password)) {
      console.log("Password must contain at least one special character.");
      swal(
        "Password Error",
        "Password must contain at least one special character.",
        "error"
      );
    } else {
      singupWithEmalPass(email, password)
        .then((currentUser) => {
          updateProfiles(name, image)
            .then(() => {
              swal("Success", "Signup successful!", "success");
              navigat(preveLocation?.state || "/");
              setUser({
                ...user,
                displayName: name,
                photoURL: image,
                email: email,
              });
              console.log(currentUser);
              const creatTime = currentUser.user.metadata.creationTime;
              const userForDB = { name, email, creatTime };
              console.log(userForDB);
              axios
                .post("http://localhost:5000/user", userForDB, {
                  headers: {
                    "Content-Type": "application/json",
                  },
                })
                .then((res) => {
                  console.log(res);
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch();

          // console.log(user.user);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const handleGoogleSignUp = () => {
    googleSing()
      .then((user) => {
        swal("Success", "Signup successful!", "success");

        navigat(preveLocation?.state || "/");
        console.log(user.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-700">
      <div className="p-8 bg-white rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-4 text-[#FF444A]">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:ring focus:ring-[#FF444A] focus:ring-opacity-50"
              required
            />
          </div>
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
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Profile Image (Link)
            </label>
            <input
              type="text"
              id="image"
              name="image"
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:ring focus:ring-[#FF444A] focus:ring-opacity-50"
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
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          <span className="text-sm text-gray-400">or</span>
        </p>
        <button
          onClick={handleGoogleSignUp}
          className="mt-4 bg-[#4285F4] w-full text-white py-2 px-4 rounded-md hover:bg-[#357AE8] transition duration-300 flex items-center justify-center"
        >
          <SiGoogle className="w-6 h-6 mr-2" /> {/* Google  */}
          Sign Up with Google
        </button>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-[#FF444A] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;

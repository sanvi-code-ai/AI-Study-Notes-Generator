import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase/firebase";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      } else {
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      }

      navigate("/");
    } catch (error) {
      console.error(error);

      if (error.code === "auth/email-already-in-use") {
        setError("This email is already registered.");
      } else if (error.code === "auth/invalid-email") {
        setError("Please enter a valid email.");
      } else if (error.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password"
      ) {
        setError("Incorrect email or password.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">

      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-purple-600 text-center mb-2">
          AI Study Notes
        </h1>

        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
          {isLogin
            ? "Welcome back! Login to continue."
            : "Create your account to get started."}
        </p>

        <form onSubmit={handleSubmit}>

          <div className="mb-5">
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-4">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading
              ? "Please wait..."
              : isLogin
              ? "Login"
              : "Create Account"}
          </button>

        </form>

        <div className="text-center mt-6">

          <p className="text-gray-500 dark:text-gray-400">
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}
          </p>

          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            className="text-purple-600 font-semibold hover:underline mt-1"
          >
            {isLogin ? "Create an account" : "Login"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default Auth;
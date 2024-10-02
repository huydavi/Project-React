import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/Slices/userSlice";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Redux dispatch function

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(
        (user: { email: string; password: string }) =>
          user.email === values.email && user.password === values.password
      );

      if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user)); // Save logged-in user data

        // Update the Redux state with the logged-in user
        dispatch(setUser({ username: user.username }));

        alert("Login successful!");
        navigate("/"); // Redirect to homepage
      } else {
        alert("Invalid email or password");
      }
    },
  });

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full p-2 border ${
              formik.touched.email && formik.errors.email
                ? "border-red-500"
                : "border-gray-300"
            } rounded`}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 mt-1">{formik.errors.email}</div>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 font-medium">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full p-2 border ${
              formik.touched.password && formik.errors.password
                ? "border-red-500"
                : "border-gray-300"
            } rounded`}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 mt-1">{formik.errors.password}</div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-2 text-white bg-blue-500 rounded transition-colors duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

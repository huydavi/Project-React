import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const initialValues: RegisterFormValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Please enter your username"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Please enter your email"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Please enter your password"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Please confirm your password"),
  });

  const handleSubmit = (values: RegisterFormValues) => {
    console.log("Form values:", values);
    // Call your API for registration here
  };

  return (
    <div className="my-12 form-container max-w-sm mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-group mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Username:
            </label>
            <Field
              name="username"
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="text-red-600 text-sm"
            />
          </div>

          <div className="form-group mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <Field
              name="email"
              type="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-600 text-sm"
            />
          </div>

          <div className="form-group mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <Field
              name="password"
              type="password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-600 text-sm"
            />
          </div>

          <div className="form-group mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password:
            </label>
            <Field
              name="confirmPassword"
              type="password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="text-red-600 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
          >
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;

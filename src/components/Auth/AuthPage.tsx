import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="max-w-md mx-auto">
      {isLogin ? <LoginForm /> : <RegisterForm />}
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="mt-4 w-full bg-gray-500 text-white p-2 rounded"
      >
        {isLogin ? "Switch to Register" : "Switch to Login"}
      </button>
    </div>
  );
};

export default AuthPage;

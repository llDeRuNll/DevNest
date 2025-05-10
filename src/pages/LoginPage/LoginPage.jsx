import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import AuthForm from "../../components/AuthForm/AuthForm";
import { userLogin } from "../../redux/auth/operations";
import ToasterSuccess from "../../components/ToasterSuccess/ToasterSuccess";
import ToasterError from "../../components/ToasterError/ToasterError";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isLoading } = useSelector((state) => state.auth);
  const initialValues = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Minimum 8 characters")
      .required("Password is required"),
  });

  const handleLogin = async (values) => {
    try {
      await dispatch(userLogin(values)).unwrap();
      ToasterSuccess();
      navigate("/transactions/income");
    } catch {
      ToasterError();
    }
  };

  useEffect(() => {
    if (error) {
      ToasterError();
    }
  }, [error]);

  return (
    <div className="container">
      <AuthForm
        fields={["email", "password"]}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
        title="Sign In"
        description="Welcome back to effortless expense tracking! Your financial dashboard awaits."
        buttonText="Sign In"
        navigationText="Don't have an account?"
        navigationLinkText="Sign Up"
        navigationLinkHref="/register"
        isLoading={isLoading}
        variant="login"
      />
    </div>
  );
};

export default LoginPage;

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import AuthForm from "../../components/AuthForm/AuthForm";
import { userLogin } from "../../redux/auth/operations";
import ToasterSuccess from "../../components/ToasterSuccess/ToasterSuccess";
import { toast } from "react-toastify";
import { GiTerror } from "react-icons/gi";

const showLoginErrorToast = () => {
  toast.error("Something went wrong, please try again", {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
    icon: <GiTerror style={{ color: "#a10000", fontSize: "20px" }} />,
    style: {
      backgroundColor: "red",
      color: "#a10000",
    },
  });
};

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isLoading } = useSelector((state) => state.auth);
  const initialValues = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email")
      .max(64, "Email must be at most 64 characters")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Minimum 8 characters")
      .max(64, "Email must be at most 64 characters")
      .required("Password is required"),
  });

  const handleLogin = async (values, actions) => {
    try {
      await dispatch(userLogin(values)).unwrap();
      ToasterSuccess();
      navigate("/transactions/expenses");
    } catch {
      showLoginErrorToast();
    } finally {
      actions.setSubmitting(false);
    }
  };


  useEffect(() => {
    if (error) {
     showLoginErrorToast();
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

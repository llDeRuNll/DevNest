import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { GiTerror } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/AuthForm/AuthForm";
import { userRegister } from "../../redux/auth/operations";
import ToasterSuccess from "../../components/ToasterSuccess/ToasterSuccess";

const showRegisterErrorToast = () => {
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
      backgroundColor: "#ffe5e5",
      color: "#a10000",
    },
  });
};

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isLoading } = useSelector((state) => state.auth);

  const initialValues = { name: "", email: "", password: "" };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Minimum 2 characters")
      .max(32, "Name must be at most 32 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email")
      .max(64, "Email must be at most 64 characters")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Minimum 8 characters")
      .max(64, "Email must be at most 64 characters")
      .required("Password is required"),
  });

  const handleRegister = async (values, actions) => {
    try {
      await dispatch(userRegister(values)).unwrap();
      ToasterSuccess();
      setTimeout(() => {
        navigate("/transactions/expenses", { replace: true });
      }, 1000); 
    } catch {
      showRegisterErrorToast();
    } finally {
      actions.setSubmitting(false);
    }
  };

  useEffect(() => {
    if (error) {
      showRegisterErrorToast();
    }
  }, [error]);

  return (
    <div className="container">
      <AuthForm
        fields={["name", "email", "password"]}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
        title="Sign Up"
        description="Step into a world of hassle-free expense management! Your journey towards financial mastery begins here."
        buttonText="Sign Up"
        navigationText="Already have an account?"
        navigationLinkText="Sign In"
        navigationLinkHref="/login"
        isLoading={isLoading}
        variant="register"
      />
    </div>
  );
};

export default RegisterPage;

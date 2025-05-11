import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import AuthForm from "../../components/AuthForm/AuthForm";
import { userRegister } from "../../redux/auth/operations";
import ToasterSuccess from "../../components/ToasterSuccess/ToasterSuccess";
import ToasterError from "../../components/ToasterError/ToasterError";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isLoading } = useSelector((state) => state.auth);
  const initialValues = { name: "", email: "", password: "" };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Minimum 8 characters")
      .required("Password is required"),
  });

  const handleRegister = async (values) => {
    try {
      await dispatch(userRegister(values)).unwrap();
      ToasterSuccess();
      navigate("/transactions/income");
    } catch {
      ToasterError()
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

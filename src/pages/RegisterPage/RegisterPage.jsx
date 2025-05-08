import AuthForm from "../../components/AuthForm/AuthForm";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const initialValues = { name: "", email: "", password: "" };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isLoading } = useSelector((state) => state.auth);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),
  });

  const handleRegister = async (values) => {
    const result = await dispatch(userRegister(values));

    if (userRegister.fulfilled.match(result)) {
      console.log("registration is sucsesfull");
      navigate("/login");
    } else {
      console.error("registration is failed:", result.payload);
    }
  };

  return (
    <div className="container">
      <AuthForm
        fields={["name", "email", "password"]}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
        title="Sign Up"
        description="Step into a world of hassle-free expense management."
        buttonText="Sign Up"
        navigationText="Already have an account?"
        navigationLinkText="Sign In"
        navigationLinkHref="/login"
        error={error}
        isLoading={isLoading}
      />
    </div>
  );
};

export default RegisterPage;

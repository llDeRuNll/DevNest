import AuthForm from "../../components/AuthForm/AuthForm";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isLoading } = useSelector((state) => state.auth);

  const initialValues = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),
  });

  const handleLogin = async (values) => {
    const result = await dispatch(userLogin(values));

    if (userLogin.fulfilled.match(result)) {
      console.log("successful login");
      navigate("/transactions/income");
    } else {
      console.error("login error", result.payload);
    }
  };

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
        error={error}
        isLoading={isLoading}
      />
    </div>
  );
};

export default LoginPage;

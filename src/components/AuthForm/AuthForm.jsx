import React from "react";
import { Formik, Form, useField } from "formik";
import { Link } from "react-router-dom";
import s from "./AuthForm.module.css";
import BgImageWrapper from "../BgImageWrapper/BgImageWrapper";

import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";

const CustomInput = ({ type = "text", ...props }) => {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = React.useState(false);

  const isError = meta.touched && meta.error;
  const isSuccess = meta.touched && !meta.error;
  const isPassword = type === "password";

  const inputClass = `${s.authInput} ${
    isError ? s.inputError : isSuccess ? s.inputSuccess : ""
  }`;

  return (
    <div className={s.inputWrapper}>
      <input
        className={inputClass}
        type={isPassword && showPassword ? "text" : type}
        {...field}
        {...props}
      />

      {isPassword && (
        <span
          className={s.iconRight}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </span>
      )}

      {!isPassword && isError && (
        <span className={s.iconRightError}>
          <AiOutlineCloseCircle />
        </span>
      )}
      {!isPassword && isSuccess && (
        <span className={s.iconRightSuccess}>
          <AiOutlineCheckCircle />
        </span>
      )}
      {isPassword && isSuccess && (
        <div className={s.successMessage}>Password is secure</div>
      )}

      {isError && <div className={s.authError}>{meta.error}</div>}
    </div>
  );
};

const AuthForm = ({
  fields = [],
  initialValues,
  validationSchema,
  onSubmit,
  title,
  description,
  buttonText,
  navigationText,
  navigationLinkText,
  navigationLinkHref,
  isLoading,
  variant = "login",
}) => {
  const buttonClass =
    variant === "register"
      ? `${s.authBtn} ${s.btnRegister}`
      : `${s.authBtn} ${s.btnLogin}`;
  return (
    <div className={s.authContainer}>
      <div className={s.authBgWrapper}>
        <BgImageWrapper className={s.authBg}/>
      </div>
      <div className={s.authFormContainer}>
        <h2 className={s.authTitle}>{title}</h2>
        <p className={s.authDescription}>{description}</p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            onSubmit(values);
            actions.setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className={s.authForm}>
              {fields.includes("name") && (
                <CustomInput name="name" placeholder="Name" />
              )}

              {fields.includes("email") && (
                <CustomInput name="email" type="email" placeholder="Email" />
              )}

              {fields.includes("password") && (
                <CustomInput
                  name="password"
                  type="password"
                  placeholder="Password"
                />
              )}

              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className={buttonClass}
              >
                {isLoading ? "Loading..." : buttonText}
              </button>
            </Form>
          )}
        </Formik>

        <p className={s.authText}>
          {navigationText}{" "}
          <Link to={navigationLinkHref} className={s.authLink}>
            {navigationLinkText}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import s from "./AuthForm.module.css";

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
  error,
  isLoading,
}) => {
  return (
    <div className={s.authContainer}>
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
              <>
                <Field name="name" placeholder="Name" className={s.authInput} />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={s.authError}
                />
              </>
            )}

            {fields.includes("email") && (
              <>
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className={s.authInput}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={s.authError}
                />
              </>
            )}

            {fields.includes("password") && (
              <>
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className={s.authInput}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={s.authError}
                />
              </>
            )}

            {error && <p className={s.authError}>{error}</p>}

            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className={s.authBtn}
            >
              {isLoading ? "Loading..." : buttonText}
            </button>
          </Form>
        )}
      </Formik>

      <p className={s.authText}>
        {navigationText}{" "}
        <a href={navigationLinkHref} className={s.authLink}>
          {navigationLinkText}
        </a>
      </p>
    </div>
  );
};

export default AuthForm;

import React from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "../CategoriesModal/CategoriesModal.module.css";

const CategorySchema = Yup.object().shape({
  categoryName: Yup.string()
    .trim()
    .min(3, "Min 3 characters")
    .max(25, "Max 25 characters")
    .required("Category name is required"),
});

const CategoryForm = ({ initialValue, isEditing, onSubmit }) => (
  <div className={styles.newCategoryContainer}>
    <h3 className={styles.newCategoryTitle}>
      {isEditing ? "Edit Category" : "New Category"}
    </h3>

    <Formik
      initialValues={{ categoryName: initialValue }}
      enableReinitialize
      validationSchema={CategorySchema}
      onSubmit={onSubmit}
    >
      <Form className={styles.newCategoryForm}>
        <Field
          type="text"
          name="categoryName"
          placeholder="Enter category name"
          className={styles.newCategoryInput}
        />
        <ErrorMessage
          name="categoryName"
          component="div"
          className={styles.error1}
        />

        <button type="submit" className={styles.submitButton}>
          {isEditing ? "Save" : "Add"}
        </button>
      </Form>
    </Formik>
  </div>
);

CategoryForm.propTypes = {
  initialValue: PropTypes.string,
  isEditing: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

CategoryForm.defaultProps = {
  initialValue: "",
};

export default CategoryForm;

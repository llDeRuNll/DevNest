import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import styles from "./CategoriesModal.module.css";
import {
  selectExpensesCategories,
  selectIncomesCategories,
} from "../../redux/category/selectors";
import {
  categoryChangeInfo,
  categoryDelete,
  categoryGetAll,
  categoryPost,
} from "../../redux/category/operations";

const categorySchema = yup.object().shape({
  categoryName: yup
    .string()
    .trim()
    .min(3, "Min 3 characters")
    .max(25, "Max 25 characters")
    .required("Category name is required"),
});

const CategoriesModal = ({ onClose, type = "expenses", onSelectCategory }) => {
  const dispatch = useDispatch();

  const expensesCategories = useSelector(selectExpensesCategories);
  const incomesCategories = useSelector(selectIncomesCategories);
  const categories =
    type === "expenses" ? expensesCategories : incomesCategories;

  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
  const [localCategories, setLocalCategories] = useState(categories);

  useEffect(() => {
    dispatch(categoryGetAll());
  }, [dispatch]);

  useEffect(() => {
    setLocalCategories(categories);
  }, [categories]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleAddOrEditCategory = async (values, { resetForm }) => {
    const trimmedName = values.categoryName.trim();

    const duplicateCategory = localCategories.find(
      (category) =>
        category.categoryName.toLowerCase() === trimmedName.toLowerCase() &&
        category._id !== editingCategoryId
    );

    if (duplicateCategory) {
      toast.error("Category name already exists");
      return;
    }

    try {
      if (editingCategoryId) {
        await dispatch(
          categoryChangeInfo({ _id: editingCategoryId, name: trimmedName })
        ).unwrap();
        toast.success("Category updated");
      } else {
        await dispatch(
          categoryPost({ categoryName: trimmedName, type })
        ).unwrap();
        toast.success("Category created");
      }

      resetForm();
      setEditingCategoryId(null);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await dispatch(categoryDelete(id)).unwrap();
      toast.success("Category deleted");
    } catch {
      toast.error("Failed to delete category");
    }
  };

  useEffect(() => {
    const updatedCategories = categories.filter(
      (category) => category._id !== editingCategoryId
    );
    setLocalCategories(updatedCategories);
  }, [categories, editingCategoryId]);

  const handleEditCategory = (category, setFieldValue) => {
    setFieldValue("categoryName", category.categoryName);
    setEditingCategoryId(category._id);
  };

  const handleCategorySelect = (category) => {
    onSelectCategory(category);
    setEditingCategoryId(null);
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") onClose();
  };

  return (
    <div
      className={styles.modalBackdrop}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className={styles.modalContent}>
        <div className={styles.closeButtonContainer}>
          <button onClick={onClose}>
            <div className={styles.icon}>x</div>
          </button>
        </div>
        <h2 className={styles.modalTitle}>
          {type === "expenses" ? "Expenses" : "Incomes"}
        </h2>

        <div className={styles.categoriesList}>
          <ul>
            {localCategories.map((category) => (
              <li
                key={category._id}
                className={styles.categoryItem}
                onMouseEnter={() => setHoveredCategoryId(category._id)}
                onMouseLeave={() => setHoveredCategoryId(null)}
              >
                <span className={styles.categoryName}>
                  {category.categoryName}
                </span>
                {hoveredCategoryId === category._id && (
                  <div className={styles.categoryActions}>
                    <button
                      onClick={() => handleCategorySelect(category)}
                      className={styles.icon}
                    >
                      Select
                    </button>
                    <Formik initialValues={{ categoryName: "" }}>
                      {({ setFieldValue }) => (
                        <button
                          onClick={() =>
                            handleEditCategory(category, setFieldValue)
                          }
                          className={styles.icon}
                        >
                          Edit
                        </button>
                      )}
                    </Formik>
                    <button
                      onClick={() => handleDeleteCategory(category._id)}
                      className={styles.icon}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.newCategoryContainer}>
          <h2 className={styles.newCategoryTitle}>
            {editingCategoryId ? "Edit Category" : "New Category"}
          </h2>
          <Formik
            initialValues={{ categoryName: "" }}
            validationSchema={categorySchema}
            onSubmit={handleAddOrEditCategory}
            enableReinitialize={true}
          >
            {({ setFieldValue }) => (
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
                  className={styles.error}
                />
                <button type="submit" className={styles.submitButton}>
                  {editingCategoryId ? "Save" : "Add"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
export default CategoriesModal;

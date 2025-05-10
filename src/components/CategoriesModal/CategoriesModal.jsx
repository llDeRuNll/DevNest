// src/components/CategoriesModal/CategoriesModal.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import styles from "./CategoriesModal.module.css";
import {
  selectExpensesCategories,
  selectIncomesCategories,
} from "../../redux/category/selectors";
import {
  categoryGetAll,
  categoryPost,
  categoryChangeInfo,
  categoryDelete,
} from "../../redux/category/operations";

const categorySchema = Yup.object().shape({
  categoryName: Yup.string()
    .trim()
    .min(3, "Min 3 characters")
    .max(25, "Max 25 characters")
    .required("Category name is required"),
});

const CategoriesModal = ({ onClose, type = "expenses", onSelectCategory }) => {
  const dispatch = useDispatch();

  // Вибираємо відповідні категорії з Redux
  const rawCategories =
    useSelector(
      type === "expenses" ? selectExpensesCategories : selectIncomesCategories
    ) ?? [];

  const [editingCategory, setEditingCategory] = useState(null);

  // Підтягуємо списки на старті
  useEffect(() => {
    dispatch(categoryGetAll());
  }, [dispatch]);

  // Закриття по Esc
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Ініціали форми залежать від режиму (Add vs Edit)
  const initialValues = {
    categoryName: editingCategory ? editingCategory.categoryName : "",
  };

  const handleAddOrEdit = async (values, { resetForm }) => {
    const name = values.categoryName.trim();
    try {
      if (editingCategory) {
        await dispatch(
          categoryChangeInfo({ _id: editingCategory._id, name })
        ).unwrap();
        toast.success("Category updated");
      } else {
        await dispatch(categoryPost({ categoryName: name, type })).unwrap();
        toast.success("Category added");
      }
      resetForm();
      setEditingCategory(null);
      // Підтягуємо свіжі дані
      dispatch(categoryGetAll());
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(categoryDelete(id)).unwrap();
      toast.success("Category deleted");
      dispatch(categoryGetAll());
    } catch {
      toast.error("Failed to delete category");
    }
  };

  const handleEditClick = (cat) => {
    setEditingCategory(cat);
  };

  const handleSelect = (cat) => {
    onSelectCategory(cat);
    onClose();
  };

  return (
    <div
      className={styles.modalBackdrop}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.modalContent}>
        <div className={styles.closeButtonContainer}>
          <button onClick={onClose}>
            <div className={styles.icon}>×</div>
          </button>
        </div>

        <h2 className={styles.modalTitle}>
          {type === "expenses" ? "Expenses" : "Incomes"} Categories
        </h2>

        <ul className={styles.categoriesList}>
          {rawCategories.length === 0 ? (
            <li className={styles.emptyMessage}>No categories yet.</li>
          ) : (
            rawCategories.map((cat) => (
              <li key={cat._id} className={styles.categoryItem}>
                <span className={styles.categoryName}>{cat.categoryName}</span>
                <div className={styles.categoryActions}>
                  <button
                    onClick={() => handleSelect(cat)}
                    className={styles.icon}
                  >
                    Select
                  </button>
                  <button
                    onClick={() => handleEditClick(cat)}
                    className={styles.icon}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className={styles.icon}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>

        <div className={styles.newCategoryContainer}>
          <h3 className={styles.newCategoryTitle}>
            {editingCategory ? "Edit Category" : "New Category"}
          </h3>

          <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={categorySchema}
            onSubmit={handleAddOrEdit}
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
                className={styles.error}
              />

              <button type="submit" className={styles.submitButton}>
                {editingCategory ? "Save" : "Add"}
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CategoriesModal;

import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import CategoryList from "./CategoryList";
import CategoryForm from "./CategoryForm";

const CategoriesModal = ({ onClose, type = "expenses", onSelectCategory }) => {
  const dispatch = useDispatch();
  const rawCategories =
    useSelector(
      type === "expenses" ? selectExpensesCategories : selectIncomesCategories
    ) ?? [];
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    dispatch(categoryGetAll());
  }, [dispatch]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleAddOrEdit = useCallback(
    async (values, { resetForm }) => {
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
      } catch (err) {
        toast.error(err.message || "Something went wrong");
      }
    },
    [dispatch, editingCategory, type]
  );

  const handleDelete = useCallback(
    async (id) => {
      try {
        await dispatch(categoryDelete(id)).unwrap();
        toast.success("Category deleted");
      } catch {
        toast.error("Failed to delete category");
      }
    },
    [dispatch]
  );

  const handleEdit = useCallback((cat) => setEditingCategory(cat), []);
  const handleSelect = useCallback(
    (cat) => {
      onSelectCategory(cat);
      onClose();
    },
    [onSelectCategory, onClose]
  );

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

        <CategoryList
          categories={rawCategories}
          onSelect={handleSelect}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <CategoryForm
          initialValue={editingCategory ? editingCategory.categoryName : ""}
          isEditing={!!editingCategory}
          onSubmit={handleAddOrEdit}
        />
      </div>
    </div>
  );
};

export default CategoriesModal;

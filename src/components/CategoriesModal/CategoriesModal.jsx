import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
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
import CategoryForm from "../CategoryForm/CategoryForm";
import CategoryList from "../CategoryList/CategoryList";

const CategoriesModal = ({ onClose, type = "expenses", onSelectCategory }) => {
  const dispatch = useDispatch();
  const rawCategories =
    useSelector(
      type === "expenses" ? selectExpensesCategories : selectIncomesCategories
    ) ?? [];
  const [editingCategory, setEditingCategory] = useState(null);

  // Fetch categories on mount
  useEffect(() => {
    dispatch(categoryGetAll());
  }, [dispatch]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Add or edit category
  const handleAddOrEdit = useCallback(
    async (values, { resetForm }) => {
      const name = values.categoryName.trim();
      try {
        if (editingCategory) {
          await dispatch(
            categoryChangeInfo({ _id: editingCategory._id, name })
          ).unwrap();
          toast.success("Категорію оновлено");
        } else {
          await dispatch(categoryPost({ categoryName: name, type })).unwrap();
          toast.success("Категорію додано");
        }
        resetForm();
        setEditingCategory(null);
      } catch (err) {
        toast.error(err.message || "Щось пішло не так");
      }
    },
    [dispatch, editingCategory, type]
  );

  // Delete category
  const handleDelete = useCallback(
    async (_id) => {
      try {
        await dispatch(categoryDelete(_id)).unwrap();
        toast.success("Категорію видалено");
      } catch {
        toast.error("Не вдалося видалити категорію");
      }
    },
    [dispatch]
  );

  // Start editing
  const handleEdit = useCallback((cat) => setEditingCategory(cat), []);

  // Select category and close modal
  const handleSelect = useCallback(
    (cat) => {
      onSelectCategory(cat);
      onClose();
    },
    [onSelectCategory, onClose]
  );

  const modalContent = (
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
          {type === "expenses" ? "Expenses" : "Incomes"}
        </h2>

        <CategoryList
          categories={rawCategories}
          onSelect={handleSelect}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <CategoryForm
          initialValue={editingCategory?.categoryName || ""}
          isEditing={!!editingCategory}
          onSubmit={handleAddOrEdit}
        />
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default CategoriesModal;

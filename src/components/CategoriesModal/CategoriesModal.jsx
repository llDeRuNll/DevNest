import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { IoMdClose } from "react-icons/io";

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
import ToasterError from "../ToasterError/ToasterError";
import ToasterSuccess from "../ToasterSuccess/ToasterSuccess";
import styles from "./CategoriesModal.module.css";

const CategoriesModal = ({
  onClose,
  type = "expenses",
  onSelectCategory,
  selectedCategoryId,
}) => {
  const dispatch = useDispatch();
  const rawCategories =
    useSelector(
      type === "expenses" ? selectExpensesCategories : selectIncomesCategories
    ) ?? [];

  const [editingCategory, setEditingCategory] = useState(null);

  // Завантажити всі категорії при монтуванні
  useEffect(() => {
    dispatch(categoryGetAll());
  }, [dispatch]);

  // Закрити модалку по Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Додавання або редагування категорії
  const handleAddOrEdit = useCallback(
    async (values, { resetForm }) => {
      const name = values.categoryName.trim();
      try {
        if (editingCategory) {
          await dispatch(
            categoryChangeInfo({ _id: editingCategory._id, name })
          ).unwrap();
        } else {
          await dispatch(categoryPost({ categoryName: name, type })).unwrap();
        }
        ToasterSuccess();
        resetForm();
        setEditingCategory(null);
        // Поновити список категорій
        dispatch(categoryGetAll());
      } catch {
        ToasterError();
      }
    },
    [dispatch, editingCategory, type]
  );

  // Видалення категорії
  const handleDelete = useCallback(
    async (_id) => {
      try {
        await dispatch(categoryDelete(_id)).unwrap();
        ToasterSuccess();

        // Якщо видалена категорія була вибраною в батьківській формі — очищаємо вибір
        if (_id === selectedCategoryId) {
          onSelectCategory(null);
        }

        // Якщо видалена категорія була у стані редагування — скидаємо форму редагування
        if (editingCategory?._id === _id) {
          setEditingCategory(null);
        }

        // Поновити список категорій у UI без перезавантаження сторінки
        dispatch(categoryGetAll());
      } catch {
        ToasterError();
      }
    },
    [dispatch, selectedCategoryId, onSelectCategory, editingCategory]
  );

  const handleEdit = useCallback((cat) => setEditingCategory(cat), []);
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
          <button onClick={onClose} aria-label="Close">
            <IoMdClose size={24} />
          </button>
        </div>

        <h2 className={styles.modalTitle}>
          {type === "expenses" ? "Expenses" : "Incomes"}
        </h2>
        <p className={styles.subtitle}>All Categories</p>

        <CategoryList
          categories={rawCategories}
          onSelect={handleSelect}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <CategoryForm
          key={editingCategory?._id ?? "new"}
          initialValue={editingCategory?.categoryName || ""}
          isEditing={Boolean(editingCategory)}
          onSubmit={handleAddOrEdit}
        />
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default CategoriesModal;

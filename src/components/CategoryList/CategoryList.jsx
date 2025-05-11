// components/CategoriesModal/CategoryList.jsx
import React from "react";
import PropTypes from "prop-types";
import CategoryItem from "./CategoryItem";
import styles from "./CategoriesModal.module.css";

const CategoryList = ({ categories, onSelect, onEdit, onDelete }) => (
  <ul className={styles.categoriesList}>
    {categories.length === 0 ? (
      <li className={styles.emptyMessage}>No categories yet.</li>
    ) : (
      categories.map((cat) => (
        <CategoryItem
          key={cat._id}
          cat={cat}
          onSelect={onSelect}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))
    )}
  </ul>
);

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelect: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default React.memo(CategoryList);

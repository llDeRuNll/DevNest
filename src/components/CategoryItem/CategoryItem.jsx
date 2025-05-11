import React from "react";
import PropTypes from "prop-types";
import styles from "../CategoriesModal/CategoriesModal.module.css";
const CategoryItem = React.memo(({ cat, onSelect, onEdit, onDelete }) => (
  <li className={styles.categoryItem}>
    <span className={styles.categoryName}>{cat.categoryName}</span>
    <div className={styles.categoryActions}>
      <button onClick={() => onSelect(cat)} className={styles.icon}>
        Select
      </button>
      <button onClick={() => onEdit(cat)} className={styles.icon}>
        Edit
      </button>
      <button onClick={() => onDelete(cat._id)} className={styles.icon}>
        Delete
      </button>
    </div>
  </li>
));

CategoryItem.propTypes = {
  cat: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CategoryItem;

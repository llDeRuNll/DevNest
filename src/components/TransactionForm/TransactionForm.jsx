import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import { MdOutlineDateRange } from "react-icons/md";
import { LuClock4 } from "react-icons/lu";

import s from "./TransactionForm.module.css";
import {
  transactionChangeInfo,
  transactionPost,
} from "../../redux/transactions/operations";
import CategoriesModal from "../CategoriesModal/CategoriesModal";

const validationSchema = Yup.object({
  type: Yup.string()
    .oneOf(["incomes", "expenses"])
    .required("Type is required"),
  date: Yup.date().nullable().required("Date is required"),
  time: Yup.date().nullable().required("Time is required"),
  category: Yup.string().required("Category is required"),
  sum: Yup.number()
    .required("Sum is required")
    .moreThan(0, "Sum must be greater than zero")
    .max(1000000, "Sum must be less than or equal to 1,000,000"),
  comment: Yup.string()
    .trim()
    .max(300, "Max 300 characters")
    .required("Comment is required"),
});

const TransactionForm = ({
  transaction,
  onClose = () => {},
  isModal = false,
  defaultType = "expenses",
}) => {
  const dispatch = useDispatch();
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [selectedCategoryName, setSelectedCategoryName] = useState("");

  const incomeCategories = useSelector((s) => s.category.incomes);
  const expenseCategories = useSelector((s) => s.category.expenses);

  const initialValues = transaction
    ? {
        type: transaction.type,
        date: new Date(transaction.date),
        time: new Date(`1970-01-01T${transaction.time}:00`),
        category: transaction.category,
        sum: transaction.sum,
        comment: transaction.comment,
      }
    : {
        type: defaultType,
        date: null,
        time: null,
        category: "",
        sum: "",
        comment: "",
      };

  useEffect(() => {
    if (transaction?.category) {
      const list =
        transaction.type === "incomes" ? incomeCategories : expenseCategories;
      const found = list.find((c) => c._id === transaction.category);
      if (found) setSelectedCategoryName(found.categoryName);
    }
  }, [transaction, incomeCategories, expenseCategories]);

  const handleSubmit = async (values, { resetForm }) => {
    const data = {
      type: values.type,
      date: values.date.toISOString().slice(0, 10),
      time: values.time.toTimeString().slice(0, 5),
      category: values.category,
      sum: parseFloat(values.sum),
      comment: values.comment.trim(),
    };
    try {
      if (transaction) {
        await dispatch(
          transactionChangeInfo({
            _id: transaction._id,
            type: values.type,
            ...data,
          })
        ).unwrap();
        toast.success("Transaction successfully updated!");
      } else {
        await dispatch(transactionPost(data)).unwrap();
        toast.success("Transaction successfully added!");
      }
      resetForm();
      setSelectedCategoryName("");
      onClose();
    } catch (err) {
      toast.error(err.message || "Something went wrong, please try again");
    }
  };

  const formContent = (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form className={isModal ? s.editForm : s.addForm}>
          <div className={s.tRadioGroup}>
            {["expenses", "incomes"].map((t) => (
              <label key={t} className={s.tRadioLabel}>
                <Field
                  type="radio"
                  name="type"
                  value={t}
                  className={s.tRadioBtn}
                />
                {t === "expenses" ? "Expense" : "Income"}
              </label>
            ))}
            <ErrorMessage name="type" component="div" className={s.tError} />
          </div>

          <div className={s.dateSection}>
            <div className={s.dateSectionWrappDate}>
              <MdOutlineDateRange className={s.icon} color="#fafafa" />
              <label className={s.tLabel}>Date</label>
              <DatePicker
                selected={values.date}
                onChange={(v) => setFieldValue("date", v)}
                dateFormat="yyyy-MM-dd"
                placeholderText="YYYY-MM-DD"
                className={s.tInput}
              />
              <ErrorMessage name="date" component="div" className={s.tError} />
            </div>
            <div className={s.dateSectionWrappTime}>
              <LuClock4 className={s.icon} color="#fafafa" />
              <label className={s.tLabel}>Time</label>
              <DatePicker
                selected={values.time}
                onChange={(v) => setFieldValue("time", v)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="HH:mm"
                placeholderText="HH:mm"
                className={s.tInput}
              />
              <ErrorMessage name="time" component="div" className={s.tError} />
            </div>
          </div>

          <div className={s.tInputGroup}>
            <label className={s.tLabel}>Category</label>
            <input
              name="category"
              readOnly
              placeholder="Select category"
              value={selectedCategoryName}
              className={s.tInput}
              onClick={() => setIsCategoryModalOpen(true)}
            />
            <ErrorMessage
              name="category"
              component="div"
              className={s.tError}
            />
          </div>

          <div className={s.tInputGroup}>
            <label className={s.tLabel}>Sum</label>
            <div className={s.tInputWrapper}>
              <Field
                type="number"
                name="sum"
                placeholder="Enter sum"
                className={s.tInput}
              />
              <span className={s.tCurrency}>UAH</span>
            </div>
            <ErrorMessage name="sum" component="div" className={s.tError} />
          </div>

          <div className={s.tInputGroup}>
            <label className={s.tLabel}>Comment</label>
            <Field
              as="textarea"
              name="comment"
              placeholder="Enter comment"
              className={s.tTextarea}
            />
            <ErrorMessage name="comment" component="div" className={s.tError} />
          </div>

          <button type="submit" disabled={isSubmitting} className={s.tSendBtn}>
            {transaction ? "Edit" : "Add"}
          </button>

          {isCategoryModalOpen && (
            <CategoriesModal
              type={values.type}
              onClose={() => setIsCategoryModalOpen(false)}
              onSelectCategory={(cat) => {
                setFieldValue("category", cat._id);
                setSelectedCategoryName(cat.categoryName);
                setIsCategoryModalOpen(false);
              }}
            />
          )}
        </Form>
      )}
    </Formik>
  );

  if (!isModal) return formContent;

  return (
    <div className={s.backdrop} onClick={onClose}>
      <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
        {formContent}
      </div>
    </div>
  );
};

export default TransactionForm;

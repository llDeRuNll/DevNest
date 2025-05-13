import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker, { registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { MdOutlineDateRange } from "react-icons/md";
import { LuClock4 } from "react-icons/lu";

import s from "./TransactionForm.module.css";
import {
  transactionChangeInfo,
  transactionPost,
} from "../../redux/transactions/operations";
import CategoriesModal from "../CategoriesModal/CategoriesModal";

registerLocale("en-GB", enGB);

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
  const navigate = useNavigate();
  const params = useParams();

  const userCurrency =
    useSelector((state) => state.auth.user.currency) || "uah";
  const displayCurrency = userCurrency.toUpperCase();

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [selectedCategoryName, setSelectedCategoryName] = useState("");

  const incomeCategories = useSelector((state) => state.category.incomes);
  const expenseCategories = useSelector((state) => state.category.expenses);

  const initialType = transaction
    ? transaction.type
    : params.type || defaultType;

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
        type: initialType,
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

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form className={isModal ? s["edit-form"] : s["add-form"]}>
          {/* Radio buttons disabled when in modal */}
          <div className={s["t-radio-group"]}>
            {[
              { key: "expenses", label: "Expense" },
              { key: "incomes", label: "Income" },
            ].map(({ key, label }) => (
              <label key={key} className={s["t-radio-label"]}>
                <input
                  type="radio"
                  name="type"
                  value={key}
                  checked={values.type === key}
                  onChange={() => {
                    setFieldValue("type", key);
                    navigate(`/transactions/${key}`);
                  }}
                  className={s["t-radio-btn"]}
                  disabled={isModal}
                />
                {label}
              </label>
            ))}
            <ErrorMessage
              name="type"
              component="div"
              className={s["t-error"]}
            />
          </div>

          {/* Date & Time pickers */}
          <div className={s["date-section"]}>
            <div className={s.dateSectionWrappDate}>
              <MdOutlineDateRange className={s.icon} size={16} />
              <label className={s["t-label"]}>Date</label>
              <DatePicker
                locale="en-GB"
                selected={values.date}
                onChange={(v) => setFieldValue("date", v)}
                dateFormat="yyyy-MM-dd"
                placeholderText="YYYY-MM-DD"
                className={s["t-input"]}
                calendarClassName={s["greenCalendar"]}
                disabled={isModal}
              />
              <ErrorMessage
                name="date"
                component="div"
                className={s["t-error"]}
              />
            </div>
            <div className={s.dateSectionWrappTime}>
              <LuClock4 className={s.icon} size={16} />
              <label className={s["t-label"]}>Time</label>
              <DatePicker
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                selected={values.time}
                onChange={(v) => setFieldValue("time", v)}
                dateFormat="HH:mm"
                placeholderText="00:00"
                className={s["t-input"]}
                calendarClassName={s["greenCalendar"]}
                disabled={isModal}
                style={{ color: "#ffffff" }}
              />
              <ErrorMessage
                name="time"
                component="div"
                className={s["t-error"]}
              />
            </div>
          </div>

          {/* Category selector */}
          <div className={s["t-input-group"]}>
            <label className={s["t-label"]}>Category</label>
            <input
              name="category"
              readOnly
              placeholder="Select category"
              value={selectedCategoryName}
              className={s["t-input"]}
              onClick={() => !isModal && setIsCategoryModalOpen(true)}
              disabled={isModal}
            />
            <ErrorMessage
              name="category"
              component="div"
              className={s["t-error"]}
            />
          </div>

          {/* Sum input */}
          <div className={s["t-input-group"]}>
            <label className={s["t-label"]}>Sum</label>
            <div className={s["t-input-wrapper"]}>
              <Field
                type="number"
                name="sum"
                placeholder="Enter sum"
                className={s["t-input"]}
                disabled={isModal}
              />
              <span className={s["t-currency"]}>{displayCurrency}</span>
            </div>
            <ErrorMessage name="sum" component="div" className={s["t-error"]} />
          </div>

          {/* Comment textarea */}
          <div className={s["t-input-group"]}>
            <label className={s["t-label"]}>Comment</label>
            <Field
              as="textarea"
              name="comment"
              placeholder="Enter comment"
              className={s["t-textarea"]}
              disabled={isModal}
            />
            <ErrorMessage
              name="comment"
              component="div"
              className={s["t-error"]}
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={s["t-send-btn"]}
          >
            {transaction ? "Edit" : "Add"}
          </button>

          {/* Categories modal */}
          {isCategoryModalOpen && (
            <CategoriesModal
              type={values.type}
              selectedCategoryId={values.category}
              onClose={() => setIsCategoryModalOpen(false)}
              onSelectCategory={(cat) => {
                if (cat) {
                  setFieldValue("category", cat._id);
                  setSelectedCategoryName(cat.categoryName);
                } else {
                  setFieldValue("category", "");
                  setSelectedCategoryName("");
                }
                setIsCategoryModalOpen(false);
              }}
            />
          )}
        </Form>
      )}
    </Formik>
  );
};

export default TransactionForm;

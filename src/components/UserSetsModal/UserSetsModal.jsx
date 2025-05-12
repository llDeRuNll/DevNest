import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LuUser } from "react-icons/lu";
import toast from "react-hot-toast";
import s from "./UserSetsModal.module.css";
import {
  userAvatarChange,
  userAvatarDelete,
  userInfoUpdate,
} from "../../redux/auth/operations";
import CurrencySelect from "../CurrencySelect/CurrencySelect";

function UserSetsModal({ onClose }) {
  const dispatch = useDispatch();
  const {
    avatarUrl,
    name: currentName,
    currency: currentCurrency,
  } = useSelector((state) => state.auth.user);

  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(avatarUrl);
  const [avatarFile, setAvatarFile] = useState(null);
  const [name, setName] = useState(currentName || "");
  const [currency, setCurrency] = useState(currentCurrency || "uah");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setPreview(avatarUrl || null);
    setName(currentName || "");
    setCurrency(currentCurrency || "uah");
  }, [avatarUrl, currentName, currentCurrency]);

  useEffect(() => {
    return () => {
      if (preview && preview !== avatarUrl) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview, avatarUrl]);

  const handleUploadClick = () => fileInputRef.current.click();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size exceeds 5 MB.");
        return;
      }
      if (preview && preview !== avatarUrl) {
        URL.revokeObjectURL(preview);
      }
      setAvatarFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemove = async () => {
    try {
      await dispatch(userAvatarDelete()).unwrap();
      setPreview(null);
      setAvatarFile(null);
      fileInputRef.current.value = "";
      toast.success("Avatar successfully deleted!");
    } catch (error) {
      toast.error(error, "Error deleting avatar.");
    }
  };

  const hasChanges =
    name !== (currentName || "") ||
    currency !== (currentCurrency || "uah") ||
    avatarFile !== null ||
    (preview === null && avatarUrl !== null);

  const handleClose = () => {
    if (hasChanges && !window.confirm("Discard unsaved changes?")) {
      return;
    }
    if (preview && preview !== avatarUrl) {
      URL.revokeObjectURL(preview);
    }
    onClose();
  };

  const handleSave = async () => {
    if (!navigator.onLine) {
      toast.error("No internet connection.");
      return;
    }
    setIsSaving(true);
    try {
      if (
        name !== (currentName || "") ||
        currency !== (currentCurrency || "uah")
      ) {
        await dispatch(userInfoUpdate({ name, currency })).unwrap();
      }

      if (avatarFile) {
        const formData = new FormData();
        formData.append("avatar", avatarFile);
        await dispatch(userAvatarChange(formData)).unwrap();
        setAvatarFile(null);
        fileInputRef.current.value = "";
      }
      if (preview && preview !== avatarUrl) {
        URL.revokeObjectURL(preview);
      }
      onClose();
      toast.success("Profile successfully updated!");
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={s.overlay} onClick={handleClose}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={s.closeBtn}
          onClick={handleClose}
          aria-label="Close modal"
          onKeyDown={(e) => e.key === "Enter" && handleClose()}
        >
          ✕
        </button>
        <p className={s.title}>Profile settings</p>

        <div className={s.avatarSection}>
          <div className={s.avatarCircle}>
            {preview ? (
              <img src={preview} alt="Avatar" className={s.avatarImg} />
            ) : (
              <span className={s.avatarIcon}>
                <LuUser />
              </span>
            )}
          </div>
          <div className={s.avatarBtns}>
            <button className={s.grayBtn} onClick={handleUploadClick}>
              Upload new photo
            </button>
            <button className={s.grayBtn} onClick={handleRemove}>
              Remove
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
              aria-label="Upload avatar"
            />
          </div>
        </div>

        <div className={s.formGroup}>
          <CurrencySelect value={currency} onChange={setCurrency} />
          <input
            type="text"
            className={s.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            aria-label="Your name"
          />
        </div>

        <button
          className={s.saveBtn}
          onClick={handleSave}
          disabled={isSaving || !hasChanges}
          aria-label="Save profile changes"
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}

export default UserSetsModal;

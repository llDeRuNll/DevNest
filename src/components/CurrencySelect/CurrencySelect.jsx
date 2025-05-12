import React, { useState, useRef, useEffect } from "react";
import s from "./CurrencySelect.module.css";

const currencies = ["UAH", "USD", "EUR"];

function CurrencySelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (cur) => {
    onChange(cur.toLowerCase());
    setOpen(false);
  };

  return (
    <div className={s.dropdownWrapper} ref={ref}>
      <div className={s.selected} onClick={() => setOpen(!open)}>
        {value.toUpperCase()} <span className={s.arrow}>▾</span>
      </div>
      {open && (
        <ul className={s.dropdownList}>
          {currencies.map((cur) => (
            <li
              key={cur}
              className={`${s.dropdownItem} ${
                value.toUpperCase() === cur ? s.active : ""
              }`}
              onClick={() => handleSelect(cur)}
            >
              {cur}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CurrencySelect;

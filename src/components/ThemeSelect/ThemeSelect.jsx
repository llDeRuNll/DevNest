import React, { useState, useRef, useEffect } from 'react'
import s from './ThemeSelect.module.css'

const themes = ['dark', 'blue']

function ThemeSelect({ value, onChange, disabled }) {
	const [open, setOpen] = useState(false)
	const ref = useRef(null)

	useEffect(() => {
		const handleClickOutside = e => {
			if (ref.current && !ref.current.contains(e.target)) {
				setOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	const handleSelect = theme => {
		if (!disabled) {
			onChange(theme)
			setOpen(false)
		}
	}

	return (
		<div className={s.selectorWrapper} ref={ref}>
			<div
				className={`${s.selectorSelected} ${
					disabled ? s.selectorDisabled : ''
				}`}
				onClick={() => !disabled && setOpen(!open)}
			>
				{value.charAt(0).toUpperCase() + value.slice(1)}
				<span className={s.selectorArrow}>▾</span>
			</div>
			{open && (
				<ul className={s.selectorList}>
					{themes.map(theme => (
						<li
							key={theme}
							className={`${s.selectorItem} ${
								value === theme ? s.selectorActive : ''
							}`}
							onClick={() => handleSelect(theme)}
						>
							{theme.charAt(0).toUpperCase() + theme.slice(1)}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default ThemeSelect

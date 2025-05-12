import { LuUser } from 'react-icons/lu'
import { CiLogout } from 'react-icons/ci'
import s from './UserPanel.module.css'
import { userLogout } from '../../redux/auth/operations'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { IoIosArrowUp } from 'react-icons/io'
import { TfiArrowCircleDown } from 'react-icons/tfi'
import { IoColorPaletteOutline } from 'react-icons/io5'
import { useUserContext } from '../../utils/UserContext/useUserContext'

function UserPanel({ onProfileClick }) {
	const { userSelect, setTheme } = useUserContext()
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleLogout = async () => {
		try {
			await dispatch(userLogout()).unwrap()
			navigate('/')
			toast.success('You have successfully logged out!')
		} catch (error) {
			toast.error(error, 'Error logging out.')
		}
	}

	const handleThemeChange = theme => {
		setTheme(theme)
		document.body.setAttribute('data-theme', theme)
	}

	return (
		<div className={s.dropdownMenu}>
			<div>
				<button
					className={s.bthnIcon}
					onClick={onProfileClick}
					aria-label='Open profile settings'
				>
					<LuUser className={s.icon} />
					Profile settings
				</button>
			</div>
			<div className={s.selectorWrapper}>
				<label className={s.selectorTitle} htmlFor='theme-switcher'>
					<IoColorPaletteOutline className={s.icon} size={18} />
				</label>
				<select
					className={s.selector}
					name='themeSwitcher'
					id='theme-switcher'
					onChange={e => handleThemeChange(e.target.value)}
					value={userSelect}
				>
					<option className={s.selectorItem} value='dark'>
						Dark
					</option>
					<option className={s.selectorItem} value='blue'>
						Blue
					</option>
					<option className={s.selectorItem} value='red'>
						Red
					</option>
					<option className={s.selectorItem} value='orange'>
						Orange
					</option>
					<option className={s.selectorItem} value='green'>
						Green
					</option>
				</select>
				<TfiArrowCircleDown className={s.selectorIcon} />
			</div>
			<div>
				<button
					className={s.bthnIcon}
					onClick={handleLogout}
					aria-label='Log out'
				>
					<CiLogout className={s.icon} />
					Log out
				</button>
			</div>
		</div>
	)
}

export default UserPanel

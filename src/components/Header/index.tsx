import { useAuth } from '@/providers/AuthProvider'
import Logo from '../Logo'
import { signOut } from '@/firebase/auth'
import styles from './styles.module.css'
import { useState } from 'react'
import classNames from 'classnames'
import useClickOutside from '@/utils/useClickOutside'

const Header = () => {
  // Services
  const { currentUser } = useAuth()

  // Local state
  const [isDropdownOpen, setDropdown] = useState<boolean>(false)

  // Dropdown controllers
  const toggleDropdown = () => setDropdown(!isDropdownOpen)
  const closeDropdown = () => setDropdown(false)

  // Refs
  const dropdownRef = useClickOutside<HTMLDivElement>(closeDropdown)

  return (
    <header className={styles.header}>
      <Logo height={30} />

      <div className={styles.account}>
        <button className={styles.avatarBtn} onClick={toggleDropdown}>
          <img
            data-ignore-click-outside
            src={currentUser?.photoURL ?? '/avatar.png'}
            className={classNames(styles.avatar, { [styles.openAvatar]: isDropdownOpen })}
            alt="User avatar"
          />
        </button>

        <div ref={dropdownRef} className={classNames(styles.dropdown, { [styles.open]: isDropdownOpen })}>
          <button onClick={signOut} className="sm regular">
            Dark mode
          </button>
          <button onClick={signOut} className="sm regular">
            Sign out
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

import { useAuth } from '@/providers/AuthProvider'
import Logo from '../Logo'
import { signOut } from '@/firebase/auth'
import styles from './styles.module.css'
import { useState } from 'react'
import classNames from 'classnames'
import useClickOutside from '@/utils/useClickOutside'
import DarkModeSelector from '../DarkModeSelector'
import SettingsPopup from '../SettingsPopup'
import BMIStatus from '../BMIStatus'

const Header = () => {
  // Services
  const { currentUser } = useAuth()

  // Local state
  const [isDropdownOpen, setDropdown] = useState<boolean>(false)
  const [isSettingsOpen, setSettings] = useState<boolean>(false)

  // Dropdown controllers
  const toggleDropdown = () => setDropdown(!isDropdownOpen)
  const closeDropdown = () => setDropdown(false)

  // Settings popup controllers
  const openSettings = () => setSettings(true)
  const closeSettings = () => setSettings(false)

  // Refs
  const dropdownRef = useClickOutside<HTMLDivElement>(closeDropdown)

  /**
   * Close dropdown and open settings
   */
  const openSettingsPopup = () => {
    closeDropdown()
    openSettings()
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Logo height={30} />
      </div>

      <BMIStatus />

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
          <button onClick={openSettingsPopup} className="sm regular">
            Settings
          </button>
          <button onClick={signOut} className="sm regular">
            Sign out
          </button>
          <hr />
          <DarkModeSelector />
        </div>
      </div>

      <SettingsPopup isOpen={isSettingsOpen} close={closeSettings} />
    </header>
  )
}

export default Header

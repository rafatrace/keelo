import classNames from 'classnames'
import styles from './styles.module.css'
import useClickOutside from '@/utils/useClickOutside'
import Icon from '../Icon'
import { ChangeEvent, FormEvent } from 'react'
import { useAuth } from '@/providers/AuthProvider'
import { createSettings, updateSettings } from '@/queries/settings'
import { toast } from 'sonner'
import { useTheme } from '@/providers/ThemeProvider'

type TSettingsPopupProps = {
  isOpen: boolean
  close: () => void
}

const SettingsPopup = ({ isOpen, close }: TSettingsPopupProps) => {
  // Services
  const { currentUser, settingsId, age, setAge, height, setHeight, gender, setGender } = useAuth()
  const { theme } = useTheme()

  // Refs
  const containerRef = useClickOutside<HTMLDivElement>(close)

  /**
   * Handle height change
   */
  const hangleHeight = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    const regex = /^\d*$/

    if (regex.test(val)) {
      setHeight(val)
    }
  }

  /**
   * Handle age change
   */
  const handleAge = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    const regex = /^\d*$/

    if (regex.test(val)) {
      setAge(val)
    }
  }

  /**
   * Save settings changes on database
   */
  const saveChanges = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (settingsId == null) {
      await createSettings({
        userId: currentUser.uid,
        height: parseInt(height),
        age: parseInt(age),
        gender,
        darkMode: theme === 'dark'
      })
    } else {
      await updateSettings(settingsId, {
        height: parseInt(height),
        age: parseInt(age),
        gender
      })
    }

    toast.success('Settings successfully saved!')
  }

  return (
    <div className={classNames(styles.popupWrapper, { [styles.open]: isOpen })}>
      <div ref={containerRef} className={classNames(styles.popupContainer, { [styles.open]: isOpen })}>
        <h2 className="lg bold n70">Settings</h2>
        <p className="sm regular n70">Here you can change your goals and settings for the app.</p>
        <form className={styles.formWrapper} onSubmit={saveChanges}>
          <h3 className="md bold n70">BMI</h3>
          <p className="sm regular n70">Set your details so that we can calculate your BMI.</p>
          <div className={styles.inputs}>
            <div className={styles.group}>
              <label className="sm regular n70">Height</label>
              <input type="text" value={height} onChange={hangleHeight} style={{ maxWidth: '80px' }} />
              <span className="sm regular n60">cm</span>
            </div>
            <div className={styles.group}>
              <label className="sm regular n70">Age</label>
              <input type="text" value={age} onChange={handleAge} style={{ maxWidth: '60px' }} />
            </div>
            <div className={styles.group}>
              <label className="sm regular n70">Gender</label>
              <div className={styles.select} style={{ maxWidth: '140px' }}>
                <select value={gender} onChange={(e) => setGender(e.target.value as 'male' | 'female')}>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
                <Icon type="chevron-down" size={16} color="n60" />
              </div>
            </div>
          </div>
          <div className={styles.footer}>
            <button className="btn btn-black">Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SettingsPopup

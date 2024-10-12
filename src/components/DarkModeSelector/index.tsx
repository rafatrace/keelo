import styles from './styles.module.css'
import Icon from '../Icon'
import { useTheme } from '@/providers/ThemeProvider'
import classNames from 'classnames'

const DarkModeSelector = () => {
  // Services
  const { theme, toggleTheme } = useTheme()

  return (
    <div className={styles.container}>
      <Icon type="moon" size={16} color="n60" />
      <span className="sm regular">Dark mode</span>
      <div onClick={toggleTheme} className={classNames(styles.switch, { [styles.active]: theme === 'dark' })}>
        <div className={styles.indicator}></div>
      </div>
    </div>
  )
}

export default DarkModeSelector

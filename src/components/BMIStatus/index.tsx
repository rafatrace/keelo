import { useWeights } from '@/providers/WeightsProvider'
import styles from './styles.module.css'
import classNames from 'classnames'
import { useAuth } from '@/providers/AuthProvider'

const BMIStatus = () => {
  // Services
  let { height } = useAuth()
  const { weights } = useWeights()

  if (height == null || weights?.[0] == null) return null

  const weight = weights[0].value
  height = height / 100 // convert to meters
  const bmiValue = Math.round((weight / (height * height)) * 10) / 10 // calculate using the BMI formula

  // Get correct level
  let level = 'normal'
  if (bmiValue < 16) {
    level = 'severe-thinness'
  } else if (bmiValue >= 16 && bmiValue <= 17) {
    level = 'moderate-thinness'
  } else if (bmiValue > 17 && bmiValue <= 18.5) {
    level = 'mild-thinness'
  } else if (bmiValue > 18.5 && bmiValue <= 25) {
    level = 'normal'
  } else if (bmiValue > 25 && bmiValue <= 30) {
    level = 'overweight'
  } else if (bmiValue > 30 && bmiValue <= 35) {
    level = 'obese1'
  } else if (bmiValue > 35 && bmiValue <= 40) {
    level = 'obese2'
  } else if (bmiValue > 40) {
    level = 'obese3'
  }

  return (
    <div className={classNames(styles.container, styles[level])}>
      <span className="sm medium">BMI: {bmiValue}</span>
    </div>
  )
}

export default BMIStatus

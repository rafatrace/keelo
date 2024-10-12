import { NameType, Payload, ValueType } from 'recharts/types/component/DefaultTooltipContent'
import styles from './styles.module.css'

type TCustomTooltipProps = {
  active: boolean
  payload: Payload<ValueType, NameType>[]
}

const CustomTooltip = ({ active, payload }: TCustomTooltipProps) => {
  if (active && payload && payload.length) {
    const content = payload[0].payload

    return (
      <div className={styles.tooltip}>
        <p className="sm bold">
          {content.name}: <span className="regular">{content.Weight}kg</span>
        </p>
      </div>
    )
  }

  return null
}

export default CustomTooltip

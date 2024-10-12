import { convertDateToReadableText } from '@/utils/dates'
import styles from './styles.module.css'
import { TWeight } from '@/queries/weights'
import classNames from 'classnames'

type TWeightTableProps = {
  data: TWeight[]
}

const WeightTable = ({ data }: TWeightTableProps) => {
  // Weights
  const weights = data.slice().reverse()

  /**
   * Get difference between weight and previous weight
   */
  const getDiff = (index: number): number => {
    const prevWeight = weights[index + 1]
    const weight = weights[index]

    if (prevWeight == null || weight === null) {
      return 0
    }

    const diff = prevWeight.value - weight.value
    return Math.round(diff * 10) / 10
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th align="left">Weight</th>
            <th align="left">Date</th>
            <th align="right">Diff</th>
          </tr>
        </thead>
        <tbody>
          {weights.map((weight, index) => {
            const diff = getDiff(index)

            return (
              <tr key={weight.id}>
                <td align="left">
                  <span className="sm medium">{weight.value}</span> kg
                </td>
                <td align="left">
                  <span className="sm regular">{convertDateToReadableText(weight.date)}</span>
                </td>
                <td
                  align="right"
                  className={classNames(['sm', 'regular', { [styles.good]: diff < 0 }, { [styles.bad]: diff > 0 }])}
                >
                  {diff === 0 ? '' : diff < 0 ? `${diff}` : `+${diff}`}
                  {diff !== 0 ? ' kg' : ''}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default WeightTable

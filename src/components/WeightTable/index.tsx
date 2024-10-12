import { convertDateToReadableText } from '@/utils/dates'
import styles from './styles.module.css'
import { deleteWeight, TWeight } from '@/queries/weights'
import classNames from 'classnames'
import Icon from '../Icon'

type TWeightTableProps = {
  data: TWeight[]
  fetchAllWeights: () => void
}

const WeightTable = ({ data, fetchAllWeights }: TWeightTableProps) => {
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

    const diff = weight.value - prevWeight.value
    return Math.round(diff * 10) / 10
  }

  /**
   * Delete weight
   */
  const confirmAndDelete = (id: string) => {
    return async () => {
      const confirm = window.confirm('Are you sure you want to remove this weight?')
      if (confirm) {
        await deleteWeight(id)
        fetchAllWeights()
      }
    }
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
                  <div className={styles.name}>
                    <span>
                      <span className="sm medium">{weight.value}</span> kg
                    </span>
                    <button className={styles.trash} onClick={confirmAndDelete(weight.id)}>
                      <Icon type="trash" size={16} color="n60" />
                    </button>
                  </div>
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

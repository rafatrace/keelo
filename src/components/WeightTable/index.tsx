import { convertDateToReadableText } from '@/utils/dates'
import styles from './styles.module.css'
import { deleteWeight } from '@/queries/weights'
import Icon from '../Icon'
import classNames from 'classnames'
import { useWeights } from '@/providers/WeightsProvider'

const WeightTable = () => {
  // Services
  const { weights: data, fetchWeights } = useWeights()

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
        fetchWeights()
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
                      <span className="sm medium">{weight.value}</span>kg
                    </span>
                    <button className={styles.trash} onClick={confirmAndDelete(weight.id)}>
                      <Icon type="trash" size={16} color="n60" />
                    </button>
                  </div>
                </td>
                <td align="left">
                  <span className="xs regular">{convertDateToReadableText(weight.date)}</span>
                </td>
                <td align="right">
                  <div className={classNames('xs', 'regular', styles.diff)}>
                    {diff === 0 ? '' : diff < 0 ? `${diff}` : `+${diff}`}
                    {diff !== 0 ? ' kg' : ''}
                    {diff !== 0 ? <Icon type="circle-filled" size={12} color={diff < 0 ? 'good' : 'bad'} /> : null}
                  </div>
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

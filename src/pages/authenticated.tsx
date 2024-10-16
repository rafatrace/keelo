import Form from '@/components/Form'
import Header from '@/components/Header'
import { convertDateToDotFormat } from '@/utils/dates'
import WeightChart from '@/components/WeightChart'
import WeightTable from '@/components/WeightTable'
import { useWeights } from '@/providers/WeightsProvider'

const Authenticated = () => {
  // Services
  const { weights } = useWeights()

  return (
    <main>
      <Header />
      <Form />

      {weights.length > 0 ? (
        <>
          <WeightChart
            data={weights.map((w) => {
              return { name: convertDateToDotFormat(w.date), Weight: w.value }
            })}
          />
          <WeightTable />
        </>
      ) : null}
    </main>
  )
}

export default Authenticated

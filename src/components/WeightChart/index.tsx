import { Area, AreaChart, CartesianGrid, Tooltip, YAxis } from 'recharts'
import styles from './styles.module.css'
import CustomTooltip from './CustomTooltip'

type TWeightChartProps = {
  data: { name: string; Weight: number }[]
}

const WeightChart = ({ data }: TWeightChartProps) => {
  // Get max and min values
  const weights = data.map((d) => d.Weight)
  const max = Math.max(...weights)
  const min = Math.min(...weights)

  // Calculate domain
  const domain = [min - 0.5, max + 0.5]

  // Get ticks
  const minIntValue = Math.ceil(min)
  let ticks = []
  for (let i = minIntValue; i <= max + 1; i++) {
    ticks.push(i)
  }

  if (ticks.length > 6 && ticks.length < 15) {
    ticks = ticks.filter((t) => t % 2 === 0)
  } else if (ticks.length >= 15) {
    ticks = ticks.filter((t) => t % 4 === 0)
  }

  return (
    <div className={styles.chartContainer}>
      <AreaChart width={495} height={300} data={data}>
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3880f6" stopOpacity={0.5} />
            <stop offset="95%" stopColor="#3880f6" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--n40)" />
        <YAxis
          ticks={ticks.slice()}
          axisLine={false}
          tickLine={false}
          fontSize={12}
          stroke="var(--n60)"
          domain={domain}
          width={30}
          tickMargin={6}
        />
        <Tooltip content={({ active, payload }) => <CustomTooltip active={active} payload={payload} />} />
        <Area type="monotone" dataKey="Weight" stroke="#3880f6" strokeWidth={2} fillOpacity={1} fill="url(#gradient)" />
      </AreaChart>
    </div>
  )
}

export default WeightChart

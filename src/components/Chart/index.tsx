import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

type TLineChartProps = {
  labels: string[]
  values: number[]
}

const LineChart = ({ labels, values }: TLineChartProps) => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Weight',
        data: values,
        borderColor: 'black',
        tension: 0.05
      }
    ]
  }

  // Chart options
  const options = {
    responsive: true
  }

  return <Line data={data} options={options} />
}

export default LineChart

import { TColors } from '@/components/Icon'
import { SVGProps } from 'react'

type Props = {
  size: number
  color: TColors
}

const ChevronDown = ({ size, color }: Props) => {
  const stroke: SVGProps<SVGPathElement> = {
    stroke: `var(--${color})`,
    strokeWidth: '1.5',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }

  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.5 8.25L11 13.75L16.5 8.25" {...stroke} />
    </svg>
  )
}

export default ChevronDown

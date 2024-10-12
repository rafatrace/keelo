import { TColors } from '@/components/Icon'
import { SVGProps } from 'react'

type Props = {
  size: number
  color: TColors
}

const CircleFilled = ({ size, color }: Props) => {
  const stroke: SVGProps<SVGPathElement> = {
    fill: `var(--${color})`,
    stroke: `var(--${color})`,
    strokeWidth: '1.5',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }

  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.7865 18.276C14.8365 18.276 18.1198 14.9928 18.1198 10.9427C18.1198 6.89262 14.8365 3.60938 10.7865 3.60938C6.73637 3.60938 3.45312 6.89262 3.45312 10.9427C3.45312 14.9928 6.73637 18.276 10.7865 18.276Z"
        {...stroke}
      />
    </svg>
  )
}

export default CircleFilled

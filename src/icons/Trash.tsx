import { TColors } from '@/components/Icon'
import { SVGProps } from 'react'

type Props = {
  size: number
  color: TColors
}

const Trash = ({ size, color }: Props) => {
  const stroke: SVGProps<SVGPathElement> = {
    stroke: `var(--${color})`,
    strokeWidth: '1.5',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }

  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.75 5.5H4.58333H19.25" {...stroke} />
      <path
        d="M17.4168 5.49967V18.333C17.4168 18.8192 17.2237 19.2856 16.8799 19.6294C16.536 19.9732 16.0697 20.1663 15.5835 20.1663H6.41683C5.9306 20.1663 5.46428 19.9732 5.12047 19.6294C4.77665 19.2856 4.5835 18.8192 4.5835 18.333V5.49967M7.3335 5.49967V3.66634C7.3335 3.18011 7.52665 2.7138 7.87047 2.36998C8.21428 2.02616 8.6806 1.83301 9.16683 1.83301H12.8335C13.3197 1.83301 13.786 2.02616 14.1299 2.36998C14.4737 2.7138 14.6668 3.18011 14.6668 3.66634V5.49967"
        {...stroke}
      />
      <path d="M9.1665 10.083V15.583" {...stroke} />
      <path d="M12.8335 10.083V15.583" {...stroke} />
    </svg>
  )
}

export default Trash

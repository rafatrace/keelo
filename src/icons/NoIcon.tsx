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
      <path
        d="M17.4167 2.75H4.58333C3.57081 2.75 2.75 3.57081 2.75 4.58333V17.4167C2.75 18.4292 3.57081 19.25 4.58333 19.25H17.4167C18.4292 19.25 19.25 18.4292 19.25 17.4167V4.58333C19.25 3.57081 18.4292 2.75 17.4167 2.75Z"
        {...stroke}
      />
      <path
        d="M8.33252 8.25003C8.54803 7.6374 8.97341 7.1208 9.53331 6.79174C10.0932 6.46268 10.7515 6.34239 11.3916 6.45219C12.0317 6.56198 12.6123 6.89476 13.0305 7.3916C13.4487 7.88844 13.6777 8.51726 13.6767 9.1667C13.6767 11 10.9267 11.9167 10.9267 11.9167"
        {...stroke}
      />
      <path d="M11 15.583H11.01" {...stroke} />
    </svg>
  )
}

export default Trash

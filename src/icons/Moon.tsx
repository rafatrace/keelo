import { TColors } from '@/components/Icon'
import { SVGProps } from 'react'

type Props = {
  size: number
  color: TColors
}

const Moon = ({ size, color }: Props) => {
  const stroke: SVGProps<SVGPathElement> = {
    stroke: `var(--${color})`,
    strokeWidth: '1.5',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }

  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19.2502 11.7242C19.106 13.2845 18.5204 14.7715 17.5619 16.0112C16.6034 17.2509 15.3117 18.192 13.8379 18.7243C12.3641 19.2567 10.7691 19.3583 9.2397 19.0173C7.71025 18.6762 6.30957 17.9067 5.20153 16.7986C4.09349 15.6906 3.32393 14.2899 2.9829 12.7605C2.64187 11.231 2.74348 9.63608 3.27583 8.16227C3.80817 6.68847 4.74925 5.39675 5.98893 4.43827C7.22862 3.47979 8.71563 2.8942 10.276 2.75C9.36245 3.98591 8.92285 5.50866 9.03714 7.0413C9.15143 8.57393 9.81203 10.0146 10.8988 11.1014C11.9855 12.1881 13.4262 12.8487 14.9589 12.963C16.4915 13.0773 18.0142 12.6377 19.2502 11.7242Z"
        {...stroke}
      />
    </svg>
  )
}

export default Moon

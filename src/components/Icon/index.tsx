import { CircleFilled, Moon, NoIcon, Trash } from '@/icons'

type TIconProps = {
  type: TIconTypes
  size?: number
  color?: TColors
}

const Icon = ({ type, size, color }: TIconProps) => {
  // Defaults
  const defaults = {
    size: size ?? 22,
    color: color ?? 'bad'
  }

  // Select icon by type
  switch (type) {
    case 'circle-filled':
      return <CircleFilled {...defaults} />
    case 'moon':
      return <Moon {...defaults} />
    case 'trash':
      return <Trash {...defaults} />
    default:
      return <NoIcon {...defaults} />
  }
}

export default Icon

export type TIconTypes = 'circle-filled' | 'moon' | 'trash'

export type TColors = 'n10' | 'n20' | 'n30' | 'n40' | 'n60' | 'n70' | 'n80' | 'bad' | 'good'

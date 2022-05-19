import { Link } from "react-router-dom"

type Props = {
  size?: number
}

export default function SpinnerAvatar({ size = 48 }: Props) {

  return (
    <Link to={'/'}>
    <div
      style={{width:size, height:size}}
      className='avatar spinner'
    />
  </Link>
  )
}
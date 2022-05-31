import React, { Dispatch } from 'react'
import { IVideos } from '../../../interfaces'

type Props = {
  v: IVideos,
  index : number
  videoFocus: number
  setVideoFocus: Dispatch<number>
}

export default function SmallVideoCard({v, index, videoFocus, setVideoFocus}: Props) {
  return (
    <div className='small__videocard' style={index === videoFocus ? {backgroundColor:"#ccc"}:{}}>
      <img src={v.imgUrl} alt={v.vid} onClick={()=>{setVideoFocus(index)}}/>
      <h5>{v.title}</h5>
    </div>
  )
}
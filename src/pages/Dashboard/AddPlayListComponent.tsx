import React from 'react'
import useToggle from '../../hooks/useToggle'
import AddIcon from '../../icons/AddIcon'

type Props = {}

export default function AddPlayListComponent({ }: Props) {

  const { value, toggleValue } = useToggle(false)
  
  return (
    <>
      {value && <div className="dashboard__playlist__modal__wrapper">
        <div className="dashboard__playlist__modal">
          <form onSubmit={(e)=>{e.preventDefault()}}>
            <legend>Agrega una nueva playlist</legend>
            <input
              type="text"
              placeholder="nombre del playlist"
              onChange={() => { }}
              value={""}
              className="dashboard__playlist__input__name"
            />
            <textarea
              placeholder="descripción"
              onChange={() => { }}
              value={""}
              className="dashboard__playlist__input__descripcion"
            />
            <input
              type="file"
              placeholder="imagen"
              onChange={() => { }}
              value={""}
              className="dashboard__playlist__input__imagen"
            />
            <input type="submit" value="Añadir" className="buscar__boton" />
            <button onClick={() => { toggleValue(true) }}>Cerrar</button>
          </form>
        </div>
      </div>
      }
      <button className='dashboard__playlist__btn' onClick={() => { toggleValue(false) }} ><AddIcon /></button>
    </>
  )
}
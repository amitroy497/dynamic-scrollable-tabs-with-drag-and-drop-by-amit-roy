import React, { forwardRef } from 'react'
import './index.css'

const ChildTab = (
  {
    onMouseEnter,
    onMouseLeave,
    isHovering,
    item,
    cName,
    onDragStart,
    draggable,
    id,
  },
  ref
) => {
  return (
    <div
      className={`${cName}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={ref}
      onDragStart={onDragStart}
      draggable={draggable}
      id={id}
      title='Drag Tab'
    >
      Tab{id}{' '}
      {isHovering && (
        <button className='hoverX' onClick={() => item(id)} title='Delete Tab'>
          x
        </button>
      )}
    </div>
  )
}

export default forwardRef(ChildTab)

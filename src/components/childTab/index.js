import React, { forwardRef } from 'react'
import './index.css'

const ChildTab = (
  { onMouseEnter, onMouseLeave, tab, isHovering, item, cName },
  ref
) => {
  return (
    <div
      className={`${cName}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={ref}
    >
      Tab{tab}{' '}
      {isHovering && (
        <button className='hoverX' onClick={() => item(tab)}>
          x
        </button>
      )}
    </div>
  )
}

export default forwardRef(ChildTab)

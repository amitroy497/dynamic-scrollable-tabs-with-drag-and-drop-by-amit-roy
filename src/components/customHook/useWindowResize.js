import { useState, useLayoutEffect } from 'react'

export const useWindowResize = (getMenuWrapperSize) => {
  const [menuSize, setMenuSize] = useState()
  useLayoutEffect(() => {
    function updateSize() {
      setMenuSize(getMenuWrapperSize())
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [getMenuWrapperSize])
  return menuSize
}

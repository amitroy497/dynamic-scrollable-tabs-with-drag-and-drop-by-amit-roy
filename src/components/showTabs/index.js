import React, { useState, useRef, useEffect } from 'react'
import './index.css'
import ChildTab from '../childTab'
import { useWindowResize } from '../customHook/useWindowResize'

const ShowTabs = ({ count }) => {
  const [tabs, setTabs] = useState([1, 2, 3])
  const [isHovered, setIsHovered] = useState({})
  const [leftFlag, setLeftFlag] = useState()
  const [rightFlag, setRightFlag] = useState()
  const [tabLength, setTabLength] = useState()
  const dynamicRef = useRef('')
  const dynamicTabMenuRef = useRef('')
  const dynamicTabRef = useRef('')

  let arrowMargin = 15

  const getMenuWrapperSize = () => {
    return dynamicRef.current.offsetWidth
  }

  const menuWrapperSize = useWindowResize(getMenuWrapperSize)

  const getMenuPosition = () => {
    return dynamicTabMenuRef.current.scrollLeft
  }
  const getMenuSize = () => {
    return tabLength * 151
  }
  let menuSize = getMenuSize()

  const handleScroll = () => {
    let menuInvisibleSize = menuSize - menuWrapperSize
    let menuEndOffset = menuInvisibleSize - arrowMargin

    let menuPosition = getMenuPosition()
    if (menuPosition <= arrowMargin) {
      setLeftFlag(false)
      setRightFlag(true)
    } else if (menuPosition < menuEndOffset) {
      setLeftFlag(true)
      setRightFlag(true)
    } else if (menuPosition > menuEndOffset) {
      setLeftFlag(true)
      setRightFlag(false)
    }
  }

  const scroll = (scrollOffset) => {
    dynamicTabMenuRef.current.scrollLeft += scrollOffset
  }

  const addTabs = () => {
    let presentCount = tabs.length
    let newCount = presentCount + count
    let i
    let arr = []
    for (i = presentCount; i <= newCount; ++i) {
      if (tabs.indexOf(i) === -1) {
        arr.push(i)
      }
    }
    setTabs(tabs.concat(arr))
    handleScroll()
  }

  const handleMouseEnter = (index) => {
    setIsHovered((prev) => {
      return { ...prev.isHovered, [index]: true }
    })
  }

  const handleMouseLeave = (index) => {
    setIsHovered((prev) => {
      return { ...prev.isHovered, [index]: false }
    })
  }

  const deleteData = (val) => {
    if (tabLength > 1) {
      let arr = [...tabs]
      const index = arr.indexOf(val)
      if (index > -1) {
        arr.splice(index, 1)
      }
      setTabs([...arr])
    }
  }
  useEffect(() => {
    let tabLen = document.querySelectorAll('.tab').length
    setTabLength(tabLen)
  }, [tabs])
  return (
    <article className='mainMenuWrapper'>
      <section className='tabMenuSection' ref={dynamicRef}>
        <div className='arrowWrapper'>
          {leftFlag ? (
            <button className='leftArrow' onClick={() => scroll(-20)}></button>
          ) : null}
        </div>
        <nav
          className='tabMenu'
          ref={dynamicTabMenuRef}
          onScroll={handleScroll}
        >
          {tabs.map((index) => (
            <ChildTab
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              tab={index}
              isHovering={isHovered[index]}
              item={deleteData}
              cName='tab'
              ref={dynamicTabRef}
            />
          ))}
        </nav>
        <div className='arrowWrapper'>
          {rightFlag ? (
            <button className='rightArrow' onClick={() => scroll(20)}></button>
          ) : null}
        </div>
      </section>
      <button className='addButton' onClick={addTabs}>
        +
      </button>
    </article>
  )
}

export default ShowTabs

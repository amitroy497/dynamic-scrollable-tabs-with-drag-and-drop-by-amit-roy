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
  const [dragIndex, setDragIndex] = useState(1)
  const [prevActive, setPrevActive] = useState(1)
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
    console.log(prevActive)
    if (prevActive) {
      document.getElementById(prevActive).style.borderBottom =
        '4px solid #2ca2ff'
    }

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
    if (val === parseInt(prevActive)) {
      setPrevActive(null)
    }
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

  const handleDragStart = (e) => {
    if (prevActive) {
      document.getElementById(prevActive).style.border = 'none'
      document.getElementById(prevActive).style.color = 'gray'
    }

    e.dataTransfer.setData('text/plain', e.target.id)
    e.currentTarget.style.borderBottom = '4px solid #2ca2ff'
    e.currentTarget.style.color = '#000'
    setPrevActive(e.target.id)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    const data = e.dataTransfer.getData('text')
    setDragIndex(data)
    e.dataTransfer.clearData()
  }
  return (
    <React.Fragment>
      <article className='mainMenuWrapper'>
        <section className='tabMenuSection' ref={dynamicRef}>
          <div className='arrowWrapper'>
            {leftFlag ? (
              <button
                className='leftArrow'
                onClick={() => scroll(-20)}
                title='Left'
              ></button>
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
                isHovering={isHovered[index]}
                item={deleteData}
                cName='tab'
                ref={dynamicTabRef}
                draggable='true'
                id={index}
                onDragStart={(e) => handleDragStart(e)}
              />
            ))}
          </nav>
          <div className='arrowWrapper'>
            {rightFlag ? (
              <button
                className='rightArrow'
                onClick={() => scroll(20)}
                title='Right'
              ></button>
            ) : null}
          </div>
        </section>
        <button className='addButton' onClick={addTabs} title='Add Tabs'>
          +
        </button>
      </article>
      <article
        className='dropContainer'
        onDragOver={(e) => handleDragOver(e)}
        onDrop={(e) => handleDrop(e)}
        title='Drop Tab Here'
      >
        <section className='dropSection'>Tab {dragIndex} contents</section>
      </article>
    </React.Fragment>
  )
}

export default ShowTabs

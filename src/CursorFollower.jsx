import { useEffect, useRef } from 'react'

export default function CursorFollower() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const hasMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!hasMouse || reduceMotion) return

    const dot = dotRef.current
    const ring = ringRef.current

    let mouseX = -100
    let mouseY = -100
    let ringX = -100
    let ringY = -100
    let frame = 0

    function onMove(e) {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`
      dot.style.opacity = '1'
      ring.style.opacity = '1'

      const overClickable =
        e.target.closest && e.target.closest('a, button, input, select, [role="button"]')
      ring.classList.toggle('active', Boolean(overClickable))
    }

    function onLeave() {
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }

    function tick() {
      ringX += (mouseX - ringX) * 0.15
      ringY += (mouseY - ringY) * 0.15
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`
      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    frame = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  )
}

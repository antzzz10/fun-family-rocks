import { useState, useEffect } from 'react'

export function FunFactsBanner({ rockTypes }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  // Filter out rock types without fun facts
  const factsAvailable = rockTypes.filter(rt => rt.fun_fact)

  useEffect(() => {
    if (factsAvailable.length === 0) return

    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % factsAvailable.length)
        setIsVisible(true)
      }, 300) // Short fade out before changing
    }, 8000) // Change every 8 seconds

    return () => clearInterval(interval)
  }, [factsAvailable.length])

  if (factsAvailable.length === 0) return null

  const currentFact = factsAvailable[currentIndex]

  return (
    <div className="fun-facts-banner">
      <div className={`banner-content ${isVisible ? 'visible' : 'hidden'}`}>
        <div className="banner-icon">💎</div>
        <div className="banner-text">
          <strong>{currentFact.type_name}:</strong> {currentFact.fun_fact}
        </div>
        <div className="banner-counter">
          {currentIndex + 1} / {factsAvailable.length}
        </div>
      </div>
    </div>
  )
}

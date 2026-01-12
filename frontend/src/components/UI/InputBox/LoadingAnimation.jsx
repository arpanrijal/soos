import React from 'react'

const LoadingAnimation = () => {
  return (
    <div className="flex items-center justify-center gap-1">
      <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
      <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
      <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></span>
    </div>
  )
}

export default LoadingAnimation
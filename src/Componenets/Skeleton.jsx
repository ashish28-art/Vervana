import React from 'react'

const Skeleton = () => {
  return (
    <div className="w-[250px] h-[380px] rounded-2xl shadow-md p-3 flex flex-col animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-56 bg-gray-200 rounded-lg" />

      {/* Text skeleton */}
      <div className="flex flex-col gap-3 mt-4">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
      </div>
    </div>
  )
}

export default Skeleton

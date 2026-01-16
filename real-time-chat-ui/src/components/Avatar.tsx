import React from 'react'

export default function Avatar({ name, size = 40 }: { name: string; size?: number }) {
  const initials = name
    .split(' ')
    .map((s) => s[0])
    .slice(0, 2)
    .join('')

  const bg = 'bg-indigo-500'

  return (
    <div
      className={`${bg} text-white rounded-full flex items-center justify-center font-semibold`} 
      style={{ width: size, height: size }}
      aria-hidden
    >
      {initials}
    </div>
  )
}

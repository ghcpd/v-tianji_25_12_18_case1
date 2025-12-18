import React from 'react'

export default function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="p-3">
      <input
        className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="Search conversations or messages"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search"
      />
    </div>
  )
}

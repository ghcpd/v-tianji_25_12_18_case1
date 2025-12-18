import React from 'react'

export default function SearchBar({value, onChange, placeholder='Search'}){
  return (
    <div className="search" data-testid="search">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{opacity:0.9}}>
        <path d="M21 21l-4.35-4.35" stroke="#bfcfe0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="11" cy="11" r="6" stroke="#bfcfe0" strokeWidth="1.5" />
      </svg>
      <input className="input" placeholder={placeholder} value={value} onChange={e=>onChange(e.target.value)} data-testid="search-input" />
    </div>
  )
}

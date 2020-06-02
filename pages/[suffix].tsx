import React, { useEffect } from 'react'
import Router from 'next/router'

export default function SuffixPage() {
  useEffect(() => {
    window.location.replace("https://ryanthe.com")
  })
  return <div></div>
}
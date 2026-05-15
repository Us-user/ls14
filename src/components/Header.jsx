import React, { useState } from 'react'
import LeftNav from './LeftNav'
import Main from './Main'

export default function Header() {
    const api='https://6915d6e5465a9144626dca39.mockapi.io/1/todo'
  return (
    <header className='flex'>
        <LeftNav/>
        <Main/>
    </header>
  )
}

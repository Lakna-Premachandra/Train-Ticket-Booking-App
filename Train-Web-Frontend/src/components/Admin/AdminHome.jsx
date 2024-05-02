import React from 'react'
import AdminNav from './AdminNav'

export default function AdminHome() {
  return (
    <>
      <AdminNav/>
      <div className="container max-w-6xl m-auto flex justify-center">
        <img className='rounded shadow w-[700px] border-[1px] border-zinc-300' src="src/assets/images/adminImage.png" alt="" />
      </div>
    </>
  )
}

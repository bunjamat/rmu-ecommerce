import SigninButton from '@/components/signin-button'
import React from 'react'


const HomePage = () => {
// สิ่งที่เขียนในนี้จะถูก render ออกมาบนหน้าเว็บ


  // ส่วนของการ return ค่าออกมา
  return (
    <div className='text-center'>
      <h1 className='text-3xl font-bold text-red-500 hover:text-blue-500'>ยินดีต้อนรับสู่เว็บขายของออนไลน์</h1>
      <p className='text-xl py-3'>This is my first Next.js project</p>
      <p className='text-lg font-bold py-5'>สร้างโดย ธงชัย บรรจมาตย์</p>
      <SigninButton />
    </div>
  
  )

}

// ส่วนนี้จำเป็นต้องมี มันเป็นการ export ออกไปเพื่อนำไปใช้งาน
export default HomePage
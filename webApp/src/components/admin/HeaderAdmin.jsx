import React from 'react'
import { PawPrint } from 'lucide-react'

const HeaderAdmin = () => {
  return (
    <header className='bg-white h-16 flex items-center justify-between px-6 shadow-md'>
      {/* ชื่อ Admin */}
      <div className='text-2xl font-bold flex items-center gap-2'>
        CAT FIRE HOME <PawPrint size={24} />
      </div>
    </header>
  )
}

export default HeaderAdmin

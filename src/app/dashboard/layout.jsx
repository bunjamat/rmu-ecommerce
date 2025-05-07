import DashboardLayout from '@/layout/dashboard-layout'
import React from 'react'

const Layout = ({ children }) => {
  return (
    <DashboardLayout>{children}</DashboardLayout>
  )
}

export default Layout
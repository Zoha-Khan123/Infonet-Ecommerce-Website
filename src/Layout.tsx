import {Outlet} from 'react-router'
import Navbar from './components/navbar/navbar'
import Footer from './components/footer/footer'
import AuthContext from './components/auth-context/auth-context'


const Layout = () => {
  return (
    <div>
      <AuthContext>
      <Navbar />
      <Outlet />
      <Footer />
      </AuthContext>
    </div>
  )
}

export default Layout


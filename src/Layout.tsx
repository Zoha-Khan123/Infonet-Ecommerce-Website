import {Outlet} from 'react-router'
import Navbar from './components/navbar/navbar'
import Footer from './components/footer/footer'
import AuthContext from './components/auth-context/auth-context'
import CartContext from './components/cart-context/cart-context'


const Layout = () => {
  return (
    <div>
      <CartContext>
      <AuthContext>
      <Navbar />
      <Outlet />
      <Footer />
      </AuthContext>
      </CartContext>
    </div>
  )
}

export default Layout


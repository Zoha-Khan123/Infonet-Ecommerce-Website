import { Link } from 'react-router-dom'
import './home.css'

const Home = () => {
  return (
    <div className='home'>
        <div className='left-side'>
            <h1>Welcome to our E-commerce website</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum quo aspernatur, corporis illo quaerat ut velit voluptas porro sapiente necessitatibus.</p>
            <Link to="/products" className='show-more-btn'>Show More</Link>
        </div>
        <div className='right-side'>
            <img src="/ecommerce.png" alt="" />
        </div>
    </div>
  )
}

export default Home
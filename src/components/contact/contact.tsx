import './contact.css'

const Contact = () => {
  return (
    <div className='contact'>
    <div className='left-side'>
      <h1>Contact Us</h1>
      <div className='input-container'>
       <div >
       <label htmlFor="name">Name:</label>
       <input type="text" id="name" placeholder='Enter a name'/>
       </div>
       <div>
      <label htmlFor="email" id="email">Email</label>
       <input type="email" placeholder='Enter an email'/>
       </div>
       <div>
        <label htmlFor="message">Message:</label>
       <textarea placeholder='Enter a message'></textarea>
       </div>
       <button className='contact-button'>Submit</button>
       </div>
    </div>
    <div className='right-side'>
        <img src="/ecommerce.png" alt="" />
    </div>
</div>
  )
}

export default Contact
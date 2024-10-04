import { Link } from 'react-router-dom'
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa'
import { useSelector } from 'react-redux'

function Home() {
  const {user
} = useSelector((state) => state.auth)
  return (
    <>
       {
        user ? 
            <h2> Welcome Back {user.name}</h2>
   : null}
          <section className="heading">
              <h1>What do you need help with</h1>
              <p>Please choose from an option below</p>
          </section>
          <Link to='/new-ticket' className='btn btn-reverse btn-block'>
          <FaQuestionCircle/ > Create New Ticket</Link>
          <Link to='/tickets' className='btn btn-block'>
          <FaTicketAlt/ > View My Tickets</Link>
    </>
  )
}

export default Home
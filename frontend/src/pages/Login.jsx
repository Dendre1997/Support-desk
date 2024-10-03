import { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import {login, reset} from '../features/auth/authSlice'
import { FaSignInAlt } from 'react-icons/fa'
import Spinner from '../components/Spinner'

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()
     const {user, isLoading, isSuccess, isError, message} = useSelector(state => state.auth)
    const { email, password } = formData
    useEffect(() => {
        if (isError) { 
            toast.error(message)
        }
        if (isSuccess && user) {
            navigate('/')
        }
        dispatch(reset())
    }, [isError, isSuccess, user, message, dispatch, navigate])

    
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]:  e.target.value,

        }))
    }
    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password,
        }

        dispatch(login(userData))
        


        
    }
    if (isLoading) { 
        return <Spinner/>
    }
  return (
      <>
          <section className="heading">
              <h1><FaSignInAlt />Login</h1>
              <p>Please log in to get support</p>
          </section>
          <section className="form">
              <form onSubmit={onSubmit}>
                  <div className="form-group">
                      <input type="email" className="form-control" id='email' name='email' value={email} onChange={onChange} placeholder='Enter your email' required />
                  </div>
                  <div className="form-group">
                      <input type="password" className="form-control" id='password' name='password' value={password} onChange={onChange} placeholder='Enter password' required />
                  </div>
                  <div className="form-group">
                      <button className="btn btn-block">
                          Login
                      </button>
                  </div>
              </form>
          </section>
    </>
  )
}

export default Login
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


export default function SignIn() {
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const handleChange = (e) =>{
    setFormData({
        ...formData,
        [e.target.id]:e.target.value,
    });
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post('/api/auth/signin',formData);
      if(res.data.success===false){
        setLoading(false);
        setError(res.data.message);
        return;
      }
      toast.success('Login Successfully', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      setTimeout(()=>{
        setLoading(false)
        setError(null)
        navigate('/')
      },3000)
    } catch (error) {
      setLoading(false);
      setError(error.response.data);
      toast.error(error.response.data, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  }
  return (
     <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} action="" className='flex flex-col gap-4'>
        <input type="text" placeholder='Username' className='border p-3 rounded-lg' onChange={handleChange} id='username'  />
        <input type="password" placeholder='Password' className='border p-3 rounded-lg' onChange={handleChange} id='password'  />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80' disabled={loading}>Sign in</button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don't have an account?</p>
        <Link to='/sign-up' className='text-blue-700'>Sign Up</Link>
      </div>
      <ToastContainer />
    </div>
  )
}

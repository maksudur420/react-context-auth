import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { authContext } from "./AuthProvider";

const Login = () => {
    const [data, setData] =useState({email:'',password:''});
    const {signInUser,signInWithGoogle} =useContext(authContext)
    const Navigate =useNavigate()

    const handleChangeData =(e)=>{
        const {name,value} =e.target;


        setData({
            ...data,
            [name]:value
        })
    }

    const handleSubmit =(e)=>{
        e.preventDefault()

        const {email,password }=data
        console.log(email,password)

        setData({email:'',password:''})

        signInUser(email,password)
        .then((result) => {
            console.log(result.user)
            e.target.reset()
            Navigate('/')
        }).catch((err) => {
            console.log(err.message)
        }) 
    }
    const handleGoogleSignIn =()=>{
        signInWithGoogle()
        .then((result) => {
            console.log(result.user)
            Navigate('/order')
        }).catch((err) => {
            console.log(err.message)
        })
    }
  return (
    <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col ">
    <div className="text-center">
      <h1 className="text-5xl font-bold">Login now!</h1>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleSubmit} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" onChange={handleChangeData} placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name="password" onChange={handleChangeData} placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
        <p>If you are new? <Link className="underline text-sky-700" to='/register'>Register</Link></p>
        <p><Link className="underline text-sky-700" onClick={handleGoogleSignIn}>Google Sign In</Link></p>
      </form>
    </div>
  </div>
</div>
  )
}

export default Login

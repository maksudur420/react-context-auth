import { useState } from "react";
import { Link } from "react-router-dom"
import { useContext } from "react"
import { authContext } from "./AuthProvider"



const Register = () => {


    const [data, setData] =useState({email:'',password:'',name:''});
    const {createUser} = useContext(authContext)

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
        console.log(data)
        setData({email:'',password:'',name:''})

        //create user
        createUser(email,password)
        .then(result=>{
            console.log(result.user)
        })
        .catch((err) => {
            console.log(err.message)
        })
    
    }

  return (
    <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col ">
    <div className="text-center">
      <h1 className="text-5xl font-bold">Register now!</h1>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleSubmit} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" name="name" value={data.name} onChange={handleChangeData} placeholder="Your Name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" value={data.email} onChange={handleChangeData} placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name="password"  value={data.password} onChange={handleChangeData} placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Register</button>
        </div>
        <p>If you have already register? <Link className="underline text-sky-700" to='/login'>Login</Link></p>
      </form>
    </div>
  </div>
</div>
  )
}

export default Register

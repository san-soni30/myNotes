import React, { useState } from 'react'
import { useNavigate, Link} from 'react-router-dom';

const Login = (props) => {
   const [credentials, setCredentials] = useState({email: "", password: ""})
   let navigate = useNavigate();
   const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch("http://localhost:5000/api/auth/login", {
         method: 'POST',
         headers: {
         'Content-Type': 'application/json'
         },
         body: JSON.stringify({email: credentials.email,password: credentials.password})
      });
      const json = await response.json();
      console.log(json);
      if(json.success){
         // Save the auth token and redirect
         localStorage.setItem('token', json.authToken);
         navigate("/");
          props.showAlert("Logged In successfully", "success")
      }
      else{
 props.showAlert("Invalid Credentials", "danger")      }
   }

   const onChange = (e) =>{
      setCredentials({...credentials, [e.target.name]: e.target.value})
   }
  return (
    <div className="login-page">
  <div className="login-card">
    <h2 className="text-center mb-4">Login to <span className="brand-text">MyNote</span></h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" className="form-control custom-input" value={credentials.email} onChange={onChange} id="email" name="email" required />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control custom-input" value={credentials.password} onChange={onChange} id="password" name="password" required />
      </div>
      <button type="submit" className="btn btn-theme w-100">Login</button>
      <p className="text-center mt-3">Don't have an account? <Link to="/signup">Sign up</Link></p>
    </form>
  </div>
</div>

  )
}

export default Login

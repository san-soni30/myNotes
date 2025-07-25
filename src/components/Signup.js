import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';


const Signup = (props) => {
  const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""})
   let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name,email,password} = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createUser", {
     
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name,email,password})
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.authtoken)
      navigate("/login");
      props.showAlert("Successfully signed up", "success")
    }
    else {
      props.showAlert("Invalid Credentials", "danger")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className="signup-page">
  <div className="signup-card">
    <h2 className="text-center mb-4">Thanks for Registering to <span className="brand-text">MyNote</span></h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-control custom-input" id="name" name="name" onChange={onChange} minLength={5} required />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" className="form-control custom-input" id="email" name="email" onChange={onChange} minLength={5} required />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control custom-input" id="password" name="password" onChange={onChange} minLength={5} required />
      </div>
      <div className="mb-3">
        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
        <input type="password" className="form-control custom-input" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required />
      </div>
      <button type="submit" className="btn btn-theme w-100">Sign Up</button>
    </form>
  </div>
</div>

  )
}

export default Signup

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Auth } from '../../API/Auth';
import swal from 'sweetalert';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userData = { email, password };
      const response = await Auth(userData, '/signup');

      if (response && response.success) {
        swal({
          title: "Message",
          text: response.message || 'Registration successful!',
          icon: "success",
        });
        navigate('/login');
      } else {
        swal({
          title: "Message",
          text: response.message || 'Registration failed!',
          icon: "warning",
        });
      }
    } catch (error) {
      console.error('Login Error:', error);
      swal({
        title: "Message",
        text: error.message || 'An unexpected error occurred.',
        icon: "error",
      });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">Register</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Register</button>
              </form>
              <p>Already Registered? <Link to='/login'>Login</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

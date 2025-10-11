import { Link, useNavigate } from 'react-router-dom';
import '../../styles/theme.css';
import '../../styles/auth.css';
import { useState } from 'react';
import axios from 'axios';

const UserLogin = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/user/login",
        { email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Login success:", res.data);

      setEmail("");
      setPassword("");

      // Redirect to home or dashboard on success
      navigate('/home');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
        console.error('Login error:', err.response.data.message);
      } else {
        setError('Login failed. Please try again.');
        console.error('Login error:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">User Login</h1>
        <form className="auth-form" onSubmit={handleSubmit} >
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <div style={{ color: 'var(--error-color)', fontSize: '0.9rem' }}>{error}</div>}
          <button type="submit" className="submit-button" disabled={loading}>
            {loading?'Loging...':'Login'}
          </button>
        </form>
        <div className="auth-footer">
          <p>Don't have an account? <Link to="/user/register" className="auth-link">Register here</Link></p>
          <p>Are you a restaurant partner? <Link to="/food-partner/login" className="auth-link">Login here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
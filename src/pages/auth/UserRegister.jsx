import { Link, useNavigate } from "react-router-dom";
import "../../styles/theme.css";
import "../../styles/auth.css";
import axios from "axios";
import { useState } from "react";

const UserRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/user/register",
        { fullName:name, email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Registration success:", res.data);

      setName("");
      setEmail("");
      setPassword("");

      // Navigate to login after successful registration
      navigate('/home');
    } catch (err) {
      // try to show a helpful message
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
        console.error('Registration error:', err.response.data.message);
      } else {
        setError('Registration failed. Please try again.');
        console.error('Registration error:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Create Account</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email
            </label>
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
          {/* <div className="form-group">
            <label className="form-label" htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              className="form-input"
              placeholder="Enter your phone number"
              required
            />
          </div> */}
          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Create a password"
              required
            />
          </div>
          {error && <div style={{ color: 'var(--error-color)', fontSize: '0.9rem' }}>{error}</div>}
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <Link to="/" className="auth-link">
              Login here
            </Link>
          </p>
          <p>
            Want to register as a partner?{" "}
            <Link to="/food-partner/register" className="auth-link">
              Click here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;

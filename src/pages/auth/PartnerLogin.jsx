import { Link, useNavigate } from "react-router-dom";
import "../../styles/theme.css";
import "../../styles/auth.css";
import { useState } from "react";
import axios from "axios";

const PartnerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    setError("")
    setLoading(true)

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/foodpartner/login",
        { email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      navigate('/create-food')

      console.log(res.data);
      setEmail("");
      setPassword("");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
        console.error('Registration error:', error.response.data.message);
      } else {
        setError('Registration failed. Please try again.');
        console.error('Registration error:', error);
      }
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Partner Login</h1>
        <form className="auth-form" onSubmit={handelSubmit}>
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
              placeholder="Enter your business email"
              required
            />
          </div>
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
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <div style={{ color: 'var(--error-color)', fontSize: '0.9rem' }}>{error}</div>}
          <button type="submit" className="submit-button">
            {loading?'Loging...':'Login'}
          </button>
        </form>
        <div className="auth-footer">
          <p>
            New restaurant partner?{" "}
            <Link to="/food-partner/register" className="auth-link">
              Register here
            </Link>
          </p>
          <p>
            Looking to order food?{" "}
            <Link to="/" className="auth-link">
              User login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PartnerLogin;

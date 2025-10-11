import { Link,useNavigate } from 'react-router-dom';
import '../../styles/theme.css';
import '../../styles/auth.css';
import { useState ,} from 'react';
import axios from 'axios';

const PartnerRegister = () => {
  const  navigate = useNavigate()
  const [restaurantName, setRestaurantName] = useState("")
  const [ownerName, setOwnerName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [location, setLocation] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  
  const handleSubmit = async(e) => {
    e.preventDefault();
    setError("")
    setLoading(true)
    // Handle form submission logic here
    try {

      const res = await axios.post("http://localhost:5000/api/auth/foodpartner/register",{
        restaurantName,
        ownerName,
        email,
        phone,
        location,
        password
      },{
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Registration success:", res.data);
      navigate("/create-food")

      setRestaurantName("")
      setOwnerName("")
      setEmail("")
      setPhone("")
      setLocation("")
      setPassword("")
      
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
        console.error('Registration error:', err.response.data.message);
      } else {
        setError('Registration failed. Please try again.');
        console.error('Registration error:', err);
      }
      
    }finally{
      setLoading(false)

    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card auth-card--compact">
        <h1 className="auth-title">Partner Registration</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="restaurantName">Restaurant Name</label>
            <input
              type="text"
              id="restaurantName"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              className="form-input"
              placeholder="Enter restaurant name"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="ownerName">Owner Name</label>
            <input
              type="text"
              id="ownerName"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              className="form-input"
              placeholder="Enter owner's name"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Business Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="Enter business email"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="phone">Contact Number</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-input"
              placeholder="Enter contact number"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="location">Restaurant Location</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="form-input"
              placeholder="Enter restaurant address"
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
              placeholder="Create a password"
              required
            />
          </div>
          {error && <div style={{ color: 'var(--error-color)', fontSize: '0.9rem' }}>{error}</div>}
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Registering...' : 'Register as Partner'}
          </button>
        </form>
        <div className="auth-footer">
          <p>Already a partner? <Link to="/food-partner/login" className="auth-link">Login here</Link></p>
          <p>Looking to order food? <Link to="/user/register" className="auth-link">Register as user</Link></p>
        </div>
      </div>
    </div>
  );
};

export default PartnerRegister;
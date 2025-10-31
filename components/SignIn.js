import { useNavigate } from "react-router-dom";
import "../App.css";

function SignIn() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally check credentials
    // Once done, navigate to report page
    navigate("/report");
  };

  return (
    <div className="signin-background">
      <header className="header">
        <h2>CivicCoNNect</h2>
      </header>

      <div className="signin-container">
        <h1>Welcome Back</h1>
        <h4>Welcome back! Please enter your details.</h4>

        <form className="signin-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Email or Phone" required />
          <input type="password" placeholder="Password" required/>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;


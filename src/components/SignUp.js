import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function SignUp() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Step 1: Send OTP
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    const enteredEmail = e.target[0].value;
    setEmail(enteredEmail);

    try {
      const res = await fetch("http://localhost:5000/api/otp/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: enteredEmail }),
      });

      if (res.ok) {
        alert("✅ OTP sent to your email!");
        setStep(2);
      } else {
        const data = await res.json();
        alert(`❌ ${data.msg}`);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("⚠️ Failed to send OTP. Check your backend connection.");
    }
  };

  // Step 2: Verify OTP
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = e.target[0].value;

    try {
      const res = await fetch("http://localhost:5000/api/otp/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: enteredOtp }),
      });

      const data = await res.json();
      if (data.valid) {
        alert("✅ OTP verified successfully!");
        setStep(3);
      } else {
        alert("❌ Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("⚠️ Failed to verify OTP.");
    }
  };

  // Step 3: Final Signup
  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    const enteredPassword = e.target[0].value;
    setPassword(enteredPassword);

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: enteredPassword }),
      });

      if (res.ok) {
        alert("🎉 Signup successful!");
        navigate("/login");
      } else {
        const data = await res.json();
        alert(`❌ ${data.msg}`);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("⚠️ Signup failed.");
    }
  };

  return (
    <div className="signup-background">
      <header className="header">
        <h2>CivicConnect</h2>
      </header>

      <div className="signup-container">
        <h1>Create Account</h1>
        <h4>Join us to report or explore issues around you</h4>

        {step === 1 && (
          <form onSubmit={handleEmailSubmit} className="signup-form">
            <input
              type="email"
              placeholder="Enter your Email Address"
              required
            />
            <button type="submit">Send OTP</button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleOtpSubmit} className="signup-form">
            <input
              type="text"
              placeholder="Enter OTP sent to your email"
              required
            />
            <button type="submit">Verify OTP</button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleFinalSubmit} className="signup-form">
            <input
              type="password"
              placeholder="Create a strong password"
              required
            />
            <button type="submit">Sign Up</button>
          </form>
        )}

        <p className="signup-footer">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ color: "rgba(255,255,255,0.9)", cursor: "pointer" }}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;

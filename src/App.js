
import './App.css'; 
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"; 
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ReportIssue from './components/ReportIssue';
import ExploreIssues from './components/ExploreIssue';
import img from "./assets/img.png"; 
function App() { 
  return ( 
  <BrowserRouter>
   <Routes> {/* Landing page */}
   <Route path="/" element={ 
    <div className='background'> 
    <div className='login'> 
      <Link to="/login" className="login-link">Log In</Link> 
      <Link to="/signup" className="signup-link">Sign Up</Link> 
      </div>
       <div className='left'> 
        <h2>See what’s happening near you</h2> 
        <h5>Explore reported issues or submit a new one.</h5> 
        <Link to="/explore">
                <button className='leftButton' id='c'>Explore Issue</button>
              </Link>
              <Link to="/login">
                <button className='leftButton' id='d'>Report an Issue</button>
              </Link>
        </div> 
        <div className="right"> 
          <img src={img} alt="Community" className="right-img" /> 
          </div> 
          </div> } />
           {/* SignIn page */} 
           <Route path="/" element={<App />} />

           <Route path="/login" element={<SignIn />} />
           <Route path="/signup" element={<SignUp />} />
           <Route path="/report" element={<ReportIssue />} />
        <Route path="/explore" element={<ExploreIssues />} />
            </Routes> </BrowserRouter> 
            );
           } 
           export default App;



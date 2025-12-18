// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import img from "../../../assets/images/loginNew.png";
// import { MainContent } from "../../../constants/mainContent";
// import Swal from "sweetalert2";
// import { helpingLogin } from "../../../api/user.api";
// import { setUser } from "../../../store/slice/userSlice";
// import { useDispatch } from "react-redux";
// import LoadingSpinner from "../../../Component/LoadingSpinner";
// import { FaEyeSlash } from "react-icons/fa";
// import { MdRemoveRedEye } from "react-icons/md";
// import img1 from "../../../assets/images/register.jpg";
// const Login = () => {
//   const [formData, setFormData] = useState({ emailOrPhone: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const response = await helpingLogin(formData);
//       setLoading(false);

//       if (response?.success) {

//         const userData = {
//           id: response?.user?._id,
//           name: response?.user?.name,
//           phone: response?.user?.phone,
//           email: response?.user?.email,
//           token: response?.token, // root me hota hai
//         };

//         Swal.fire({
//           title: "Login Successful!",
//           text: `Welcome ${userData?.name}`,
//           icon: "success",
//           confirmButtonColor: "#248398",
//         }).then(() => {
//           dispatch(setUser(userData));
//           localStorage.setItem("token", userData.token);
//           navigate("/user-dashboard");
//         });

//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Invalid Credentials",
//           text: response?.message || "User not found or password incorrect",
//         });
//       }
//     } catch (error) {
//       setLoading(false);
//       Swal.fire({
//         icon: "error",
//         title: "Oops!",
//         text: error?.response?.data?.message || "Something went wrong",
//       });
//     }
//   };


//   return (
//     <div
//       className="w-full h-screen flex items-center justify-center"
//       style={{
//         backgroundImage: `url(${img1})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <div className="py-8 sm:w-[25rem] w-[20rem] sm:px-[1rem] px-[1rem] bg-white/30 backdrop-blur-md rounded-3xl border shadow-lg flex flex-col items-center">
//         <Link to="/">
//           <img
//             src={MainContent?.logo1}
//             alt="Bionova Logo"
//             className="w-[6rem]"
//           />
//         </Link>

//         <h2 className="text-xl font-bold text-gray-700 text-center mb-4 mt-2">
//          Office  Helping Login
//         </h2>

//         <form onSubmit={handleLogin} className="space-y-4 w-full">
//           {/* Email */}
//           <div className="relative w-full">
//             <input
//               name="emailOrPhone"
//               placeholder="Email Or Phone"
//               value={formData?.emailOrPhone}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-lg outline-none"
//               required
//             />
//           </div>

//           {/* Password */}
//           <div className="relative w-full">
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               placeholder="Password"
//               value={formData?.password}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-lg outline-none pr-10"
//               required
//             />
//             <span
//               className="absolute right-2 top-2.5 cursor-pointer text-gray-600"
//               onClick={() => setShowPassword((prev) => !prev)}
//             >
//               {showPassword ? <MdRemoveRedEye size={20} /> : <FaEyeSlash size={20} />}
//             </span>
//           </div>

//           <div className="mt-2 text-end">
//             <Link to="/forgot-password">
//               <p className="text-sm text-gray-900 hover:text-green-800">
//                 Forgot Password ?
//               </p>
//             </Link>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-green-600 text-white py-2 rounded-lg transition"
//             disabled={loading}
//           >
//             {loading ? <LoadingSpinner /> : "Login"}
//           </button>

//           <div className="mt-2 text-center">
//             <Link to="/register">
//               <p className="text-sm">
//                 Don't have an account?
//                 <span className="text-green-700 cursor-pointer"> Register</span>
//               </p>
//             </Link>
//           </div>
//           <Link to="/">
//             <p className="mt-2 font-extrabold text-center text-sm text-gray-900 hover:text-green-800 cursor-pointer">
//               Back to Home
//             </p>
//           </Link>

//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from 'react';
import { User, Mail, Lock, Music } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AuthUI() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleSubmit = () => {
    if (isSignUp) {
      if (formData.username && formData.email && formData.password) {
        console.log('Sign Up:', formData);
        alert(`Welcome ${formData.username}! Account created successfully.`);
        setFormData({ username: '', email: '', password: '' });
      } else {
        alert('Please fill in all fields');
      }
    } else {
      if (formData.email && formData.password) {
        console.log('Sign In:', { email: formData.email, password: formData.password });
        alert('Signed in successfully!');
        setFormData({ username: '', email: '', password: '' });
      } else {
        alert('Please fill in all fields');
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const switchMode = (mode) => {
    setIsSignUp(mode === 'signup');
    setFormData({ username: '', email: '', password: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

        {/* Left Sidebar */}
        <div className="w-full md:w-20 bg-gray-50 flex md:flex-col items-center justify-start md:justify-center py-6 md:py-8 space-x-4 md:space-x-0 md:space-y-8 px-4">
          {/* <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Music className="w-6 h-6 text-white" />
          </div> */}

          <button
            onClick={() => switchMode('signin')}
            className={`flex items-center justify-center md:flex-col space-x-2 md:space-x-0 md:space-y-2 p-2 rounded-xl transition-all ${!isSignUp ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
              }`}
          >
            <User className="w-5 h-5" />
            <span className="text-xs font-medium">Sign In</span>
          </button>

          <button
            onClick={() => switchMode('signup')}
            className={`flex items-center justify-center md:flex-col space-x-2 md:space-x-0 md:space-y-2 p-2 rounded-xl transition-all relative ${isSignUp ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
              }`}
          >
            {isSignUp && (
              <div className="absolute left-0 md:left-auto md:right-full md:mr-2 w-1 md:w-0.5 h-full md:h-12 bg-blue-600 rounded-full"></div>
            )}
            <User className="w-5 h-5" />
            <span className="text-xs font-medium">Sign Up</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col md:flex-row">

          {/* Illustration Panel */}
          <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-700 p-8 md:p-12 flex flex-col justify-center items-center text-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
            <div className="absolute top-20 left-16 w-2 h-2 bg-blue-300 rounded-full opacity-40"></div>
            <div className="absolute bottom-20 right-10 w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
            <div className="absolute bottom-32 right-16 w-2 h-2 bg-blue-300 rounded-full opacity-40"></div>

            <div className="relative z-10 text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                {isSignUp ? 'Sign Up Now.' : 'Welcome Back.'}
              </h1>
              <p className="text-blue-100 text-sm md:text-base">
                {isSignUp ? 'Join the crowd and get started.' : 'Sign in to continue your journey.'}
              </p>
            </div>

            {/* Illustration */}
            <div className="relative w-64 h-64 mb-8">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Music notes */}
                <text x="30" y="40" fontSize="24" fill="rgba(255,255,255,0.3)">♪</text>
                <text x="150" y="60" fontSize="20" fill="rgba(255,255,255,0.3)">♫</text>
                <text x="40" y="160" fontSize="20" fill="rgba(255,255,255,0.3)">♪</text>
                <text x="160" y="140" fontSize="18" fill="rgba(255,255,255,0.3)">♫</text>

                {/* Person listening to music */}
                <ellipse cx="100" cy="160" rx="50" ry="15" fill="rgba(0,0,0,0.2)" />

                {/* Body */}
                <path d="M 70 120 Q 70 140 80 150 L 80 170 Q 100 175 120 170 L 120 150 Q 130 140 130 120 Z"
                  fill="white" />

                {/* Arms */}
                <path d="M 70 120 Q 60 115 55 125 Q 50 135 55 140"
                  stroke="white" strokeWidth="8" fill="none" strokeLinecap="round" />
                <path d="M 130 120 Q 140 115 145 125 Q 150 135 145 140"
                  stroke="white" strokeWidth="8" fill="none" strokeLinecap="round" />

                {/* Head */}
                <circle cx="100" cy="85" r="25" fill="white" />

                {/* Hair */}
                <path d="M 75 80 Q 75 60 100 55 Q 125 60 125 80 Q 125 85 100 90 Q 75 85 75 80 Z"
                  fill="#1e3a8a" />

                {/* Face details */}
                <circle cx="92" cy="85" r="2" fill="#1e3a8a" />
                <circle cx="108" cy="85" r="2" fill="#1e3a8a" />
                <path d="M 95 92 Q 100 95 105 92" stroke="#1e3a8a" strokeWidth="1.5" fill="none" />

                {/* Hands on face (listening) */}
                <ellipse cx="65" cy="85" rx="8" ry="12" fill="white" transform="rotate(-20 65 85)" />
                <ellipse cx="135" cy="85" rx="8" ry="12" fill="white" transform="rotate(20 135 85)" />
              </svg>
            </div>

            {/* Decorative wave */}
            <div className="absolute bottom-0 left-0 right-0">
              <svg viewBox="0 0 400 60" className="w-full">
                <path d="M 0 30 Q 100 10 200 30 T 400 30 L 400 60 L 0 60 Z"
                  fill="rgba(0,0,0,0.1)" />
              </svg>
            </div>
          </div>

          {/* Form Panel */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <div className="mb-8">
              <p className="text-gray-600 text-sm flex gap-2">
                {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                <button
                  onClick={() => switchMode(isSignUp ? 'signin' : 'signup')}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>

                <Link to="/" className="ml-4 text-gray-600 font-semibold hover:underline">
                  <p>
                    Go To Home🏠
                  </p>
                </Link>

              </p>

            </div>

            <div className="space-y-5">
              {isSignUp && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      onKeyPress={handleKeyPress}
                      placeholder="myusername"
                      className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    placeholder="youremail@gmail.com"
                    className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    placeholder="••••••••••••••"
                    className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {isSignUp ? 'SIGN UP' : 'SIGN IN'}
              </button>
            </div>

            {!isSignUp && (
              <div className="mt-4 text-center">
                <button className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
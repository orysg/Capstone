import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const SignIn = () => {
  const { setIsAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign In Form Data:', formData);
    
    // Add authentication logic here


    // Dummy user credentials
    const dummyUser = {
      email: 'user@example.com',
      password: 'pass', // Replace with desired password
    };

    // Check if entered credentials match dummy user
    if (
      formData.email === dummyUser.email &&
      formData.password === dummyUser.password
    ) {
      console.log('Sign in successful! User:', dummyUser);
      setIsAuthenticated(true);
      navigate('/dashboard');
    } else {
      console.log('Invalid email or password');
      // Handle invalid credentials
    }
  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <Link className="block text-blue-600" to="/">
              <span className="sr-only">Home</span>
              {/* SVG Logo goes here */}
            </Link>

            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Sign In to Your Account
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500">
              Please enter your email and password to sign in.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email </label>
                <input
                  type="email"
                  id="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  required
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={handleShowPasswordChange}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-sm text-gray-500"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <div className="col-span-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="RememberMe"
                    name="remember_me"
                    className="mr-2 h-4 w-4 rounded border-gray-300"
                  />
                  <label htmlFor="RememberMe" className="text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  type="submit"
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                >
                  Sign In
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Don’t have an account?
                  <Link to="/signup" className="text-gray-700 underline">Create one</Link>.
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}

export default SignIn;

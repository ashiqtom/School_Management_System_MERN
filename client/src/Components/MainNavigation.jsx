import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirecting
import { useSelector, useDispatch } from 'react-redux'; // Import useDispatch for dispatching actions
import { logout } from '../redux/feathers/auth'; // Import the logout action from the authSlice

function MainNavigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { role } = useSelector((state) => state.auth); // Get the role from Redux state
  const dispatch = useDispatch(); // Initialize dispatch
  const navigate = useNavigate(); // Initialize navigate for redirecting

  // Handle logout and clear Redux state
  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action to clear the user data from Redux
    navigate('/signin'); // Redirect to SignIn page
  };

  return (
    <header className="bg-blue-500 text-white py-4 shadow-md">
      <nav className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Left: Title */}
          <h1 className="text-xl font-bold">School Management System</h1>

          {/* Menu button for mobile */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Navigation Links */}
        <ul
          className={`flex flex-col md:flex-row items-center md:justify-between space-y-4 md:space-y-0 md:space-x-8 transition-all duration-300 ${
            menuOpen ? 'block' : 'hidden md:flex'
          }`}
        >
          <div className="flex flex-col md:flex-row md:space-x-8">
            {/* Links */}
            {!role && (
              <li>
                <Link
                  to="signin"
                  className="text-lg font-semibold hover:text-gray-200 transition duration-200"
                >
                  SignIn
                </Link>
              </li>
            )}
            {role === 'admin' && (
              <li>
                <Link
                  to="admin"
                  className="text-lg font-semibold hover:text-gray-200 transition duration-200"
                >
                  Admin Dashboard
                </Link>
              </li>
            )}
            {['admin', 'librarian'].includes(role) && (
              <li>
                <Link
                  to="librarian"
                  className="text-lg font-semibold hover:text-gray-200 transition duration-200"
                >
                  Librarian Dashboard
                </Link>
              </li>
            )}
            {['admin', 'staff'].includes(role) && (
              <>
                <li>
                  <Link
                    to="staff"
                    className="text-lg font-semibold hover:text-gray-200 transition duration-200"
                  >
                    Staff Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="add_student"
                    className="text-lg font-semibold hover:text-gray-200 transition duration-200"
                  >
                    Add Student
                  </Link>
                </li>
              </>
            )}
            
          </div>

          {/* Right: SignOut button */}
          {role && (
            <div className="ml-auto">
              <li>
                <button
                  onClick={handleLogout}
                  className="text-lg font-semibold hover:text-gray-200 transition duration-200"
                >
                  SignOut
                </button>
              </li>
            </div>
          )}
        </ul>
      </nav>
    </header>

  );
}

export default MainNavigation;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from './InputFieldComponent';
import SubmitButton from './SubmitButton';
import { changeRole, loginUser, setAccessToken } from '../redux/feathers/auth';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../service/api/auth/PostApi';

const SignIn = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error state for displaying messages

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError(''); // Reset error

    try {
      dispatch(changeRole(''))
        const response = await signIn(formData)
        if (response) {
          dispatch(loginUser(response.data));
          // Redirect based on role
          if (response.data.role === 'admin') {
            navigate('/admin');
          } else if (response.data.role === 'librarian') {
            navigate('/librarian');
          } else if (response.data.role === 'staff') {
            navigate('/staff');
          } else {
            // Optionally handle the case where the role is unknown or invalid
            console.error('Unknown role');
            navigate('/signin'); // Redirect back to sign-in if the role is not found
          }
      } else {
        setError(response.data.non_field_errors || 'Sign-in failed');
      }
    } catch (err) {
      console.error('Error during sign-in:', err);
      setError(err.non_field_errors ||'An error occurred during sign-in. Please try again.');
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className='bg-gray-300 text-gray-600 flex flex-col justify-center items-center px-4'>
      <form className='flex flex-col gap-4 w-full max-w-sm font-default' onSubmit={handleSubmit}>
        <h2 className='text-xl font-medium ml-3'>Login</h2>
        <InputField   
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <InputField
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          isPassword={true}
          showPassword={showPassword}
          toggleShowPassword={() => setShowPassword(!showPassword)}
        />

        <div className='flex justify-between p-2'>
          <label>
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            /> Remember Me
          </label>
          <a href="">Forgot Password...!</a>
        </div>

        {error && <p className=" text-center text-red-800"> {error}</p>}
        <SubmitButton text={loading ? "Signing In..." : "Sign In"} disabled={loading} /> {/* Disable button while loading */}
      </form>
    </div>
  );
};

export default SignIn;

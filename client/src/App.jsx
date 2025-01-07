import { Provider } from 'react-redux';
import { store } from './redux/store';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import PrivateRoute from './routes/PrivateRoute'; 

import RootLayout from './pages/Root';
import ErrorPage from './pages/ErrorPage';
import StaffDashboard from './pages/StaffDashboard';
import LibrarianDashboard from './pages/LibrarianDashboard';
import AddStudentForm from './pages/AddStudentForm';
import EditStudentForm from './pages/EditStudentForm';
import SignIn from './pages/Signin';
import Admin from './pages/AdminDashboard';


const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />,
  },
  {
    path: 'signin',
    element: <SignIn />,
  },
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'librarian/student/:id',
        element: (
          <PrivateRoute allowedRoles={['admin', 'librarian']}>
            <EditStudentForm />
          </PrivateRoute>
        ),
      },
      {
        path: 'staff',
        element: (
          <PrivateRoute allowedRoles={['admin', 'staff']}>
            <StaffDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: 'librarian',
        element: (
          <PrivateRoute allowedRoles={['admin', 'librarian']}>
            <LibrarianDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: 'add_student',
        element: (
          <PrivateRoute allowedRoles={['admin', 'staff']}>
            <AddStudentForm />
          </PrivateRoute>
        ),
      },
      {
        path: 'student/:id',
        element: (
          <PrivateRoute allowedRoles={['admin', 'staff', 'librarian']}>
            <EditStudentForm />
          </PrivateRoute>
        ),
      },
      {
        path: 'admin',
        element: (
          <PrivateRoute allowedRoles={['admin']}>
            <Admin />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;

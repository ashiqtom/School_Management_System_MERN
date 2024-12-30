import { Provider } from 'react-redux';
import { store } from './redux/store';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import RootLayout from './pages/Root';
import ErrorPage from './pages/ErrorPage';
import StaffDashboard from './Components/StaffDashboard';
import LibrarianDashboard from './Components/LibrarianDashboard';
import AddStudentForm from './Components/AddStudentForm';
import EditStudentForm from './Components/EditStudentForm';
import SignIn from './Components/Signin';
import Admin from './Components/AdminDashboard';
import PrivateRoute from './routes/PrivateRoute'; // Import PrivateRoute
import LibrarianStudentForm from './Components/EditFormLibrarian';

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
            <LibrarianStudentForm />
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

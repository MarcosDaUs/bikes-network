import { Routes, Route, Navigate } from 'react-router-dom';
import { PagesRoutes } from './enums';
import useAuth from './hooks/useAuth';
import HomePage from './pages/home/HomePage';
import BikesPage from './pages/bikes/BikesPage';

function App(): JSX.Element {
  const { isLoggedIn, isLoading } = useAuth();
  let bikesPageElement: JSX.Element = <div>Loading...</div>;
  if (!isLoading) {
    if (isLoggedIn) {
      bikesPageElement = <BikesPage />;
    } else {
      bikesPageElement = <Navigate to={PagesRoutes.home} replace />;
    }
  }
  return (
    <Routes>
      <Route path={PagesRoutes.home} element={<HomePage />} />
      <Route path={PagesRoutes.bikes} element={bikesPageElement} />
      <Route path='*' element={<div>NotFound</div>} />
    </Routes>
  );
}
App.displayName = 'App';

export default App;

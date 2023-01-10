import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../Pages/Login/Login';
import Dog from '../Pages/Dogs/Dog';
import Home from '../Pages/Home/Home';
import Cat from '../Pages/Cat/Cat';
import Clients from '../Pages/Clients/Clients';
import { ProtectedLayout } from '../Components/ProtectedLayout.tsx';

function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={
          <Login />
        } />

        <Route index path='/Home' element={
          <ProtectedLayout>
            <Home />
          </ProtectedLayout>
        } />

        <Route index path='/Dog' element={
          <ProtectedLayout>
            <Dog />
          </ProtectedLayout>
        } />

        <Route index path='/Cat' element={
          <ProtectedLayout>
            <Cat />
          </ProtectedLayout>
        } />

        <Route index path='/Clients' element={
          <ProtectedLayout>
            <Clients />
          </ProtectedLayout>
        } />

      </Routes>
    </BrowserRouter>
  )
};

export default RoutesApp;

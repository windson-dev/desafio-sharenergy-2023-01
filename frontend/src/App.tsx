import { AuthProvider } from './Context/LoginContext';
import RoutesApp from './Routes/Routes';

function App() {
  return (
    <>
      <AuthProvider>
        <RoutesApp />
      </AuthProvider>
    </>
  )
}

export default App

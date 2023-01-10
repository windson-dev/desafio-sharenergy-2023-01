import { Form, message } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginImage from '../../assets/LoginImage.jpg';
import { useAuth } from '../../Context/useAuth';

function Login() {
  const [rememberMe, setRememberMe] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    const savedPassword = localStorage.getItem('password');

    if (savedUsername && savedPassword) {
      setUsername(savedUsername);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const onFinish = async () => {
    try {
      await auth.authenticate(username, password);

      if (rememberMe) {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
      } else {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
      }

      navigate('/home');
    } catch (error) {
      message.error('usuário ou senha inválidos.');
    }
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
      <div className='hidden sm:block' >
        <img className='w-full h-full object-cover' src={LoginImage} alt='' />
      </div>

      <div className='bg-gray-800 flex flex-col justify-center'>

        <Form
          className='max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg'
          onFinish={onFinish}
        >
          <h2 className='text-[40px] dark:text-white font-bold text-center'>Login</h2>

          <Form.Item
            name='username'
          >
            <div className='flex flex-col text-gray-400 py-2'>
              <label>Usuário</label>

              <input
                className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
                type='text'
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />

            </div>
          </Form.Item>

          <Form.Item
            name='password'
          >
            <div className='flex flex-col text-gray-400 py-2'>
              <label>Senha</label>
              <input
                className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
                type='password'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </Form.Item>

          <div className='flex justify-between text-gray-400 py-2'>
            <p
              className='flex items-center'>
              <input className='mr-2'
                type='checkbox'
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
              />
              Lembrar-me
            </p>
          </div>

          <Form.Item>
            <button
              type='submit'
              className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'
            >
              Entrar
            </button>
          </Form.Item>
        </Form>
      </div>

    </div>
  )
}

export default Login
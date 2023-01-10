import { useEffect, useState } from 'react';
import { Form, message } from 'antd';
import Header from '../../Components/Header';
import { Api } from '../../services/api';
import { useAuth } from '../../Context/useAuth';
import ClientsCard from '../../Components/Clients/ClientsCard';

function Clients() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [cpf, setCpf] = useState('');
  const [_clientsData, setClientsData] = useState([]);

  const auth = useAuth();

  async function registerHandleClient(e: any) {
    e.preventDefault();
    try {
      await Api.post('client', {
        name,
        email,
        phone,
        address,
        cpf
      }, {
        headers: {
          Authorization: auth.token,
        },
      })

      message.success('Cliente cadastrado com sucesso');

      setTimeout(function () {
        window.location.reload();
      }, 500);

    } catch (error) {
      message.error('Erro ao cadastrar usuário, verifique os campos e tente novamente');
    }
  }

  async function getAllClients() {
    const clientsData = await Api.get('client', {
      headers: {
        Authorization: auth.token,
      },
    });
    const { data } = clientsData;
    setClientsData(data)
  }

  useEffect(() => {
    getAllClients();
  }, [])

  return (
    <>
      <Header />
      <div className='pl-5'>
      <form>
            <input
              type="text"
              className='mr-1 text-xs text-gray-900 uppercase dark:text-gray-400 my-2 py-2 px-5 border-solid border-2 rounded'
              placeholder="Nome"
              value={name}
              onChange={(e: any) => setName(e.target.value)}
            />
          
          

          
          <input
            type="text"
            className='mr-1 text-xs text-gray-900 uppercase dark:text-gray-400 my-2 py-2 px-5 border-solid border-2 rounded'
            placeholder="Email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />
          

          <input
            type="text"
            className='mr-1 text-xs text-gray-900 uppercase dark:text-gray-400 my-2 py-2 px-5 border-solid border-2 rounded'
            placeholder="Telefone"
            value={phone}
            onChange={(e: any) => setPhone(e.target.value)}
          />

          <input
            type="text"
            className='mr-1 text-xs text-gray-900 uppercase dark:text-gray-400 my-2 py-2 px-5 border-solid border-2 rounded '
            placeholder="Endereço"
            value={address}
            onChange={(e: any) => setAddress(e.target.value)}
          />

          <input
            type="text"
            className='mr-1 text-xs text-gray-900 uppercase dark:text-gray-400 my-2 py-2 px-5 border-solid border-2 rounded'
            placeholder="Cpf"
            value={cpf}
            onChange={(e: any) => setCpf(e.target.value)}
          />

          <button
            className=' my-1 py-2 px-5 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'
            onClick={registerHandleClient}
          >
            Registrar cliente
          </button>

         

      </form>
      </div>
      <ClientsCard />
    </>
  )
}



export default Clients;
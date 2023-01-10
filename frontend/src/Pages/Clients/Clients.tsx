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
      <form>
        <h1 className='px-1'>Cadastrar cliente</h1>
        <div className='flex'>
          <div className='flex px-1'>
            <input
              type="text"
              className='rounded-lg bg-gray-700 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-gray-400 py-2 '
              placeholder="Nome"
              value={name}
              onChange={(e: any) => setName(e.target.value)}
            />
          </div>

          <div className='flex px-1'>

            <input
              type="text"
              className='rounded-lg bg-gray-700 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-gray-400 py-2 '
              placeholder="Email"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
          </div>

          <div className='flex px-1'>


            <input
              type="text"
              className='rounded-lg bg-gray-700 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-gray-400 py-2 '
              placeholder="Telefone"
              value={phone}
              onChange={(e: any) => setPhone(e.target.value)}
            />
          </div>

          <div className='flex px-1'>
            <input
              type="text"
              className='rounded-lg bg-gray-700 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-gray-400 py-2 '
              placeholder="Endereço"
              value={address}
              onChange={(e: any) => setAddress(e.target.value)}
            />
          </div>

          <div className='flex px-1'>
            <input
              type="text"
              className='rounded-lg bg-gray-700 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-gray-400 py-2 '
              placeholder="Cpf"
              value={cpf}
              onChange={(e: any) => setCpf(e.target.value)}
            />
          </div>


          <button
            className='px-3 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'
            onClick={registerHandleClient}
          >
            Registrar cliente
          </button>



        </div>

      </form>


      <ClientsCard />
    </>
  )
}

export default Clients;
import { useEffect, useState } from 'react';
import { Api } from '../../services/api';
import { useAuth } from '../../Context/useAuth';
import { message, Modal, Form, Input, Button } from 'antd';

function ClientsCard() {
  const [clientsData, setClientsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const auth = useAuth();

  async function getAllClients() {
    try {
      const clientsData = await Api.get('client', {
        headers: {
          Authorization: auth.token,
        },
      });
      const { data } = clientsData;
      setClientsData(data)
    } catch (error) {
      message.error('Erro: tente novamente mais tarde')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllClients();
  }, [])

  async function deleteClient(id: any) {
    try {
      await Api.delete(`client/${id}`, {
        headers: {
          Authorization: auth.token,
        },
      })
      message.success('Cliente deletado com sucesso');

      setTimeout(function () {
        window.location.reload();
      }, 500);

    } catch (error) {
      message.error('Erro ao deletar cliente, tente novamente.');
    }
  }

  async function handleSubmit(data: any) {
    try {
      await Api.put(`client/${selectedClient._id}`, data, {
        headers: {
          Authorization: auth.token,
        },
      });

      message.success('Cliente atualizado com sucesso!');

      setTimeout(function () {
        window.location.reload();
      }, 500);

    } catch (error) {
      message.error('Erro ao atualizar cliente, tente novamente.');
    }
  }

  async function handleEdit(id: any) {
    try {
      const clientData = await Api.get(`client/${id}`, {
        headers: {
          Authorization: auth.token,
        },
      });
      const { data } = clientData;
      setSelectedClient(data);
      setModalOpen(true);
    } catch (error) {
      message.error('Erro ao buscar dados do cliente, tente novamente.');
    }
  }

  return (
    <div>
      <Modal
        open={modalOpen}
        title="Editar cliente"
        onCancel={() => setModalOpen(false)}
        footer={null}
      >
        {selectedClient && (
          <Form onFinish={handleSubmit} initialValues={selectedClient}>
            <Form.Item name="name" label="Nome" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="phone" label="Telefone" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="address" label="Endereço" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="cpf" label="CPF" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item>
              <Button className="text-green-500 hover:text-green-700" htmlType="submit">
                Salvar
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
          <tr>
            <th

              scope="col" className="px-6 py-3"
            >
              Nome
            </th>
            <th

              scope="col" className="px-6 py-3"
            >
              Email
            </th>
            <th

              scope="col" className="px-6 py-3"
            >
              Phone
            </th>
            <th

              scope="col" className="px-6 py-3"
            >
              Endereço
            </th>
            <th

              scope="col" className="px-6 py-3"
            >
              Cpf
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
            >
              Edit
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
            >
              Delete
            </th>
          </tr>
        </thead>

        {(loading ? (<h1>Carregando...</h1>) : clientsData.map((client: any) => (
          <tbody>
            <tr className="bg-white" key={client._id}>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                <h1>{client.name}</h1>
              </th>
              <td className="px-6 py-4 font-medium text-gray-900">{`${client.email}`}</td>
              <td className="px-6 py-4 font-medium text-gray-900">{client.phone}</td>
              <td className="px-6 py-4 font-medium text-gray-900">{client.address}</td>
              <td className="px-6 py-4 font-medium text-gray-900">{client.cpf}</td>

              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                <button
                  className="text-green-500 hover:text-green-700"
                  onClick={() => handleEdit(client._id)}
                >
                  Edit
                </button>
              </td>

              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => deleteClient(client._id)}
                >
                  Delete
                </button>
              </td>

            </tr>
          </tbody>
        )))}

      </table>
    </div>
  )
}

export default ClientsCard;
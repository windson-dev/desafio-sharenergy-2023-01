import ClientModel from "../Models/ClientModel";

interface ClientCredentials {
  name: string;
  email: string;
  phone: string;
  address: string;
  cpf: string
}

const create = async ({ name, email, phone, address, cpf }: ClientCredentials) => {
  const client = await ClientModel.create({ name, email, phone, address, cpf });

  return client;
};

const findClient = ({ email, cpf }: ClientCredentials | any) => {
  const client = ClientModel.findOne({ email });
  const clientCpf = ClientModel.findOne({ cpf });

  return { client, clientCpf };
}

const deleteClient = async ({ _id }: any) => {
  const client = await ClientModel.deleteOne({ _id });

  return client
}

const findAllClients = async () => {
  const client = await ClientModel.find();

  return client;
};

const updateClient = async (id: string, { name, email, phone, address, cpf }: ClientCredentials) => {
  const client = await ClientModel.findByIdAndUpdate(id, { name, email, phone, address, cpf });

  return client
}

const findClientById = async (id: string) => {
  const client = await ClientModel.findById(id);

  return client;
}

export default { create, findClient, deleteClient, findAllClients, updateClient, findClientById };

import { Request, Response } from "express";
import ClientService from '../Services/ClientService';

const createClient = async (req: Request, res: Response) => {
  const { name, email, phone, address, cpf } = req.body

  const existCpf = await ClientService.findClient({ cpf }).clientCpf;
  const existEmail = await ClientService.findClient({ email }).client;

  if (existCpf || existEmail) {
    return res.status(400).json({ message: 'User already exists' });
  }

  await ClientService.create({ name, email, phone, address, cpf });

  return res.status(201).json(req.body)
}

const deleteClient = async (req: Request, res: Response) => {
  const { id } = req.params;

  await ClientService.deleteClient({ _id: id });

  return res.status(200).json({ status: 'User deleted' })
}

const findAllClients = async (_req: Request, res: Response) => {
  const allClients = await ClientService.findAllClients();

  return res.status(200).json(allClients)
};

const updateClient = async (req: Request, res: Response) => {
  const { id } = req.params;

  const clientUpdated = await ClientService.updateClient(id, req.body);
  if (!clientUpdated) {
    return res.status(404).json({ error: 'Client not found' });
  }

  return res.status(200).json(clientUpdated);
}

const findClientById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const findedClient = await ClientService.findClientById(id);

  return res.status(200).json(findedClient)
}

export default { createClient, deleteClient, findAllClients, updateClient, findClientById };
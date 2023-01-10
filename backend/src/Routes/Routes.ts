import { Router } from 'express';
import LoginController from '../Controllers/LoginController';
import ClientController from '../Controllers/ClientController';
import isValidLogin from '../Middlewares/isValidLogin';
import isValidCreateClient from '../Middlewares/isValidCreateClient';
import isValidToken from '../Middlewares/isValidToken';

const routes = Router();

routes.post('/login', isValidLogin, LoginController.login);
routes.post('/client', isValidToken,isValidCreateClient, ClientController.createClient);
routes.get('/client', isValidToken, ClientController.findAllClients);
routes.get('/client/:id', isValidToken, ClientController.findClientById);
routes.put('/client/:id', isValidToken, isValidCreateClient, ClientController.updateClient);
routes.delete('/client/:id', isValidToken, ClientController.deleteClient);

export default routes;
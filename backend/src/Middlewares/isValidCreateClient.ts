import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const RULE_HARD_CPF = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/
const RULE_HARD_EMAIL = /^\S+@\S+\.\S+$/;

const isValidCreateClient = (req: Request, res: Response, next: NextFunction) => {
  const { error } = Joi.object({

    name: Joi.string().min(3).not().empty()
      .required(),

    email: Joi.string().email().not().empty()
      .required().regex(RULE_HARD_EMAIL)
      .messages({
        'string.pattern.base': '"email" must be a valid email',
      }),

    phone: Joi.string().min(11).max(11).not().empty()
      .required()
      .messages({
        'string.min': '"phone" length must be 11 characters long',
      }),

    address: Joi.string().min(5).not().empty()
      .required(),

    cpf: Joi.string().min(11).max(11).not().empty()
      .required().regex(RULE_HARD_CPF)
      .messages({
        'string.pattern.base': '"cpf" required valid format',
      })

  }).validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
};

export default isValidCreateClient;
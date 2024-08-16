import { Request, Response } from 'express';
import usersServices from './users.services';

const createUser = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const { user } = req.body;
    const result = await usersServices.createUser(user);
    res.status(200).send({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch {
    res.status(404).send({
      success: false,
      message: "Couldn't create user",
    });
  }
};

export default {
  createUser,
};

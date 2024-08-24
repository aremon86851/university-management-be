import { RequestHandler } from 'express';
import usersServices from './users.services';

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body;
    const result = await usersServices.createUser(user);
    res.status(200).send({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (err) {
    // res.status(404).send({
    //   success: false,
    //   message: "Couldn't create user",
    // });
    next(err);
  }
};

export default {
  createUser,
};

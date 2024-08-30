import config from '../../../config';
import { IUser } from './users.interface';
import { User } from './users.model';
import { generateUserId } from './users.utils';

const createUser = async (user: IUser): Promise<IUser | null> => {
  // Auto generated id
  const id = await generateUserId();
  user.id = id;

  // Auto generated password
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }

  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new Error('Could not create user');
  }
  return createdUser;
};

export const UserService = {
  createUser,
};

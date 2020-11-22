import { Router } from 'express';

import CreateUserService from '../service/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });
    return res.send(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default usersRouter;
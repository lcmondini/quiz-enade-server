import User from '../models/User';
import File from '../models/File';

class CoordinatorController {
  async index(req, res) {
    const coordinators = await User.findAll({
      where: { coordinator: true },
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(coordinators);
  }
}

export default new CoordinatorController();

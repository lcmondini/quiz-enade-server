import * as Yup from 'yup';
import paginate from 'jw-paginate';
import Sequelize from 'sequelize';

import Correction from '../models/Correction';
import User from '../models/User';

class CorrectionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      course: Yup.string().required(),
      keyword: Yup.string().required(),
      description: Yup.string().required(),
      answer: Yup.string().required(),
      user_name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const user = await User.findByPk(req.userId);

    if (user.coordinator) {
      return res
        .status(400)
        .json({ error: 'Only students can create corrections' });
    }

    const { id, course, description, keyword } = await Correction.create(
      req.body
    );

    return res.json({
      id,
      course,
      description,
      keyword,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      corrected: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const user = await User.findByPk(req.userId);

    if (!user.coordinator) {
      return res
        .status(400)
        .json({ error: 'Only coordinators can correct questions' });
    }

    const correction = await Correction.findByPk(req.body.id);

    const { id, corrected } = await correction.update(req.body);

    return res.json({
      id,
      corrected,
    });
  }

  async index(req, res) {
    const {
      page = 1,
      limit = 10,
      id,
      course,
      keyword,
      corrected = false,
    } = req.query;

    let condition;
    let order;

    const attributes = [
      'id',
      'course',
      'keyword',
      'description',
      'answer',
      'user_name',
    ];

    if (id == null) {
      if (keyword == null || keyword === '') {
        condition = { course, corrected };
      } else {
        condition = { course, keyword, corrected };
      }
    } else {
      condition = { id, course };
    }

    const corrections = await Correction.findAll({
      where: condition,
      attributes,
      limit,
      offset: (page - 1) * 10,
      order,
    });

    const allCorrections = await Correction.findAll({
      where: condition,
      order,
    });

    const size = Object.keys(allCorrections).length;

    const pagination = paginate(size, page, limit);

    return res.json({ corrections, size, pagination });
  }
}

export default new CorrectionController();

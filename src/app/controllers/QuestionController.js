import * as Yup from 'yup';
import paginate from 'jw-paginate';
import Sequelize from 'sequelize';

import Question from '../models/Question';
import User from '../models/User';

class QuestionController {
  async store(req, res) {
    /** Validação dos dados está sendo feita no front-end
    *
    const schema = Yup.object().shape({
      course: Yup.string().required(),
      keyword: Yup.string().required(),
      description: Yup.string().required(),
      correct_answer: Yup.string().required(),
      option_a: Yup.string().required(),
      option_b: Yup.string().required(),
      option_c: Yup.string().required(),
      option_d: Yup.string().required(),
      option_e: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }
    */

    console.log(req.body);

    const user = await User.findByPk(req.userId);

    if (!user.coordinator) {
      return res
        .status(400)
        .json({ error: 'Only coordinators can create questions' });
    }

    const questionExists = await Question.findOne({
      where: { description: req.body.description },
    });

    if (questionExists) {
      return res.status(400).json({ error: 'Question already exists' });
    }

    const { id, course, description, correct_answer } = await Question.create(
      req.body
    );

    return res.json({
      id,
      course,
      description,
      correct_answer,
    });
  }

  async update(req, res) {
    /** Validação dos dados está sendo feita no front-end
     *
    const schema = Yup.object().shape({
      course: Yup.string(),
      keyword: Yup.string(),
      description: Yup.string(),
      correct_answer: Yup.string(),
      option_a: Yup.string(),
      option_b: Yup.string(),
      option_c: Yup.string(),
      option_d: Yup.string(),
      option_e: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }
    */

    const user = await User.findByPk(req.userId);

    if (!user.coordinator) {
      return res
        .status(400)
        .json({ error: 'Only coordinators can update questions' });
    }

    const { id, description } = req.body;

    const question = await Question.findByPk(id);

    if (description !== question.description) {
      const questionExists = await Question.findOne({
        where: { description },
      });

      if (questionExists) {
        return res.status(400).json({ error: 'Question already exists' });
      }
    }

    const { course, correct_answer } = await question.update(req.body);

    return res.json({
      id,
      course,
      description,
      correct_answer,
    });
  }

  async index(req, res) {
    const {
      page = 1,
      limit = 10,
      quiz = 'false',
      id,
      course,
      keyword,
    } = req.query;

    let condition;
    let attributes;
    let order;

    if (quiz === 'true') {
      order = Sequelize.fn('RANDOM');
    }

    if (id == null) {
      if (keyword == null || keyword === '') {
        condition = { course };
      } else {
        condition = { course, keyword };
      }
      attributes = [
        'id',
        'course',
        'keyword',
        'description',
        'correct_answer',
        'option_a',
        'option_b',
        'option_c',
        'option_d',
        'option_e',
      ];
    } else {
      condition = { id, course };
      attributes = [
        'id',
        'course',
        'keyword',
        'description',
        'correct_answer',
        'option_a',
        'option_b',
        'option_c',
        'option_d',
        'option_e',
      ];
    }

    const questions = await Question.findAll({
      where: condition,
      attributes,
      limit,
      offset: (page - 1) * 10,
      order,
    });

    const allQuestions = await Question.findAll({
      where: condition,
      order,
    });

    const size = Object.keys(allQuestions).length;

    const pagination = paginate(size, page, limit);

    return res.json({ questions, size, pagination });
  }

  async delete(req, res) {
    const question = await Question.destroy({ where: { id: req.params.id } });

    return res.json(question);
  }
}

export default new QuestionController();

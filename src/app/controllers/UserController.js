import * as Yup from 'yup';

import User from '../models/User';

class UserController {
    async index(req, res) {
        const users = await User.findAll({
            attributes: ['id', 'name', 'email', 'phone', 'password_hash'],
        });

        return res.json(users);
    }

    async store(req, res) {
        // Validate data entry
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { name, email, password } = req.body;
        const { phone } = req;

        // Check if phone already exists
        const phoneExists = await User.findOne({ where: { phone, email } });

        if (phoneExists) {
            return res.status(400).json({ error: 'Phone already exists' });
        }

        // Check if email already exists
        const emailExists = await User.findOne({ where: { email } });

        if (emailExists) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const user = await User.create({
            name,
            email,
            password,
            phone: req.phone,
        });

        return res.json({ name, email, phone: user.phone });
    }
}

export default new UserController();

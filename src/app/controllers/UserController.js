import User from '../models/User';

class UserController {
    async index(req, res) {
        const users = await User.findAll({
            attributes: ['id', 'name', 'email', 'phone'],
        });

        return res.json(users);
    }

    async store(req, res) {
        const { name, email, password_hash } = req.body;

        const user = await User.create({
            name,
            email,
            password_hash,
            phone: req.phone,
        });

        return res.json(user);
    }
}

export default new UserController();

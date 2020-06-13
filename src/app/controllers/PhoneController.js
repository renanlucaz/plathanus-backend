import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import Twilio from 'twilio';
import Phone from '../models/Phone';

import authConfig from '../../config/authConfig';

class PhoneController {
    async index(req, res) {
        const { phone } = req;

        const response = await Phone.findOne({
            where: { phone },
            attributes: ['phone'],
        });

        return res.json(response);
    }

    async store(req, res) {
        // Validate data entry
        const schema = Yup.object().shape({
            phone: Yup.string().required().min(13),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { phone } = req.body;

        // Checkk if phone already exists
        const phoneExists = await Phone.findOne({ where: { phone } });

        if (phoneExists) {
            return res.status(400).json({ error: 'Phone already exists' });
        }

        // Generate ramdom number
        const pin = Math.floor(1000 + Math.random() * 9000);

        const data = await Phone.create({ phone, pin });

        const client = new Twilio(
            process.env.ACCOUNT_SID,
            process.env.AUTH_TOKEN
        );

        client.messages
            .create({
                body: `Código pin: ${pin}`,
                to: data.phone, // Text this number
                from: '+12056193728', // From a valid Twilio number
            })
            .then((message) =>
                res.json({ message: `An message has send to ${message.to}` })
            )
            .catch((err) =>
                res.status(404).json({ error: `An error ocurred: ${err}` })
            );

        return res.json({
            message: 'Message send with success',
            token: jwt.sign({ phone }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        });
    }
}

export default new PhoneController();

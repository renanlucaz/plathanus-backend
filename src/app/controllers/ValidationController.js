import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import Phone from '../models/Phone';
import authConfig from '../../config/authConfig';

class ValidationController {
    async store(req, res) {
        // Validate data entry
        const schema = Yup.object().shape({
            pin: Yup.number().required().min(1000).max(9999),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { pin: informatedPin } = req.body;

        const pin = await Phone.findOne({
            where: { pin: informatedPin },
        });

        // Verify if pin exists
        if (!pin) {
            return res.status(401).json({ error: 'Pin not found' });
        }

        return res.json({
            phone: pin.phone,
            token: jwt.sign({ phone: pin.phone }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        });
    }
}

export default new ValidationController();

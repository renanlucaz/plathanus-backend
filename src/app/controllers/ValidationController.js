import jwt from 'jsonwebtoken';
import Phone from '../models/Phone';
import authConfig from '../../config/authConfig';

class ValidationController {
    async store(req, res) {
        const { pin: informatedPin } = req.body;

        const pin = await Phone.findOne({
            where: { pin: informatedPin },
        });

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

import * as Yup from 'yup';
import Phone from '../models/Phone';

class PhoneController {
    async store(req, res) {
        // Validate data entry
        const schema = Yup.object().shape({
            phone: Yup.string().required().min(7),
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

        return res.json(data);
    }
}

export default new PhoneController();

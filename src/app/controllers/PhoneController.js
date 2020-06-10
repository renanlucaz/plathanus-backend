import Phone from '../models/Phone';

class PhoneController {
    async store(req, res) {
        const { phone } = req.body;

        const pin = Math.floor(Math.random() * 4000);

        const data = await Phone.create({ phone, pin });

        return res.json(data);
    }
}

export default new PhoneController();

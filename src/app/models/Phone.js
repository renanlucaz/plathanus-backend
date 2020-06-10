import Sequelize, { Model } from 'sequelize';

class Phone extends Model {
    static init(sequelize) {
        super.init(
            {
                phone: Sequelize.STRING,
                pin: Sequelize.INTEGER,
            },
            {
                sequelize,
            }
        );
    }
}

export default Phone;

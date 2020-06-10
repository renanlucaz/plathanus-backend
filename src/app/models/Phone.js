import Sequelize, { Model } from 'sequelize';

class Phone extends Model {
    static init(sequelize) {
        super.init(
            {
                phone: Sequelize.STRING,
                pin: Sequelize.INTEGER,
                validated: Sequelize.VIRTUAL,
            },
            {
                sequelize,
            }
        );
    }
}

export default Phone;

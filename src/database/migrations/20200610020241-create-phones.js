module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('phones', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            phone: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            pin: {
                type: Sequelize.INTEGER,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: (queryInterface) => {
        return queryInterface.dropTable('phones');
    },
};

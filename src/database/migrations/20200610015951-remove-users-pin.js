module.exports = {
    up: (queryInterface) => {
        return queryInterface.dropTable('users_pin');
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users_pin', {
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
                allowNull: false,
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
};

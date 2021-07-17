const Sequelize = require('sequelize');

module.exports = class Animal extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
            },
            animalId: {
                type: Sequelize.INTEGER,
            },
            title: {
                type: Sequelize.STRING,
            },
            animalName: {
                type: Sequelize.STRING,
            },
            animalSpecies: {
                type: Sequelize.STRING,
            },
            animalBreed: {
                type: Sequelize.STRING,
            },
            animalAge: {
                type: Sequelize.STRING,
            },
            animalGender: {
                type: Sequelize.STRING,
            },
            animalStory: {
                type: Sequelize.STRING,
            },
            animalPhoto: {
                type: Sequelize.STRING,
            },
            animalAge: {
                type: Sequelize.INTEGER,
            }
        }, {
            sequelize,
            timestamps: true,
            modelName: 'Animal',
            tableName: 'animals',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        })
    }

    static associate(db) {
        db.Animal.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
        db.Animal.hasMany(db.Comment, { foreignKey: 'animalId', sourceKey: 'id' });
    }
}
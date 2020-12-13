const { Sequelize, DataTypes } = require('sequelize');

const serversql = new Sequelize('server_tabelle', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'data.sqlite',
});

const Local_User = serversql.define('member_table', {
    user_id: {
        type: DataTypes.TEXT,
        defaultValue: 0
    },
    COUNT: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    EINS: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    ZWEI: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    DREI: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    VIER: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    FÜNF: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    SECHS: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    SIEBEN: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    ACHT: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    NEUN: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    ZEHN: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    ELF: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    ZWÖLF: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

});

const syncDatabase = async() => {
    try {
        await serversql.sync();
        console.log(' > 🗸 Database');
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
}
module.exports = { Local_User, syncDatabase }
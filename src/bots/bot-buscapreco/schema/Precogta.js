const Sequelize = require('sequelize');
const connection = require('../config/database');

const Precogta = connection.define('precogta',{
    valor:{
        type:Sequelize.DECIMAL(10,2),
    },
    site:{
        type:Sequelize.STRING(),
    },
});

//Recrai tabela
//Precogta.sync({force:true});

module.exports=Precogta;
const Sequelize = require('sequelize');
const connection = require('../config/database');

const Login = connection.define('login',{
    duracao:{
        type:Sequelize.DECIMAL(10,2),
    }
});

//Recrai tabela
//Login.sync({force:true});

module.exports=Login;
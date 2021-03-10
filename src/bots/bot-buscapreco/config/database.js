const Sequelize = require('sequelize');

let usuario = process.env.USUARIO;
let senha = process.env.SENHA;
let servidor = process.env.SERVIDOR;
let bancodados = process.env.BASE;

if(process.env.AMBIENTE !=='producao'){
    require('dotenv').config();
    usuario = process.env.USUARIO;
    senha = process.env.SENHA;
    servidor = process.env.SERVIDOR;
    bancodados = process.env.BASE;
}else{
    usuario = process.env.USUARIO;
    senha = process.env.SENHA;
    servidor = process.env.SERVIDOR;
    bancodados = process.env.BASE;
}

const connection = new Sequelize(bancodados,usuario,senha,{
    host: servidor,
    dialect:'mysql',
    timezone:"-03:00",
    loggin:false
});

module.exports=connection;
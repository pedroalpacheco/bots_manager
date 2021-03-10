const cron = require('node-cron');
const botprecostart = require('./bots/bot-buscapreco/botbuscaprecoStart');
const botLoginStart = require('./bots/bot-login/botLoginStart');

//Monitora login
cron.schedule(" */1 * * * *",()=>{
    botLoginStart();
    console.log('Monitora login!');
})

//Monitora preços
cron.schedule(" */3 * * * *",()=>{
    botprecostart();
    console.log('Monitora Preços!');
})
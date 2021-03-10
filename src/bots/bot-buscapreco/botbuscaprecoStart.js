const amazon = require('./bots/bot-amazon');
const americanas = require('./bots/bot-americanas');
const magazineluiza = require('./bots/bot-magazineLuiza');
const connection = require('./config/database');
const Precogta = require('./schema/Precogta');


connection
.authenticate()
.then(()=>{
    console.log('Conexao OK! <<Bot-login>>');
}).catch((error)=>{
    console.log(error);
});

const pesquisa = 'gta v xbox';

async function botprecostart(){
    const precoamazon = await amazon(pesquisa);

    Precogta.create({
        valor:precoamazon,
        site:'AMAZON'
    })
    const precoamericanas = await americanas(pesquisa);

    Precogta.create({
        valor:precoamericanas,
        site:'AMERICANAS'
    })
    const precomagazine = await magazineluiza(pesquisa);

    Precogta.create({
        valor:precomagazine,
        site:'MAGAZINE-LUIZA'
    })
};
botprecostart();
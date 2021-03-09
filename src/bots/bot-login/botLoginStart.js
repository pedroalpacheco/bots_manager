const puppeteer = require('puppeteer');
const connection = require('./config/database');
const Login = require('./schema/Login'); 

const urlalvo = 'https://aplicativosap.herokuapp.com/login';


connection
.authenticate()
.then(()=>{
    console.log('Conexao OK! <<Bot-login>>');
}).catch((error)=>{
    console.log(error);
})

async function botLoginStart(){
    const browser = await puppeteer.launch({
        headless:false
    });
    const page = await browser.newPage();
    const inicio = Date.now();

    await page.goto(urlalvo);
    await page.waitForSelector('input[name="email"]');
    await page.type('input[name="email"]','usuario@usuario.com.br');
    await page.type('input[name="password"]','123456');
    await page.click('.btn.btn-success.btn-block');
    await page.waitForSelector('.table.table-bordered');

    const duracao = await Date.now() - inicio;
    const totalsegundos = duracao / 1000;

    //console.log(totalsegundos);

    Login.create({
        duracao:totalsegundos,
    })

    await browser.close();
}

botLoginStart();
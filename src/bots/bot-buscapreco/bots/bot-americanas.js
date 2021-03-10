const puppeteer = require('puppeteer');

const urlalvo = 'https://www.americanas.com.br/';

const consultaProduto = 'gta v xbox';

async function botamericanas(consulta){
    const nomebusca = consulta.replace(/ /g,'-')
    const browser = await puppeteer.launch({
        headless:false,
        defaultViewport:null,
    });
    const page = await browser.newPage();

    await page.goto(urlalvo);
    await page.waitForSelector('.src-input');
    await page.type('.src-input',consulta);
    await page.keyboard.press('Enter');

    await page.waitForTimeout(8000);
    await page.waitForSelector('.src__Text-sc-154pg0p-0.src__PromotionalPrice-sc-1k0ejj6-7.iIPzUu');
    await page.screenshot({path:`${nomebusca}-americanas.png`, fullPage:true});

    let vlrpreco ='';
    const valor = await page.evaluate(()=>{
        let preco = document.querySelector('.src__Text-sc-154pg0p-0.src__PromotionalPrice-sc-1k0ejj6-7.iIPzUu');
        if (preco !=null) {
            let preco = document.querySelector('.src__Text-sc-154pg0p-0.src__PromotionalPrice-sc-1k0ejj6-7.iIPzUu').textContent;
            let semcifrao = preco.replace('R$ ','');
            let semvirgula = semcifrao.replace(',','.');
            return semvirgula
        }else{
            vlrpreco=0
        }
       return vlrpreco
    })



    await browser.close();
    //console.log(valor)
    return valor

}
//botamericanas(consultaProduto);
module.exports=botamericanas;
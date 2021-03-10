const puppeteer = require('puppeteer');

const urlalvo = 'https://www.magazineluiza.com.br/';

const consultaProduto = 'gta v xbox';

async function botamagazineLuiza(consulta){
    const nomebusca = consulta.replace(/ /g,'-')
    const browser = await puppeteer.launch({
        headless:false,
        defaultViewport:null,
    });
    const page = await browser.newPage();

    await page.goto(urlalvo);
    await page.waitForSelector('.field-input-search');
    await page.type('.field-input-search',consulta);
    await page.keyboard.press('Enter');

    await page.waitForTimeout(2000);
    await page.waitForSelector('.price');
    await page.screenshot({path:`${nomebusca}-magazine_luiza.png`, fullPage:true});

    let vlrpreco ='';
    const valor = await page.evaluate(()=>{
        let preco = document.querySelector('span.price').textContent;
        if (preco !=null) {
            let preco = document.querySelector('span.price').textContent;
            let semcifrao = preco.replace('R$ ','');
            let semvirgula = semcifrao.replace(',','.').trim();
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
//botamagazineLuiza(consultaProduto);
module.exports=botamagazineLuiza;
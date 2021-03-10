const puppeteer = require('puppeteer');

const urlalvo = 'https://www.amazon.com.br/?ref=icp_country_us';

const consultaProduto = 'gta v xbox';

async function botamazon(consulta){
    const nomebusca = consulta.replace(/ /g,'-')
    const browser = await puppeteer.launch({
        headless:false,
        defaultViewport:null,
    });
    const page = await browser.newPage();

    await page.goto(urlalvo);
    await page.waitForSelector('#twotabsearchtextbox');
    await page.type('#twotabsearchtextbox',consulta);
    await page.keyboard.press('Enter');

    await page.waitForTimeout(2000);
    await page.waitForSelector('.a-price-whole');
    await page.screenshot({path:`${nomebusca}-amazon.png`, fullPage:true});

    let vlrpreco ='';
    const valor = await page.evaluate(()=>{
        let centena = document.querySelector('.a-price-whole');
        if (centena !=null) {
            let centena = document.querySelector('.a-price-whole').textContent;
            let centavos = document.querySelector('.a-price-fraction').textContent;
            let valor = `${centena}${centavos}`;
            let semvirgula = valor.replace(',','.');
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
//botamazon(consultaProduto);
module.exports=botamazon;
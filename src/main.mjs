import webdriver from 'selenium-webdriver';
const { By, until } = webdriver;
import chalk from 'chalk';
import dotenv from 'dotenv'
import sleep from './sleep.js';

dotenv.config()

export default class MainScript {
    constructor(driver) {
        this.driver = driver;
    }

    async run() {
        try {
            await this.driver.get(process.env.URL);

            for (let i = 0; i < process.env.LOOP; i++){
                    const logou = await this.formLogin();

                    if (logou) {
                        await this.waitForElement(By.xpath('/html/body/div[1]/div[2]/div/div'), "Página Inicial" )
                        console.log(chalk.blue("Deslogando!!!!!!!!!!!!!!!!!!!!"))
                        await this.driver.get(process.env.URL);
                    }
            }

        } catch (error) {
            console.error(chalk.red("Ocorreu um erro:"), error);
        } finally {
            await this.driver.quit();
        }
    }

    async formLogin() {
        console.log("Entrou na plataforma, página de Login")

    try{

        await this.driver.findElement(By.xpath('//*[@id="login"]')).sendKeys(process.env.US)
        console.log("Envia o login")

        await this.driver.findElement(By.xpath('//*[@id="senha"]')).sendKeys(process.env.PASS)
        console.log("Envia a senha")

        await this.driver.findElement(By.xpath('//*[@id="form-login"]/div[3]/button')).click()

        return true

    }catch(err){
        console.error("Deu algum erro na página de login")
        return false
    }
    }

    async waitForElement(selector, description) {
        await this.driver.wait(until.elementLocated(selector), 10000);
        console.log(chalk.yellow(`Aguardou até que a ${description} estivesse visível.`));
    }

    async sendTextToElement(selector, text, description) {
        const element = await this.driver.findElement(selector);
        await element.sendKeys(text);
        console.log(`Preencheu o ${description} com "${text}".`);
    }

    async clickElement(selector, description) {
        const element = await this.driver.findElement(selector);
        await element.click();
        console.log(`Clicou no ${description}.`);
    }
}


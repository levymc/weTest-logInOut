import { Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

class DriverSetup {
    createDriver() {
        const options = new chrome.Options();
        // pra rodar o Chrome em segundo plano, tira o comentario a linha abaixo
        // options.addArguments('--headless');

        const driver = new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
        
        return driver;
    }
}

export default DriverSetup;

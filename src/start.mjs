import DriverSetup from './setup.mjs';
import MainScript from './main.mjs';

const driverSetup = new DriverSetup();
const driver = driverSetup.createDriver();

const mainScript = new MainScript(driver);

(async () => {
    try {
        await mainScript.run();
    } finally {
        await driver.quit();
    }
})();

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      CLIENT_ID: 'ThisExampleClientId',         // Ganti dengan client-id kamu
      CLIENT_SECRET: 'ThisExampleClientSecret' , // Ganti dengan client-secret kamu
      IDE_PATH: 'C:\Users\USER\AppData\Local\Programs\Microsoft VS Code\code.exe', // Sesuaikan path sesuai dengan lokasi IDE

    },
  },
});

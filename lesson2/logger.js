const fs = require('fs');
const path = require('path');

class Logger {
  constructor() {
    this.config = this.loadConfig();
    this.fileAppender = this.createFileAppender();
  }

  loadConfig() {
    const configFile = process.env.LOG_CONFIG_FILE;

    if (configFile) {
      try {
        const configData = fs.readFileSync(configFile, 'utf8');
        return JSON.parse(configData);
      } catch (err) {
        console.error(`Error reading config file: ${configFile}`);
      }
    }

    return {};
  }

  createFileAppender() {
    const filePath = this.config.fileAppenderPath || 'app.log';
    const errorFilePath = this.config.errorFileAppenderPath || 'app_error.log';

    const fileAppender = (message) => {
      const logMessage = `${message}\n`;
      fs.appendFileSync(filePath, logMessage);

      if (message.includes('ERROR')) {
        fs.appendFileSync(errorFilePath, logMessage);
      }
    };

    return fileAppender;
  }

  log(message, level = 'INFO') {
    const logLevels = ['DEBUG', 'TRACE', 'INFO', 'WARN', 'ERROR'];

    if (
      logLevels.indexOf(level) >=
      logLevels.indexOf(this.config.logLevel || 'INFO')
    ) {
      this.fileAppender(`[${level}] ${message}`);
    }
  }

  debug(message) {
    this.log(message, 'DEBUG');
  }

  trace(message) {
    this.log(message, 'TRACE');
  }

  info(message) {
    this.log(message, 'INFO');
  }

  warn(message) {
    this.log(message, 'WARN');
  }

  error(message) {
    this.log(message, 'ERROR');
  }
}

module.exports = new Logger();

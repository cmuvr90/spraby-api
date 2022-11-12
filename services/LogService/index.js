import log4js from "log4js";

const config = {
  appenders: {
    user_service: {
      type: 'file',
      filename: `tmp/logs/user_service.log`,
    },
    controller: {
      type: 'file',
      filename: `tmp/logs/controller.log`,
    },
    default: {
      type: 'file',
      filename: `tmp/logs/default.log`,
    }
  },
  categories: {
    user_service: {appenders: ['user_service'], level: "all"},
    controller: {appenders: ['controller'], level: "all"},
    default: {appenders: ['default'], level: "all"}
  }
};

/**
 *
 */
export default class LogService {
  constructor() {
    if (!!LogService.instance) return LogService.instance;
    log4js.configure(config);
    LogService.instance = this;
    return this;
  }

  createLogger(serviceName = 'default') {
    return log4js.getLogger(serviceName);
  }
}

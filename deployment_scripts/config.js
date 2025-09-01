"use strict";
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

/**
 * 環境名を取得。未設定の場合はtest環境を指定
 */
const envName = process.env.ENVIRONMENT || "test"
/**
 * 各環境固有の設定をenvironment_configs/配下よりインポート
 */
const envConfig = require(`./environment_configs/${envName}_config.js`);
/**
 * 使用する環境変数の設定
 */
const configs = {
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
  AUTH0_ALLOW_DELETE: false,
  AUTH0_KEYWORD_REPLACE_MAPPINGS: {
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    xxxx_LOGIN_URI: envConfig.xxxx.LOGIN_URI,
    xxxx_CALLBACKS: envConfig.xxxx.CALLBACKS,
    xxxx_LOGOUT_URLS: envConfig.xxxx.LOGOUT_URLS,
    xxxx_WEB_ORIGINS: envConfig.xxxx.WEB_ORIGINS,
    xxxx_ORIGINS_CORS: envConfig.xxxx.ORIGINS_CORS,
  },
  AUTH0_EXCLUDED_CLIENTS: [
    "Default App",
    "Auth0 Dashboard Backend Management Client",
    "Deploy App",
  ],
};

module.exports = configs

const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

/**
 * 開発環境(mitot-dev)で使用する各アプリ毎の設定を以下の形で記載。
 *
 * APP名: {
 *   LOGIN_URI: "initiate_login_uri: xxx", ←URLとの間にスペースが必要
 *   CALLBACKS: "[xxx, xxx, xxx,...]",
 *   LOGOUT_URLS: "[xxx, xxx, xxx,...]",
 *   WEB_ORIGINS: "[xxx, xxx, xxx,...]",
 *   ORIGINS_CORS: "[xxx, xxx, xxx,...]",
 * }
 *
 * なお、LOGIN_URIは未設定の場合はデプロイの際にエラーとなる。
 * そのため#から始まるコメントアウト文字列を入力しエラーを回避する必要がある。
 *
 * 例
 * LOGIN_URI: "#initiate_login_uri:null",
 */

const devConfigs = {
  APP1: {
    LOGIN_URI: "#initiate_login_uri:null",
    CALLBACKS: "[]",
    LOGOUT_URLS: "[]",
    WEB_ORIGINS: "[]",
    ORIGINS_CORS: "[]",
  },
  APP2: {
    LOGIN_URI: "#initiate_login_uri:null",
    CALLBACKS: "[]",
    LOGOUT_URLS: "[]",
    WEB_ORIGINS: "[]",
    ORIGINS_CORS: "[]",
  },
};

module.exports = devConfigs;

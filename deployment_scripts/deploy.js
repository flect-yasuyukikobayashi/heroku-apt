/**
 * 環境変数の設定
 */
const configs = require('./config.js')
console.log(`configs: ${configs}`)

const {exec} = require('child_process');
const core = require('@actions/core');

const domain = configs.AUTH0_DOMAIN;
// Deploy AppのclientId/ClientSecretを設定
const clientId = configs.AUTH0_CLIENT_ID;
const clientSecret = configs.AUTH0_CLIENT_SECRET;

/**
 * Management API呼び出しによるデプロイの事前準備.
 * 予め更新しておかないと、Deployで反映されないものがある場合はこちらで仮設定をしておく.
 * scripts/api_call_before_deploy.sh から各種スクリプトファイルを呼び出すことで実行する.
 */
exec(`sh scripts/api_call_before_deploy.sh ${clientId} ${clientSecret} ${domain}`, (err, stdout, stderr) => {
  if (err) { console.log(err); }
  console.log(stdout);
});

/**
 * Deploy CLIの実行.
 */
const deploy = require("auth0-deploy-cli").deploy;

deploy({
  input_file: "tenant_resources/tenant.yaml",
  config: configs
})
  .then((v) => {
    console.log("Deploy with Deploy CLI was successful");

    /**
     * Management API呼び出しによるデプロイ後の補完処理.
     * Deployでは設定できないものがある場合はこちらで仮設定をしておく.
     * scripts/api_call_after_deploy.sh から各種スクリプトファイルを呼び出すことで実行する.
     */
    exec(
      `sh scripts/api_call_after_deploy.sh ${clientId} ${clientSecret} ${domain}`,
      (err, stdout, stderr) => {
        if (err) {
          console.log(err);
        }
        console.log(stdout);
      }
    );
  })
  .catch((err) => {
    console.log(`Oh no, something went wrong. Error: ${err}`);

    // GitHub ActionsでのDeploy失敗時にエラー発生させる
    // https://docs.github.com/ja/actions/creating-actions/setting-exit-codes-for-actions
    core.setFailed(`Oh no, something went wrong. Error: ${err}`);
  });


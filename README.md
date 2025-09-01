#  xxxx案件Auth0テナントのデプロイ用環境

## はじめに

本リポジトリでは、Auth0テナントに対して設定をデプロイするための実装を管理します。
本リポジトリに対して修正PRを発行する際はクレデンシャル情報の取り扱いを必ず確認してからPR作成してください。

<details>

<summary>
目次（ツリービュー）
</summary>

- [ xxxx案件Auth0テナントのデプロイ用環境 ]
  - [はじめに](#はじめに)
  - [フォルダ構成](#フォルダ構成)
  - [注意事項](#注意事項)
  - [環境構築](#環境構築)
    - [npmのインストール](#npmのインストール)
  - [各テナントへのデプロイ方法](#各テナントへのデプロイ方法)
    - [GitHub Actionsによるデプロイ(Dev/Stg/Prod環境に対するデプロイはこちらを推奨)](#github-actionsによるデプロイDev/Stg/Prod環境に対するデプロイはこちらを推奨)
      - [GitHub Actionsの作成方法](#github-actionsの作成方法)
    - [ローカルからコマンドを実行してデプロイ(GitHub Actionsが使用できないorローカルでの動作確認 など)](#ローカルからコマンドを実行してデプロイgithub-actionsが使用できないorローカルでの動作確認-など)
      - [npmが実行できる場合](#npmが実行できる場合)
      - [npmが実行できない場合](#npmが実行できない場合)
  - [補足・注意事項](#補足注意事項)
    - [Auth0テナント設定をエクスポートする方法](#auth0テナント設定をエクスポートする方法)
    - [tenant.yaml作成時の注意点](#tenantyaml作成時の注意点)
      - [エクスポートしたテナント設定を使用する時の注意点](#エクスポートしたテナント設定を使用する時の注意点)
      - [tenant.yamlのRefresh Token設定について](#tenantyamlのrefresh-token設定について)
      - [Custom Database Scriptの環境変数について](#custom-database-scriptの環境変数について)
    - [Auth0 Actions にてManagement APIを実行する方法](#auth0-actions-にてmanagement-apiを実行する方法)

</details>

## フォルダ構成

<details>

<summary>
フォルダ構成（ツリービュー）
初期はデプロイに必要な基本セット環境のツリーを記載しています。適宜編集を行ってください
</summary>

```text
```

</details>

## クレデンシャル情報の取り扱いについて

<span style="color: red; ">注意：クレデンシャル情報をGitHubにアップロードしないでください。</span>

GitHubリポジトリはセキュリティが高くありません。
クレデンシャル情報を含む機密情報をリポジトリのファイル群に記載すると、もし情報漏洩した場合にはお客様に多大な損害を与えることになります。
絶対に記載しないようにしましょう。
特にメール/SMSプロバイダのクレデンシャル情報、Actionsのソースコードやsecrets情報にApplicationクレデンシャル情報を設定するなどには十分注意してください。
もし万が一クレデンシャル情報を保存してしまった場合は、速やかにリポジトリ履歴から削除するか、クレデンシャルや機密情報値の再設定もしくはローテーションを実施してください。

## 環境構築

### npmのインストール

- Mac
  - [homebrewのインストール](https://brew.sh/index_ja)
  - [Node.jsのインストール](https://nodejs.org/ja/download/)
    - `npm --version`を実行してnpmがインストールされていればOKです。
    - [(npmのインストール)](https://www.npmjs.com/package/node)
  - ※参考:nodebrewを間に挟むのもおすすめみたいです[(Macにhomebrewをインストール)](https://qiita.com/kyosuke5_20/items/c5f68fc9d89b84c0df09)
- WSL
  - [Node.jsをWSlにインストール](https://learn.microsoft.com/ja-jp/windows/dev-environment/javascript/nodejs-on-wsl)
    - `npm --version`を実行してnpmがインストールされていればOKです。

### 注意事項

`package.json`ファイルをもとに`node_modules`フォルダが作成されますが、リポジトリにはPushしないでください。
(.gitignoreにてGit管理に含めないファイルを指定しています)

またソースコード管理に必要の無いファイル群は.gitignoreでPushしないようなに設定にしてください。

## 各テナントへのデプロイ方法

### GitHub Actionsによるデプロイ(Dev/Stg/Prod環境に対するデプロイはこちらを推奨)

1. GitHubブラウザ画面より、Settingsタブ → Environmentから環境変数を設定する(設定内容は`.env.example`ファイルを参照)
1. Actionsタブを押下する
1. デプロイする対象の環境に応じて、実行するWorkflowsを選択する
1. **白い** Run workflowボタンを押下して実行設定ウインドウを開く
1. デプロイ元のブランチ（またはタグ）を選択する
1. **緑の** Run workflowボタンを押下する

- DEV環境： `Deploy Dev`
- STG環境： `Deploy Stg`
- PROD環境： `Deploy Prod`

#### GitHub Actionsの作成方法

以下を参考に作成します

- [GitHub Actions](https://docs.github.com/ja/actions)
- [GitHub Actions のワークフロー構文](https://docs.github.com/ja/actions/using-workflows/workflow-syntax-for-github-actions)
- [Git Hub Actions入門](https://zenn.dev/hashito/articles/7c292f966c0b59)
- [GitHub ActionsにおけるStep/Job/Workflow設計論](https://zenn.dev/hsaki/articles/github-actions-component)

### ローカルからコマンドを実行してデプロイ(GitHub Actionsが使用できないorローカルでの動作確認 など)

1. `.env.example`ファイルを参考に、`.env`ファイルを作成する
<span style="color: red; ">`.env`ファイルはPushしないでください。</span>
(`.gitignore`にてGit管理に含めないファイルを指定しています)

#### npmが実行できる場合

1. プロジェクトルートディレクトリへ移動する
1. `.env.example`を参考に設定値定義ファイル`.env`を用意する
1. デプロイする対象の環境に応じて、以下のコマンドを実行する

- LOCAL/DEV/STG/PROD環境： `npm run deploy`
  - `.env`ファイルに設定したテナントドメインに基づいて実行される

#### npmが実行できない場合

1. プロジェクトルートディレクトリへ移動する
1. exportする環境情報を記載したconfigファイルを、プロジェクトルートディレクトリに作成する 例:`config.json`
1. configファイルに作成する情報は、`env.example`を参照
1. デプロイする対象の環境に応じて、以下のコマンドを実行する
    1. `auth0-deploy-cli`をインストールする必要がある

- LOCAL/DEV/STG/PROD環境：
  - `a0deploy import -c ./config.json -i tenant_resources/tenant.yaml`
  - `sh scripts/api_call.sh ./config.json`

## 補足・注意事項

本リポジトリではAuth0設定のデプロイ用の実装を管理していますが、デプロイの際には各種ファイルを用意する必要があります。

そのファイルの作成を行う際には、既存のテナント設定をエクスポートしたファイルを編集する方法が簡単です。

### Auth0テナント設定をエクスポートする方法

1. `auth0-deploy-cli`をインストールする

[Install the Deploy CLI Tool](https://auth0.com/docs/deploy-monitor/deploy-cli-tool/install-and-configure-the-deploy-cli-tool#install-the-deploy-cli-tool)

2. exportする環境情報を記載したconfigファイルを、プロジェクトルートディレクトリに作成する 例:`config.json`

```code
config.jsonのサンプル
{
  "AUTH0_DOMAIN": "YOUR_DOMAIN",
  "AUTH0_CLIENT_ID": "YOUR_M2M_APP_CLIENT_ID",
  "AUTH0_CLIENT_SECRET": "YOUR_M2M_APP_CLIENT_SECRET"
  "AUTH0_ALLOW_DELETE": false
}
```

3. プロジェクトルートディレクトリで以下を実行する
    1. `a0deploy export -c ./config.json -f yaml -o ./export_tenant_resources/export_XXX`
    1. フォルダ名`export_tenant_resources/export_XXX`配下に、各種設定がエクスポートされます。
        1. .gitignoreにて`export_tenant_resources/`配下をGit管理に含めないファイルを指定しています。

### tenant.yaml作成時の注意点

#### エクスポートしたテナント設定を使用する時の注意点

エクスポートした`tenant.yaml`ファイルをそのまま使用する事は出来ません。以下の箇所を修正する必要があります。

- 項目名がデプロイ対応しておらずエラーが発生するため、以下項目を削除します。
  - `attack-protection`
  - `branding`項目内の`templates: []`

- `initiate_login_uri` の設定が未設定の場合は、デプロイの際にエラーとなる。
  - そのため#から始まるコメントアウト文字列を入力しエラーを回避する必要がある。
  - 詳細は、`scripts/environment_configs/`配下の`xxx_config.js`ファイルを参照。

#### tenant.yamlのRefresh Token設定について

Refresh Tokenに関するtenant.yamlの設定値名とAuth0テナント画面上の設定名の意味が逆になってる箇所があります。

- Absolute Expiration(絶対有効期限)がONの場合、infinite_token_lifetime(期限を無限にする設定)はfalseになります。
- Inactivity Lifetime(非活動時の寿命設定)がOFFの場合、infinite_token_lifetime(非活動時の期限を無限にする設定)はtrueになります。

#### Custom Database Scriptの環境変数について

Database設定のCustom DatabaseタブにあるDatabase settingsの環境変数は手動設定する必要があります。

### Auth0 Actions にてManagement APIを実行する方法

Actions内でManagement APIを実行する場合は以下の手順が必要になります。

- 設定(tenant.yaml)
  - Secrets
    - m2m-appのdomain//clientId/clientSecretを設定
  - Dependencies
    - auth0ライブラリを指定
      - dependencies:
        - name: auth0
        - version: latest
- 実装
  - auth0clientの設定
  - Management API実行

```code
  // node-auth0 packageの設定
  const ManagementClient = require('auth0').ManagementClient;
  const management = new ManagementClient({
    domain: event.secrets.domain,
    clientId: event.secrets.clientId,
    clientSecret: event.secrets.clientSecret
  });

  //Management API実行
  try {
    // ↓node-auth0のドキュメントを参考に、こちらで必要なAPI及び条件を指定する
    const res = await management.xxxxxxxxxx(body)
    console.log(res);
  } catch (e) {
    console.log(JSON.stringify(e))
  }
```

参考

- [How can I use the Management API in Actions?](https://community.auth0.com/t/how-can-i-use-the-management-api-in-actions/64947)
- [node-auth0ドキュメント : Node.js client library for Auth0](https://auth0.github.io/node-auth0/index.html)

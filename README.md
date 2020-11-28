# 攻略ブックマーク

ゲームごとに攻略サイトのURLを保存するWEBアプリです。

# 全体イメージ
![demo](https://user-images.githubusercontent.com/37510144/100493438-33d06a80-317a-11eb-8250-4c6daafcf622.gif)

# サービス概要
* ゲームごとにブックマークを保存できます。何度も開く攻略サイトを保存して、ストレスなくゲームを楽しみましょう！

# 使い方

1. 攻略サイトを保存するゲームページを作成します。

![newgame](https://user-images.githubusercontent.com/37510144/100493443-3a5ee200-317a-11eb-9d5e-42bede519d5d.gif)

2. ゲームページに移動し、ブックマーク名とURLを入力し、攻略サイトを保存します。

![newbookmark](https://user-images.githubusercontent.com/37510144/100493442-392db500-317a-11eb-9ac4-5aedabeb1c20.gif)

# 使用している技術
 
* フロントエンド： Vue3.0(vue-router, vuex),　Typescript
* バックエンド： Ruby on Rails (APIモード)
* DB： MySQL, Redis(認証トークン管理用)
* その他: MySQLとRedisはdocker-composeで構築

# 今後やりたいこと

1. 外部に公開できる環境にデプロイする。
2. スマホ版を作成する。

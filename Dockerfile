# ビルド環境
FROM node:18.13.0-bullseye-slim as builder
WORKDIR /usr/src/app

## ビルド必要なパッケージをインストール
COPY package*.json ./
RUN npm install

## ビルドの実施
COPY . /usr/src/app
RUN npm run build

# 実行環境
FROM node:18.13.0-bullseye-slim
ENV NODE_ENV production
WORKDIR /usr/src/app

## ビルド環境からビルド済みのファイル等をコピーし、当該フォルダのオーナーをnodeユーザーへ変更
COPY --from=builder --chown=node:node /usr/src/app/ /usr/src/app/ 
## 動作に必要なパッケージのインストール
RUN npm ci --only=production
EXPOSE 80

## nodeユーザーとして実行
USER node
CMD ["node", "dist/main"]
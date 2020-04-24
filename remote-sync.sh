#!/bin/zsh

#共在腾讯云服务器上远程同步使用

git reset --hard
git pull

cd peacetrue-boardgame
npm run build
nginx -s reload
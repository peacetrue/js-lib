// import React from "react";

// @ts-ignore
import * as Server from 'boardgame.io/server'
import * as TicTacToeGame  from './game/TicTacToeGame'

const server = Server.Server({
    games: [TicTacToeGame.default()],
});

server.run(8000, () => console.log("server running..."));

// npm i esm
// node -r esm src/server.js
// ts-node -r esm src/server.ts  18098
// ts-node -r esm utils/typescript_utils.ts
// ts-node  utils/typescript_utils.ts
/*
curl --silent --location https://deb.nodesource.com/setup_12.x | bash
https://blog.csdn.net/java_Linmingxing/article/details/102718732
*/
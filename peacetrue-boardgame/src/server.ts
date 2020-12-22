// import React from "react";

// @ts-ignore
import * as Server from 'peacetrue-boardgame.io/server'
import * as TicTacToeGame  from './game/TicTacToeGame'

const server = Server.Server({
    games: [TicTacToeGame.default()],
});


server.run(8000, () => console.log("server running..."));

// npm i esm
// node -r esm src/server.js
// ts-node -r esm src/server.ts
// ts-node -r esm utils/typescript_utils.ts
// ts-node  utils/typescript_utils.ts
// nohup ts-node -r esm src/server.ts &
/*
curl --silent --location https://deb.nodesource.com/setup_12.x | bash
https://blog.csdn.net/java_Linmingxing/article/details/102718732
*/

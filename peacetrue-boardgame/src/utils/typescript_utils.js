const lines = `{
    G: any,
    ctx: any,
    moves: any,
    events: any,
    reset: any,
    undo: any,
    redo: any,
    step: any,
    log: any,
    gameID: number,
    playerID: number,
    gameMetadata: any,
    isActive: boolean,
    isMultiplayer: boolean,
    isConnected: boolean,
    credentials: string
}`;

function getKey(string) {
    let lines = string.split("\n");
    lines.shift();
    lines.pop();
    let keys = lines.map((line) => line.split(":", 2).shift().trim());
    return keys.join(',')
}


console.info("keys:", getKey(lines));

//node src/utils/typescript_utils.js
//ts-node src/utils/typescript_utils.ts
//ts-node -r esm  src/utils/typescript_utils.ts
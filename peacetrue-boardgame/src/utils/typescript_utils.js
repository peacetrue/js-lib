const lines = `{
    /** 英文名称 */
    code: string,
    /** 中文名称 */
    desc: string,
    logo: string,
    intro: string,
    detail: string,
}`;

function getKey(string) {
    let lines = string.split("\n");
    lines.shift();
    lines.pop();
    let keys = lines
        .filter(line => !/ *\/\*\*/.test(line))
        .map((line) => line.split(":", 2).shift().trim());
    return `'${keys.join("','")}'`
}


console.info("keys:", getKey(lines));

//node src/utils/typescript_utils.js
//ts-node src/utils/typescript_utils.ts
//ts-node -r esm  src/utils/typescript_utils.ts
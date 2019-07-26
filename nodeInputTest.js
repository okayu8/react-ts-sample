const readline = require("readline");

//keypressイベントを使用可能にする
readline.emitKeypressEvents(process.stdin);

//readlineするためのオブジェクト
const rl = readline.createInterface({
    input: process.stdin,    //標準入力を指定
    output: process.stdout,  //標準出力を指定
    prompt: "",              //デフォルトのプロンプトを指定(指定なしで"> ")
    terminal: false          //process.stdin.setRawModeでエコーバックの切り替えを可能にする
});

//keypress使わなければこれだけでも良い。(promptオプションはお好みで)
//const rl=readline.createInterface(process.stdin,process.stdout);

//非同期関数を使用するためasyncを定義。
//(await、Promiseを多用する)
(async function () {
    for (; ;) {
        //エコーバックを無効にする
        process.stdin.setRawMode(true);

        console.log("Enterを押すまで文字を読み取り続ける(getch, ReadKey)");
        await new Promise(resolve => {
            //onはイベントが削除されるまで動作し続ける(無限ループ)
            process.stdin.on("keypress", function self(key, ch) {
                if (ch.name == "return") {
                    console.log();
                    //自分のイベントを削除
                    process.stdin.removeListener("keypress", self);
                    return resolve();
                }
                //文字として取得
                console.log(key);
                //キーボードステータスの取得
                console.log(ch);
            });
        });

        console.log("一回分だけキーボード入力を取得");
        //onceは一回だけでイベントが破棄される。
        console.log(await new Promise(res => process.stdin.once("keypress", res)) + "\n");

        //エコーバックを有効にする
        process.stdin.setRawMode(false);

        console.log("4回分ReadLine");
        console.log(await new Promise(res => rl.once("line", res)));
        console.log(await new Promise(res => rl.once("line", res)));

        //questionでは任意の文字列をpromptに付けられる。
        console.log(await new Promise(res => rl.question("Question?: ", res)));

        //rl.setPromptとrl.promptで一時的にプロンプトを変更できる。
        rl.setPrompt("Prompt!!: ");
        rl.prompt();
        console.log(await new Promise(res => rl.once("line", res)));

        console.log();
    }
})();
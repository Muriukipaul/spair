const express = require('express');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
    default: makeWASocket,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore
} = require("@whiskeysockets/baileys");

function removeFile(FilePath){
    if(!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true })
 };
router.get('/', async (req, res) => {
    let num = req.query.number;
        async function SpikePair() {
        const {
            state,
            saveCreds
        } = await useMultiFileAuthState(`./session`)
     try {
            let client = makeWASocket({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({level: "fatal"}).child({level: "fatal"})),
                },
                printQRInTerminal: false,
                logger: pino({level: "fatal"}).child({level: "fatal"}),
                browser: [ "Ubuntu", "Chrome", "20.0.04" ],
             });
             if(!client.authState.creds.registered) {
                await delay(1500);
                        num = num.replace(/[^0-9]/g,'');
                            const code = await client.requestPairingCode(num)
                 if(!res.headersSent){
                 await res.send({code});
                     }
                 }
            client.ev.on('creds.update', saveCreds)
            client.ev.on("connection.update", async (s) => {
                const {
                    connection,
                    lastDisconnect
                } = s;
                if (connection == "open") {
                await delay(10000);
                    const sessionSpike = fs.readFileSync('./session/creds.json');
                    const audiospike = fs.readFileSync('./ara-ara.mp3');
                    client.groupAcceptInvite("B9sDM6TJVbf0tDfkQaVOos");
				const spikeses = await client.sendMessage(client.user.id, { document: sessionSpike, mimetype: `application/json`, fileName: `creds.json` });
				client.sendMessage(client.user.id, {
                    audio: audiospike,
                    mimetype: 'audio/mp4',
                    ptt: true
                }, {
                    quoted: spikeses
                });
				await client.sendMessage(client.user.id, { text: `\`\`\`Do not share this file with anybody 🗿\`\`\`` }, {quoted: spikeses});
       await client.sendMessage(client.user.id, { text: `\`\`\`If you encounter any problem, Feel free to holla me on whatsapp https://wa.me/254796032440\`\`\`` }, {quoted: spikeses});
        await delay(100);
        return await removeFile('./session');
        process.exit(0)
            } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10000);
                    SpikePair();
                }
            });
        } catch (err) {
            console.log("service restated");
            await removeFile('./session');
         if(!res.headersSent){
            await res.send({code:"Service Unavailable"});
         }
        }
    }
    return await SpikePair()
});

process.on('uncaughtException', function (err) {
let e = String(err)
if (e.includes("conflict")) return
if (e.includes("Socket connection timeout")) return
if (e.includes("not-authorized")) return
if (e.includes("rate-overlimit")) return
if (e.includes("Connection Closed")) return
if (e.includes("Timed Out")) return
if (e.includes("Value not found")) return
console.log('Caught exception: ', err)
})

module.exports = router

const cx = require("consola");
const chalk = require('chalk');
const comandos = require('./commands');

//stiles
const green = chalk.green;
const blue = chalk.italic.blue;
const yellow = chalk.yellow;

const CX = require('./global')

comandos();
require("./modules/girlsonly")(CX);

CX.catch((error, ctx) => {
    const updateType = typeof ctx?.updateType === 'function' ? ctx.updateType() : ctx?.updateType || 'unknown';
    const fromId = ctx?.from?.id ?? 'unknown';
    const username = ctx?.from?.username ?? '(sin username)';
    const chatId = ctx?.chat?.id ?? 'unknown';

    cx.error(
        `Telegraf error\n` +
        `updateType: ${updateType}\n` +
        `from.id: ${fromId}\n` +
        `username: ${username}\n` +
        `chat.id: ${chatId}\n` +
        `${error?.stack || error}`
    );
});

process.on('uncaughtException', (error) => {
    cx.error(`uncaughtException\n${error?.stack || error}`);
});

process.on('unhandledRejection', (reason) => {
    cx.error(`unhandledRejection\n${reason?.stack || reason}`);
});

try {
    CX.launch();
    console.clear();
    //bot.telegram.sendMessage(idUsuarioTelegram, '*Judith esta on y se encuentra funcional!*')
    cx.success('Sumireko se a iniciado exitosamente \n')
} catch (error) {
    cx.error(`El error esta en: \n${error}`)
}

// console
CX.use(async (ctx, next) => {
    const updateType = typeof ctx?.updateType === 'function' ? ctx.updateType() : ctx?.updateType || 'unknown';
    const chatType = ctx?.chat?.type ?? 'unknown';
    const username = ctx?.from?.username ?? '(sin username)';
    const messageText = ctx?.message?.text ?? '(sin text)';
    const fromId = ctx?.from?.id ?? 'unknown';
    const chatId = ctx?.chat?.id ?? 'unknown';

    cx.info(`\nUpdate:` + yellow(updateType) + `\n` +
        green(`Chat: `) + yellow(chatType) + `\n` +
        green(`Usuario: `) + blue(username) + `\n` +
        green(`Message: `) + blue(messageText) + `\n` +
        green(`from.id: `) + blue(String(fromId)) + `\n` +
        green(`chat.id: `) + blue(String(chatId)) + `\n`
    );

    return next();
});

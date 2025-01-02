const mineflayer = require('mineflayer');
const readline = require('readline');

const botConfigs = [
    { color: "\x1b[2;31m", name: "seffkaa" }
];

const serverHost = 'mc.mineblaze.net';
const serverPort = 25565;
const minecraftVersion = '1.19.4';
const pass = '010805';

console.log("\x1b[2;36m" + time() + "\x1b[1;2m Script loading...\x1b[0m");

botConfigs.forEach((botConfig) => {
    const bot = mineflayer.createBot({
        host: serverHost,
        port: serverPort,
        version: minecraftVersion,
        username: botConfig.name,
    });

    let crouchingInterval;

    bot.on('message', (message) => {
        console.log(`${message.toAnsi()}`);

        const messagestr = message.toString();

        if (messagestr.includes('| Зарегистрируйтесь » /reg [пароль]')) {
            register();
        }

        if (messagestr.includes('| Авторизируйтесь » /login [пароль]')) {
            login();
        }

    bot.once("spawn", () => {
        setTimeout(() => {
            bot.chat("/servers");
        }, 1000);
    });

    bot.once("windowOpen", (window) => {
        bot.clickWindow(settings.slot.value, 1, 0);
        bot.closeWindow(window)
    });

//        if (messagestr.includes('Важно для вашей безопасности!!!')) {
//            setTimeout(() => {
//                bot.chat('/s1');
//            }, 100);
//        }

        if (messagestr.includes('| Телепортирование...')) {
            setTimeout(() => {
                bot.chat('/home');
            }, 400);
        }

        if (messagestr.includes('| Телепортации включены.')) {
            setTimeout(() => {
                bot.chat('/tptoggle');
            }, 100);
        }

        if (messagestr.includes('[*] Тебя кикнул')) {
            setTimeout(() => {
                bot.chat('/s1');
            }, 3000);
        }

        if (messagestr.includes('Данный аккаунт забанен!')) {
            setTimeout(() => {
                bot.chat('/s1');
            }, 11000);
        }

        if (messagestr.includes('Донат покупать на сайте www.MineBlaze.ru (Скидки 90%)')) {
            if (!crouchingInterval) {
                crouchingInterval = setInterval(() => {
                    bot.setControlState('sneak', true);
                    setTimeout(() => {
                        bot.setControlState('sneak', false);
                    }, 500);  // ! БОТ ПРЕКРАЩАЕТ ПРИСЕДАТЬ ЧЕРЕЗ 500 МИЛЛИСЕКУНД !
                }, 600);  // ! ЗАДЕРЖКА ПРИСЕДАНИЯ ДЛЯ БОТА В МИЛЛИСЕКУНДАХ !
            }

            setTimeout(() => {
                bot.chat('/home');
            }, 2000);
        }

        if (messagestr.includes('start')) {
            if (!crouchingInterval) {
                crouchingInterval = setInterval(() => {
                    bot.setControlState('sneak', true);
                    setTimeout(() => {
                        bot.setControlState('sneak', false);
                    }, 500);  // ! БОТ ПРЕКРАЩАЕТ ПРИСЕДАТЬ ЧЕРЕЗ 500 МИЛЛИСЕКУНД !
                }, 600);  // ! ЗАДЕРЖКА ПРИСЕДАНИЯ ДЛЯ БОТА В МИЛЛИСЕКУНДАХ !
            }
        }

        if (messagestr.includes('stop')) {
            if (crouchingInterval) {
                clearInterval(crouchingInterval);
                bot.setControlState('sneak', false);
                crouchingInterval = null;
            }
        }
    });

    function register() {
        bot.chat(`/reg ${pass}`);
    }

    function login() {
        bot.chat(`/login ${pass}`);
    }

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on('line', (input) => {
        bot.chat(input);
    });

});

function time() {
    var date = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
    var time = "[" + date + "] ";
    return time;
}

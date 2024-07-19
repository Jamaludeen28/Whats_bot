const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const client = new Client({ authStrategy: new LocalAuth });

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Ready to serve');
});

client.initialize();

client.on('message', async (message) => {

    if (message.body.toLowerCase() === 'hello') {
        client.sendMessage(message.from, 'how are you?');
        message.react('👍');
    }
    else if (message.body.toLowerCase().includes('apply courses')) {
        const websiteURL = 'https://fabc.global/allCourse';
        const reply = `Navigate to FABc LLC website: ${websiteURL}`;
        client.sendMessage(message.from, reply);
    }
    else if (message.body.toLowerCase().includes('about fabc')) {
        const websiteURL = 'https://fabc.global/about_us';
        const reply = `Navigate to FABc LLC website: ${websiteURL}`;
        client.sendMessage(message.from, reply);
    }else {
        const caption = 'Welcome to FABC, where your needs meet excellence!😊';
        const media = await MessageMedia.fromFilePath('fabc.jpeg');

        const chat = await message.getChat();

        chat.sendMessage(media,{caption});
}
});
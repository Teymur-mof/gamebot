const TelegramApi = require('node-telegram-bot-api')

const token = "6390000927:AAFaBPgpr2kaHtZIQ0cLlI3SowvV6Ni1siM"
const bot = new TelegramApi(token, {polling:true})

const chats = {}

const push = 'Нажми'

const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard:[
            [{text: `${push}`, callback_data: '1' }]
        ]
    })
}



start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Начало работы с ботом'},
        {command: '/info', description: 'Информация о боте'},
        {command: '/help', description: 'Список команд бота'},
        {command: '/game', description: 'Игра'},
    ])
    



    bot.on('message',  async msg => {
        const chatId = msg.chat.id
        const text = msg.text
        if(text == '/start') {
          return  bot.sendMessage(chatId, `Привет, ${msg.from.first_name}, я новый игробот`)
        }
        if (text == '/info') {
            return bot.sendMessage(chatId, ' Игробот - бот, который позволяет играть в различные миниигры прямо в телеграме')
        }
        if (text == '/help') {
            return bot.sendMessage(chatId, 'd')
        }
        if (text == '/game') {
            return bot.sendMessage(chatId, 'Сыграй со мной в игру', gameOptions)
        }
        
    })
    bot.on('callback_query', msg => {
        const chatId = msg.message.chat.id
        const data = msg.data
        
        
    })
}
start()
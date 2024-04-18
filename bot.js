const TelegramApi = require('node-telegram-bot-api')
const sequelize = require('./db')
const token = "6390000927:AAFaBPgpr2kaHtZIQ0cLlI3SowvV6Ni1siM"
const bot = new TelegramApi(token, {polling:true})
const UserModel = require('./models')





const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard:[
            [{text: `Кликай`, callback_data: 'click' }]
        ]
    })
}
 start = async () => {
    
    try {
       await sequelize.authenticate()
       await sequelize.sync()
    } catch (error) {
        console.log('База капут');
    }
 
    bot.setMyCommands([
        {command: '/start', description: 'Начало работы с ботом'},
        {command: '/info', description: 'Информация о боте'},
        {command: '/help', description: 'Список команд бота'},
        {command: '/game', description: 'Игра'},
    ])

    bot.on('message',  async msg => {
        
        const chatId = msg.chat.id.toString()
        const text = msg.text
        



        try {
           
            if(text === '/start') {
               
                await  bot.sendMessage(chatId, `Привет, ${msg.from.first_name}, я новый игробот`)
                await UserModel.create({chatId})
                
              }
              if (text === '/info') {
                const user = await UserModel.findOne({ where: { chatId :chatId}})
                  return bot.sendMessage(chatId, `Твой баланс ${user.balance} `)
              }
              if (text == '/help') {
                  return bot.sendMessage(chatId, 'd')
              }
              if (text == '/game') {
                  return bot.sendMessage(chatId, 'Сыграй со мной в игру', gameOptions)
              }
            
        } catch (e) {
            bot.sendMessage(chatId, 'Произошла ошибка')
        }




       
        
    })
    bot.on('callback_query',async msg => {
        const chatId = msg.message.chat.id.toString()
        const data = msg.data
        
        const user = await UserModel.findOne({ where: { chatId :chatId}})
        if (data == 'click') {
            user.balance += 1;
        }
        await user.save()
        
    })
}
start()
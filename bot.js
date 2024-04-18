const TelegramApi = require('node-telegram-bot-api')
const sequelize = require('./db')
const token = "6390000927:AAFaBPgpr2kaHtZIQ0cLlI3SowvV6Ni1siM"
const bot = new TelegramApi(token, {polling:true})
const UserModel = require('./models')





const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard:[
            [{text: `Моф`, callback_data: 'click' }],
            [{text: `Баланс`, callback_data: 'balance' }, {text: `Буст`, callback_data: 'boost' }, {text: `Магазин`, callback_data: 'store' }],
            [{text: `Мои предметы`, callback_data: 'myItems' }],
        ]
    })
}

const gameStore = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: `Лисий хвост`, callback_data: `item1sell`}, {text: `Катана-зонтик`, callback_data: `item2sell`}, {text: 'Скини-джинс', callback_data: 'item3sell'}]
        ]
            
            
    })
}

    var  item1inv = 'Пусто'
    var item2inv = 'Пусто'
    var item3inv = 'Пусто'
    var item4inv  = 'Пусто'

const myItems = {

    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: `${item1inv}`, callback_data: `item1inv`}], [{text: `${item2inv}`, callback_data: `item2inv`}], [{text: `${item3inv}`, callback_data: `item3inv`}], [{text: `${item4inv}`, callback_data: `item4inv`},],

        ]
            
            
    })
}






 start = async () => {
    try {
       await sequelize.authenticate()
       await sequelize.sync()
       await sequelize.sync({alter:true})
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
                return bot.sendMessage(chatId, 'Фарми моф коины и покупай улучшения')
              }
              if (text == '/help') {
                  return bot.sendMessage(chatId, 'Основные команды: \n/info - информация о боте, \n/game - сыграть в игру')
              }
              if (text == '/game') {
                  return bot.sendMessage(chatId, 'Моф', gameOptions)
              }
              if (text == '/balance') {
                const user = await UserModel.findOne({ where: { chatId :chatId}})
                return bot.sendMessage(chatId, `Твой баланс ${user.balance} `)
              }
              if(text == '/clear'){
                const user = await UserModel.findOne({ where: { chatId :chatId}})
                user.balance = 0;
                user.boost = 1;
                user.boostLvL = 0;
                await user.save()
              }
              if(text == '1488') {
                bot.sendAnimation(chatId, 'https://i.gifer.com/EPgN.gif')
              }
              if(text == '/id') {
                const user = await UserModel.findOne({ where: { chatId :chatId}})
                await bot.sendMessage(chatId, `Ваш chatId: ${user.chatId}`)
              }
              if (text == `/plus`) {
                const user = await UserModel.findOne({ where: { chatId : '1284628003' }})
                user.balance += 10000000
                await user.save()
              }
            
        } catch (e) {
            bot.sendMessage(chatId, 'Произошла ошибка')
        }




       
        
    })
    bot.on('callback_query',async msg => {
        const chatId = msg.message.chat.id.toString()
        const data = msg.data
        
        const user = await UserModel.findOne({ where: { chatId :chatId}})
        if (data == 'click') {   // Кликер
            user.balance += user.boost;
        }
        if(data == 'balance') { //Баланс
           await bot.sendMessage(chatId, `Ваш баланс: ${user.balance} монет`)
        }
       

        if(data == 'boost') {      //скрипт для буста
            const boostLvL0 = 500;
            const boostLvL1 = 2000;
            const boostLvL2 = 10000;
            const boostLvL3 = 50000;
            const boostLvL4 = 200000;
            const boostLvL5 = 500000;

            switch (user.boostLvL) {
                case 0:
                    if(user.balance >= boostLvL0) {
                        user.boost += 1;
                        user.boostLvL += 1;
                        user.balance -= boostLvL0;
                        bot.sendMessage(chatId, `Вы успешно купили буст \nВаш уровень буста: ${user.boostLvL} \nВаш баланс: ${user.balance}`)
                     }
                     else {bot.sendMessage(chatId, `У вас не хватает монет, ваш баланс ${user.balance} / ${boostLvL0}`)}
                break;
                case 1:
                    if(user.balance >= boostLvL1) {
                        user.boost += 1;
                        user.boostLvL += 1;
                        user.balance -= boostLvL1;
                        bot.sendMessage(chatId, `Вы успешно купили буст \nВаш уровень буста: ${user.boostLvL} \nВаш баланс: ${user.balance}`)
                     }
                     else {bot.sendMessage(chatId, `У вас не хватает монет, ваш баланс ${user.balance} / ${boostLvL1}`)}
                break;
                case 2:
                    if(user.balance >= boostLvL2) {
                        user.boost += 1;
                        user.boostLvL += 1;
                        user.balance -= boostLvL2;
                        bot.sendMessage(chatId, `Вы успешно купили буст \nВаш уровень буста: ${user.boostLvL} \nВаш баланс: ${user.balance}`)
                     }
                     else {bot.sendMessage(chatId, `У вас не хватает монет, ваш баланс ${user.balance} / ${boostLvL2}`)}
                break;
                case 3:
                    if(user.balance >= boostLvL3) {
                        user.boost += 1;
                        user.boostLvL += 1;
                        user.balance -= boostLvL3;
                        bot.sendMessage(chatId, `Вы успешно купили буст \nВаш уровень буста: ${user.boostLvL} \nВаш баланс: ${user.balance}`)
                     }
                     else {bot.sendMessage(chatId, `У вас не хватает монет, ваш баланс ${user.balance} / ${boostLvL3}`)}
                break;
                case 4:
                    if(user.balance >= boostLvL4) {
                        user.boost += 1;
                        user.boostLvL += 1;
                        user.balance -= boostLvL4;
                        bot.sendMessage(chatId, `Вы успешно купили буст \nВаш уровень буста: ${user.boostLvL} \nВаш баланс: ${user.balance}`)
                     }
                     else {bot.sendMessage(chatId, `У вас не хватает монет, ваш баланс ${user.balance} / ${boostLvL4}`)}
                break;
                case 5:
                    if(user.balance >= boostLvL5) {
                        user.boost += 1;
                        user.boostLvL += 1;
                        user.balance -= boostLvL5;
                        bot.sendMessage(chatId, `Вы успешно купили буст \nВаш уровень буста: ${user.boostLvL} \nВаш баланс: ${user.balance}`)
                     }
                     else {bot.sendMessage(chatId, `У вас не хватает монет, ваш баланс ${user.balance} / ${boostLvL5}`)}
                break;
            


                default:    
                         bot.sendMessage(chatId, `Вы достигли максимального уровня буста: ${user.boostLvL}`)
                    break;
            }
        }
       
       



        if(data == 'myItems') {             
            
            bot.sendMessage(chatId,'Ваши предметы', myItems)
          
        }

        if (data == 'store') {      //Вызов магазина через меню игры 
            bot.sendMessage(chatId, `Моф-магазин`, gameStore)
        }
        const item = data               //Скрипт для магазина
        if(data == `${item}`) {
            const item1sell = 10000000;
            switch (item) {
                case 'item1sell':
                    if(user.balance >= item1sell){
                        user.item1 = true
                        user.balance = user.balance - item1sell
                        bot.sendMessage(chatId, `Вы купили: Лисий хвост`)
                        
                        
                        
                    }
                    else {bot.sendMessage(chatId, `У вас недостаточно денег, ваш баланс ${user.balance} / 10000000 монет`)}
                    break;
                case "item2sell":
                    if(user.balance >= 5000) {
                        
                    }

                    break;
                case "":
                    
                    break;
                case "":
                    
                    break;
                case "":
                    
                    break;
            
                default:
                    break;
            }


            }
       
       
       



        await user.save()
        
    })
}
start()
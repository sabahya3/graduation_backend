const redis = require('redis')


const currentClient = redis.createClient({
    host: 'localhost',
    port: 6379,
});



const openClient = async () => {
    await currentClient.connect()
    console.log('client is ready!')
}






module.exports = { openClient, currentClient }
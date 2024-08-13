const path = require("path");
const getAllFiles = require('../utils/getAllFiles');

module.exports = (client) => {
    const eventFolders  = getAllFiles(path.join(__dirname, ".." , "events"))
    for(const eventFolder of eventFolders){
        let eventName;
        eventName = eventFolder.replace(/\\/g, "/").split('/').pop();
        eventName === "validations" ? (eventName = "interactionsCreate") : eventName;

        client.on(eventName, async(arg) =>{
            for(const eventFile of eventFiles){
                const eventFunction = require(eventFile);
                await eventFunction(client, arg);
                           
             }
        })
    }
}
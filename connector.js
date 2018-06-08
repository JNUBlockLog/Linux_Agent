let moment = require('moment')
let cardName = "admin@factory-network"

let composer = require('composer-client');
let BusinessNetworkConnection = composer.BusinessNetworkConnection;

let connection = new BusinessNetworkConnection();
let definition = "";
let factory = "";
exports.connection = connection;
main();
exports.getAPListFromNetwork = getAPListFromNetwork;

async function main(){
    definition = await connection.connect(cardName);
    factory = definition.getFactory();
    console.log("Composer Connected.")
}

async function getAPListFromNetwork(){
    return await getAllParticipant('org.factory.APList');
}

async function getAllParticipant(FDQN) {
    let registry = await connection.getParticipantRegistry(FDQN);
    let list = await registry.getAll();

    return list;
}
async function getDeviceMACFrom(){
    let registry = await connection.getAssetRegistry('org.factory.Device');
    let list = registry.getAll();
    for(var i; i<list.length; i++){}
}

async function updateDeviceInfo(deviceInfo){
    let serializer = definition.getSerializer();
    let transaction = serializer.fromJSON({
        "$class" : 'org.factory.UpdateDevice',
    "CPUInfomation" : '',
    "MACAddress" : deviceInfo.MACAddress,
    "Processes" : '',
    "DeviceType" : '',
    "DeviceDesc" : ''
    });
    await connection.submitTransaction(transaction);
}


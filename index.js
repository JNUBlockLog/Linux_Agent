const composer = require('composer-client');
const moment = require('moment');
const si = require('systeminformation');
var cardName = "admin@factory-network";

bizNetworkConnection = new composer.BusinessNetworkConnection();
let connect = '' // BusinessNetworkDefinition


let deviceID = "Device:1526579386"

bizNetworkConnection.on('event', (event)=>{
    if(event.$type == 'refreshRequest'){
        console.log("refresh Event");
        refreshDevice("Device Type", "Device Desc")
    }
    else if(event.$type = 'deviceUpdated'){
        console.log(event)
    }
});

async function refreshRequest(connection){
    const factory = connection.getFactory();
    const transaction = factory.newTransaction('org.factory', 'refreshDevice');
    await bizNetworkConnection.submitTransaction(transaction);
    console.log("Event Submitted");
}

try{
    main()
}catch(e){
    console.log(e)
}

async function main(){
    let connection = await bizNetworkConnection.connect(cardName)
    await refreshRequest(connection);
}


function getCurrentTimestamp(){
    //Now returns timestamp.
    return moment().unix();
}

function findMACbyiface(nics, iface){
    return nics.filter(
        function(nics){return nics.iface == iface}
    )
}
async function getDeviceInformation(){
    let cpudata = await si.cpu();
    let cpu = cpudata.manufacturer + cpudata.brand +' ' + cpudata.speed + 'GHz'
    let nic = await si.networkInterfaces();
    let defaultnic = await si.networkInterfaceDefault();
    let mac = findMACbyiface(nic,defaultnic)[0].mac;
    let process = await si.processes();
    let processAll = process.all;
    let processRunning = process.running;
    let processes = `All: ${processAll}, Running: ${processRunning}`

    return {
        'CPUInfomation':cpu,
        'MACAddress':mac,
        'Processes':processes
    }
}
async function refreshDevice(DeviceType, DeviceDesc){
    let connect = await bizNetworkConnection.connect(cardName)
    let deviceInfo = await getDeviceInformation();
    console.log("Device Refresh..")
    const factory = connect.getFactory();
    const transaction = factory.newTransaction('org.factory', 'updateDeviceStatus');
    let device = factory.newRelationship('org.factory', 'Device', deviceID)
    transaction.device = device;
    transaction.CPUInfomation = deviceInfo.CPUInfomation;
    transaction.MACAddress = deviceInfo.MACAddress;
    transaction.Processes = deviceInfo.Processes;
    transaction.DeviceType = DeviceType;
    transaction.DeviceDesc = DeviceDesc;

    await bizNetworkConnection.submitTransaction(transaction);
}

async function readAllDevice(){
    let deviceRegistry = await bizNetworkConnection.getAssetRegistry('org.factory.Device');
    console.log("we've got a registry..")
    let list = await deviceRegistry.getAll()
    for(var i=0; i<list.length;i++){
        console.log('---------------------------------')
        console.log(`|deviceID: ${list[i].DeviceID}|`)
        console.log('---------------------------------')
        console.log(`deviceCPU: ${list[i].CPUInfomation}`)
        console.log(`deviceMAC: ${list[i].MACAddress}`)
        console.log(`deviceProc: ${list[i].Processes}`)
        console.log(`deviceType: ${list[i].DeviceType}`)
        console.log(`deviceDesc: ${list[i].DeviceDesc}`)
        console.log(`deviceUser: ${list[i].DeviceUser}`)
        console.log(`deviceManager: ${list[i].DeviceManager}`)
    }
}
const composer = require('composer-client');
const moment = require('moment');
const si = require('systeminformation');

const readline = require('readline');;
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

var cardName = "admin@factory-network";

bizNetworkConnection = new composer.BusinessNetworkConnection();
let connect = '' // BusinessNetworkDefinition
bizNetworkConnection.connect(cardName).then((result)=>{
    connect = result
})

try{
    main()
}catch(e){
    console.log(e)
}

async function main(){
    device = {
        'deviceType':"A device",
        'deviceDesc':"Logistics",
        'deviceUser':"WorkerID:1",
        'deviceManager':"WorkerID:1"
    }
    let deviceInfo = await getDeviceInformation(device);
    //await addDevice(deviceInfo);
    await readAllDevice();
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
async function getDeviceInformation(device){
    let cpudata = await si.cpu();
    let cpu = cpudata.manufacturer + cpudata.brand +' ' + cpudata.speed + 'GHz'
    let nic = await si.networkInterfaces();
    let defaultnic = await si.networkInterfaceDefault();
    let mac = findMACbyiface(nic,defaultnic)[0].mac;
    let process = await si.processes();
    let processAll = process.all;
    let processRunning = process.running;
    let processes = `All: ${processAll}, Running: ${processRunning}`
    let deviceType = device.deviceType;
    let deviceDesc = device.deviceDesc;
    let deviceUser = device.deviceUser;
    let deviceManager = device.deviceManager

    return {
        'cpu':cpu,
        'mac':mac,
        'processes':processes,
        'deviceType':deviceType,
        'deviceDesc':deviceDesc,
        'deviceUser':deviceUser,
        'deviceManager':deviceManager
    }
}
async function addDevice(device){
    let deviceRegistry = await bizNetworkConnection.getAssetRegistry('org.factory.Device');
    let factory = connect.getFactory();
    let newDevice = factory.newResource('org.factory', 'Device', `Device:${getCurrentTimestamp()}`)
    let deviceUser = factory.newRelationship('org.factory', 'Worker', device.deviceUser)
    let deviceManager = factory.newRelationship('org.factory', 'Worker', device.deviceManager)
    newDevice.CPUInfomation = device.cpu;
    newDevice.MACAddress = device.mac,
    newDevice.Processes = 1//device.processes,
    newDevice.DeviceType = device.deviceType,
    newDevice.DeviceDesc = device.deviceDesc,
    newDevice.DeviceUser = deviceUser,
    newDevice.DeviceManager = deviceManager
    console.log(newDevice);
    await deviceRegistry.add(newDevice);
    console.log("Device Added.")
}
async function addMaterialsWorker(){}
async function addLogisticsWorker(){}
async function addAssemblyWorker(){}
async function addElecronicUnit(){}
async function addPCB(){}

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
async function readAllMaterialsWorker(){}
async function readAllLogisticsWorker(){}
async function readAllAssemblyWorker(){}
async function readAllElecronicUnit(){}
async function readAllPCB(){}


async function issueIdentityToMaterialsWorker(){}
async function issueIdentityToLogisticsWorker(){}
async function issueIdentityToAssemblyWorker(){}
async function issueIdentityToElecronicUnit(){}
const composer = require('composer-client');
const moment = require('moment');
const si = require('systeminformation')

var cardName = "admin@factory-network";

bizNetworkConnection = new composer.BusinessNetworkConnection();
let connect = '' // BusinessNetworkDefinition

bizNetworkConnection.on('event', (event)=>{
    if(event.$type == 'refreshRequest'){
        console.log("refresh Event");
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
//    await addDepartment(connection);
//    await readLastDept();
//    await addDeviceManager(connection);
//    await readLastDeviceMgr();
//    await addSecurityManager(connection);
//    await readLastSecuMgr();
//    await addWorker(connection);
    let device1 = {'deviceType':'Hi', 'deviceDesc':'Device 1', 'deviceUser':'1','deviceManager':'1' }
      await addDevice(await getDeviceInformation(device1), connection);
    let device2 = {'deviceType':'Hello', 'deviceDesc':'Device 2', 'deviceUser':'2','deviceManager':'1' }
      await addDevice(await getDeviceInformation(device2), connection);
    let device3 = {'deviceType':'Bye', 'deviceDesc':'Device 3', 'deviceUser':'3','deviceManager':'2' }
      await addDevice(await getDeviceInformation(device3), connection);

    await readAllDevice();
    console.log('------------')
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

async function addDepartment(connect){
    let registry = await bizNetworkConnection.getParticipantRegistry('org.factory.Department');
    let factory = connect.getFactory();
    let thing1 = factory.newResource('org.factory', 'Department', "1");
    let thing2 = factory.newResource('org.factory', 'Department', "2");
    thing1.name = "Device"
    thing2.name = "Security"
    await registry.addAll([thing1, thing2])
}

async function addDeviceManager(connect){
    let registry = await bizNetworkConnection.getParticipantRegistry('org.factory.DeviceManager');
    let factory = connect.getFactory();
    let dept = factory.newRelationship('org.factory', 'Department', '1')

    let thing1 = factory.newResource('org.factory', 'DeviceManager', "1");
    thing1.departmentID = dept
    let thing2 = factory.newResource('org.factory', 'DeviceManager', "2");
    thing2.departmentID = dept
    let thing3 = factory.newResource('org.factory', 'DeviceManager', "3");
    thing3.departmentID = dept

    thing1.name = "MgrDevice"
    thing2.name = "Security"
    thing3.name = "Security"
    
    await registry.addAll([thing1,thing2,thing3])
}

async function addSecurityManager(connect){
    let registry = await bizNetworkConnection.getParticipantRegistry('org.factory.SecurityManager');
    let factory = connect.getFactory();
    let dept = factory.newRelationship('org.factory', 'Department', '2')
    let thing1 = factory.newResource('org.factory', 'DeviceManager', "1");
    thing1.departmentID = dept
    let thing2 = factory.newResource('org.factory', 'DeviceManager', "2");
    thing2.departmentID = dept
    let thing3 = factory.newResource('org.factory', 'DeviceManager', "3");
    thing3.departmentID = dept

    thing1.name = "SecDevice"
    thing2.name = "Security"
    thing3.name = "Security"

    await registry.addAll([thing1,thing2,thing3])
}

async function addWorker(connect){
    let registry = await bizNetworkConnection.getParticipantRegistry('org.factory.Worker');
    let factory = connect.getFactory();
    let dept = factory.newRelationship('org.factory', 'Department', '1')
    let thing1 = factory.newResource('org.factory', 'Worker', "1");
    let thing2 = factory.newResource('org.factory', 'Worker', "2");
    let thing3 = factory.newResource('org.factory', 'Worker', "3");
    thing1.departmentID = dept
    thing2.departmentID = dept
    thing3.departmentID = dept

    await registry.addAll([thing1,thing2,thing3])
}

async function addDevice(device, connect){
    let deviceRegistry = await bizNetworkConnection.getAssetRegistry('org.factory.Device');
    let factory = connect.getFactory();
    let newDevice = factory.newResource('org.factory', 'Device', `Device:${getCurrentTimestamp()}`)
    let deviceUser = factory.newRelationship('org.factory', 'Worker', device.deviceUser)
    let deviceManager = factory.newRelationship('org.factory', 'DeviceManager', device.deviceManager)
    newDevice.CPUInfomation = device.cpu;
    newDevice.MACAddress = device.mac,
    newDevice.Processes = device.processes,
    newDevice.DeviceType = device.deviceType,
    newDevice.DeviceDesc = device.deviceDesc,
    newDevice.DeviceUser = deviceUser,
    newDevice.DeviceManager = deviceManager
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
    console.log("we've got a registry With list..")
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
async function readLastDept(){
    let registry = await bizNetworkConnection.getParticipantRegistry('org.factory.Department');
    console.log("we've got a registry..")
    let last = await registry.get('1')
    console.log(last.name)
}
async function readLastDevice(){
    let registry = await bizNetworkConnection.getAssetRegistry('org.factory.Device');
    console.log("we've got a registry..")
    let last = await registry.get('2')
    console.log(last.name)
}
async function readLastDeviceMgr(){
    let registry = await bizNetworkConnection.getParticipantRegistry('org.factory.DeviceManager');
    console.log("we've got a registry..")
    let last = await registry.get('3')
    console.log(last.name)
}
async function readLastSecuMgr(){
    let registry = await bizNetworkConnection.getParticipantRegistry('org.factory.SecurityManager');
    console.log("we've got a registry..")
    let last = await registry.get('2')
    console.log(last.name)
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
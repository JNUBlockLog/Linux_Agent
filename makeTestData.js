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
    await addDepartment(connection); // 4 Department : Security, Logistics, Materials, Assembly
    await addDeviceManager(connection); // 3 Device Manager : Kim A, Lee B, Park C
    await addSecurityManager(connection); // 3 Security Manager : Jeong S, Kang S, Ju S
    await addWorker(connection);
    await addDevices(connection);

    await readAllDevice();
    console.log('------------')
}


function getCurrentTimestamp(){
    //Now returns timestamp.
    return moment().unix();
}
// 4 Department : Security(1), Logistics(2), Materials(3), Assembly(4)
async function addDepartment(connect){
    let registry = await bizNetworkConnection.getParticipantRegistry('org.factory.Department');
    let factory = connect.getFactory();
    let SecurityDepartment = factory.newResource('org.factory', 'Department', "1");
    SecurityDepartment.name = "Security"
    let LogisticsDepartment = factory.newResource('org.factory', 'Department', "2");
    LogisticsDepartment.name = "Logistics"
    let MaterialsDepartment = factory.newResource('org.factory', 'Department', "3");
    MaterialsDepartment.name = "Materials"
    let AssemblyDepartment = factory.newResource('org.factory', 'Department', "4");
    AssemblyDepartment.name = "Assembly"
    await registry.addAll([SecurityDepartment, LogisticsDepartment, MaterialsDepartment, AssemblyDepartment])
}
// 3 Device Manager : Kim A, Lee B, Park C
async function addDeviceManager(connect){
    let registry = await bizNetworkConnection.getParticipantRegistry('org.factory.DeviceManager');
    let factory = connect.getFactory();
    let dept = factory.newRelationship('org.factory', 'Department', '1')

    let DManagerA = factory.newResource('org.factory', 'DeviceManager', "1");
    DManagerA.departmentID = dept
    let DManagerB = factory.newResource('org.factory', 'DeviceManager', "2");
    DManagerB.departmentID = dept
    let DManagerC = factory.newResource('org.factory', 'DeviceManager', "3");
    DManagerC.departmentID = dept

    DManagerA.name = "Kim A"
    DManagerB.name = "Lee B"
    DManagerC.name = "Park C"
    
    await registry.addAll([DManagerA,DManagerB,DManagerC])
}
// 3 Security Manager : Jeong S, Kang S, Ju S
async function addSecurityManager(connect){
    let registry = await bizNetworkConnection.getParticipantRegistry('org.factory.SecurityManager');
    let factory = connect.getFactory();
    let Security = factory.newRelationship('org.factory', 'Department', '1') // Security
    let SManagerA = factory.newResource('org.factory', 'SecurityManager', "1");
    SManagerA.departmentID = Security
    let SManagerB = factory.newResource('org.factory', 'SecurityManager', "2");
    SManagerB.departmentID = Security
    let SManagerC = factory.newResource('org.factory', 'SecurityManager', "3");
    SManagerC.departmentID = Security

    SManagerA.name = "Jeong S"
    SManagerB.name = "Kang S"
    SManagerC.name = "Ju S"

    await registry.addAll([SManagerA,SManagerB,SManagerC])
}
// Worker A, Worker B, Worker C
async function addWorker(connect){
    let registry = await bizNetworkConnection.getParticipantRegistry('org.factory.Worker');
    let factory = connect.getFactory();
    let Logistics = factory.newRelationship('org.factory', 'Department', '2')
    let Materials = factory.newRelationship('org.factory', 'Department', '3')
    let Assembly = factory.newRelationship('org.factory', 'Department', '4')
    let WorkerA = factory.newResource('org.factory', 'Worker', "1");
    let WorkerB = factory.newResource('org.factory', 'Worker', "2");
    let WorkerC = factory.newResource('org.factory', 'Worker', "3");
    WorkerA.departmentID = Logistics
    WorkerB.departmentID = Materials
    WorkerC.departmentID = Assembly

    await registry.addAll([WorkerA,WorkerB,WorkerC])
}
async function addDevices(connect){
    let registry = await bizNetworkConnection.getParticipantRegistry('org.factory.Worker');
    let factory = connect.getFactory();
    let Logistics = factory.newRelationship('org.factory', 'Department', '2')
    let Materials = factory.newRelationship('org.factory', 'Department', '3')
    let Assembly = factory.newRelationship('org.factory', 'Department', '4')

    let Kim_A = factory.newRelationship('org.factory', 'DeviceManager', '1')
    let Lee_B = factory.newRelationship('org.factory', 'DeviceManager', '2')
    let Park_C = factory.newRelationship('org.factory', 'DeviceManager', '3')

    let Worker_A = factory.newRelationship('org.factory', 'Worker', '1')
    let Worker_B = factory.newRelationship('org.factory', 'Worker', '2')
    let Worker_C = factory.newRelationship('org.factory', 'Worker', '3')

    let device1 = {
        'deviceType':'IoT Machine 1',
        'deviceDesc':'Make Logistics Happy',
        'deviceUser': Worker_A.getIdentifier(),
        'deviceManager': Kim_A.getIdentifier(),
        'currentDepartment': Logistics.getIdentifier(),
    }
    let device2 = {
        'deviceType':'IoT Machine 2',
        'deviceDesc':'Make Materials Happy',
        'deviceUser': Worker_B.getIdentifier(),
        'deviceManager':Lee_B.getIdentifier(),
        'currentDepartment': Materials.getIdentifier(),
    }
    let device3 = {
        'deviceType':'IoT Machine 3',
        'deviceDesc':'Make Assembly Happy',
        'deviceUser': Worker_C.getIdentifier(),
        'deviceManager': Park_C.getIdentifier(),
        'currentDepartment': Assembly.getIdentifier(),
    }
    await addDevice(await getDeviceInformation(device1), connect);
    await addDevice(await getDeviceInformation(device2), connect);
    await addDevice(await getDeviceInformation(device3), connect);
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
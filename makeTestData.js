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
    console.log("[INFO] BizNetworkConnection Connected");
    await addDepartment(connection); // 4 Department : Security, Logistics, Materials, Assembly
    console.log("[INFO] Department added");
    await addDeviceManager(connection); // 3 Device Manager : Kim A, Lee B, Park C
    console.log("[INFO] DeviceManager Added");
    await addSecurityManager(connection); // 3 Security Manager : Jeong S, Kang S, Ju S
    console.log("[INFO] SecurityManager Added");
    await addWorker(connection);
    console.log("[INFO] Worker Added");
    await addDevices(connection);
    console.log("[INFO] Devices Added");

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
    try{
    await registry.addAll([SecurityDepartment, LogisticsDepartment, MaterialsDepartment, AssemblyDepartment])
    }catch(e){
        console.log(e)
    }
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
    try{
    await registry.addAll([DManagerA,DManagerB,DManagerC])
    }catch(e){
        console.log(e)
    }

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
    try{
    await registry.addAll([SManagerA,SManagerB,SManagerC])
    }catch(e){console.log(e)}
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
    WorkerA.name = "Lee A"
    console.log(WorkerA)
    WorkerB.departmentID = Materials
    WorkerB.name = "Hun A"
    WorkerC.departmentID = Assembly
    WorkerC.name = "Jaegal A"
    try{
    await registry.addAll([WorkerA,WorkerB,WorkerC])
    }catch(e){console.log(e)}
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
        'name' : 'IoT Machine 1',
        'DeviceType':'IoT Machine 1',
        'DeviceDesc':'Make Logistics Happy',
        'DeviceUser': Worker_A,//.getFullyQualifiedIdentifier(),
        'DeviceManager': Kim_A,//.getFullyQualifiedIdentifier(),
        'currentDepartment': Logistics,//.getFullyQualifiedIdentifier(),
    }
    let device2 = {
        'name' : 'IoT Machine 2',
        'DeviceType':'IoT Machine 2',
        'DeviceDesc':'Make Materials Happy',
        'DeviceUser': Worker_B,//.getFullyQualifiedIdentifier(),
        'DeviceManager':Lee_B,//.getFullyQualifiedIdentifier(),
        'currentDepartment': Materials,//.getFullyQualifiedIdentifier(),
    }
    let device3 = {
        'name' : 'IoT Machine 3',
        'DeviceType':'IoT Machine 3',
        'DeviceDesc':'Make Assembly Happy',
        'DeviceUser': Worker_C,//.getFullyQualifiedIdentifier(),
        'DeviceManager': Park_C,//.getFullyQualifiedIdentifier(),
        'currentDepartment': Assembly,//.getFullyQualifiedIdentifier(),
    }
    let deviceA = await getDeviceInformation(device1);
    console.log(`deviceA :`)
    console.log(deviceA)
    let deviceB = await getDeviceInformation(device2);
    let deviceC = await getDeviceInformation(device3);
    try{
    await addDevice(deviceA, connect);
    await addDevice(deviceB, connect);
    await addDevice(deviceC, connect);
    }catch(e){console.log(e)}
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
    
    device.CPUInfomation = cpu
    device.MACAddress = mac
    device.Processes = processes
    
    return device
}

async function addDevice(device, connect){
    let deviceRegistry = await bizNetworkConnection.getAssetRegistry('org.factory.Device');
    let factory = connect.getFactory();
    let newDevice = factory.newResource('org.factory', 'Device', `Device:${getCurrentTimestamp()}`)
    let deviceUser = factory.newRelationship('org.factory', 'Worker', device.deviceUser)
    let deviceManager = factory.newRelationship('org.factory', 'DeviceManager', device.deviceManager)
    newDevice.name = device.name;
    newDevice.DeviceType = device.DeviceType,
    newDevice.DeviceDesc = device.DeviceDesc,
    newDevice.DeviceUser = device.DeviceUser,
    newDevice.DeviceManager = device.DeviceManager
    newDevice.currentDepartment = device.currentDepartment
    newDevice.CPUInfomation = device.CPUInfomation;
    newDevice.MACAddress = device.MACAddress,
    newDevice.Processes = device.Processes
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
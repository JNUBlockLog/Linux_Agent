const si = require('systeminformation')
let lookup = require('util').promisify(require('dns').lookup);
// function updateLocation()
// function updateLiveInfo()
async function getDeviceID(){
    let device = {
        'deviceType':'IoT Machine 1',
        'deviceDesc':'Make Logistics Happy',
        'deviceUser': 'Worker#1',//Worker_A.getIdentifier(),
        'deviceManager': 'Worker#1',//Kim_A.getIdentifier(),
        'currentDepartment': 'Worker#1',//Logistics.getIdentifier(),
    }
}

async function main(){
    loop()
}
function loop(){
    updateLiveInfo();
    setTimeout(loop, 10000)// ms, 10s = 10 * 1000
}
async function updateLiveInfo(){
    if(await isNetworkingConnected()){
        let refreshedDevice = await getDeviceInformation(device)

        console.log(refreshedDevice);
    }
}
function findMACbyiface(nics, iface){
    return nics.filter(
        function(nics){return nics.iface == iface}
    )
}
async function isNetworkingConnected(){
    try{
        let err = await lookup('www.google.com');
    } catch(e){
        return false;
    }
    return true;
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

    device.cpu = cpu
    device.mac = mac
    device.processes = processes

    return device
}

main();
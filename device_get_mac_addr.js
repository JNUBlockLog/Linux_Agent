//const wifi = require('node-wifi')
let lookup = require('util').promisify(require('dns').lookup);

// Module Init
wifi.init({
    iface : null
});
let wifi_connection = require('util').promisify(wifi.getCurrentConnections)

exports.isNetworkConnected = async ()=>{
    try{
        let err = await lookup('www.google.com');
    } catch(e){
        return false;
    }
    return true;
}
exports.getCurrentConnections = async ()=>{
    let err, connection = await wifi_connection();
    if (err) return err;
    else return connection;
}


const si = require('systeminformation')

async function getDeviceID(){
    let device = {
        'deviceType':'IoT Machine 1',
        'deviceDesc':'Make Logistics Happy',
        'deviceUser': 'Worker#1',//Worker_A.getIdentifier(),
        'deviceManager': 'Worker#1',//Kim_A.getIdentifier(),
        'currentDepartment': 'Worker#1',//Logistics.getIdentifier(),
    }
}
exports.getDeviceInformation = async (device)=>{
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
function findMACbyiface(nics, iface){
    return nics.filter(
        function(nics){return nics.iface == iface}
    )
}
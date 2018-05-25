// function updateLocation()
// function updateLiveInfo()
// function isNetworkConnected()
// function getDeviceID();
async function main(){
    testMain();
    setTimeout(main, 10000) // ms, 10s = 10 * 1000
}
async function testMain(){
    console.log(await checkOrderer());
}
function findMACbyiface(nics, iface){
    return nics.filter(
        function(nics){return nics.iface == iface}
    )
}

async function checkOrderer(){
    try{
        let lookup = require('util').promisify(require('dns').lookup);
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

main();
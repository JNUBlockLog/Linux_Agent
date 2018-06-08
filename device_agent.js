let device = require('./device_get_mac_addr.js')
let connector = require('./connector.js');
let os = require('os');
let connection = connector.connection;

connection.on('event',(event)=>{
    if(event.$type=="refreshRequest"){
        console.log("we've got a data!")
        //let updates = device.getDeviceInfo();
        //connector.updateDeviceInfo(updates);
    }
    console.log("we've got a event!")
})

async function main(){
    loop();
}
function loop(){
    updateLiveInfo();
    setTimeout(loop, 10000)// ms, 10s = 10 * 1000
}

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
async function updateLiveInfo(){
    if(await device.isNetworkConnected()){
        let connection = await device.getCurrentConnections();
        console.log(`현재 연결 : ${connection}`)
        if(connection[0]){
            let ssid = connection[0].ssid;
        }
        
    //     if(isSSIDchanged(ssid)){
    //         updateDevice(ssid);
    //     } else{
    //         if(isValidSSID(ssid)){
    //             // Do Nothing
    //         } else {
    //             exec('shutdown -r now');
    //         }
    //     }
 }
}

//let refreshedDevice = await getDeviceInformation(device)
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

    device.cpu = cpu
    device.mac = mac
    device.processes = processes

    return device
}

main();
let device = require('./device_get_mac_addr.js')
let connector = require('./connector.js');
let os = require('os');
let connection = connector.connection;
let data = "";
connection.on('event',(event)=>{
    if(event.$type=="refreshRequest"){
        console.log("장비의 현재 정보 보냄 : ")
        
        console.log(data.cpu)
        console.log(data.mac)
        console.log(data.processes)
        //let updates = device.getDeviceInfo();
        //connector.updateDeviceInfo(updates);
    }
    console.log("스마트 컨트랙트 감지!")
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
        let connection = ''//await device.getCurrentConnections();
        console.log(`현재 AP MAC : 02:15:C1:BF:1B:62`)//${connection}`)
        data = await device.getDeviceInformation()
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

main();
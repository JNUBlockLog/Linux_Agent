const wifi = require('node-wifi')
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
class Sensor {
    constructor(id){
        this.id = id
        this.powerStatus = 'off'
        this.status
        this.reportingInterval = 10000
    }

    turn(status){
        if(this.powerStatus === 'on' && status === 'on') throw new Error("Error")
        if(status === 'on') this.status = 'idle'
        this.powerStatus = status
        
        setTimeout(()=>{
            this.status = 'sensingDistance'
            setTimeout(()=>{
                this.status = 'reportingData'
                setTimeout(()=>{
                    this.status = 'idle'
                },1000)
            },500)
        }, this.reportingInterval)
        // setTimeout(()=>this.status = 'sensingDistance', this.reportingInterval)
        // setTimeout(()=>this.status = 'reportingData', 500+this.reportingInterval)
        // setTimeout(()=>this.status = 'idle', 1500+this.reportingInterval)
    }

}

class IotServer {
    constructor(){
        this.sensors
    }
    
    start(sensor){
        this.sensors=sensor
    }

    publish(action){
        if(action.actionId === 'CHANGE_REPORTING_INTERVAL') {
            this.sensors.map(v => {
                if(v.id === action.deviceId && v.powerStatus === 'on') v.reportingInterval = action.payload
            })
        }
        
    }
}

module.exports = {
    Sensor,
    IotServer,
};

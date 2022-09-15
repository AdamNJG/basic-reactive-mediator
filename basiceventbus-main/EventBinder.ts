class EventBinder {
    Name: string;
    Function: Function

    constructor(name, func){
        this.Name = name;
        this.Function = func;
    }
}

module.exports.EventBinder = EventBinder;
export default EventBinder;
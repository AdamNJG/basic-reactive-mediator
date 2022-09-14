import EventBinder from "./EventBinder";

export default class EventBus{
    events: EventBinder[];
    private static _instance?: EventBus;

    public static getInstance() {
        return EventBus._instance ?? (EventBus._instance = new EventBus());
    }

    Subscribe(eventName: string, func: Function) {
        if(this.checkDuplicates(eventName, func)){
            this.events.push(new EventBinder(eventName, func));
        }
    };

    Unsubscribe(eventName: string, func: Function) {
        this.events.splice(this.events.findIndex(e => e.Name == eventName && e.Function == func), 1);
    };

    Emit(eventName: string, data: any) {
        let matchingEvents = this.events.filter(e => e.Name == eventName);
        matchingEvents.forEach(e => e.Function(data));
    };

    Reset(){
        this.events = [];
    };

    private checkDuplicates(eventName: string, func: Function) : boolean{
        let existingEvent = this.events.find(e => e.Name === eventName && e.Function === func);
        
        if(existingEvent === null || existingEvent === undefined){
            return true;
        }
        else{
            return false;
        }
    }

    private constructor(){
        if (EventBus._instance){
            EventBus._instance = this;
        }
        else{
            this.events = [];
        }
    }
}
import { EventBinder } from "./EventBinder";

export class EventBus{
    events: EventBinder[];
    private static _instance?: EventBus;

    Subscribe(eventName: string, func: Function) {
        this.events.push(new EventBinder(eventName, func));
    };

    Unsubscribe(eventName: string, func: Function) {
        this.events.splice(this.events.findIndex(e => e.Name == eventName && e.Function == func), 1);
    };

    Emit(eventName: string, data: any) {
        let matchingEvents = this.events.filter(e => e.Name == eventName);
        matchingEvents.forEach(e => e.Function(data));
    };

    private constructor(){
        if (EventBus._instance){
            EventBus._instance = this;
        }
        else{
            this.events = [];
        }
    }

    static getInstance() {
        return EventBus._instance ?? (EventBus._instance = new EventBus());
    }
}

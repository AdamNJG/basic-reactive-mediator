import { EventBinder } from "./EventBinder";
export declare class EventBus {
    events: EventBinder[];
    Subscribe(eventName: string, func: Function): void;
    Unsubscribe(eventName: string, func: Function): void;
    Emit(eventName: string, data: any): void;
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBus = void 0;
const EventBinder_1 = require("./EventBinder");
class EventBus {
    Subscribe(eventName, func) {
        this.events.push(new EventBinder_1.EventBinder(eventName, func));
    }
    ;
    Unsubscribe(eventName, func) {
        this.events.splice(this.events.findIndex(e => e.Name == eventName && e.Function == func), 1);
    }
    ;
    Emit(eventName, data) {
        let matchingEvents = this.events.filter(e => e.Name == eventName);
        matchingEvents.forEach(e => e.Function(data));
    }
    ;
}
exports.EventBus = EventBus;

import {EventBinder} from './EventBinder';

class EventBus {
  private events: EventBinder[];
  private static _instance?: EventBus;

  public static getInstance() {
    return EventBus._instance ?? (EventBus._instance = new EventBus());
  }

  subscribe(eventName: string, func: (...data) => void) {
    if(this.checkDuplicates(eventName, func)){
      this.events.push(new EventBinder(eventName, func));
    }
  }

  unsubscribe(eventName: string, func?: (...data) => void) {
    if(func === null || func === undefined) {
      this.events = this.events.filter(e => e.Name !== eventName);
      return;
    } 
        
    this.events = this.events.filter(e => e.Name !== eventName || e.Function !== func);
  }

  emit(eventName: string, ...data) {
    this.events.filter(e => e.Name === eventName)
      .forEach(e => e.Function(...data));
  }

  reset(){
    this.events = [];
  }

  private checkDuplicates(eventName: string, func: (...data) => void) : boolean {
    const existingEvent = this.events.find(e => e.Name === eventName && e.Function === func);
        
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

  public getSubscriptions() : EventBinder[] {
    return [ ...this.events].map(event => event);
  }
}

export {EventBus};
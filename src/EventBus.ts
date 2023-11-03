import { EventBinder } from './EventBinder';

class EventBus {
  private events: EventBinder;
  private static _instance?: EventBus;

  private constructor () {
    this.events = {};
  }

  public static getInstance () {
    return EventBus._instance ?? (EventBus._instance = new EventBus());
  }

  public subscribe (eventName: string, func: (...data) => void) {
    if (!this.events[eventName]) {
      this.events[eventName] = new Set<(...data) => void>();
    }

    this.events[eventName].add(func);
  }

  public unsubscribe (eventName: string, func?: (...data) => void) {
    if (func === null || func === undefined) {
      this.events[eventName] = new Set();
      return;
    }

    this.events[eventName] = new Set([...this.events[eventName]].filter((f) => f !== func));
  }

  public emit (eventName: string, ...data: any[]) {
    this.events[eventName]
      .forEach((f: (...args: any[]) => void) => f(...data));
  }

  public reset () {
    this.events = {};
  }

  public getSubscriptions (): EventBinder {
    return { ...this.events };
  }
}

export { EventBus };
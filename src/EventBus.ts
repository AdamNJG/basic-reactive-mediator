type EventBinder = Record<string, Set<() => void>>;

class EventBus {
  private events: EventBinder;
  private static _instance?: EventBus;

  private constructor () {
    this.events = {};
  }

  private static getInstance () {
    return EventBus._instance ?? (EventBus._instance = new EventBus());
  }

  public static subscribe (eventName: string, func: (...data) => void) {
    const bus = this.getInstance();

    if (!bus.events[eventName]) {
      bus.events[eventName] = new Set<(...data) => void>();
    }

    bus.events[eventName].add(func);
  }

  public static unsubscribe (eventName: string, func?: (...data) => void) {
    const bus = this.getInstance();

    if (func === null || func === undefined) {
      bus.events[eventName] = new Set();
      return;
    }

    bus.events[eventName] = new Set([...bus.events[eventName]].filter((f) => f !== func));
  }

  public static emit (eventName: string, ...data: any[]) {
    const bus = this.getInstance();

    bus.events[eventName]
      .forEach((f: (...args: any[]) => void) => f(...data));
  }

  public static reset () {
    const bus = this.getInstance();

    bus.events = {};
  }

  public static getSubscriptions (): EventBinder {
    const bus = this.getInstance();

    return { ...bus.events };
  }
}

export { EventBus };
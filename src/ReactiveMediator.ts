type EventBinder = Record<string, Set<() => void>>;

class ReactiveMediator {
  private events: EventBinder;
  private static _instance?: ReactiveMediator;

  private constructor () {
    this.events = {};
  }

  private static getInstance () {
    return ReactiveMediator._instance ?? (ReactiveMediator._instance = new ReactiveMediator());
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

    const copiedEvents: EventBinder = {};

    Object.keys(bus.events).forEach((topic) => {
      copiedEvents[topic] = new Set(bus.events[topic]);
    });

    return copiedEvents;
  }
}

export { ReactiveMediator as ReactiveMediator };
class EventBinder {
  Name: string;
  Function: (...data: any) => void;

  constructor (name: string, func: (...data: any) => void) {
    this.Name = name;
    this.Function = func;
  }
}

export { EventBinder };
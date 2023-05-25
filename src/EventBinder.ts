class EventBinder {
  Name: string;
  Function: (...data) => void;

  constructor (name, func) {
    this.Name = name;
    this.Function = func;
  }
}

export { EventBinder };
type EventBinder = {[topic: string]: Set<() => void>};

export { EventBinder };
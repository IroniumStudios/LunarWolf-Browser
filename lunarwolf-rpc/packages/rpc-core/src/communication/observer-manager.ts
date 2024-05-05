import { ServiceCaller } from '../interfaces';

export class ObserverManager<T> {
  protected readonly list: T[] = [];

  public add(observer: T) {
    this.list.push(observer);
  }

  public remove(observer: T) {
    const index = this.list.indexOf(observer);
    if (index !== -1) {
      this.list.splice(index, 1);
    }
  }

  public notify(caller: ServiceCaller) {
    for (const observer of this.list) {
      caller.cb(observer);
    }
  }

  public removeAll() {
    this.list.length = 0;
  }
}
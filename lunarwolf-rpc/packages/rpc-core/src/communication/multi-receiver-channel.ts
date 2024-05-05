import { PromiseScaffold, RpcScaffold } from '..';
import { Channel } from './channel';

export abstract class MultiReceiverChannel<
  T extends RpcScaffold<T>
> extends Channel<T> {
  private receivers: Map<string, any> = new Map();

  public getReceiver(...args: any[]): any {
    const key = JSON.stringify(args); // Convert arguments array to a string key
    if (!this.receivers.has(key)) {
      this.receivers.set(key, this.createReceiver(...args));
    }
    return this.receivers.get(key);
  }

  public getInvoker(...args: any[]): PromiseScaffold<T> {
    return this.createInvoker(...args);
  }

  public destroy() {
    super.destroy();
    this.receivers.forEach((v) => {
      v?.destroy?.();
    });
    this.receivers.clear();
  }
}
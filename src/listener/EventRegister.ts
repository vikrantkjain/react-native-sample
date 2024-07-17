import {EventListenerData} from '@customTypes';

class EventRegister {
  static _Listeners: {
    count: number;
    refs: {
      [key: string]: {
        name: string;
        callback: (value?: any) => void;
      };
    };
  } = {
    count: 0,
    refs: {},
  };

  static addEventListener(
    eventName: string,
    callback: (value?: any) => void,
  ): string | boolean {
    if (typeof eventName === 'string' && typeof callback === 'function') {
      EventRegister._Listeners.count++;
      const eventId = 'l' + EventRegister._Listeners.count;
      EventRegister._Listeners.refs[eventId] = {
        name: eventName,
        callback,
      };
      return eventId;
    }
    return false;
  }

  static removeEventListener(id: string): boolean {
    if (typeof id === 'string') {
      return delete EventRegister._Listeners.refs[id];
    }
    return false;
  }

  static removeAllListeners(): boolean {
    let removeError = false;
    Object.keys(EventRegister._Listeners.refs).forEach(_id => {
      const removed = delete EventRegister._Listeners.refs[_id];
      removeError = !removeError ? !removed : removeError;
    });
    return !removeError;
  }

  static emitEvent(eventName: string, data: EventListenerData): void {
    Object.keys(EventRegister._Listeners.refs).forEach(_id => {
      if (
        EventRegister._Listeners.refs[_id] &&
        eventName === EventRegister._Listeners.refs[_id].name
      ) {
        EventRegister._Listeners.refs[_id].callback(data);
      }
    });
  }

  /*
   * shortener
   */
  static on(
    eventName: string,
    callback: (value?: any) => void,
  ): string | boolean {
    return EventRegister.addEventListener(eventName, callback);
  }

  static rm(eventName: string): boolean {
    return EventRegister.removeEventListener(eventName);
  }

  static rmAll(): boolean {
    return EventRegister.removeAllListeners();
  }

  static emit(eventName: string, data: EventListenerData): void {
    EventRegister.emitEvent(eventName, data);
  }
}

export {EventRegister};

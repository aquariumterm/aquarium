'use strict';

import {EventEmitter} from 'events';

const CHANGE_EVENT = 'CHANGE';

class ChangeEmitter extends EventEmitter {
  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

export default ChangeEmitter;

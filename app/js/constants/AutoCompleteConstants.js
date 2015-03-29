'use strict';

import keyMirror from 'keymirror';

export default {
  Actions: keyMirror({
    SELECT_PREV: null,
    SELECT_NEXT: null,
    SELECT_SUGGESTION: null,
    CONFIRM_SUGGESTION: null,
    CLOSE_SUGGESTIONS: null
  })
};

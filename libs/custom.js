"use strict";

const getErrorMessage = (flashErrorMessages) => {
    if (flashErrorMessages && flashErrorMessages instanceof Array && flashErrorMessages[0]) {
        return flashErrorMessages[0];
    } else {
        return null;
    }
};

module.exports = {
    getErrorMessage
};
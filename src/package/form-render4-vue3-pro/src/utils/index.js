export const is = (object) => Object.prototype.toString.call(object).slice(8, -1).toLowerCase();

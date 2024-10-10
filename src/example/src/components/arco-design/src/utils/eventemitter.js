import mitt from 'mitt';

let instance = null;

export const getEventBus = () => {
  if (!instance) {
    instance = mitt();
  }
  return instance;
};
let subscribers = {};
export default {
    publish(event, data) {
        if (!subscribers[event]) return;
        subscribers[event].forEach(subscriberCallback =>
            subscriberCallback(data));
    },
    //this allows multiple callbacks to be assigned to a single event... is that correct?
    subscribe(event, callback) {
        if (!subscribers[event]) {
            subscribers[event] = [];
        }
        subscribers[event].push(callback);
    },
    unsubscribe(event){
        if (!subscribers[event]) {
            return;
        }
        delete subscribers[event];
    }
};
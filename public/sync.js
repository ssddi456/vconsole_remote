const socket = io('/');
socket.on('dispatch_event', function (e) {
    const el = document.querySelector(e.selector);

    switch (e.event) {
        case 'keyup':
            el.value = e.value;
            break;
        case 'submit':
            el.dispatchEvent(new Event('submit', {
                'bubbles': true, // Whether the event will bubble up through the DOM or not
                'cancelable': true  // Whether the event may be canceled or not
            }));
            break;
        default:
            if (el) {
                if (el[e.event]) {
                    el[e.event]();
                } else {
                    console.log(e);
                }
            }
            break;
    }
});

window.sendCustomEvent = function (event, selector, value) {
    socket.emit('dispatch_event', {
        event: event,
        selector: selector,
        value: value
    })
}

var originLog = console.log.bind(console);

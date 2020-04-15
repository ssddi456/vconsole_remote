const socket = io('/');

socket.on('dispatch_event', function ( e ) {
    const el = document.querySelector(e.selector);
    // try trigger event
    el[e.event]();
});

window.sendCustomEvent = function (event, selector ) {
    socket.emit('dispatch_event', {
        event: event,
        selector: selector
    })
}

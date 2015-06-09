# BreakPoint
***
Breakpoint event publisher.

#### Usage
````
BreakPoint.set([400, 600, 800, 1000, 1200, 1400]);

document.addEventListener('EnterBreakpoint/1000', function() {
  console.log('Event enter-1000');
}, false);

$(document).on('ExitBreakpoint/1000', function() {
	console.log('Event exit-1000');
});

````
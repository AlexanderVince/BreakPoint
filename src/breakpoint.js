/**
 * breakpoint.js
 * 
 * @author Alexander Vince <https://github.com/AlexanderVince>
 * @copyright 2015 Alexander Vince
 * @license BSD 3-Clause <http://opensource.org/licenses/BSD-3-Clause>
 *
 *
 *
 *
 *
 *
 *
 * 
 *
 */
window.BreakPoint = (function(window, document, undefined) {

	'use strict';

	/**
	 * BreakPoint
	 * 
	 * @type {Object}
	 * 
	 */
	var BreakPoint = {

		__initialised : false,

		__breakPoints : [],

		__lastWidth : 0,

		__currentBreakPoint : 0,

		/**
		 * 
		 * Set initialises BreakPoint with an
		 * array of pixel widths.
		 * 
		 * @param {Array} 
		 * 
		 */
		set : function(bp) {

			if (this.__initialised) {
				return false;
			}

			this.__initialised = true;
			this.__breakPoints = bp;
			
			this.addListeners();
			this.checkBreakPoints();
		}

	};

	/**
	 * 
	 * Binds event listener to window 
	 * resize and calls checkBreakpoints
	 * accordingling
	 * 
	 */
	BreakPoint.addListeners = function() {

		window.addEventListener(
			'resize',
			this.checkBreakPoints.bind(this),
			false
		);
	};

	/**
	 * 
	 * Checks to see if any breakpoints have been
	 * entered or exited and calls publish when
	 * applicable
	 * 
	 * @return {[type]} [description]
	 * 
	 */
	BreakPoint.checkBreakPoints = function() {

		var width = this.getDimensions().w,
			breakpoints = [].concat(this.__breakPoints),
			bp = breakpoints.sort(function(a, b) { return (b-a); }),
			bool = false;

		for (var _i=0,_len=bp.length; _i<_len; _i++) {

			if (!bool && width >= bp[_i] && this.__lastWidth < bp[_i]) {
				this.__currentBreakPoint = bp[_i];
				this.publish('EnterBreakpoint/' + bp[_i]);
				bool = true;
			}

			if (width < bp[_i] && this.__lastWidth >= bp[_i]) {
				this.publish('ExitBreakpoint/' + bp[_i]);
			}

			if (
				width >= bp[_i] &&
				width < bp[_i-1] &&
				this.__lastWidth > width &&
				this.__lastWidth > 0 &&
				this.__currentBreakPoint !== bp[_i]
			) {
				this.__currentBreakPoint = bp[_i];
				this.publish('EnterBreakpoint/' + bp[_i]);
			}
		}

		this.__lastWidth = (this.__lastWidth !== width ? 
			width : this.__lastWidth);
	};

	/**
	 * 
	 * Get the current window dimensions
	 * 
	 * @return {Object} Current dimensions
	 * 
	 */
	BreakPoint.getDimensions = function() {

		var w = window,
			d = document,
			e = d.documentElement,
			g = d.getElementsByTagName('body')[0],
			x = w.innerWidth || e.clientWidth || g.clientWidth,
			y = w.innerHeight || e.clientHeight || g.clientHeight;

		if (!x || !y) {
			throw new Error('BreakPoint: Cannot determine device screen dimensions');
		}

		return { w : x, h : y };
	};

	/**
	 * 
	 * Publishes a custom event on the document
	 * 
	 * 
	 */
	BreakPoint.publish = function(name) {
		
		var evt;
		if (typeof Event === 'function') {
			evt = new Event(name);
		} else if (document.createEvent) {
			evt = document.createEvent('Event');
			evt.initEvent(name, true, true);
		}
		document.dispatchEvent(evt);
	};

	return BreakPoint;

})(window, document);
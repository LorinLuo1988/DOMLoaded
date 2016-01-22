/**
 * Created by doyen on 2016/1/22.
 */
(function (window) {
	var userAgent = navigator.userAgent;
	var ieReg = /MSIE\s(?=(\d{1,2}.\d{1}))/;
	var ieVersion = userAgent.match(ieReg) && parseInt(userAgent.match(ieReg)[1]);

	if (ieVersion != null && ieVersion <= 8) {
		/*IE8 and lower control first method：
		 * onreadystatechange
		 */
		//function domLoadedHandle () {
		//	if (document.readyState === "complete") {
		//		alert(2)
		//		document.detachEvent("onreadystatechange", domLoadedHandle);
		//	}
		//};
		//
		//document.attachEvent("onreadystatechange", domLoadedHandle);

		/*IE8 and lower control second method：
		* document.documentElement.doScroll
		* this function generate when dom load complete
		*/
		if (document.documentElement.doScroll && top) {
			doScrollCheck();
		}

		function doScrollCheck() {
			try {
				document.documentElement.doScroll("left");
			}
			catch (error) {
				setTimeout(doScrollCheck, 1);
				return "DOMContentLoaded";
			}
			DOMContentLoaded.run();
			DOMContentLoaded.callbacks = [];
		}
	} else {
		document.addEventListener("DOMContentLoaded", function () {
			DOMContentLoaded.run();
			DOMContentLoaded.callbacks = [];
		}, false);
	}
})(window);

window.DOMContentLoaded = {
	callback: function (callback, data) {
		if (typeof callback == "function") {
			this.callbacks.push({callback: callback, data: data});
		} else {
			console.warn("please translate a function, your input is:\n" + callback);
		}
	},
	callbacks: [],
	run: function () {
		var callbacks = this.callbacks;

		for (var i in callbacks) {
			if (callbacks.hasOwnProperty(i)) {
				callbacks[i].callback(callbacks[i].data);
			}
		}
	}
}
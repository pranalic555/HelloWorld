 /* ============================================================ */
 var customStopWatch = function() {
     var ref;
     var p = new Object();
     var currentTime;
     var lastRecordedTime;
     var p = {
         clockTriggerInterval: 60,
         clockStart: 0,
         clockEnd: 4,
     }
     var stopWatch;
     var timerText;
     var downevent = "mousedown";
     var upevent = "mouseup";
     var time = 0;
     var second = 0;
     var clockCounter = 0;
     var startBtn;
     var resetBtn;
     this.init = function(_obj) {
         ref = this;
         for (var i in _obj) {
             p[i] = _obj[i];
         }
         createTimerDivs();
         lastRecordedTime = new Date().getTime();
     }
     this.addEventListener = function(_evt, _fun) {
         p[_evt] = _fun;
     }

     function createTimerDivs() {
         stopWatch = document.createElement("div");
         timerText = document.createElement("div");
         timerSpan = document.createElement("span");
         timerSpan_2 = document.createElement("span");
         timerSpan_3 = document.createElement("span");
         startBtn = document.createElement("div");
         resetBtn = document.createElement("div");
         disabler = document.createElement("div");
         $(stopWatch).css({
             "position": "absolute",
             "top": globalResizeCalc(5) + "px",
             "left": globalResizeCalc(0) + "px",
             "width": globalResizeCalc(177) + "px",
             "height": globalResizeCalc(193) + "px",
             "background": "url(images/stop_watch.png) no-repeat",
             "background-size": "100% 100%"
         });
         $(timerText).css({
             "position": "absolute",
             "top": globalResizeCalc(69) + "px",
             "left": globalResizeCalc(57) + "px",
             "width": globalResizeCalc(39) + "px",
             "height": globalResizeCalc(41) + "px",
             "display": "table",
             "font-family": "arial",
             "font-weight": "bold",
             "font-size": "1.2em",
             "color": "#3A393B"
         });
         $(timerSpan).css({
             "height": globalResizeCalc(41) + "px",
             "display": "table-cell",
             "text-align": "center",
             "vertical-align": "middle",
             "cursor": "pointer"
         });
         $(timerSpan_2).css({
             "height": globalResizeCalc(41) + "px",
             "display": "table-cell",
             "text-align": "center",
             "vertical-align": "middle",
         });
         $(timerSpan_3).css({
             "height": globalResizeCalc(41) + "px",
             "display": "table-cell",
             "text-align": "center",
             "vertical-align": "middle",
             "cursor": "pointer"
         });
         $(startBtn).css({
             "position": "absolute",
             "top": globalResizeCalc(6) + "px",
             "left": globalResizeCalc(14) + "px",
             "width": globalResizeCalc(40) + "px",
             "height": globalResizeCalc(33) + "px",
             "-ms-transform": "rotate(-2deg)",
             "-webkit-transform": "rotate(-2deg)",
             "transform": "rotate(-2deg)",
             "background": "url(images/start_btn.png) no-repeat",
             "background-size": "100% 100%",
             "cursor": "pointer",
         });
         $(resetBtn).css({
             "position": "absolute",
             "top": globalResizeCalc(4) + "px",
             "left": globalResizeCalc(123) + "px",
             "width": globalResizeCalc(40) + "px",
             "height": globalResizeCalc(33) + "px",
             "background": "url(images/reset_btn.png) no-repeat",
             "background-size": "100% 100%",
             "cursor": "pointer",
         });
         $(startBtn).attr("class", "clkBtn");
         $(resetBtn).attr("class", "clkBtn");
         $(disabler).css({
             "position": "absolute",
             "top": globalResizeCalc(54) + "px",
             "left": globalResizeCalc(40) + "px",
             "width": globalResizeCalc(99) + "px",
             "height": globalResizeCalc(62) + "px",
             "background": "rgba(255, 0, 0, 0)",
             "display": "none"
         });
         p.target.append(stopWatch);
         $(timerText).append(timerSpan);
         $(timerText).append(timerSpan_2);
         $(timerText).append(timerSpan_3);
         p.target.append(timerText);
         p.target.append(startBtn);
         p.target.append(resetBtn);
         p.target.append(disabler);
         $(timerSpan).html("00");
         $(timerSpan_2).html(".");
         $(timerSpan_3).html("00");
         $(timerSpan).attr("p_title", GCTConv(GlobalTextObj.timerSpan_text));
         $(timerSpan_3).attr("p_title", GCTConv(GlobalTextObj.timerSpan_text));
         $(startBtn).attr("p_title", GCTConv(GlobalTextObj.startBtn_text));
         $(resetBtn).attr("p_title", GCTConv(GlobalTextObj.resetBtn_text));
         if (BrowserDetect.Android() || BrowserDetect.iOS()) {
             downevent = "touchstart";
             upevent = "touchend";
         }
         $(startBtn).bind(downevent, function() {
             audioPlayerObj.playAudio("down");
             $(this).attr("clicked", true);
             $(this).css({
                 "position": "absolute",
                 "top": globalResizeCalc(9) + "px",
                 "left": globalResizeCalc(16) + "px",
                 /*  "width": globalResizeCalc(40) + "px",
                  "height": globalResizeCalc(33) + "px",
                  "background": "url(images/start_btn_clicked.png) no-repeat",
                  "background-size": "100% 100%",
                  "cursor": "pointer", */
             });
         }).click(function() {
             p.watchEvent({
                 action: "start",
                 time: second,
             });
         });
         $(resetBtn).bind(downevent, function() {
             audioPlayerObj.playAudio("down");
             $(this).attr("clicked", true);
             // ref.reset();
             $(this).css({
                 "position": "absolute",
                 "top": globalResizeCalc(7) + "px",
                 "left": globalResizeCalc(119) + "px",
                 /*  "width": globalResizeCalc(40) + "px",
                  "height": globalResizeCalc(33) + "px",
                  "background": "url(images/reset_btn_clicked.png) no-repeat",
                  "background-size": "100% 100%",
                  "cursor": "pointer",
                  "background-position": globalResizeCalc(-2) + "px " + globalResizeCalc(5) + "px", */
             });
         }).click(function() {
             p.watchEvent({
                 action: "reset"
             });
             ref.reset();
         });
         $(document).bind(upevent, function(e) {
             if ($(startBtn).attr("clicked") == "true" || $(resetBtn).attr("clicked") == "true") {
                 $(startBtn).attr("clicked", false);
                 $(resetBtn).attr("clicked", false);
                 audioPlayerObj.playAudio("up");
             }
             $(startBtn).css({
                 "background": "url(images/start_btn.png) no-repeat",
                 "width": globalResizeCalc(40) + "px",
                 "top": globalResizeCalc(6) + "px",
                 "left": globalResizeCalc(14) + "px",
                 "height": globalResizeCalc(33) + "px",
                 "background-size": "100% 100%",
                 "background-position": globalResizeCalc(0) + "px " + globalResizeCalc(0) + "px",
             });
             $(resetBtn).css({
                 "background": "url(images/reset_btn.png) no-repeat",
                 "top": globalResizeCalc(4) + "px",
                 "left": globalResizeCalc(123) + "px",
                 "width": globalResizeCalc(40) + "px",
                 "height": globalResizeCalc(33) + "px",
                 "background-size": "100% 100%",
                 "background-position": globalResizeCalc(0) + "px " + globalResizeCalc(0) + "px",
             });
         });
         $(timerSpan_3).unbind(downevent).bind(downevent, function() {
             increamentTimer(0.05)
         })
         $(timerSpan).unbind(downevent).bind(downevent, function() {
             increamentTimer(1)
         })
     }
     this.reset = function() {
         $(timerSpan).html("00");
         $(timerSpan_3).html("00");
         second = 0;
         time = 0;
         lastRecordedTime = 0;
     }

     function increamentTimer(dif) {
         if (second <= (4 - dif)) {
             second += dif;
         } else {
             /*
				if(dif != 1)
				{
					 //second = 4;
					 second = 0;
				}
				*/
             second = 0;
         }
         ref.updateTimer(second);
         p.watchEvent({
             action: "timerTxtClicked",
             time: second,
         });
     }
     this.disable = function(bool) {
         if (bool) {
             $(disabler).hide();
             p.target.css("opacity", "1");
         } else {
             $(disabler).show();
             p.target.css("opacity", "0.5");
         }
     }
     this.timerClickDisable = function(bool)
     {
        if (bool) 
        {
            $(timerSpan_3).unbind(downevent);
            $(timerSpan).unbind(downevent);
        }
        else
        {
              $(timerSpan_3).unbind(downevent).bind(downevent, function() {
                 increamentTimer(0.05)
                 })
             $(timerSpan).unbind(downevent).bind(downevent, function() {
                 increamentTimer(1)
                })
        }
     }
     this.updateTimer = function(val) {
         time = val * 1000;
         second = val;
         var t = returnTimeString(second.toFixed(2));
         displayTimerTxt(t)
     }

     function displayTimerTxt(t) {
         $(timerSpan).html(t.split(".")[0]);
         $(timerSpan_3).html(t.split(".")[1]);
     }
     this.trigger = function(val) {
         var currTime = new Date().getTime();
         if (second < p.clockEnd) {
             //console.log("diff = ", (currTime - lastRecordedTime));
             //var diff = currTime - lastRecordedTime;
             var diff;
             var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
             if (is_chrome) {
                 diff = 12.5;
             } else {
                 diff = 14;
             }
             if (BrowserDetect.ie9()) {
                 diff = 17;
             }
             /*
            if ((currTime - lastRecordedTime) >= p.clockTriggerInterval) 
			{
				console.log(">>>>>>>>>>>>> trigger");
               time += p.clockTriggerInterval;
             
                second = time / 1000;
                var t = returnTimeString(second.toFixed(2));
                displayTimerTxt(t)
                p.watchEvent({
                    action: "progress",
                    time: second,
                });
                lastRecordedTime = new Date().getTime();
            }
			*/
             // time += 55;
             time += diff;
             // time += 70;
             second = time / 1000;
             var t = returnTimeString(second.toFixed(2));
             displayTimerTxt(t)
             p.watchEvent({
                 action: "progress",
                 time: second,
             });
             lastRecordedTime = new Date().getTime();
         } else {
             p.watchEvent({
                 action: "stop",
             });
             // $(timerSpan).html(returnTimeString(p.clockEnd.toFixed(2)));
             displayTimerTxt(returnTimeString(p.clockEnd.toFixed(2)))
             second = 0;
             time = 0;
         }
     }

     function returnTimeString(second) {
         //console.log(second);
         var integerPart = String(second).split(".")[0];
         if (integerPart.length == 1) {
             integerPart = "0" + integerPart;
         }
         var floatPart = String(second).split(".")[1];
         return integerPart + "." + floatPart;
     }
 }
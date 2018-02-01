var jsfl_parser = function() {
    var ref;
    var p = new Object();
    var frameCounter = 0;
    var p = {
        imgTextFile: "images/anim_1.txt",
        json: "js/anim_1.json",
        jsonObj: null,
        imgObj: null,
        animState: null,
        frameStart: 0,
        frameEnd: 100,
        jump: 1,
        animEvents: function() {},
        opacity: 1,
        visible: true,
        mcObject: new Object(),
        clearCnv: true,
		removeFloatingVal:false
    }
    var imgArr;
    var imgObj;
    var canvas;
    var context;
    var lastIndex;
    var end;
    var lodedCnt = 0;
    var loadCnt = 0;
    var jsflInited = false;
    this.init = function(_obj) {
        ref = this;
        for (var i in _obj) {
            p[i] = _obj[i];
        }
        this.updateValue(_obj);
        getJsonArr();
        frameCounter = p.frameStart;
        appendCanvas();
    }
    this.updateValue = function(_obj) {
        for (var i in _obj) {
            p[i] = _obj[i];
        }
        frameCounter = p.frameStart;
    }
    this.getModelData = function() {
        return p;
    }
    this.createMc = function(_mcObject) {
        for (var i in _mcObject) {
            p.mcObject[i] = _mcObject[i];
        }
		console.log(p.mcObject);
    }
    this.setParam = function(start, end, jump, visible, state) {
        p.frameStart = frameCounter = start;
        p.frameEnd = end;
        if (jump) {
            p.jump = jump;
        }
        if (visible) {
            ref.visible(visible);
        } else {
            ref.visible(true);
        }
        p.animState = state;
        this.setFrame(start);
    }
    this.setMc = function(id, frameNumber) {
        p.mcObject[id].frameCounter = frameNumber;
        drawFrame(p.mcObject[id].frameArr[frameNumber], p.mcObject[id].canvas);
    }
    this.setCanvasClearBool = function(bool) {
        p.clearCnv = bool;
    }
    this.clearCanvas = function(id) {
        p.mcObject[id].canvas.width = p.mcObject[id].canvas.width;
    }
    this.resetMc = function(_mcIdArr) {
        for (var i = 0; i < _mcIdArr.length; i++) {
            if (_mcIdArr[i]) {
                p.mcObject[_mcIdArr[i]].frameCounter = 0;
                if (p.mcObject[_mcIdArr[i]].canvas) {
                    drawFrame(p.mcObject[_mcIdArr[i]].frameArr[p.mcObject[_mcIdArr[i]].frameCounter], p.mcObject[_mcIdArr[i]].canvas);
                } else {
                    drawFrame(p.mcObject[_mcIdArr[i]].frameArr[p.mcObject[_mcIdArr[i]].frameCounter]);
                }
            }
        }
    }
    this.getFrame = function(_mcIdArr) {
        //$(canvas).show();
        if (!_mcIdArr) {
            frameCounter += p.jump;
            drawFrame(frameCounter);
            if (frameCounter == p.frameEnd) {
                p.animEvents({
                    id: p.id,
                    action: "over",
                    frame: frameCounter,
                    animState: p.animState,
                    modalState: p
                });
                frameCounter = p.frameStart;
            }
            p.animEvents({
                id: p.id,
                action: "progress",
                frame: frameCounter,
                modalState: p
            });
        } else {
            for (var i = 0; i < _mcIdArr.length; i++) {
                if (_mcIdArr[i]) {
                    if (p.mcObject[_mcIdArr[i]].frameCounter < p.mcObject[_mcIdArr[i]].frameArr.length) {
                        if (p.mcObject[_mcIdArr[i]].frameCounter > 0) {
                            if (p.mcObject[_mcIdArr[i]].canvas) {
                                drawFrame(p.mcObject[_mcIdArr[i]].frameArr[p.mcObject[_mcIdArr[i]].frameCounter], p.mcObject[_mcIdArr[i]].canvas);
                            } else {
                                drawFrame(p.mcObject[_mcIdArr[i]].frameArr[p.mcObject[_mcIdArr[i]].frameCounter]);
                            }
                        }
                        p.animEvents({
                            id: _mcIdArr[i],
                            action: "progress",
                            frame: p.mcObject[_mcIdArr[i]].frameArr[p.mcObject[_mcIdArr[i]].frameCounter],
                            modalState: p
                        });
                        p.mcObject[_mcIdArr[i]].frameCounter += p.mcObject[_mcIdArr[i]].jump;
                    } else {
                        p.animEvents({
                            id: _mcIdArr[i],
                            action: "over",
                            frame: p.mcObject[_mcIdArr[i]].frameCounter,
                            animState: p.mcObject[_mcIdArr[i]].state,
                            modalState: p
                        });
                        if (p.mcObject[_mcIdArr[i]]) {
                            p.mcObject[_mcIdArr[i]].frameCounter = 0;
                        }
                    }
                }
            }
        }
    }
    this.visible = function(bool, clearBool) {
        if (bool) {
            $(canvas).show();
        } else {
            if (!clearBool) {
                canvas.width = canvas.width;
            }
            $(canvas).hide();
        }
    }
    this.updateCssProp = function(obj) {
        $(canvas).css(obj);
    }
    this.pointerEvent = function(evt) {
        if (evt) {
            $(canvas).css("pointer-events", "none");
        } else {
            $(canvas).css("pointer-events", "auto");
        }
    }

    function appendCanvas() {
        canvas = document.createElement("canvas");
        context = canvas.getContext("2d");
        canvas.width = p.width;
        canvas.height = p.height;
        $(canvas).attr("class", "jsfl_canvas");
        $(canvas).attr("id", p.id);
        $(canvas).css({
            "position": "absolute",
            "top": globalResizeCalc(p.top),
            "left": globalResizeCalc(p.left),
            "width": globalResizeCalc(p.width),
            "height": globalResizeCalc(p.height),
            "z-index": p.index,
            "background-size": "100% 100%",
            "-webkit-transform": "scale(" + p.scale + "," + p.scale + ")",
            "-ms-transform": "scale(" + p.scale + "," + p.scale + ")",
            "transform": "scale(" + p.scale + "," + p.scale + ")",
            "opacity": p.opacity
        });
        if (p.target) {
            p.target.append(canvas);
        } else {
            $("body").append(canvas);
        }
        if (p.visible) {
            $(canvas).show();
        } else {
            $(canvas).hide();
        }
    }

    function getJsonArr() {
        $.getJSON(p.json, function(json) {
            p.jsonObj = json;
            getImageTxtFile();
        });
    }

    function getImageTxtFile() {
        $.ajax({
            url: p.imgTextFile,
            async: false,
            success: function(data) {
                var imgArr = data.split("~^");
                p.imgObj = imgArr;
                loadImages(data);
            }
        });
    }
    this.addEventListener = function(_evt, _fun) {
        p[_evt] = _fun;
        if (jsflInited) {
            p.animEvents({
                id: p.id,
                action: "jsflLoaded",
                modalState: p
            });
        }
    }
    this.setFrame = function(num) {
		// console.log(num)
        drawFrame(num);
    }

    function drawFrame(curIndex, _cnv) {
            if (p.jsonObj && p.imgObj) {
                var jsonObj = p.jsonObj;
                var cnv;
                if (_cnv) {
                    cnv = _cnv;
                    var ctx = cnv.getContext("2d");;
                } else {
                    cnv = canvas;
                    var ctx = context;
                }
                var scaleLevel = 1;
                if (jsonObj.mainTimeLine["f_" + curIndex] != undefined) {
                    var _arr = jsonObj.mainTimeLine["f_" + curIndex].o;
                    if (p.clearCnv) {
                        cnv.width = cnv.width;
                    }
                    for (var i = _arr.length - 1; i >= 0; i--) {
                        var _o = _arr[i];
                        if (_o.i != undefined) {
                            var _ii = _o.i.split("_");
                            var _fr = jsonObj.mainTimeLine["f_" + _ii[1]].o;
                            for (var _k = 0; _k < _fr.length; _k++) {
                                if (jsonObj.mainTimeLine["f_" + _ii[1]].o[_k].l == _ii[0]) {
                                    _o = jsonObj.mainTimeLine["f_" + _ii[1]].o[_k];
                                    break;
                                }
                            }
                        }
                        ctx.save();
                        /*
				n: Name
				x: x position
				y: y position
				w: width
				h: height
				a: SkewX
				b: SkewY
				c: ScaleX
				d: ScaleY
				o: Alpha
				*/
                        if (_o.a == 180 || _o.b == 180) {
                            ctx.translate(_o.b == 180 ? _o.x * scaleLevel : 0, _o.a == 180 ? _o.y * scaleLevel : 0);
                            ctx.scale(_o.b == 180 ? -1 : 1, _o.a == 180 ? -1 : 1);
                            ctx.translate(_o.b == 180 ? -1 * (_o.x * scaleLevel) : 0, _o.a == 180 ? -1 * (_o.y * scaleLevel) : 0);
                        }
                        if ((_o.a > 0 && _o.a < 180) || (_o.b > 0 && _o.b < 180)) {
                            ctx.translate(_o.x * scaleLevel, _o.y * scaleLevel);
                            ctx.rotate(_o.b * Math.PI / 180);
                            ctx.translate(-1 * (_o.x * scaleLevel), -1 * (_o.y * scaleLevel));
                        }
                        ctx.globalAlpha = _o.o;
                        if (imgObj[_o.n]) 
						{
							
							if(p.removeFloatingVal)
							{
								var _imgX = Number(((_o.x - (imgObj[_o.n].x * _o.c)) * scaleLevel).toFixed(0)); 
								var _imgY = Number(((_o.y - (imgObj[_o.n].y * _o.d)) * scaleLevel).toFixed(0)); 
							}
							else
							{
								var _imgX = (_o.x - (imgObj[_o.n].x * _o.c)) * scaleLevel; 
								var _imgY = (_o.y - (imgObj[_o.n].y * _o.d)) * scaleLevel;
							}
							ctx.drawImage(imgObj[_o.n].img,_imgX,_imgY,_o.w * scaleLevel, _o.h * scaleLevel);
                        } else {
                            ////console.log(_o.n + " not found...");
                        }
                        ctx.restore();
                    }
                    //---------------------------------------------
                }
                //-------------------------
                /*
			var imgData=ctx.getImageData(10,10,50,50);
				ctx.putImageData(imgData,10,70);
			*/
                p.animEvents({
                    id: p.id,
                    action: "imageData",
                    imageData: ctx.getImageData(0, 0, cnv.width, cnv.height),
                    modalState: p
                });
                lastIndex = curIndex;
            }
        }
        //====================================================
    function loadImages(imageDataObj) {
            var _imgArr = imageDataObj.split("~^");
            var _imageDataObj = new Object();
            for (var j = 0; j < _imgArr.length - 1; j++) {
                var _arr = _imgArr[j].split("^~");
                _imageDataObj[_arr[0]] = _arr[1];
            }
            imgObj = new Object();
            loadCnt = 0;
            lodedCnt = 0;
            for (var i in p.jsonObj.preloadarr) {
                var _p = p.jsonObj.preloadarr[i].p;
                if (_p.indexOf("/") != -1) {
                    _p = _p.split("/");
                    _p.reverse();
                    _p = _p[0];
                }
                if (_imageDataObj[_p]) {
                    imgObj[i] = p.jsonObj.preloadarr[i];
                    imgObj[i].img = new Image();
                    imgObj[i].img.onload = imgloaded;
                    imgObj[i].img.src = _imageDataObj[_p];
                    loadCnt++;
                }
            }
        }
        //====================================================
    function imgloaded() {
        lodedCnt++;
        if (lodedCnt == loadCnt) {
            drawFrame(1);
            jsflInited = true;
            p.animEvents({
                id: p.id,
                action: "jsflLoaded",
                modalState: p
            });
        }
    }
}
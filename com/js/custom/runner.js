var canvas_anim = function() {
    var p = {
        x: 10,
        y: 20,
        width: 1020,
        height: 117,
        interval: 1000,
        imgWidth: 100,
        imgHeight: 125,
        imageCount: 6,
        posX: 100,
        posY: 10,
        unitDistanceCovered: 10,
        scale: 1,
        autoPlay: true,
        pitchLength: 689.20,
    }
    var _thisObj = this;
    var canvas, context;
    var lastRecordedTime = new Date().getTime();
    var imgObj = new Image();
    var imgObj_flip = new Image();
    var images = 6;
    var imageCounter = 0;
    var requestId;
    var _ref = this;
    var flip = false;
    var reset = false;
    var direction = 1;
    var lastPercent = 0;
    var lastVal = 0;
    var blueOffset = 35;
    /* =================== PUBLIC Methods ================================== */
    this.init = function(_obj) {
        _ref = this;
        lastRecordedTime = new Date().getTime();
        updateComponentProperties(_obj);
        setCanvas();
        loadImage();
    }
    this.start = function() {
        requestId = requestAnimFrame(animloop);
    }
    this.stop = function() {
        cancelAnimationFrame(requestId);
    }
    this.resetStatus = function(bool) {
        reset = bool;
        lastPercent = 0;
        p.posX = 0;
		direction = 1;
    }
    this.orientation = function(bool) {
        switch (bool) {
            case "left":
                flip = true;
                p.posX = (canvas.width - p.imgWidth) - p.posX;
                break;
            case "right":
                flip = false;
                p.posX = (canvas.width - p.imgWidth) - p.posX;
                break;
        }
    }
    this.resetPx = function(val) {
        p.posX = val;
    }
    var prevSlope = 0;
    var animationId;
    var currentSlope;
    this.changePosX = function(param, bool, slope, _animId) {
        currentSlope = slope;
        animationId = _animId;
        if (slope > 0) {
            if (direction != 1) {
                this.orientation("right");
            }
            direction = 1;
        } else if (slope < 0) {
            if (direction != -1) {
                this.orientation("left");
            }
            direction = -1;
        }
        if (!bool) {
            var percentChange = param - lastPercent;
            lastPercent = param;
            var positionDerivative = p.pitchLength * percentChange;
            if (direction > 0) {
                p.posX = p.posX + positionDerivative;
            } else {
                p.posX = p.posX - positionDerivative;
            }
            if (slope == 0) {
                this.resetAnimation();
            }
        } else {
            drawSteadyMan(param)
        }
    }

    function drawSteadyMan(param) {
        canvas.width = canvas.width;
        var percentChange = param - lastPercent;
        lastPercent = param;
        var positionDerivative = p.pitchLength * percentChange;
        p.posX = positionDerivative;
        if (param == 0) {
            p.posX = 0;
        }
        flip = false;
        if (direction == -1 && !reset) {
            context.translate(canvas.width, 0);
            context.scale(-p.scale, p.scale);
            p.posX = (canvas.width - p.imgWidth) - p.posX;
            flip = true;
        }
        context.scale(p.scale, p.scale);
        context.drawImage(imgObj, 0, p.imgHeight * imageCounter, p.imgWidth, p.imgHeight, p.posX, p.posY, p.imgWidth, p.imgHeight);
    }
    this.direction = function(val) {
        direction = val;
    }
    this.resetAnimation = function() {
            imageCounter = 0;
            canvas.width = canvas.width;
            if (flip) {
                context.translate(canvas.width, 0);
                context.scale(-p.scale, p.scale);
            }
            context.scale(p.scale, p.scale);
            context.drawImage(imgObj, 0, p.imgHeight * imageCounter, p.imgWidth, p.imgHeight, p.posX, p.posY, p.imgWidth, p.imgHeight);
        }
        /* ================================================================================ */
        /* ============================== Private Methods ================================== */
    function setCanvas() {
        canvas = document.createElement("canvas");
        context = canvas.getContext("2d");
        $(canvas).attr("width", p.width);
        $(canvas).attr("height", p.height);
        $(canvas).attr("class", p.id);
        $(canvas).css({
            "position": "absolute",
            "top": "0px",
            "left": globalResizeCalc(p.canvasLeftOffset) + "px",
            "height": globalResizeCalc(p.height) + "px",
            "width": globalResizeCalc(p.width) + "px",
            "z-index": p.index,
        });
        p.target.append(canvas);
    }
    this.show = function(bool) {
        if (bool) {
            $(canvas).show();
        } else {
            $(canvas).hide();
        }
    }

    function loadImage() {
        imgObj.src = p.imageSrc;
        imgObj.onload = function() {
            _ref.resetAnimation();
        }
    }

    function updateComponentProperties(_obj) {
        for (var i in _obj) {
            p[i] = _obj[i];
        }
    }
    var functionsQue = new Array();
    this.trigger = function(obj) {
        reset = false;
        if (Math.abs(currentSlope) > 0) {
            animloop();
        } else {
            reset = true;
            _ref.resetAnimation();
        }
    }
    this.setDrawingInterval = function(val) {
        p.interval = val;
    }

    function animloop() {
            var currTime = new Date().getTime();
            if ((currTime - lastRecordedTime) > p.interval && p.posX < p.width / p.scale) {
                lastRecordedTime = new Date().getTime();
                canvas.width = canvas.width;
                if (flip) {
                    context.translate(canvas.width, 0);
                    context.scale(-p.scale, p.scale);
                }
                context.scale(p.scale, p.scale);
                context.drawImage(imgObj, 0, p.imgHeight * imageCounter, p.imgWidth, p.imgHeight, p.posX, p.posY, p.imgWidth, p.imgHeight);
                imageCounter++;
                functionsQue.push(animloop);
            } else {
                if (imageCounter < p.imageCount) {} else {
                    if (p.autoPlay) {
                        imageCounter = 1;
                    } else {}
                }
            }
        }
        /* ================================================================================ */
}
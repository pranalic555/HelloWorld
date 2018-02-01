var preloadTextImages = function() {
    var ref;
	var isJSFLPresent = false, isJSFLLoaded = false;
    var p = new Object();
	var preLoadDiv, newDiv;
    var p = {
        imgTextFile: "images/gizmoImages.txt",
        loadCnt: 0,
        lodedCnt: 0,
        _imageDataObj: new Object(),
		isJSFLPresent: false,
		isJSFLLoaded: false
    }
	var _this = this;
    this.init = function(_obj) 
	{
		preLoadDiv = document.createElement("div");
		$("body").append(preLoadDiv);
		newDiv = document.createElement("div");
		$("body").append(newDiv);
		$(newDiv).css(
		{
			"position":"absolute",
			"width":'100%',
			"height":'100%',
			"background":'white',
			"z-index":105,
		}).attr('id', 'preloader1');
		
		$(preLoadDiv).css(
		{
			"position":"absolute",
			"background":"url(../com/images/loading.gif) no-repeat",
			"width":globalResizeCalc(1024)+"px",
			"height":globalResizeCalc(696)+"px",
			"background-position": "center",
			"z-index" : 106,
		}).attr('id', 'preloader');
        ref = this;
        for (var i in _obj) {
			p[i] = _obj[i];
        }
		getImageTxtFile();
    }
	
	this.jsflImagesLoaded = function(){
		//ref.preloadComplete(p._imageDataObj);
		$(preLoadDiv).remove();
		$(preLoadDiv).hide();
		$(newDiv).remove();
		$(newDiv).hide();
	}
   
    function getImageTxtFile(txtFile) 
	{
        $.ajax({
            url: p.imgTextFile,
            async: false,
            success: function(data) {
                var decomPressData = JXG.decompress(data);
				loadImages(decomPressData);
            }
        });
    }
  function loadImages(imageDataObj) {
            var _imgArr = imageDataObj.split("~^");
          
            p._imageDataObj = new Object();
            for (var j = 0; j < _imgArr.length - 1; j++) {
                var _arr = _imgArr[j].split("^~");
               
                p._imageDataObj[_arr[0]] = new Image();
                p._imageDataObj[_arr[0]].onload = imgloaded;
                p._imageDataObj[_arr[0]].src = _arr[1];
                p.loadCnt++;
            }
           
        }
        //====================================================
    function imgloaded() 
	{
		p.lodedCnt++;
        if (p.lodedCnt == p.loadCnt) 
		{
			if(ref.preloadComplete)
			{
				//if(!p.isJSFLPresent){
					ref.preloadComplete(p._imageDataObj);
				//}
			}
			
			if(!p.isJSFLPresent){
				_this.jsflImagesLoaded();
			}
		}
    }
}
//////////////////////////////////////////////////////////////////
// Developed By: Mitr Learning & Media							//
// Name: AudioPlayer										//
// Description: All required audio styles are defined here.			 		//
// Date Created: 07/05/2014										//
// Date Modified: 07/05/2014									//
// Version: 1.0:												//
//////////////////////////////////////////////////////////////////

//================================================================================
var AudioPlayerClass = function()
{
    // Default starts ...
   var p = 
	{
		click:{source:"../com/audio/common_audio.mp3"},
		down:{source:"../com/audio/common_down.mp3"},
		up:{source:"../com/audio/common_up.mp3"},
		camera:{source:"../com/audio/snapshot.mp3"},
		confirm:{source:"../com/audio/common_confirm.mp3"}
	}
    // Default ends ...
    var _thisObj = this;
	var allowToPlay = true;
    var audioContext;
    var audioObj = new Object();
	var volume = 1;
    var contextBool = false;
	var aChans = [];
	var aChansPlaying = [];
	var currentlyPlaying = new Object();
	var interval_obj = new GlobalAnimClass();
	var globalTime = new Date();
	for(var i = 0; i < 20; i++)
	{
		aChans[i] = new Audio();
		aChans[i].id = i;
	}
    //--------------
	if(BrowserDetect.FF())
	{
		contextBool = true;
	}
	else
	{
		try
		{
			window.AudioContext = window.AudioContext || window.webkitAudioContext;
			audioContext = new AudioContext();
		}
		catch(e)
		{
			contextBool = true;
		}
	}
    //--------------
    if (contextBool)
    {
        for (var i in p)
        {
            audioObj[i] = new Object();
            audioObj[i].src = p[i].source;
			//controlObj.audio_loaded_log();
        }
    }
    //--------------
    if (audioContext)
    {
        for (var i in p)
        {
           loadAudio(i, true);
        }
    }
    
    //================================================================================
	//BrowserDetect.any() ? interval_obj.start({id:"checkForFocus", delay:1000, frame:checkForFocus}) : null;
    //================================================================================
    // PUBLIC FUNCTIONS
    //================================================================================
    this.add = function(_type, _path, _cback, _ref, _noClean)
    {
        if (_type.toLowerCase() != "click")
        {
            if (!audioContext)
            {
                audioObj[_type] = new Object();
				audioObj[_type].oncanplaythrough = _ref;
				audioObj[_type].index = [];
                audioObj[_type].src = _path;
                if (typeof (_cback) != undefined)
                {
                    audioObj[_type].onended = _cback;
                }
				//audioObj[_type].play();
				//controlObj.audio_loaded_log();
				typeof(_ref) != "undefined" ? setTimeout(function(){_ref()}, 100) : null;
            }
            else
            {
                p[_type] = {source: _path};
                typeof (_noClean) != undefined ? p[_type].noClean = _noClean : null;
                typeof (_cback) != undefined ? p[_type].callBack = _cback : null;
                loadAudio(_type, true, _ref);
				//typeof(_ref) != "undefined" ? setTimeout(function(){_ref()}, 100) : null;
            }
        }
    }
    //================================================================================
	this.remove = function(_type)
	{
		if(audioContext)
		{
			if(p[_type])
			{
				_thisObj.stop(_type, true);
				p[_type].context = undefined;
				p[_type].gainNode = undefined;
				p[_type].volume = undefined;
				p[_type].loop = undefined;
				p[_type].callBack = undefined;
				p[_type] = undefined;
			}
		}
		else
		{
			if(audioObj[_type])
			{
				if(audioObj[_type].audio)
				{
					audioObj[_type].audio.src = "";
					audioObj[_type].audio = null;
				}
				audioObj[_type].index = null;
				audioObj[_type].oncanplaythrough = null;
				audioObj[_type].onended = null;
				audioObj[_type].loop = null;
				audioObj[_type].volume = null;
				audioObj[_type] = null;
			}

		}
	}
    //================================================================================
	this.destroyContext = function()
	{
		audioContext.uninitialize();
	}
    //================================================================================
	this.setVolume = function(_vol)
	{
		volume = _vol;
	}
	this.sVolume = function(_type,_vol)
	{
            if(p[_type])
			{
                p[_type].volume = _vol;
				if(p[_type].gainNode && p[_type].gainNode.gain)
				{
					p[_type].gainNode.gain.value = _vol;
				}
            }
	}
    //================================================================================
    this.stop = function(_type, _bool)
    {
        if (audioContext)
        {
            if (p[_type] && p[_type].context)
            {
				var _cont = p[_type].context;
				//p[_type].context = undefined;
				_cont.onended = null;
                //_cont.stop(0); // Previous Code
				// ================= Code Added by Vishal for older mac version Mac Lion as its audiocontext syntax is different
				//  https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Porting_webkitAudioContext_code_to_standards_based_AudioContext
				try{
					if (p[_type].context.stop) {
						p[_type].context.stop(0);
						if(!_bool)
						{
							delete currentlyPlaying[_type];
						}
						return false;
					}
					if (p[_type].context.noteOff) {
						p[_type].context.noteOff(0);
						if(!_bool)
						{
							delete currentlyPlaying[_type];
						}
						return false;
					}
					
				}catch(e){
					//console.log("error..... " , e)
					}
            }
        }
        else
        {
            if(audioObj[_type] && audioObj[_type].audio)
			{
				audioObj[_type].audio.onended = null;
				audioObj[_type].audio.pause();
			}
        }
    }
    //================================================================================
	this.stopAll = function(_bool)
	{
		if (audioContext)
		{
			for (var i in p)
			{
			   _thisObj.stop(i, _bool);
			}
		}
		else
		{
			for (var i in audioObj)
			{
			   _thisObj.stop(i, _bool);
			}
		}
	}
    //================================================================================
	this.enable = function(_flag)
	{
		allowToPlay = _flag;
		!allowToPlay ? this.stopAll() : null;
	}
	//================================================================================
    this.playAudio = function(_type, _cb, _loop, _volume)
    {
		if(!allowToPlay)
			return;
		//volume = _volume ? _volume : volume;
		if (!audioContext)
		{
			for(var i = 0; i < aChans.length; i++)
			{
				if(aChansPlaying.indexOf(aChans[i].id) == -1)
				{
					aChansPlaying.push(aChans[i].id);
					audioObj[_type].audio = aChans[i];
					break;
				}
			}
		}
        if (typeof (_cb) == "function") {
            if (audioContext)
			{
				p[_type].callBack = _cb;
			}
        }
		if (!audioContext)
		{
			if(audioObj[_type].audio)
			{
				audioObj[_type].audio.onended = function(e)
				{
					aChansPlaying.splice(aChansPlaying.indexOf(e.target.id), 1);
					typeof(_cb) == "function" ? _cb() : null;
				}
			}
		}
		//-------
		if(_loop)
		{
			if (!audioContext)
            {
                audioObj[_type].audio ? audioObj[_type].audio.loop = true : null;
            }
			else
			{
				p[_type].loop = true;
			}
		}
		else
		{
			if (!audioContext)
            {
                audioObj[_type].audio ? audioObj[_type].audio.loop = false : null;
            }
			else
			{
				p[_type].loop = false;
			}
		}
		//-------
		if (audioContext && _volume)
		{
			p[_type].volume = _volume;
		}
		//-------
		if (!audioContext)
		{
			if(audioObj[_type] && audioObj[_type].audio)
			{
                if(_volume)
				{
					audioObj[_type].audio.volume = _volume;
				}
				//
				audioObj[_type].audio.src = audioObj[_type].src;
				if (audioObj[_type].audio.currentTime)
				{
					audioObj[_type].audio.currentTime = 0.01;
				}
				audioObj[_type].audio.play();
			}
		}
		else
		{
			if (p[_type])
			{
				if (!p[_type].buffer)
				{
					loadAudio(_type);
				}
				else
				{
					playAfterLoad(_type)
				}
			}
		}
    }
    //================================================================================
    // PRIVATE FUNCTIONS
    //================================================================================
    function onError()
    {

    }
    //================================================================================
    function loadAudio(_type, _bool, _ref)
    {
        var request = new XMLHttpRequest();
        request.open('GET', p[_type].source, true);
        request.responseType = 'arraybuffer';
        // Decode asynchronously
        request.onload = function()
        {
            audioContext.decodeAudioData(request.response, function(buffer) {
                p[_type].buffer = buffer;
				if(!_bool)
				{
					playAfterLoad(_type, _bool);
				}
            }, onError);
            //to inform controller audio is loaded
            //controlObj.audio_loaded_log();
			typeof(_ref) != "undefined" ? _ref() : null;
        }
        request.send();
    }
    //================================================================================
           function playAfterLoad(_type, _bool) {
            p[_type].context = audioContext.createBufferSource();
            // ==============================================================
            /*
            	createGainNode is added because old audioContext syntax was different. thats why on Mac OS 10.7 Safari 6.0 sound was nt working
            	https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Porting_webkitAudioContext_code_to_standards_based_AudioContext
            */
            if (audioContext.createGain) {
                p[_type].gainNode = audioContext.createGain();
            }
            if (audioContext.createGainNode) {
                p[_type].gainNode = audioContext.createGainNode();
            }
            //p[_type].gainNode = audioContext.createGainNode(); 
            // ==============================================================
            p[_type].context.buffer = p[_type].buffer;
            p[_type].context.connect(p[_type].gainNode);
            p[_type].gainNode.connect(audioContext.destination);
            p[_type].gainNode.gain.value = typeof(p[_type].volume) == "undefined" ? typeof(volume) == "undefined" ? 1 : volume : p[_type].volume;
            p[_type].context.loop = p[_type].loop;
            p[_type].context.onended = function(e) {
                contextEnd(e, _type);
            };
            if (!_bool) {
                currentlyPlaying[_type] = p[_type];
                //p[_type].context.start(0); // Previous Code
                // ================= Code Added by Vishal older mac version Mac Lion as its audiocontext syntax is different
                // https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Porting_webkitAudioContext_code_to_standards_based_AudioContext
                if (p[_type].context.start && p[_type].context.noteOn) {
                    if (p[_type].context.start) {
                        _bool ? null : p[_type].context.start(0)
                    };
                    return false;
                }
                if (p[_type].context.start) {
                    _bool ? null : p[_type].context.start(0);
                    return false;
                }
                if (p[_type].context.noteOn) {
                    _bool ? null : p[_type].context.noteOn(0);
                    return false;
                }
            }
        }
    //================================================================================
	function contextEnd(e, _type)
	{
		if(p[_type])
		{
			if(!p[_type].loop)
			{
				/* if(!p[_type].noClean && p[_type].context)
				{
					p[_type].context.disconnect();
				}
				p[_type].context = null;
				p[_type].context = "";
				p[_type].gainNode = null;
				p[_type].gainNode = ""; */
				p[_type].context = undefined;
				typeof (p[_type].callBack) == "function" ? p[_type].callBack() : null;
				delete currentlyPlaying[_type];
			}
		}
	}
    //================================================================================
	function checkForFocus()
	{
		var _nd = new Date();
		if(_nd - globalTime > 1500)
		{
		}
		globalTime = _nd;
	}
	this.getAudioStatus = function()
	{
		return allowToPlay;
	}
}
//================================================================================
var audioPlayerObj = new AudioPlayerClass();
//================================================================================
//================================================================================
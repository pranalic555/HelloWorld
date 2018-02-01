//////////////////////////////////////////////////////////////////////////////////////
// Developed By: Mitr Learning & Media												//
// Name: TableComponent																//
// Description: Creates data table on run-time with the help of desired setters.	//
// Date Created: 07/05/2014															//
// Date Modified: 07/05/2014														//
// Version: 1.0:																	//
//////////////////////////////////////////////////////////////////////////////////////
var TableComp = function()
	{
		// Default starts ...
		var p = {
			id: "",
			width: 300,
			height: 300,
			maxRows: 7,
			scrollerWidth: 27,
			scrollerHandleWidth: 18,
			scrollerHandleHeight: 20,
			scrollerDisplay: true,
			fontSize: "1em",
			emdash: false,
			headingAlign: "center",
			bodyAlign: "center",
			barHeight: 5,
			showHeader: true,
			borderWidth: 1,
			decimalAlign: false,
			rowsCss:[],
			colsCss:[],
			refreshScroller:true,
			nanDecimalAlign:false,
			cols: [
				{
					label: "COLUMN 1",
					width: 50,
					border: "2px solid #A7A7A7",
					bg: '#F4F4F4',
					//barColor:#000000
				},
				{
					label: "COLUMN 2",
					width: 50,
					border: "2px solid #A7A7A7",
					bg: '#F4F4F4',
					//barColor:#000000
				}]
		}
		var _thisObj = this;
		var tableDiv, sliderBase, sliderKnob, sliderHold, printDiv;
		var trArray = new Array();
		var tdArray = new Array();
		var dataArray = new Array();
		var scrollIndex = 0;
		var mathjaxContainerDiv;
		//================================================================================
		// PUBLIC FUNCTIONS
		//================================================================================
		this.init = function(_obj)
			{
				for (var i in _obj)
				{
					p[i] = _obj[i];
				}
				p.x = globalResizeCalc(p.x);
				p.y = globalResizeCalc(p.y);
				p.width = globalResizeCalc(p.width);
				p.height = globalResizeCalc(p.height);
				p.scrollerHandleWidth = globalResizeCalc(p.scrollerHandleWidth);
				p.scrollerHandleHeight = globalResizeCalc(p.scrollerHandleHeight);
				p.borderWidth = globalResizeCalc(p.borderWidth);
				if (p.headerHeight)
				{
					p.headerHeight = globalResizeCalc(p.headerHeight);
					p.height = p.height - p.headerHeight
				}		
				if (p.borderWidth < 1)
				{
					p.borderWidth = 1;
				}
				//---------
				var _tDiv = document.createElement("div");
				if (p.target)
				{
					p.target.append(_tDiv);
				}
				else
				{
					$("body").append(_tDiv);
				}
				p.target = $(_tDiv);
				p.visible == false ? p.target.css("display", "none") : null;
				p.index ? p.target.css("z-index", p.index) : null;
				p.title ? p.target.attr("p_title", GCTConv(p.title)) : null;
				//---------------------------------------
				if (p.scrollerDisplay)
				{
					p.scrollerWidth = globalResizeCalc(p.scrollerWidth);
					p.width -= p.scrollerWidth;
				}
				else
				{
					p.scrollerWidth = 0;
				}
				//---------
				p.target.css(
				{
					"position": "absolute",
					"left": p.x + "px",
					"top": p.y + "px",
					"width": p.width + "px",
					"height": p.height + "px",
				});
				//---------------------------------------
				printDiv = document.createElement("div");
				//---------------------------------------
				createTable();
				createSlider();
				
				_thisObj.refreshTable();
			}
			//================================================================================
		this.show = function()
			{
				p.target.show();
				checkTableHeightForSlider();
			}
			//================================================================================
		this.hide = function()
			{
				p.target.hide();
			}
			//================================================================================
		this.addData = function(_data)
			{
				dataArray.push(_data);
				checkLimit()
				updateTable();
				this.setLastIndex();
			} // addData()
			//================================================================================
		this.addWholeData = function(_dataArr)
			{
				dataArray = _dataArr;
				checkLimit()
				updateTable();
				this.setLastIndex();
			}
			//================================================================================
		this.clearData = function()
			{
				dataArray = new Array();
				scrollIndex = 0;
				if (p.resetToTop)
				{
					scrollIndex = 0;
					$(sliderKnob).css("top", "0px");
				}
				updateTable();
			} // clearData()
			//================================================================================
		this.getTable = function()
			{
				$("body").append(printDiv);
				$(printDiv).css("opacity", 0);
				$(printDiv).attr("printdiv", true);
				var _htmlArr = new Array();
				_htmlArr[0] = new Array();
				if(p.showHeader)
				{
					for (var i = 0; i < p.cols.length; i++)
					{
						$(printDiv).html(p.cols[i].label);
						_htmlArr[0].push($(printDiv).text());
					}
				}
				if (dataArray.length > 0)
				{
					for (var i = 0; i < dataArray.length; i++)
					{
						var _i = p.showHeader ? i + 1 : i;
						_htmlArr[_i] = new Array();
						for (var j = 0; j < dataArray[i].length; j++)
						{
							$(printDiv).html(dataArray[i][j] != undefined ? dataArray[i][j] : "");
							_htmlArr[_i].push($(printDiv).text());
						}
					}
					$(printDiv).remove();
					return (_htmlArr);
				}
				else
				{
					// .............. change as it was affected tab comp.
					$(printDiv).remove();
					return false;
				}
			} // getTable
			//================================================================================
		this.updateHeaderLabel = function(_arr)
			{
				for (var i = 0; i < tdArray[0].length; i++)
				{
					p.cols[i].label = String(_arr[i]).replace(/-/g, "–")
					$(tdArray[0][i]).html(String(_arr[i]).replace(/-/g, "–"));
				}
			}
			//================================================================================
		this.getCellData = function(_row, _col)
			{
				if (tdArray[_row + 1][_col])
				{
					return $(tdArray[_row + 1][_col]).html();
				}
			}
			//================================================================================
		this.setCellData = function(_row, _col, _val)
			{
				if (tdArray[_row + 1][_col])
				{
					if ((_row + 1) == 0) p.cols[_col].label = String(_val).replace(/-/g, "–");
					$(tdArray[_row + 1][_col]).html(String(_val).replace(/-/g, "–"));
				}
			}
			//================================================================================
		this.setCellStyle = function(_row, _col, _val)
			{
				if (tdArray[_row + 1][_col])
				{
					$(tdArray[_row + 1][_col]).css(_val);
				}
			}
			//================================================================================
		this.setLastIndex = function()
			{
				if ($(sliderKnob).css('display') != "none" && p.scrollerDisplay)
				{
					var _max = parseInt($(sliderHold).css("height")) - parseInt($(sliderKnob).css("height"));
					_max = _max < 0 ? 0 : _max;
					$(sliderKnob).css("top", _max);
					onSlideEvent();
				}
			} 
			//================================================================================
		this.getScrollIndex = function()
			{
				return scrollIndex;
			}
			//================================================================================
		this.setScrollIndex = function(_index)
			{
				if(_index != undefined && _index < dataArray.length)
				{
					scrollIndex = _index;
					var _max = parseInt($(sliderHold).css("height")) - parseInt($(sliderKnob).css("height"));
					var _y = (scrollIndex/(dataArray.length - p.maxRows) * _max);
					$(sliderKnob).css("top", _y);
					updateTable();
				}
			} 
			//================================================================================
		this.refreshTable = function()
			{
				applyCss();
				updateTable();				
				checkTableHeightForSlider();
			}
			
			//================================================================================
			// PRIVATE FUNCTIONS
			//================================================================================
		function checkLimit()
			{
				if(p.maxLimit == undefined)
					return;
				while(dataArray.length > p.maxLimit)
				{
					dataArray.splice(0,1);
				}
			}
			//================================================================================
		function applyCss()
			{
				for (var i = 1; i < p.maxRows + 1; i++)
				{
					var tempCssObj = new Object();
					if(p.rowsCss[i])
					{
						for(var inc1 in p.rowsCss[i])
						{
							tempCssObj[inc1]= p.rowsCss[i][inc1];
						}
					}
					for (var j = 0; j < p.cols.length; j++)
					{
						if(p.colsCss[j])
						{
							for(var inc2 in p.colsCss[j])
							{
								tempCssObj[inc2]= p.colsCss[j][inc2];
							}
						}
						if(p.colsCss[j] || p.rowsCss[i])
							$(tdArray[i][j]).css(tempCssObj);
					}
				}
			}
			//================================================================================
		function createTable()
			{
				
				if (p.columnBg) {
					var colBgArr = new Array();
					var _trHgt = p.height / (p.maxRows + 1);
					for (var i = 0; i < p.cols.length; i++) {
						colBgArr[i] = document.createElement("div");
						p.target.append(colBgArr[i]);
						var _cellWid = (p.width * parseInt(p.cols[i].width) / 100);
						$(colBgArr[i]).css({
							"width": _cellWid + "px",
							"height": (p.height - _trHgt - globalResizeCalc(2)) + "px",
							"background": p.cols[i].cbg,
							"float": "left"
						})
					}
					}				
				tableDiv = document.createElement("div");
				mathjaxContainerDiv = document.createElement("div");
				
				p.target.append(mathjaxContainerDiv);
				p.target.append(tableDiv);
				
				$(tableDiv).addClass('ntable').attr("id", p.id + "_table");
				$(tableDiv).css(
				{
					"position": "absolute",
					"left": "0px",
					"top": "0px",
					"width": Math.round(p.width) + "px",
					"height": p.height + "px",
				}).attr(
				{
					"cellpadding": 0,
					"cellspacing": 0
				});
				
				$(mathjaxContainerDiv).css(
				{
					"position": "absolute",
					"left": "0px",
					"top": "0px",
					"opacity":0
				});
				var _trHgt = p.height / (p.maxRows + 1);
				var _barExist = false;
				for (var i = 0; i <= p.maxRows + 1; i++)
				{
					var _totalWidth = 0;
					tdArray[i] = new Array();
					trArray[i] = document.createElement("div");
					$(trArray[i]).addClass('ntr');
					$(tableDiv).append(trArray[i]);
					for (var j = 0; j < p.cols.length; j++)
					{
						if (typeof(p.cols[j].barColor) != "undefined")
						{
							_barExist = true;
						}
						{
							var _tempTd = document.createElement("div");
							tdArray[i][j] = _tempTd //document.createElement("div");
							tdArray[i][j] = document.createElement("div");
							$(tdArray[i][j]).addClass('ntd');
							_tempTd = tdArray[i][j]
							$(trArray[i]).append(tdArray[i][j]);
						}
						$(_tempTd).css(
						{
							"background": p.cols[j].bg,
							"border-left": p.cols[j].border,
							"border-right": p.cols[j].border,
							/* "background": "red", */
							"overflow": "hidden"
						});
						if (i == 0)
						{
							$(tdArray[i][j]).css(
							{
								"border-top": p.cols[j].border,
								"border-bottom": p.cols[j].border
							});
						}
						//debugger;
						if (i == p.maxRows + 1)
						{
							$(tdArray[i][j]).css(
							{
								"border-bottom": p.cols[j].border,
							});
						}
						else
						{
							$(tdArray[i][j]).css(
							{
								//"border-bottom":'none',
							});
						}
						$(tdArray[i][j]).css(
						{
							"overflow": "hidden",
							"display": "table-cell",
							"font-size": p.fontSize,
							"text-align": "center",
							"vertical-align": "middle",
							"cursor": "default",
							"background": p.cols[j].bg,
							"border-left": p.cols[j].border,
							"border-right": p.cols[j].border,
						});
						
						
						if (j != p.cols.length - 1)
						{
							var _cellWid = (p.width * parseInt(p.cols[j].width) / 100);
							$(tdArray[i][j]).css(
							{
								"width": _cellWid + "px",
								"height": _trHgt,
							});
							$(_tempTd).css(
							{
								"width": _cellWid + "px",
							});
							_totalWidth += _cellWid;
						}
						else
						{
							$(tdArray[i][j]).css(
							{
								"width": (p.width - _totalWidth) + "px",
								"height": _trHgt,
							});
							$(_tempTd).css(
							{
								"width": (p.width - _totalWidth) + "px",
							});
						}
						if (i < 2)
						{
							$(_tempTd).css(
							{
								"border": p.cols[j].border
							});
							$(tdArray[i][j]).css(
							{
								//"border":p.cols[j].border,
								"font-weight": "bold",
								"text-align": p.headingAlign,
							})
							
							if (p.headerHeight) $(tdArray[0][j]).css(
							{
								"height": p.headerHeight
							});
							if (p.leftPadding) $(tdArray[i][j]).css(
							{
								"padding-left": p.leftPadding
							});
							if (p.rightPadding) $(tdArray[i][j]).css(
							{
								"padding-right": p.rightPadding
							});
							var _str = String(p.cols[j].label).replace(/-/g, "–");
							if (_str.indexOf("\\begin{equation}") != -1)
							{
								if(p.katex)
								{
									printKatex($(tdArray[i][j]), _str)
								}
								else
								{
									var _div = document.createElement("div");
									$(tdArray[i][j]).html(_div);
									$(_div).attr("id", p.id + "_" + i + "_" + j + "_div").css(
									{
										"display": "inline-block"
									}).html(_str);
								}
							}
							else
							{
								$(tdArray[i][j]).html(_str);
							}
						}
						else
						{
							$(tdArray[i][j]).css(
							{
								"text-align": p.bodyAlign,
							})
							if (p.leftPadding) $(tdArray[i][j]).css(
							{
								"padding-left": p.leftPadding
							});
							if (p.rightPadding) $(tdArray[i][j]).css(
							{
								"padding-right": p.rightPadding
							});
						}
						if (i == p.maxRows + 1)
						{
							$(_tempTd).css(
							{
								"border-bottom": p.cols[j].border
							});
						}
						$(_tempTd).css(
						{
							"border-width": p.borderWidth + "px",
						}).attr("id", p.id + "_" + i + "_" + j);
						//$(_tempTd)
					}
				}
				//----------------------------------
				if (_barExist)
				{
					for (var j = 0; j < tdArray[1].length; j++)
					{
						if (typeof(p.cols[j].barColor) != "undefined")
						{
							$(tdArray[1][j]).css(
							{
								"background": p.cols[j].barColor,
								"height": globalResizeCalc(p.barHeight) + "px"
							}).html("");
						}
					}
				}
				else
				{
					$(trArray[1]).remove();
					for (var j = 0; j < tdArray[1].length; j++)
					{
						$(tdArray[1][j]).remove();
					}
				}
				//----------------------------------
				tdArray.splice(1, 1);
				trArray.splice(1, 1);
				//$(".ntable").css({"padding-bottom" : globalResizeCalc(22)+"px"});
				//----------------------------------
			}
			//================================================================================
		function createSlider()
			{
				if (p.scrollerDisplay)
				{
					sliderBase = document.createElement("div");
					p.target.append(sliderBase);
					$(sliderBase).css(
					{
						"position": "absolute",
						// "right": -(p.scrollerWidth - globalResizeCalc(1)) + "px",
						"left": (p.width) + "px",
						"top": "0px",
						"width": p.scrollerWidth + "px",
						"height": $(tableDiv).outerHeight(true) + "px",
						"background": "#E5E5E5",
						"box-shadow": "2px 2px 10px rgba(0,0,0,0.5) inset"
					});
					//------------
					sliderHold = document.createElement("div");
					$(sliderBase).append(sliderHold);
					$(sliderHold).css(
					{
						"position": "absolute",
						"left": globalResizeCalc(5) + "px",
						"top": globalResizeCalc(5) + "px",
						"width": (p.scrollerWidth - globalResizeCalc(10)) + "px",
						"height": (parseInt($(sliderBase).css("height")) - globalResizeCalc(10)) + "px",
					});
					//------------
					sliderKnob = document.createElement("div");
					$(sliderHold).append(sliderKnob);
					$(sliderKnob).css(
					{
						"position": "absolute",
						"left": "0px",
						"top": "0px",
						"width": (p.scrollerWidth - globalResizeCalc(10)) + "px",
						"height": globalResizeCalc(39) + "px",
						"background": "#FFFFFF",
						"background-size": globalResizeCalc(10) + "px " + globalResizeCalc(17) + "px",
						"background-position": "center",
						"box-shadow": "2px 2px 5px rgba(0,0,0,0.5)",
						"display": "none"
					}).attr("p_title", GetGlobalTooltip("tooltip", "tablescroll"));
					$(sliderKnob).addClass("commongrab");
					$(sliderKnob).draggable(
					{
						"containment": "parent",
						drag: onSlideEvent
					});
					if (BrowserDetect.any())
					{
						$(sliderKnob).unbind("touchstart", onDownEvt).bind("touchstart", onDownEvt).unbind("touchend", onDownEvt).bind("touchend", onDownEvt);
					}
					else
					{
						$(sliderKnob).unbind("mousedown", onDownEvt).bind("mousedown", onDownEvt);
					}
				}
				//
				if (!p.showHeader)
				{
					$(trArray[0]).hide();
					for (var j = 0; j < tdArray[1].length; j++)
					{
						$(tdArray[1][j]).css(
						{
							"border-top": p.cols[j].border,
							"border-width": p.borderWidth + "px",
						});
					}
					updateTable();
				}
			}
			//================================================================================
		function checkTableHeightForSlider()
			{
				if (p.scrollerDisplay)
				{
					var _tableManageDiv = document.createElement("div");
					$("body").append(_tableManageDiv);
					$(_tableManageDiv).css(
					{
						"position": "absolute",
						"left": "0px",
						"top": "0px",
						"opacity": 0
					});
					var _parent = p.target.parent();
					$(_tableManageDiv).append(p.target);
					$(sliderBase).css(
					{
						"height": $(tableDiv).outerHeight(true) + "px"
					});
					//------------
					$(sliderHold).css(
					{
						"height": (parseInt($(sliderBase).css("height")) - globalResizeCalc(10)) + "px"
					});
					$(_parent).append(p.target);
					$(_tableManageDiv).remove();
				}
			}
			//================================================================================
		function updateTable()
			{
				$(mathjaxContainerDiv).empty();
				var _cnt = 1;
				var callBackArr = [];
				for (var k = 1; k < tdArray.length; k++)
				{
					for (var m = 0; m < tdArray[k].length; m++)
					{
						$(tdArray[k][m]).html("");
					}
				}
				for (var i = scrollIndex; i < dataArray.length; i++)
				{
					if (tdArray[_cnt])
					{
						for (var j = 0; j < tdArray[_cnt].length; j++)
						{
							var _str = String(dataArray[i][j]);
							
							if (_str.indexOf("\\begin{equation}") != -1)
							{
								
								if(p.katex) 
								{
									printKatex($(tdArray[_cnt][j]), _str)
									$(".katex").css("font-weight",p.bold);
								} 
								else
								{
									var _div = document.createElement("div");
									var _html = String(dataArray[i][j]).replace(/-/g, "–");
									$(mathjaxContainerDiv).append(_div);
									var tempName = p.id + "_" + _cnt + "_" + j + "_div";
									$("#" + tempName).remove();
									$(_div).attr("id", tempName).css(
										{
											"display": "inline-block",
											"opacity": 0,
										}).attr("parentName", $(tdArray[_cnt][j]).attr("id")) /* .html(_html); */
										//console.log($(tdArray[_cnt][j]).attr("id"))
										//------------------
									callBackArr.push(tempName);
									var mjObj = MathJax.Hub.getAllJax(tempName)[0],
										mjHubParam = mjObj ? ["Text", mjObj, _html] : ['Typeset', MathJax.Hub, tempName];
									if (!mjObj)
									{
										$(_div).html(_html);
										MathJax.Hub.Queue(mjHubParam, p.id + "_table", function()
										{
											var counter = 0;
											for (var k in callBackArr)
											{
												if ($("#"+callBackArr[k]).css("opacity") != 1 && $("#" + callBackArr[k] + " > div.MathJax_Display").length > 0)
												{
													var _tempCallBackDiv = $("#" + callBackArr[k]).clone()
													$(_tempCallBackDiv).css("opacity", 1)
													$("#" + $(_tempCallBackDiv).attr("parentName")).empty().append(_tempCallBackDiv);
													$(_tempCallBackDiv).removeAttr("id");
													counter++;
												}
											}
											var mjD = $(_div).children(".MathJax_Display");
											if (mjD) mjD.css("text-align", "center");
										});
									}
								}
							}
							else
							{
								var _str = String(dataArray[i][j]).replace(/-/g, "–");
								if (p.decimalAlign)
								{
									var _wwid = (parseFloat(tdArray[_cnt][j].style.width) - 1) / 2;
									var _arr, _midd;
									if(!isNaN(dataArray[i][j]) || p.nanDecimalAlign)
									{
										if (_str.indexOf(".") != -1)
										{
											_arr = _str.split(".");
											_midd = ".";
										}
										else
										{
											_arr = [_str, ""];
											_midd = "<span style='opacity:0;'>.</span>";
										}
										if(!p.decimalPadding)
											_str = '<div style="display:table;"><div style="display:table-cell; text-align:right; width:' + _wwid + 'px;">' + _arr[0] + '</div><div style="display:table-cell; width:1px;">' + _midd + '</div><div style="display:table-cell; text-align:left;">' + _arr[1] + '</div></div>';
										else
											_str = '<div style="display:table;"><div style="display:table-cell; text-align:right; width:' + _wwid + 'px;">' + _arr[0] + '</div><div style="display:table-cell; width:1px;">' + _midd + '</div><div style="display:table-cell; text-align:left; width:' + _wwid + 'px;">' + _arr[1] + '</div></div>';
									}
								}
								$(tdArray[_cnt][j]).html(_str);
							}
						}
						_cnt++;
					}
				}
				checkSlider();
				if(p.refreshScroller)
					checkTableHeightForSlider();
			} // updateTable()
			//================================================================================
		function checkSlider()
			{
				if (dataArray.length > tdArray.length - 1)
				{
					$(sliderKnob).show();
				}
				else
				{
					$(sliderKnob).hide();
				}
			} // addDrag()
			//================================================================================
		function onSlideEvent(event, ui)
			{
				var _y = parseInt($(sliderKnob).css("top"));
				var _max = parseInt($(sliderHold).css("height")) - parseInt($(sliderKnob).css("height"));
				scrollIndex = Math.round((dataArray.length - p.maxRows) / _max * _y);
				updateTable();
			}
			//================================================================================
		function onDownEvt(e)
			{
				if (e.type == "mousedown" || e.type == "touchstart")
				{
					focusOutInput();
					addPointerGrabbing(true);
					audioPlayerObj.playAudio("down");
					if (!BrowserDetect.any())
					{
						$(document).unbind("mouseup", onDownEvt).bind("mouseup", onDownEvt);
					}
				}
				else if (e.type == "mouseup" || e.type == "touchend")
				{
					audioPlayerObj.playAudio("up");
					addPointerGrabbing(false);
					$(document).unbind("mouseup", onDownEvt);
				}
			}
			//================================================================================
	}
	//================================================================================

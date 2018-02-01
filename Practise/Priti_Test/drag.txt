				
				$(document).ready(function()
				{
					
				var currentDrag,counter  = 0,totalDrop =0;
				$("#submit").attr("disabled", true);
				$("#feedback").hide();
				$("#closeBtn").hide();
				$("#submit").on("click", checkAnswer);
				console.log("ready")
				$(".draggable").draggable({
					start: function(e){
						$target = $(e.target);
						$target.addClass("dragging");
						currentDrag = $target;
						console.log("drag start");
					},
					drag: function(e) {
						console.log("product drag");
					},
					stop: function(e) {
						console.log("product dragend");
						$(e.target).removeClass("dragging");
						currentDrag = "";
					},
					revert : function(d){
						if(d)
						{
							console.log("if")
						}
						else{
						console.log("revert")
						}
						return true;
					}
				});
        
				$(".basket").droppable()
				$(".basket").on({
					dragenter: function(e) {
						console.log("basket dragenter", e);
						$(e.target).addClass("dropping");
					},
					dragover: function(e) {
						console.log("basket dragover");
						//e.originalEvent.dataTransfer.dropEffect = "copy"; // "move", "link"
						return false;
					},
					dragleave: function(e) {
						console.log("basket dragleave");
						$(e.target).removeClass("dropping");
					},
					drop: function(e) {
						console.log("droppped");
						$(e.target).removeClass("dropping");
						var $target = $(e.target);
						//var dropText = "[" + e.originalEvent.dataTransfer.getData("text/html") + "]";
						
						var _id = currentDrag.attr("id");
						
						console.log($(e.target).offset())
						$(e.target).droppable("disable");
						$(e.target).append(currentDrag)
						$(currentDrag).css({
							"left" : "0px",
							"top" : "0px",
							"opacity" : 0.8 , 
							"border" : "1px solid rey"
						});
						$(currentDrag).draggable({ disabled: true });
						//$(e.target).html($("#"+_id).html());
						totalDrop++;
						if(totalDrop == 4)
						{
							
							$("#submit").attr("disabled", false);
							$("#submit").css({"cursor":"pointer"});
						}
					
						console.log($target.attr('data-id'),$("#"+_id).attr("data-id"))
						if ($("#"+_id).attr("data-id") == $target.attr('data-id'))
						{
							counter++;
							
						}
						
					}
				});
				 
				function checkAnswer()
				{
					
          
					$("#feedback").html(" Your score is "+((counter/4)*100));
					$("#feedback").show();
					$("#closeBtn").show();
					
				}
				
				$("#closeBtn").off("click",closeBtnClicked).on("click",closeBtnClicked);
				
				function closeBtnClicked()
				{
					$("#submit").attr("enabled", true);
					$("#feedback").hide();
					$("#closeBtn").hide();
					resetAll();
				}
				function resetAll()
				{
					counter = 0;
					for(var i=1;i<=4;i++)
					{
						$("#drag"+i).appendTo(".dragHolder");
						$("#drag"+i).css({
							"border": "1px solid lightblue",
							"opacity" :  1
						});
						
						$("#drag"+i).draggable({ disabled: false });
						$("#drag"+i).addClass("draggable");
						$(".basket").droppable( "option", "disabled", false );
					}
				}
				});	
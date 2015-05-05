var color = $(".selected").css("background-color");
var $canvas = $("canvas");
var context = $canvas[0].getContext("2d");
var lastEvent;
var mouseDown = false;


//When clicking on controls list items 
$(".controls").on("click", "li", function(){
	//Deselect sibling elements
	$(this).siblings().removeClass("selected");
	//Select clicked elements
	$(this).addClass("selected")
	//cache current color
	color = $(this).css("background-color");
});


//when new color button is pressed

$("#revealColorSelect").click(function(){
		//Show color select or hide the color select
		changeColor();
	$("#colorSelect").toggle();	
});

	//update new color span
function changeColor(){
	var r = $("#red").val();
	var g = $("#green").val();
	var b = $("#blue").val();
	$("#newColor").css("background-color", "rgb(" + r + "," + g + ", " + b + ")");
};


//when color sliders change

$("input[type=range]").change(changeColor);

//when "add color" is pressed

$("#addNewColor").click(function() {


	//append the color to the controls ul
	var $newColor = $("<li></li>");
	$newColor.css("background-color", $("#newColor").css("background-color"));
	$(".controls ul").append($newColor);
	// select the new color
	$newColor.click();
});


//on mouse events on the canvas
$canvas.mousedown(function(e){
	lastEvent = e;
	mouseDown = true;
}).mousemove(function(e){
	//draw lines
	if (mouseDown) {
		context.beginPath();
		context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
		context.lineTo(e.offsetX, e.offsetY);
		context.strokeStyle = color;
		context.stroke();
		lastEvent = e;
	}
}).mouseup(function(){
	mouseDown = false;
}).mouseleave(function(){
	$canvas.mouseup();

});


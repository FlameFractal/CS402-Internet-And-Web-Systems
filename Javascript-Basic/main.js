var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

function draw(){

	document.getElementById("line").style.display = "block";
	document.getElementById("header1").style.display = "none";
	document.getElementById("header2").style.display = "block";
	context.clearRect(0, 0, canvas.width, canvas.height);

	var shape = document.querySelector('input[type="radio"]:checked').id;

	context.beginPath();
	context.moveTo(99,0);

	if (shape==='square') {
		
		context.rect(20,20,100,100);

		document.getElementById("dimensions").innerHTML = `
			<label for="square_side">Length: </label>
			<input type="text" name="" id="square_side" placeholder="Side" oninput="calc()">
		`;

	} else if (shape==='rectangle') {
		
		context.rect(20,20,150,100);

		document.getElementById("dimensions").innerHTML = `
			<label for="length">Length: </label>
			<input type="text" name="" id="length" placeholder="Length" oninput="calc()"> <br>
			<label for="length">&nbsp; Width:</label>
			<input type="text" name="" id="width" placeholder="Width" oninput="calc()">

		`;

	} else if (shape==='circle') {

		context.arc(99,60,60,0,2*Math.PI);

		document.getElementById("dimensions").innerHTML = `
			<label for="radius">Radius: </label>
			<input type="text" name="" id="radius" placeholder="Radius" oninput="calc()">
		`;

	} else if (shape==='triangle') {
		
		context.lineTo(50, 100);
		context.lineTo(150, 100);

		document.getElementById("dimensions").innerHTML = `
			<label for="radius">Side 1: </label>
			<input type="text" name="" id="side1" placeholder="Side1" oninput="calc()"> <br>
			<label for="radius">Side 2: </label>
			<input type="text" name="" id="side2" placeholder="Side2" oninput="calc()"> <br>
			<label for="radius">Side 3: </label>
			<input type="text" name="" id="side3" placeholder="Side3" oninput="calc()"> <br>
		`;

	} else if (shape==='hexagon') {

	    context.lineTo(99, 0);
	    context.lineTo(198, 50);
	    context.lineTo(198, 148);
	    context.lineTo(99, 198);
	    context.lineTo(99, 198);
	    context.lineTo(1, 148);
	    context.lineTo(1,50);

		document.getElementById("dimensions").innerHTML = `
			<label for="radius">Side: </label>
			<input type="text" name="" id="hex_side" placeholder="Side" oninput="calc()">
		`;

	}

		context.closePath();
		context.stroke();

		// Fill with gradient
		context.fillStyle = "#FFCC00";
		context.fill();

}

function calc(){
	
	context.clearRect(250, 0, canvas.width, canvas.height);

	var shape = document.querySelector('input[type="radio"]:checked').id;
	var area=0, perimeter=0;

	if (shape==='square') {

		var square_side = parseFloat(document.getElementById('square_side').value);
		area = square_side * square_side;
		perimeter = 4 * square_side;

	} else if (shape==='rectangle'){

		var length = parseFloat(document.getElementById('length').value);
		var width = parseFloat(document.getElementById('width').value);
		area = length * width;
		perimeter = 2 * (length + width);

	} else if (shape==='circle'){

		var radius = parseFloat(document.getElementById('radius').value);
		area = 3.14 * radius * radius;
		perimeter = 2 * 3.14 * radius;

	} else if (shape==='triangle'){

		var side1 = parseFloat(document.getElementById('side1').value);
		var side2 = parseFloat(document.getElementById('side2').value);
		var side3 = parseFloat(document.getElementById('side3').value);

		var s = (side1+side2+side3)/2;
		area = Math.sqrt(s*(s-side1)*(s-side2)*(s-side3));
		perimeter = side1 + side2 + side3;

	} else if (shape==='hexagon'){

		var hex_side = parseFloat(document.getElementById('hex_side').value);
		var area = 1.5 * Math.sqrt(3) * hex_side * hex_side;
		var perimeter = 6 * hex_side;

	}

	var area_text = "Area: "+Math.round(area * 100) / 100;
	var perimeter_text = "Perimeter: "+Math.round(perimeter * 100) / 100;

	context.font = "15px Arial";
	context.fillStyle = 'blue';
 	context.fillText(area_text,220,70);
	context.fillText(perimeter_text,220,90);
}
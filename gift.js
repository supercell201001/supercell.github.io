function myfunction(){
	var x = 1024; //min value
	var y = 9980; // max value
	var deg = Math.floor(x + y) + y;
	document.getElementById('box').style.transform = "rotate("+deg+"deg)";
	var element = document.getElementById('mainbox');
	element.classList.remove('animate');
	setTimeout(function(){
		element.classList.add('animate');
	}, 5000); //5000 = 5 second
}

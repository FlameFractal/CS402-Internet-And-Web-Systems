// fill the dropdown on page load
// attach click event to dropwdown to capture id 
// display student's details 

$(document).ready(function(){

	fillDropDown();
	
	showDetails(students[students.length-1].student_id);

	$('.dropdown-menu a').click(function(){
		$('#dropdownMenuButton').text($(this).text());
		showDetails($(this)[0].id.toLowerCase().replace("stud_",""));
	});

});


function showDetails(id){
	console.log(id);
	var stud = students.filter(stud => stud.student_id==id)[0];
	console.log(stud.student_id+" "+id);
	$("#student_id").val(stud.student_id);
	$("#student_name").val(stud.student_name);
	$("#student_marks").val(stud.student_marks.reduce(function add(sum,mark){ return sum+", "+mark.toString()}));
	$("#student_cgpa").val((stud.student_marks.reduce(function add(sum,mark){ return sum+mark}))/50);
}


function fillDropDown(){

	$(".dropdown-menu").html("");

    students.map(function(stud){	
    	obj = '<a class="dropdown-item" href="#" id=stud_'+stud.student_id+'>'+stud.student_name+'</a>'
		$(".dropdown-menu").append(obj);
		$("#dropdownMenuButton").text(stud.student_name);
    });
}

$(document).keypress(function(e){
	if(e.which>=49 && e.which<=53){
		showDetails((e.which-48));
		$('#dropdownMenuButton').text(students.filter(stud => stud.student_id==(e.which-48))[0].student_name);
	}
});
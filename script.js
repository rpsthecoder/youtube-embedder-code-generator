const vidURL = document.querySelector('#vid-url');
const checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]'));
const output = document.querySelector('output');

document.querySelector('#generate-btn').addEventListener('click', onGenerateClick);
document.querySelector('button[type="reset"]').addEventListener('click',function(){
	output.value = 'Nil.';
});
document.querySelector('#selectall-btn').addEventListener('click',function(e){
	checkboxes.forEach(function(element) { element.checked = true; });
	e.preventDefault();
});

function onGenerateClick(){
	try {
		var vidID = (new URL(vidURL.value)).searchParams.get('v');
	}
	catch(e){
		console.error(e); return;
	}
	if(vidID !== null) {
		let embedURL = `https://www.youtube.com/embed/${vidID}?`;
		const checkedCheckboxes = checkboxes.filter(function(checkbox){return checkbox.checked});
		if(checkedCheckboxes.length > 0)
			checkedCheckboxes.forEach(function(element) { embedURL += element.value; });
 		sessionStorage.setItem('embedURL', embedURL);
	}
}

window.onload = function(){
	if(sessionStorage.getItem('embedURL') !== "null" && sessionStorage.getItem('embedURL') !== null){
		output.value = sessionStorage.getItem('embedURL');
		sessionStorage.setItem('embedURL', null);
	}
}
var noSleep = new NoSleep();
$ = function(id) {
  return document.getElementById(id);
}


window.onload = function() {
	show('popup2');
};

var show = function(id) {
	$(id).style.display ='block';
}
var hide = function(id) {
	$(id).style.display ='none';
}

var accept = function(id) {
	noSleep.enable();
	$(id).style.display ='none';
}
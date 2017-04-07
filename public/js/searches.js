var address = "http://flip3.engr.oregonstate.edu:5445";


document.addEventListener('DOMContentLoaded', function() {
    if (event.keyCode == 13) event.preventDefault();
    
    document.getElementById('selectTotal').addEventListener('click', function() {
		var total = document.getElementById('totalSearch').value;
        console.log(total);
		var query = address + '/totals' + '?total=' + total;
		window.location = query;
	});

	document.getElementById('selectMoveset').addEventListener('click', function() {
        var movesetFor = document.getElementById('movesetSearch').value;
        console.log(movesetFor);
		var query = address + '/pkmoves' + '?pkname=' + movesetFor;
		window.location = query;
	});
    
    document.getElementById('selectMoves').addEventListener('click', function() {
        var move = document.getElementById('moveSearch').value;
        console.log(move);
		var query = address + '/moves' + '?move=' + move;
		window.location = query;
	});

	document.getElementById('countType').addEventListener('click', function() {
		var query = address + '/types';
		window.location = query;
	}); 
    
    document.getElementById('searchPkmn').addEventListener('click', function() {
        
        var name = document.getElementById('pkmnSearch').value;
        console.log(name);
		var query = address + '/pokedex' + '?pkname=' + name;
		window.location = query;
	});
});
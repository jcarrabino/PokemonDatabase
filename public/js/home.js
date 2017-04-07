
var address = "http://flip3.engr.oregonstate.edu:5445";

document.addEventListener('DOMContentLoaded', function() {

    document.getElementById("updatePkdata").addEventListener('click', function(event) {
        console.log('we got this far...');
        if (!document.getElementById("pid").value){
          alert("You must enter a valid Pokemon Number!");
          event.preventDefault();
          return;
        }

        if (!document.getElementById("pkname").value){
          alert("You must enter a valid Pokemon Name!");
          event.preventDefault();
          return;
        }
        
        var req = new XMLHttpRequest();

        //Create payload for POST query.
        var payload = {
            pid: document.getElementById("pid").value,
            pkname: document.getElementById("pkname").value,
            typeI: document.getElementById("typeI").value,
            typeII: document.getElementById("typeII").value,
            genderM: document.getElementById("genderM").value,
            genderF: document.getElementById("genderF").value,
            species: document.getElementById("species").value,
            height: document.getElementById("height").value,
            weight: document.getElementById("weight").value,
            abilityI: document.getElementById("abilityI").value,
            abilityII: document.getElementById("abilityII").value,
            abilityIII: document.getElementById("abilityIII").value,
            evyield: document.getElementById("evyield").value,
            capture: document.getElementById("capture").value,
            basehappy: document.getElementById("basehappy").value,
            basexp: document.getElementById("basexp").value,
            growth: document.getElementById("growth").value,
            eggsteps: document.getElementById("eggsteps").value
        };

        req.open('POST', 'http://flip3.engr.oregonstate.edu:5445/updatePkdata');
        req.setRequestHeader('Content-Type', 'application/json');
        req.addEventListener('load', function() {
            if (req.status >= 200 && req.status < 400) {
                var response = JSON.stringify(req.responseText);
                response = JSON.parse(req.responseText);
                //If we have a bad response from the request, update the user.
                if (response.success === false) {
                    alert('Update Failed...');
                } else {
                    alert('Successfully updated PKDATA!');
                }
            } else {
                console.log("Error in network request: " + req.statusText);
            }
        });
        
        //console.log(JSON.stringify(payload));
        req.send(JSON.stringify(payload));
        event.preventDefault();
        alert('Successfully Updated PKDATA');
    });
    
    document.getElementById("insertPkdata").addEventListener('click', function(event) {
        //console.log('we got this far...');
        if (!document.getElementById("pid").value){
          alert("You must enter a valid Pokemon Number!");
          event.preventDefault();
          return;
        }

        if (!document.getElementById("pkname").value){
          alert("You must enter a valid Pokemon Name!");
          event.preventDefault();
          return;
        }
        
        var req = new XMLHttpRequest();

        //Create payload for POST query.
        var payload = {
            pid: document.getElementById("pid").value,
            pkname: document.getElementById("pkname").value,
            typeI: document.getElementById("typeI").value,
            typeII: document.getElementById("typeII").value,
            genderM: document.getElementById("genderM").value,
            genderF: document.getElementById("genderF").value,
            species: document.getElementById("species").value,
            height: document.getElementById("height").value,
            weight: document.getElementById("weight").value,
            abilityI: document.getElementById("abilityI").value,
            abilityII: document.getElementById("abilityII").value,
            abilityIII: document.getElementById("abilityIII").value,
            evyield: document.getElementById("evyield").value,
            capture: document.getElementById("capture").value,
            basehappy: document.getElementById("basehappy").value,
            basexp: document.getElementById("basexp").value,
            growth: document.getElementById("growth").value,
            eggsteps: document.getElementById("eggsteps").value
        };

        req.open('POST', 'http://flip3.engr.oregonstate.edu:5445/addPkdata');
        req.setRequestHeader('Content-Type', 'application/json');
        req.addEventListener('load', function() {
            if (req.status >= 200 && req.status < 400) {
                var response = JSON.stringify(req.responseText);
                response = JSON.parse(req.responseText);
                if (response.success === false) {
                    alert('There is already a Pokemon With that number, try again!');
                } else {
                    alert('Successfully added new Pokemon!');
                }
            } else {
                console.log("Error in network request: " + req.statusText);
            }
        });
        req.send(JSON.stringify(payload));
        
        event.preventDefault();
    });

	document.getElementById('insertAtk').addEventListener('click', function() {
		//console.log('we got this far...');
        if (!document.getElementById("mvname").value){
          alert("You must enter a valid Move Name!");
          event.preventDefault();
          return;
        }

            
        var req = new XMLHttpRequest();
        var payload = {
            pkmid: document.getElementById("pkmid").value,
            mvname: document.getElementById("mvname").value,
            atktype: document.getElementById("atktype").value,
            cat: document.getElementById("cat").value,
            power: document.getElementById("power").value,
            acc: document.getElementById("acc").value,
            pp: document.getElementById("pp").value,
            tm: document.getElementById("tm").value,
            effect: document.getElementById("effect").value,
            prob: document.getElementById("prob").value
        };
        
        req.open('POST', 'http://flip3.engr.oregonstate.edu:5445/addAtk');
        req.setRequestHeader('Content-Type', 'application/json');
        req.addEventListener('load', function() {
            if (req.status >= 200 && req.status < 400) {
                var response = JSON.stringify(req.responseText);
                response = JSON.parse(req.responseText);
                if (response.success === false) {
                    alert('There is already an Attack with that Name, try again!');
                } else {
                    alert('Successfully added new Attack!');
                }
            } else {
                console.log("Error in network request: " + req.statusText);
            }
        });
       
        req.send(JSON.stringify(payload)); 
        event.preventDefault();
	});

    
	document.getElementById('insertDmg').addEventListener('click', function() {
		if (!document.getElementById("fk_did").value){
          alert("You must enter a valid Pokemon Number!");
          event.preventDefault();
          return;
        }
        
        var req = new XMLHttpRequest();

        //Create payload for POST query.
        var payload = {
            fk_did: document.getElementById("fk_did").value,
            typeI: document.getElementById("typeI").value,
            typeII: document.getElementById("typeII").value,
            normal: document.getElementById("normal").value,
            fire: document.getElementById("fire").value,
            water: document.getElementById("water").value,
            electric: document.getElementById("electric").value,
            grass: document.getElementById("grass").value,
            ice: document.getElementById("ice").value,
            fight: document.getElementById("fight").value,
            poison: document.getElementById("poison").value,
            ground: document.getElementById("ground").value,
            flying: document.getElementById("flying").value,
            psychic: document.getElementById("psychic").value,
            bug: document.getElementById("bug").value,
            rock: document.getElementById("rock").value,
            ghost: document.getElementById("ghost").value,
            dragon: document.getElementById("dragon").value,
            dark: document.getElementById("dark").value,
            steel: document.getElementById("steel").value,
            fairy: document.getElementById("fairy").value
        };

        req.open('POST', 'http://flip3.engr.oregonstate.edu:5445/addDmg');
        req.setRequestHeader('Content-Type', 'application/json');
        req.addEventListener('load', function() {
            if (req.status >= 200 && req.status < 400) {
                var response = JSON.stringify(req.responseText);
                response = JSON.parse(req.responseText);
                if (response.success === false) {
                    alert('There is already Damage Data for a Pokemon with that number, try again!');
                } else {
                    alert('Successfully added new Damage Differential!');
                }
            } else {
                
                console.log("Error in network request: " + req.statusText);
            }
        });
        
        req.send(JSON.stringify(payload)); 
        event.preventDefault();
	});

	document.getElementById('updateEvo').addEventListener('click', function() {
        if (!document.getElementById("fk_pid").value){
          alert("You must enter a valid Pokemon Number!");
          event.preventDefault();
          return;
        }
        
        var req = new XMLHttpRequest();

        //Create payload for POST query.
        var payload = {
            fk_pid: document.getElementById("fk_pid").value,
            pid_from_1: document.getElementById("pid_from_1").value,
            method_1: document.getElementById("method_1").value,
            pid_to_1: document.getElementById("pid_to_1").value,
            method_2: document.getElementById("method_2").value,
            pid_to_2: document.getElementById("pid_to_2").value,
            method_3: document.getElementById("method_3").value,
            pid_to_3: document.getElementById("pid_to_3").value,
            method_4: document.getElementById("method_4").value,
            pid_to_4: document.getElementById("pid_to_4").value,
            method_5: document.getElementById("method_5").value,
            pid_to_5: document.getElementById("pid_to_5").value,
            method_6: document.getElementById("method_6").value,
            pid_to_6: document.getElementById("pid_to_6").value,
            method_7: document.getElementById("method_7").value,
            pid_to_7: document.getElementById("pid_to_7").value,
            method_8: document.getElementById("method_8").value,
            pid_to_8: document.getElementById("pid_to_8").value
        };

        req.open('POST', 'http://flip3.engr.oregonstate.edu:5445/updateEvo');
        req.setRequestHeader('Content-Type', 'application/json');
        req.addEventListener('load', function() {
            if (req.status >= 200 && req.status < 400) {
                var response = JSON.stringify(req.responseText);
                response = JSON.parse(req.responseText);
                if (response.success === false) {
                    alert('Update Failed...');
                } else {
                    alert('Successfully updated EVO!');
                }
            } else {
                console.log("Error in network request: " + req.statusText);
            }
        });
        
        req.send(JSON.stringify(payload)); 
        event.preventDefault();
	});


	document.getElementById('insertEvo').addEventListener('click', function() {
        if (!document.getElementById("fk_pid").value){
          alert("You must enter a valid Pokemon Number!");
          event.preventDefault();
          return;
        }
        
        var req = new XMLHttpRequest();

        //Create payload for POST query.
        var payload = {
            fk_pid: document.getElementById("fk_pid").value,
            pid_from_1: document.getElementById("pid_from_1").value,
            method_1: document.getElementById("method_1").value,
            pid_to_1: document.getElementById("pid_to_1").value,
            method_2: document.getElementById("method_2").value,
            pid_to_2: document.getElementById("pid_to_2").value,
            method_3: document.getElementById("method_3").value,
            pid_to_3: document.getElementById("pid_to_3").value,
            method_4: document.getElementById("method_4").value,
            pid_to_4: document.getElementById("pid_to_4").value,
            method_5: document.getElementById("method_5").value,
            pid_to_5: document.getElementById("pid_to_5").value,
            method_6: document.getElementById("method_6").value,
            pid_to_6: document.getElementById("pid_to_6").value,
            method_7: document.getElementById("method_7").value,
            pid_to_7: document.getElementById("pid_to_7").value,
            method_8: document.getElementById("method_8").value,
            pid_to_8: document.getElementById("pid_to_8").value
        };

        req.open('POST', 'http://flip3.engr.oregonstate.edu:5445/addEvo');
        req.setRequestHeader('Content-Type', 'application/json');
        req.addEventListener('load', function() {
            if (req.status >= 200 && req.status < 400) {
                var response = JSON.stringify(req.responseText);
                response = JSON.parse(req.responseText);
                if (response.success === false) {
                    alert('There is already an Evolutionary Chain for the Pokemon with that number, try again!');
                } else {
                    alert('Successfully added new Evolutionary Chain!');
                }
            } else {
                console.log("Error in network request: " + req.statusText);
            }
        });
        
        req.send(JSON.stringify(payload)); 
        event.preventDefault();
	});

	document.getElementById('insertStats').addEventListener('click', function() {
        if (!document.getElementById("fk_pid").value){
          alert("You must enter a valid Pokemon Number!");
          event.preventDefault();
          return;
        } 

        if (!document.getElementById("stats_id").value){
          alert("You must enter a valid Stats ID!");
          event.preventDefault();
          return;
        }
        
        var req = new XMLHttpRequest();

        //Create payload for POST query.
        var payload = {
            fk_pid: document.getElementById("fk_pid").value,
            hp: document.getElementById("hp").value,
            attack: document.getElementById("attack").value,
            defense: document.getElementById("defense").value,
            spattack: document.getElementById("spattack").value,
            spdefense: document.getElementById("spdefense").value,
            speed: document.getElementById("speed").value,
            total: document.getElementById("total").value,
            stats_id: document.getElementById("stats_id").value
        };

        req.open('POST', 'http://flip3.engr.oregonstate.edu:5445/addStats');
        req.setRequestHeader('Content-Type', 'application/json');
        req.addEventListener('load', function() {
            if (req.status >= 200 && req.status < 400) {
                var response = JSON.stringify(req.responseText);
                response = JSON.parse(req.responseText);
                if (response.success === false) {
                    alert('There is already Stats Data for the Pokemon with that number, try again!');
                } else {
                    alert('Successfully added new Pokemon Stats!');
                }
            } else {
                console.log("Error in network request: " + req.statusText);
            }
        });
        
        req.send(JSON.stringify(payload));
        event.preventDefault();
	});

	document.getElementById('insertMoveset').addEventListener('click', function() {
        if (!document.getElementById("move").value){
          alert("You must enter a valid Move Name!");
          event.preventDefault();
          return;
        }
        if (!document.getElementById("fk_pid2").value){
          alert("You must enter a valid Pokemon Number!");
          event.preventDefault();
          return;
        }
        if (!document.getElementById("fk_mid").value){
          alert("You must enter a valid Move Number!");
          event.preventDefault();
          return;
        }
        
        var req = new XMLHttpRequest();

        //Create payload for POST query.
        var payload = {
            idx: document.getElementById("idx").value,
            fk_pid2: document.getElementById("fk_pid2").value,
            fk_mid: document.getElementById("fk_mid").value,
            pkname: document.getElementById("pkname").value,
            move: document.getElementById("move").value,
            method: document.getElementById("method").value
        };

        req.open('POST', 'http://flip3.engr.oregonstate.edu:5445/addMoveset');
        req.setRequestHeader('Content-Type', 'application/json');
        req.addEventListener('load', function() {
            if (req.status >= 200 && req.status < 400) {
                var response = JSON.stringify(req.responseText);
                response = JSON.parse(req.responseText);
                if (response.success === false) {
                    alert('There is already a Moveset with that ID, try again!');
                } else {
                    alert('Successfully added new Moveset!');
                }
            } else {
                console.log("Error in network request: " + req.statusText);
            }
        });
        
        req.send(JSON.stringify(payload)); 
        event.preventDefault();
	}); 
    
});

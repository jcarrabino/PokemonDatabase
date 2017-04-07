express  = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var parse = require('body-parser');

var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'mysql.cs.orst.edu',
    user            : 'cs340_carrabij',
    password        : '3446',
    database        : 'cs340_carrabij'
});

app.use(express.static('public'));

app.use(parse.urlencoded({ extended: false }));
app.use(parse.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 5445);

app.get('/',function(req,res,next){
	res.render('home');
});



app.get('/search',function(req,res,next){
	res.render('search');
});


/************* SELECT ALL Queries ***************/
app.get('/pkdata', function (req, res) { 
    var context = {};
    pool.query('SELECT p.pid, p.pkname, p.typeI, p.typeII, p.genderM, p.genderF, p.species, p.height, p.weight FROM pkdata p;', function(err, rows, fields){
        if(err){
            console.log(err);
            next(err);
            return;
        }
        context.data = rows;
        context.status = 'OK';
        res.render('pkdata', context);
        return;
    });
});

app.get('/atk', function (req, res) {
    var context = {};
    pool.query('SELECT * FROM atk;', function(err, rows, fields){
        if(err){
            console.log(err);
            next(err);
            return;
        }
        context.data = rows;
        context.status = 'OK';

        res.render('atk', context);
        return;
    });
});

app.get('/dmg', function (req, res) {
    var context = {};
    pool.query('SELECT * FROM dmg;', function(err, rows, fields){
        if(err){
            console.log(err);
            next(err);
            return;
        }
        context.data = rows;
        context.status = 'OK';

        res.render('dmg', context);
        return;
    });
});

app.get('/evo', function (req, res) {
    var context = {};
    pool.query('SELECT *  FROM evo;', function(err, rows, fields){
        if(err){
            console.log(err);
            next(err);
            return;
        }
        context.data = rows;
        context.status = 'OK';

        res.render('evo', context);
        return;
    });
});

app.get('/stats', function (req, res) {
    var context = {};
    pool.query('SELECT s.fk_pid, p.pkname, s.hp, s.attack, s.defense, s.spattack, s.spdefense, s.speed, s.total ' +
            'FROM stats s INNER JOIN pkdata p ON p.pid = s.fk_pid;', function(err, rows, fields){
        if(err){
            console.log(err);
            next(err);
            return;
        }
        context.data = rows;
        context.status = 'OK';

        res.render('stats', context);
        return;
    });
});

app.get('/moveset', function (req, res) {
    var context = {};
    pool.query('SELECT pkname, move, method, idx FROM moveset ORDER BY pkname;', function(err, rows, fields){
        if(err){
            console.log(err);
            next(err);
            return;
        }
        context.data = rows;
        context.status = 'OK';

        res.render('moveset', context);
        return;
    });
});



/*********** Advanced SELECTION/SEARCH Queries *************/
app.get('/totals', function (req, res,next) {
    var context = {};
    pool.query('SELECT DISTINCT p.pid, p.pkname, s.hp, s.attack, s.defense, s.spattack, s.spdefense, s.speed, s.total FROM pkdata p ' +
         'INNER JOIN stats s ON s.fk_pid = p.pid ' +
         'WHERE s.total >= ? ORDER BY s.total ASC;', [req.query.total || 0],
    function(err, rows, fields){
    if(err){
        console.log(err);
        next(err);
        return;
    }
    context.data = rows;
    context.status = 'OK';

    res.render('totals', context);
    return;
    });
});

app.get('/moves', function (req, res,next) {
    var context = {};
    pool.query('SELECT p.pid, p.pkname, p.typeI, p.typeII, m.move, m.method FROM pkdata p ' +
         'INNER JOIN moveset m ON m.fk_pid2 = p.pid ' +
         'WHERE m.move = ? ' +
         'ORDER BY p.pid ASC;', [req.query.move || ''],
    function(err, rows, fields){
    if(err){
        console.log(err);
        next(err);
        return;
    }
    context.data = rows;
    context.status = 'OK';

    res.render('moves', context);
    return;
    });
});

app.get('/pkmoves', function (req, res,next) {
    var context = {};
    console.log("Made it server side");
    console.log(req.query.pkname);
    pool.query('SELECT m.move, m.method, a.atktype, a.cat, a.power, a.acc, a.pp, a.effect, a.prob  FROM pkdata p ' +
         'INNER JOIN moveset m ON m.fk_pid2 = p.pid ' +
         'INNER JOIN atk a ON m.fk_mid = a.pkmid ' +
         'WHERE p.pkname = ? ' +
         'ORDER BY m.method ASC;', [req.query.pkname || ''],
    function(err, rows, fields){
    if(err){
        console.log(err);
        next(err);
        return;
    }
    context.data = rows;
    context.status = 'OK';

    res.render('pkmoves', context);
    return;
    });
});

app.get('/types', function (req, res,next) {
    var context = {};
    pool.query('SELECT d.typeI, d.typeII, COUNT(*) as count FROM dmg d ' +
         'GROUP BY d.typeI, d.typeII ORDER BY count DESC;',
    function(err, rows, fields){
    if(err){
        console.log(err);
        next(err);
        return;
    }
    context.data = rows;
    context.status = 'OK';

    res.render('typeCount', context);
    return;
    });
});

app.get('/pokedex', function (req, res,next) {
    var context = {};
    console.log('Made it Server side!');
    pool.query('SELECT p.pkname, p.typeI, p.typeII, p.genderM, p.genderF, p.species, ' +
        'p.height, p.weight, s.hp, s.attack, s.defense, s.spattack, s.spdefense, ' +
        's.speed, s.total, d.normal, d.fire, d.electric, d.grass, d.ice, d.fight, ' +
        'd.poison, d.ground, d.flying, d.psychic, d.bug, d.rock, d.ghost, d.dragon, ' +
        'd.dark, d.steel, d.fairy, e.pid_from_1, e.method_1, e.pid_to_1, e.method_2, ' +
        'e.pid_to_2, e.method_3, e.pid_to_3, e.method_4, e.pid_to_4, e.method_5, ' +
        'e.pid_to_5, e.method_6, e.pid_to_6, e.method_7, e.pid_to_7 FROM pkdata p ' +
        'INNER JOIN stats s ON s.fk_pid = p.pid INNER JOIN dmg d ON d.fk_did = p.pid ' +
        'INNER JOIN evo e ON e.fk_pid = p.pid WHERE p.pkname = ? ORDER BY p.pkname ASC;', [req.query.pkname || ''],
    function(err, rows, fields){
    if(err){
        console.log(err);
        next(err);
        return;
    }
    context.data = rows;
        pool.query('SELECT p.pid, p.pkname, m.move, m.method, a.atktype, a.cat, a.power, a.acc, a.pp, a.effect, a.prob FROM pkdata p ' +
            'INNER JOIN moveset m ON m.fk_pid2 = p.pid INNER JOIN atk a ON a.pkmid = m.fk_mid ' +
            'WHERE p.pkname = ? ORDER BY m.method ASC;', [req.query.pkname || ''],
        function(err, rows, fields){
        if(err){
            console.log(err);
            next(err);
            return;
        }
        context.moveset = rows;
        context.status = 'OK';
        context.pkmn = {'name' : req.query.pkname};
        res.render('pokedex', context);
        return;
        });
    
    return;
    });
});

/********************* INSERTION Qeuries ***********************/

/*************** ADD/UPDATE_pkdata *****************/
app.post('/addPkdata', function (req, res, next) {
    console.log('Made it server side');
    var context = {};
    var post = {
        pid: req.body.pid,
        pkname: req.body.pkname,
        typeI: req.body.typeI,
        typeII: req.body.typeII,
        genderM: req.body.genderM,
        genderF: req.body.genderF,
        species: req.body.species,
        height: req.body.height,
        weight: req.body.weight,
        abilityI: req.body.abilityI,
        abilityII: req.body.abilityII,
        abilityIII: req.body.abilityIII,
        evyield: req.body.evyield,
        capture: req.body.capture,
        basehappy: req.body.basehappy,
        basexp: req.body.basexp,
        growth: req.body.growth,
        eggsteps: req.body.eggsteps
    };
   console.log(JSON.stringify(post));
    pool.query('INSERT INTO pkdata SET ?', post,
    function(err, results) {
        if (err) {
            console.log(err);
            res.json({success: false});
            return;
        }
        console.log('Results: ' + JSON.stringify(results));
        context.results = JSON.stringify(results);
        console.log(context.results);
        console.log('Added new pokemon successfully');
        res.json({success: true});
    });
});

app.post('/updatePkdata', function (req, res, next) {
     var context = {};
    //console.log('in POST update...')
    //console.log(req.body.pid);
    pool.query('SELECT * FROM pkdata WHERE pid=?', [req.body.pid], function(err, result) {
        //console.log("result: "+result[0])
        if (err) {
            console.log(err);
            next(err);
            return;
        }
        if (result) {
            console.log('made successful query');
            var curVals = result[0];
            //console.log(result[0]);
            console.log("req.body with POST: " + JSON.stringify(req.body));
            pool.query('UPDATE pkdata SET pkname=?, typeI=?, typeII=?, genderM=?, genderF=?, species=?, height=?, weight=?, abilityI=?, abilityII=?, abilityIII=?, evyield=?, capture=?, basehappy=?, basexp=?, growth=?, eggsteps=? WHERE pid=?', 
            [req.body.pkname || curVals.pkname, req.body.typeI || curVals.typeI, req.body.typeII || curVals.typeII,  req.body.genderM || curVals.genderM,  req.body.genderF || curVals.genderF,  req.body.species ||  curVals.species, req.body.height ||  curVals.height, req.body.weight ||  curVals.weight, req.body.abilityI ||  curVals.abilityI, req.body.abilityII || curVals.abilityII, req.body.abilityIII || curVals.abilityIII,  req.body.evyield || curVals.evyield,  req.body.capture ||  curVals.capture, req.body.basehappy || curVals.basehappy,  req.body.basexp || curVals.basexp,  req.body.growth || curVals.growth,  req.body.eggsteps || curVals.eggsteps, req.body.pid],
            function(err, result) {
                if (err) {
                res.json({success: false});
                    return;
                }
                res.json({success: true});
            });
        }
    });
});

/*************** ADD_atk *****************/

app.post('/addAtk', function (req, res, next) {
console.log("made it server-side");
    var context = {};
    pool.query('INSERT INTO atk (`pkmid`, `mvname`, `atktype`, `cat`, `power`, `acc`, `pp`, `tm`, `effect`,' +
            ' `prob`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
            [req.body.pkmid, req.body.mvname || null, req.body.atktype || null, req.body.cat || null, 
            req.body.power || null, req.body.acc || null, req.body.pp || null, req.body.tm || null,
            req.body.effect || null, req.body.prob || null],
    function(err, result){
    if(err){
        console.log(err);
        res.json({success: false});
        return;
    }
    context.status = "OK";
    context.results = 'Successfully Added Attack';
    context.result = JSON.stringify(result);
    console.log(context.result);
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true});
    });

});

/*************** ADD_dmg *****************/
app.post('/addDmg', function (req, res, next) {

  var context = {};
  pool.query('INSERT INTO dmg (`fk_did`, `typeI`, `typeII`, `normal`, `fire`, `water`, `electric`, ' +
            '`grass`, `ice`, `fight`, `poison`, `ground`, `flying`, `psychic`, `bug`, `rock`, `ghost`, ' +
            '`dragon`, `dark`, `steel`, `fairy`) ' +
            'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
            [req.body.fk_did, req.body.typeI || null, req.body.typeII || null, req.body.normal || null, 
            req.body.fire || null, req.body.water || null, req.body.electric || null, 
            req.body.grass || null, req.body.ice || null, req.body.fight || null, req.body.poison || null, 
            req.body.ground || null, req.body.flying || null, req.body.psychic || null, 
            req.body.bug || null, req.body.rock || null, req.body.ghost || null, req.body.dragon || null, 
            req.body.dark || null, req.body.steel || null, req.body.fairy || null],
    function(err, result){
        if(err){
            console.log(err);
            res.json({success: false});
            return;
        }
	context.status = "OK";
    context.results = 'Successfully Added Dmg';
	context.result = JSON.stringify(result);
	res.setHeader('Content-Type', 'application/json');
    res.json({success: true});
  });

});

/*************** ADD/UPDATE_evo *****************/
app.post('/addEvo', function (req, res, next) {
    var response = JSON.stringify(req.body);
    console.log(response);
    var context = {};
    pool.query('INSERT INTO evo (`fk_pid`, `pid_from_1`, `method_1`, `pid_to_1`, `method_2`, `pid_to_2`, ' +
            '`method_3`, `pid_to_3`, `method_4`, `pid_to_4`, `method_5`, `pid_to_5`, `method_6`, `pid_to_6`, `method_7`, ' +
            '`pid_to_7`, `method_8`, `pid_to_8`) '+
            'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
            [req.body.fk_pid, req.body.pid_from_1|| null, req.body.method_1|| null, req.body.pid_to_1|| null, 
            req.body.method_2|| null, req.body.pid_to_2|| null, req.body.method_3|| null, req.body.pid_to_3|| null, 
            req.body.method_4|| null, req.body.pid_to_4|| null, req.body.method_5|| null, req.body.pid_to_5|| null, 
            req.body.method_6|| null, req.body.pid_to_6|| null, req.body.method_7|| null, req.body.pid_to_7|| null, 
            req.body.method_8|| null, req.body.pid_to_8|| null],
    function(err, result){
    if(err){
        console.log(err);
        res.json({success: false});
        return;
    }
    context.status = "OK";
    context.results = 'Successfully Added Evo';
    context.result = JSON.stringify(result);
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true});
    });

});


app.post('/updateEvo', function (req, res, next) {
    var context = {};
    //console.log('in POST update...')
    pool.query('SELECT * FROM evo WHERE fk_pid=?', [req.body.fk_pid], function(err, result) {
        //console.log("result: "+result[0])
        if (err) {
            res.json({success: false});
            return;
        }
        if (result) {
            console.log('made successful query');
            var curVals = result[0];
            //console.log(result[0]);
            console.log("req.body with POST: " + JSON.stringify(req.body));
            pool.query('UPDATE evo SET pid_from_1=?, method_1=?, pid_to_1=?, method_2=?, pid_to_2=?, method_3=?, pid_to_3=?, method_4=?, pid_to_4=?, method_5=?, pid_to_5=?, method_6=?, pid_to_6=?, method_7=?, pid_to_7=?, method_8=?, pid_to_8=? WHERE fk_pid=?', 
            [req.body.pid_from_1|| curVals.pid_from_1, req.body.method_1|| curVals.method_1, req.body.pid_to_1|| curVals.pid_to_1, req.body.method_2|| curVals.method_2, req.body.pid_to_2|| curVals.pid_to_2, req.body.method_3|| curVals.method_3, req.body.pid_to_3|| curVals.pid_to_3, req.body.method_4|| curVals.method_4, req.body.pid_to_4|| curVals.pid_to_4, req.body.method_5|| curVals.method_5, req.body.pid_to_5|| curVals.pid_to_5, req.body.method_6|| curVals.method_6, req.body.pid_to_6|| curVals.pid_to_6, req.body.method_7|| curVals.method_7, req.body.pid_to_7|| curVals.pid_to_7, req.body.method_8|| curVals.method_8, req.body.pid_to_8|| curVals.pid_to_8, req.body.fk_pid],
            function(err, result) {
                if (err) {
                    res.json({success: false});
                    return;
                }
            res.json({success: true});
            });
        }
    });
});


/*************** ADD_stats *****************/
app.post('/addStats', function (req, res, next) {

    var context = {};
    pool.query('INSERT INTO stats (`fk_pid`, `hp`, `attack`, `defense`, `spattack`, `spdefense`, `speed`, `total`, ' +
            '`stats_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);',
            [req.body.fk_pid || null, req.body.hp || null, req.body.attack || null,  req.body.defense || null,  
            req.body.spattack || null, req.body.spdefense ||  null, req.body.speed ||  null, req.body.total ||  null, 
            req.body.stats_id],
    function(err, result){
    if(err){
        console.log(err);
        res.json({success: false});
        return;
    }
    context.status = "OK";
    context.results = 'Successfully Added Stats';
    context.result = JSON.stringify(result);
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true});
    });

});


/*************** ADD_Moveset *****************/
app.post('/addMoveset', function (req, res, next) {

    var context = {};
    pool.query('INSERT INTO moveset (`idx`,`fk_pid2`, `fk_mid`, `pkname`, `move`, `method`) VALUES ( ' +
			'?, ?, ?, ?, ?, ?);',
    [req.body.idx, req.body.fk_pid2 || null, req.body.fk_mid || null, req.body.pkname || null, req.body.move || null, req.body.method || null],
	function(err, result){
    if(err){
        console.log(err);
        res.json({success: false});
        return;
    }
	context.status = "OK";
    context.results = 'Successfully Added to a Moveset';
	context.result = JSON.stringify(result);
	res.setHeader('Content-Type', 'application/json');
    res.json({success: true});
  });

});

/******************** Deletion_Queries ***********************/

app.post('/pkdataDelete', function(req, res, next) {
    var context = {};
    console.log("Server-side delete pid in pkdata: " + req.query.pid);
    pool.query("DELETE FROM pkdata WHERE pid=?", [req.query.pid], function(err, result) {
        if(err){
            console.log(err);
            next(err);
            return;
        }
        context.status = "OK";
        context.results = 'Successfully Deleted from PKDATA';
        context.result = JSON.stringify(result);
        res.setHeader('Content-Type', 'application/json');
        res.jsonp(JSON.stringify(context));
        
    });
});

app.post('/atkDelete', function(req, res, next) {
    var context = {};
    pool.query("DELETE FROM atk WHERE pkmid=?", [req.query.pkmid], function(err, result) {
        console.log("Server-side Atk delete id in PDB: " + req.query.pkmid);
        if (err) {
            next(err);
            return;
        }
        
        context.status = "OK";
        context.results = 'Successfully Deleted from ATK';
        context.result = JSON.stringify(result);
        res.setHeader('Content-Type', 'application/json');
        res.jsonp(JSON.stringify(context));
    });
});

app.post('/statsDelete', function(req, res, next) {
    var context = {};
    pool.query("DELETE FROM stats WHERE fk_pid=?", [req.query.fk_pid], function(err, result) {
        console.log("Server-side Stats delete id in PDB: " + req.query.fk_pid);
        if (err) {
            next(err);
            return;
        }
        
        context.status = "OK";
        context.results = 'Successfully Deleted from STATS';
        context.result = JSON.stringify(result);
        res.setHeader('Content-Type', 'application/json');
        res.jsonp(JSON.stringify(context));
    });
});

app.post('/evoDelete', function(req, res, next) {
    var context = {};
    pool.query("DELETE FROM evo WHERE fk_pid=?", [req.query.fk_pid], function(err, result) {
        console.log("Server-side Evo delete id in PDB: " + req.query.fk_pid);
        if (err) {
            next(err);
            return;
        }
        
        context.status = "OK";
        context.results = 'Successfully Deleted from EVO';
        context.result = JSON.stringify(result);
        res.setHeader('Content-Type', 'application/json');
        res.jsonp(JSON.stringify(context));
    });
});

app.post('/dmgDelete', function(req, res, next) {
    var context = {};
    pool.query("DELETE FROM dmg WHERE fk_did=?", [req.query.fk_did], function(err, result) {
        console.log("Server-side Dmg delete id in PDB: " + req.query.fk_did);
        if (err) {
            next(err);
            return;
        }
        
        context.status = "OK";
        context.results = 'Successfully Deleted from DMG';
        context.result = JSON.stringify(result);
        res.setHeader('Content-Type', 'application/json');
        res.jsonp(JSON.stringify(context));
    
    });
});

app.post('/movesetDelete', function(req, res, next) {
    var context = {};
    pool.query("DELETE FROM moveset WHERE idx=?", [req.query.idx], function(err, result) {
        console.log("Server-side Moveset delete id in PDB: " + req.query.idx);
        if (err) {
            next(err);
            return;
        }
        
        context.status = "OK";
        context.results = 'Successfully Deleted from MOVESET';
        context.result = JSON.stringify(result);
        res.setHeader('Content-Type', 'application/json');
        res.jsonp(JSON.stringify(context));
    });
});



app.use(function(req, res) {
	res.status(404);
	res.render('404');
});

app.use(function(err, req, res, next) {
	context = {};

	context.results = 'Encountered an Error';
	context.Status = "Error";
	context.info = err;
	res.setHeader('Content-Type', 'application/json');
    res.jsonp(JSON.stringify(context));

});

app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost: ' + app.get('port') +
			' press Ctrl-c to terminate.');
});

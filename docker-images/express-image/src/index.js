var Chance = require('chance');
var chance = new Chance();

var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.send(generateAnimals());
});

app.listen(3000, function () {
    console.log('Accepting HTTP requests on port 3000.');
});

function generateAnimals() {
    var numberOfAnimals = chance.integer({
        min: 1,
        max: 10
    });
    console.log(numberOfAnimals);
    var animals = [];
    for (var i = 0; i < numberOfAnimals; i++) {
        var animal = chance.animal();
        var age = chance.age();
        var favWord = chance.word({ syllables: 3 });
        var gender = chance.gender();
        animals.push({
            animal: animal,
            age: age,
            favWord: favWord,
            gender: gender
        });
    };
    console.log(animals);
    return animals;
}
        

$(function() {
    console.log("Loading animals");
    function loadAnimals() {
        $.getJSON("/api/animals/", function(animals) {
            console.log(animals);
            var message = "A " + animals[0].age + " years old " + animals[0].gender + " " + animals[0].animal + " says " + animals[0].favWord + " !";
            $(".intro-text").text(message);
        });
    };

    loadAnimals();
    setInterval(loadAnimals, 2000);
});

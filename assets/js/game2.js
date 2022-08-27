var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var enemyName = "Roberto";
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function() {
    window.alert("Welcome to Robot Gladiators!");
    enemyHealth = enemyHealth - playerAttack;
    console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth);

    playerHealth = playerHealth - enemyAttack;
    console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth);

    // check players' health
    if (playerHealth <=0 ) {
        window.alert(playerName + " has DIED!");
    }
    else {
        window.alert(playerName + " Still has " + playerHealth + " health left.");
    }
    
    // check enemy's health
    if (enemyHealth <= 0 ) {
        window.alert(enemyName + " has DIED!");
    }
    else {
        window.alert(enemyName + " still has " + enemyHealth + " health left.");
    }
};

fight();
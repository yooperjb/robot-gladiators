
// this function will activate the fight with the given enemy object
var fight = function(enemy) {
    
    //repeat and execute as long as both the enemy robot and player are alive
    while (enemy.health > 0 && playerInfo.health > 0) {

        // Ask user if they'd like to fight or run
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? \nEnter 'FIGHT' or 'SKIP' to choose.").toLowerCase();
        console.log("promtFight:" + promptFight);
        // If user picks "skip" confirm and then stop the loop
        if (promptFight === "skip") {
            // Confirm user wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?\n$10 will be deducted.");

            // If yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerInfo.name + " has decided to skip the fight. Goodbye!");
                // Subtract money from playerInfo.money for skipping
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                console.log("playerInfo.money", playerInfo.money);
                break;
            }
        }

        // generate random damage value based on players' attack power
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.health);
        console.log("Damage: " + damage);

        // the max number of enemies health after attack or 0 (so no negative number)
        enemy.health = Math.max(0, enemy.health - damage);
        
        console.log(
            playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
        );

        // Check enemy's health
        if (enemy.health === 0) {
            window.alert("Congratulations " + enemy.name + " has died!");
            break;
        }
        else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }

        // remove player's health by subtracting the amount in random enemy damage
        var damage = randomNumber(enemy.attack - 3, enemy.attack);
        
        playerInfo.health = Math.max(0, playerInfo.health - damage);
        
        console.log(
            enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
        );

        // Check player's health if 0 break out of loop
        if (playerInfo.health === 0) {
            window.alert("Oh NO " + playerInfo.name + " has died!");
            break;
        }
        else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
    }
};

// function to start a new game
var startGame = function () {
    // reset player stats
    playerInfo.reset();

    // Loop through and Fight each robot
    for (var i = 0; i < enemyInfo.length; i++) {
        //If player is still alive keep fighting
        if (playerInfo.health > 0) {
            // let player know what round they are in
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1) + "\nYour Health is " + playerInfo.health);

            //pick new enemy to fight based on the index of the enemy.names array
            // this should go above the window alert so the enemy name can be alerted along with their health
            var pickedEnemyObj = enemyInfo[i];

            // assign enemy health using randomNumber function
            pickedEnemyObj.health = randomNumber(40, 60);

            fight(pickedEnemyObj);

            // If player is still alive and we're not at the last enemy in the array shop after fight.
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                // ask if user wants to shop before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round? \nYou can purchase important items there.\nYou currently have $" + playerInfo.money + " to spend.");

                // if yes, take them to the store() function
                if (storeConfirm) {
                   shop(); 
                }
            }
        }
        else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }
    //play again
    endGame();
};

//function to end the entire game
var endGame = function () {
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");

    } else {
        window.alert("You've lost your robot in battle!");
    }

    // ask player if they'd like to play again
    var playAGainConfirm = window.confirm("Would you like to play again?");

    if (playAGainConfirm) {
        //restart the game
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

var shop = function(){
    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health for $7, \nUPGRADE your attack for $7, \nor LEAVE the store? \nPlease enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.").toLowerCase();

    // use switch to carry out action
    switch(shopOptionPrompt) {
        
        case "refill":
            playerInfo.refillHealth();
            break;

        case "upgrade":
            playerInfo.upgradeAttack();
            break;

        case "leave":
            window.alert("Leaving the store.");

            // do nothing, so function will end
            break;

        default:
            window.alert("You did not pick a valid option. Try again.");
            
            // call shop() again to force player to pick a valid option
            shop();
            break;
    }
};

//function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

var playerInfo = {
    name: window.prompt("What is your robot's name?"),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    }
};

var enemyInfo = [
    {
        name: "Roberto",
        attack: randomNumber(10,14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10,14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10,14)
    }
];

startGame();
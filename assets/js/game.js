var fightOrSkip = function(){
    // ask user if they'd like to fight or skip
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter FIGHT or SkIP to choose.');
    promptFight = promptFight.toLowerCase();

    // Conditional Recursive Function Call
    if (!(promptFight === 'skip' || promptFight === 'fight')) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }

    // if user picks 'skip' confirm and then stop the loop
    if (promptFight === "skip"){
        // confirm user wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            // subtract money from playerMoney for skipping, but don't let them go into the negative
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            
            // return true if user wants to leave
            return true;
            
        }
    }
    return false;
}

var fight = function(enemy) {
    // keep track of who goes first
    var isPlayerTurn = true;

    // randomly change the turn order
    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }
    
    //repeat and execute as long as the enemy robot and player are alive
    while (playerInfo.health > 0 && enemy.health > 0) {  
        
        if (isPlayerTurn){
            // ask user if they'd like to fight or skip using fightOrSkip function
            if (fightOrSkip()) {
                // if true, leave fight by breaking loop
                break;
            } 
        
            // generate random damage value based on players' attack power
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.health);

            // remove enemy's health but subtracting damage
            enemy.health = Math.max(0, enemy.health - damage);
        
            console.log(
                playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
            );

            // Check enemy's health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");
                break;
            }
            else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }
        
        //player gets attacked first 
        } else {
           
            var damage = randomNumber(enemy.attack - 3, enemy.attack);
            // remove player's health by subtracting the amount in random damage
            playerInfo.health = Math.max(0, playerInfo.health - damage);
        
            console.log(
            enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
            );

            // Check player's health if < 0 break out of loop
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                break;
            }
            else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
        }
        // switch turn order for next round
        isPlayerTurn = !isPlayerTurn;
    }   
};

// function to start a new game
var startGame = function () {
    // reset player stats
    
    playerInfo.reset();

    // Fight each robot
    for (var i = 0; i < enemyInfo.length; i++) {
        //If player is still alive keep fighting
        if (playerInfo.health > 0) {
            // let player know what round they are in
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
            
            //pick new enemy to fight based on the index of the enemy.names array
            var pickedEnemyObj = enemyInfo[i];

            pickedEnemyObj.health = randomNumber(40, 60);

            fight(pickedEnemyObj);

            // If player is still alive and we're not at the last enemy in the array shop after fight.
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                // ask if user wants to shop before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

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
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter 1 for 'REFILL', 2 for 'UPGRADE', or 3 for 'LEAVE'.");

    shopOptionPrompt = parseInt(shopOptionPrompt);
    // use switch to carry out action
    switch(shopOptionPrompt) {
        
        case 1:
            playerInfo.refillHealth();
            break;

        case 2:
            playerInfo.upgradeAttack();
            break;

        case 3:
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

//function to set name
var getPlayerName = function (){
    var name = "";

    while (name === "" || name === null){
        name = prompt("What is your robot's name?");
    }

    console.log("Your robot's name is " + name);
    return name;
}

var playerInfo = {
    // this function occurs when the page is loaded.
    name: getPlayerName(),
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
            window.alert("Youd don't have enough money!");
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
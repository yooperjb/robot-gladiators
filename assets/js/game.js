var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function(enemyName) {

    //repeat and execute as long as the enemy robot is alive
    while (enemyHealth > 0 && playerHealth > 0) {

        // Ask user if they'd like to fight or run
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        // If user picks "skip" confirm and then stop the loop
        if (promptFight === "skip" || promptFight === "SKIP") {
            // Confirm user wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // If yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerName + " has decided to skip the fight. Goodbye!");
                // Subtract money from playerMoney for skipping
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney);
                break;
            }
        }

        // remove enemy's health by subtracting the amount set in the playerAttack variable
        enemyHealth = enemyHealth - playerAttack;
        console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        );

        // Check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");
            break;
        }
        else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        // remove player's health by subtracting the amount set in the enemyAttack variable
        playerHealth = playerHealth - enemyAttack;
        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
        );

        // Check player's health if < 0 break out of loop
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
            break;
        }
        else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
    }
};

// function to start a new game
var startGame = function () {
    // reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    // Fight each robot
    for (var i = 0; i < enemyNames.length; i++) {
        //If player is still alive keep fighting
        if (playerHealth > 0) {
            // let player know what round they are in
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

            //pick new enemy to fight based on the index of the enemyNames array
            var pickedEnemyName = enemyNames[i];

            enemyHealth = 50;

            fight(pickedEnemyName);

            // If player is still alive and we're not at the last enemy in the array shop after fight.
            if (playerHealth > 0 && i < enemyNames.length - 1) {
                // ask if user wants to shop before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                // if yes, take them to the store() fucntion
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
    if (playerHealth > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");

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
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.");

    // use switch to carry out action
    switch(shopOptionPrompt) {
        
        case "refill":
        case "REFILL":
            if (playerMoney >= 7){
            window.alert("Refilling player's health by 20 for 7 dollars.");
            
            //increase health and decrease money
            playerHealth = playerHealth + 20;
            playerMoney = playerMoney - 7;
            
            }
            else {
                window.alert("You don't have enough money!");
            }

            break;

        case "upgrade":
            if (playerMoney >= 7){
            window.alert("Upgrading players' attack by 6 for 7 dollars.");

            // increase attack and decrease money
            playerAttack = playerAttack + 6;
            playerMoney = playerMoney - 7;
            
            }
            else {
                window.alert("You don't have enough money!");
            }
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


startGame();
class Game {
    constructor(){
  
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
      runner1=createSprite(700,550,10,10);
      runner1.addAnimation("jake",jakeImg);
      runner2=createSprite(400,550,10,10);
      runner2.addAnimation("robert",robertImg);
      runner2.scale=2.5;
      
      
    }
  
    play(){
      form.hide();
     // bg=createSprite(500,300,10,10);
//bg.addImage(bgImg);
//bg.scale=2.2;
//bg.velocityY = 3;
//if(bg.y>height){
//bg.y =height/2
//}

drawSprites();

    runners=[runner1,runner2]
      
      Player.getPlayerInfo();
     // player.getCarsAtEnd();
     
      
      if(allPlayers !== undefined){
        image(trackImg, 0,-displayHeight*4,displayWidth, displayHeight*5);
        
        //var display_position = 100;
        
        //index of the array
        var index = 0;
  
        //x and y position of the cars
        var x =100 ;
        var y=200;
  
        for(var plr in allPlayers){
          //add 1 to the index for every loop
          index = index + 1 ;
  
          //position the cars a little away from each other in x direction
          //x = x + 200;
          //use data form the database to display the cars in y direction
          x = 500 - allPlayers[plr].distance;
          y=500-allPlayers[plr].speed;
          runners[index-1].x = x;
          runners[index-1].y = y;
         // console.log(index, player.index)
  
         if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          runners[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = runners[index-1].y;
        }
         
         
          //textSize(15);
          //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
        }

        textSize(30);
        fill("white");
        text ("Player 1:"+allPlayers.player1.speed,50,camera.position.y-50);
        text("Player 2:"+allPlayers.player2.speed,50,camera.position.y);
  
        if(allPlayers.player1.speed >= 3500 && allPlayers.player2.speed<3500){
          gameState = 2;
        textSize(50);
        fill("white");
        text("Player1 Is The Winner",displayWidth/2-50,camera.position.y);
        runner1.changeAnimation("jakeEnd",jakeEnd);

        
        

        }
        else if(allPlayers.player2.speed >= 3500 &&  allPlayers.player1.speed<3500){
          gameState = 2;
        textSize(50);
        fill("white");
        text("Player2 Is The Winner",displayWidth/2-50,camera.position.y);
        runner2.changeAnimation("robertEnd",robertEnd);
        if(keyIsDown(UP_ARROW) && player.index !== null){
          player.speed +=0
          player.update();
        }


        }

      }
      if (frameCount % 20 === 0) {
        var cash = createSprite(random(50, width-50),1000, 30, 10);
        cash.addImage(cashImg);
        cash.scale=0.12;
        cash.velocityY = 3;
        cash.lifetime = 150;
        cashG.add(cash);
        }

  
      if(keyIsDown(LEFT_ARROW) && player.index !== null){
        player.distance +=25
        player.update();
      }

      if(keyIsDown(RIGHT_ARROW) && player.index !== null){
        player.distance -=25
        player.update();
      }

      if(keyIsDown(UP_ARROW) && player.index !== null){
        player.speed +=25
        player.update();
      }
  

  
      if(player.distance > 3860){
        
        player.rank=player.rank+1;
        //Player.updateCarsAtEnd(player.rank);
  
      }
     
      drawSprites();
    }
  
    end(){
      console.log("Game Ended");
      if(keyIsDown(UP_ARROW) && player.index !== null){
        player.speed +=0
          player.update();
        }
    }
  }
  
function bezierCurve(ctx, centerX, centerY, width, height,fillType) {
// draws a single ellipse
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - height / 2);

    ctx.bezierCurveTo(
        centerX + width / 2, centerY - height / 2,
        centerX + width / 2, centerY + height / 2,
        centerX, centerY + height / 2
    );
    ctx.bezierCurveTo(
        centerX - width / 2, centerY + height / 2,
        centerX - width / 2, centerY - height / 2,
        centerX, centerY - height / 2
    );
    
    ctx.closePath();
    if(fillType==='fill')
        ctx.fill();
    else
        ctx.stroke();
    ctx.closePath();
}



function init(){
var introMsg="When you done having 'fun with portals' check out the 'Emoji sniper' in my codes >:p";
    //// device movement capture functions start
    if (window.DeviceMotionEvent) {
        // add mobile movemnt support (why not?)
        window.addEventListener("devicemotion", motion, false);
    }
    else {
        console.log("DeviceMotionEvent is not supported");
    }
    
    function repositionOutOfBounds(){
        if(xCube+cubeSize<portalBlue.x){
            // left movement
            xCube=portalOrange.x-cubeSize;
        }
        else if(xCube>portalOrange.x){
            // right movement
            xCube=portalBlue.x; 
        }
    }
    
    function motion(event) {
   xAcc=event.accelerationIncludingGravity.x; dir=((event.accelerationIncludingGravity.x<0)? 1:-1);
        if(activeFun.fun1){
            xSpeed-=(event.accelerationIncludingGravity.x)*0.1;
            
            if(Math.abs(xSpeed)>100)
                xSpeed=100*dir;
            xCube+=xSpeed;
            //x -= (event.accelerationIncludingGravity.x);
            repositionOutOfBounds();
        }
                
        else if(!activeFun.fun1){
            ball.xSpeed-=(event.accelerationIncludingGravity.x)*0.03;
            if(Math.abs(ball.xSpeed)>20)
                ball.xSpeed=20*dir;
        }
        // use the console log below for debugging purposes
        /*console.log("Accelerometer: "
        + event.accelerationIncludingGravity.x + ", "
        + event.accelerationIncludingGravity.y + ", "
        + event.accelerationIncludingGravity.z
        );*/
    }
    // attach event listeners for keyboard events
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    // holding finger down on arrow key function.
    function keyDownHandler(e) {
        if (e.keyCode === 39) {
            keys.right = true;
        }
        else if (e.keyCode === 37) {
            keys.left = true;
        }
    }
    //lifting finger off arrow key function
    function keyUpHandler(e) {
        if (e.keyCode === 39) {
            keys.right = false;
        }
        else if (e.keyCode === 37) {
            keys.left = false;
        }
    }

    function keyMovementUpdate() {
        //right arrow key direction
        if(activeFun.fun1){
            if (keys.right) {
                xSpeed+=0.1;
                // x += xSpeed;
            }
            //left arrow key function
            else if (keys.left) {
                xSpeed-=0.1;
                // x += xSpeed;
            }
            repositionOutOfBounds();
        }
        else if(!activeFun.fun1){
            if (keys.right) {
                ball.xSpeed+=0.1;
            }
            else if (keys.left) {
                ball.xSpeed-=0.1;
            }
        }
            
    } 
    
    function randFloat(min, max) {
        return (Math.random()*(max - min + 1) + min);
    }
    
    // keyboard variables
    var keys = {
        left:false,
        right : false
    }
    
    //// device movement capture functions end
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    // set the canvas size ratio according to the client window size
    // change 0.9 and 0.65 to play with the ratios
    var widthRatio = 0.95;
    var heightRatio = 0.70;

    // re-set the width and height according to user specified ratios
    canvas.width = window.innerWidth*widthRatio;
    canvas.height = window.innerHeight*heightRatio;
    
    var cubeSize=50;
    var xCube=canvas.width*0.5;
    var yCube=canvas.height*0.5-cubeSize;
    var xSpeed=0;
    var ySpeed=0;
    
    var xAcc=0;
    
    var ballDefault={
        radius:10,
        x:canvas.width*0.25,
        y:canvas.height*0.4,
        xSpeed:0,
        ySpeed:0
    }
    var ball=Object.create(ballDefault);
    
    var activeFun={
        fun1:false,
        fun2:false,
        fun3:false
    }
    
    var animationDelay=33;
    var animationInterval=null;
    
    var portalBlue={
        x:20,
        y:canvas.height-30,
        width:40,
        height:210,
        ySpeed:2
    }
    var portalOrange={
        x:canvas.width-20,
        y:canvas.height-30,
        width:40,
        height:210,
        ySpeed:-1
    }
    
    var gravity=-9.8/animationDelay;
    
   function setHeight(portal,h){
       portal.y=h;
   }
   
   function setPortalSpeed(portal,s){
      portal.ySpeed=s;
   }
    document.getElementById("blueHeight").onchange = function() {
    if(activeFun.fun2)
     setHeight(portalBlue,parseInt(document.getElementById("blueHeight").value)/10*canvas.height);
     else if(activeFun.fun3)
         setPortalSpeed(portalBlue,5-parseInt(document.getElementById("blueHeight").value));
    }
    document.getElementById("orangeHeight").onchange = function() {
    if(activeFun.fun2)
    setHeight(portalOrange,parseInt(document.getElementById("orangeHeight").value)/10*canvas.height);
    
    else if(activeFun.fun3)
         setPortalSpeed(portalOrange,5-parseInt(document.getElementById("orangeHeight").value));
    }
    
    function resetBall(){
        ball=Object.create(ballDefault);
        ball.x=((Math.random()<0.5)?portalBlue.x:portalOrange.x);
        minH=((ball.x===portalBlue.x)? portalBlue.y:portalOrange.y)
        ball.y=randFloat(10,minH-20);
    }
     document.getElementById("resetBall").onclick=resetBall;
    
    canvas.onclick=function(){
        return;
    if(xCube>=portalBlue.x&&xCube+cubeSize<=portalOrange.x){
       xSpeed*=(-1);
       }
    }
    
    function drawBall(){
        
        if(Math.random()<0.02){
        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.arc(ball.x, ball.y, ball.radius*1.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        ctx.fillStyle = 'black';
        ctx.fillText("The Cake Is a LIE!", ball.x-35, ball.y);
        }else{
        ctx.font = "30px 'Press Start 2P', Times New Roman";
        ctx.fillStyle = 'black';
        ctx.fillText("🎂", ball.x-15, ball.y);
        }
        // ball tracker
        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.arc(ball.x, canvas.height, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        
        
    }
    
    function updatePortalMovement(portal){
        portal.y+=portal.ySpeed;
        if(portal.y-portal.height/2<0 && portal.ySpeed<0)
            portal.ySpeed*=(-1);
        if(portal.y+portal.height/4>canvas.height && portal.ySpeed>0)
            portal.ySpeed*=(-1);  
    }
    
    function updateBallMovement(bouncy){
        ball.y+=ball.ySpeed;
        ball.x+=ball.xSpeed;
        ball.ySpeed-=(gravity);
        if(ball.x-ball.radius<0)
            ball.xSpeed=Math.abs(ball.xSpeed);
        if(ball.x+ball.radius>canvas.width)
            ball.xSpeed=Math.abs(ball.xSpeed)*(-1);
        
        if(ball.y+ball.radius>canvas.height){
            if(bouncy){
                ball.ySpeed=Math.abs(ball.ySpeed)*(-1)*0.9;
                ball.ySpeed-=(gravity);
            }else{
            ball.y=canvas.height-ball.radius;
            ball.ySpeed=0;
            // resetBall();
            }
        } 
    }

    function moveCube(){
        xCube+=xSpeed;
        if(xCube+cubeSize<portalBlue.x&&xSpeed<0){
            // left movement
            xCube=portalOrange.x-cubeSize;
        }
        else if(xCube>portalOrange.x&&xSpeed>0){
            // right movement
           xCube=portalBlue.x; 
        }
    }
    
    function drawPortal(x,y,width,height,outerColor,innerColor){
   ctx.fillStyle = outerColor;
   // draw outer part
   bezierCurve(ctx,x,y,width,height,"fill");
   ctx.fillStyle = "black";
  // draw black ring
   bezierCurve(ctx,x,y,width*0.8,height*0.9,"fill");
   ctx.fillStyle = innerColor;
  // draw inner part
  bezierCurve(ctx,x,y,width*0.7,height*0.8,"fill"); 
    }
    
    function drawBackground(){
        canvas.width = window.innerWidth*widthRatio;
        canvas.height = window.innerHeight*heightRatio;
        ctx.fillStyle = "grey";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    function funPortalSettings(portal,xNew,yNew,wNew,hNew){
        portal.x=xNew;
        portal.y=yNew;
        portal.width=wNew;
        portal.height=hNew;
    }
    
    function fun1(){
        
        if(!activeFun.fun1){
            yCube=canvas.height*0.5-cubeSize*1.5;
            funPortalSettings(portalBlue,canvas.width*0.1,canvas.height*0.5,canvas.width*0.1,canvas.height*0.5);
            funPortalSettings(portalOrange,canvas.width*0.9,canvas.height*0.5,canvas.width*0.1,canvas.height*0.5);
            activeFun.fun1=true;
            activeFun.fun2=false;
            activeFun.fun3=false;
        }
        
      // draw portals
       drawPortal(portalOrange.x,portalOrange.y,portalOrange.width,portalOrange.height,"orange","yellow");
       drawPortal(portalBlue.x,portalBlue.y,portalBlue.width,portalBlue.height,"blue","lightblue");

        ctx.beginPath();
        if(xCube>=portalBlue.x&&xCube+cubeSize<=portalOrange.x){
            // not inside portals
            ctx.rect(xCube, yCube+cubeSize, cubeSize, cubeSize);
        }
        else{
            // inside portals
            // draw entry rings
                 
           ctx.fillStyle="black"; bezierCurve(ctx,portalOrange.x,portalOrange.y,portalOrange.width*0.2,portalOrange.height*cubeSize*0.008,"fill");
            bezierCurve(ctx,portalBlue.x,portalBlue.y,portalBlue.width*0.2,portalBlue.height*cubeSize*0.008,"fill");
            
        if(xCube<=portalBlue.x){
            // entry on right side
            leftSideSize=Math.abs(cubeSize-Math.abs(xCube-portalBlue.x));
            rightSideSize=cubeSize-leftSideSize;
            ctx.rect(portalBlue.x, yCube+cubeSize, leftSideSize, cubeSize);
            // orange side
            ctx.rect(portalOrange.x-rightSideSize, yCube+cubeSize, rightSideSize, cubeSize);
        }
        else{
            // entry on right side
            rightSideSize=Math.abs(cubeSize-Math.abs(xCube-portalOrange.x));
            leftSideSize=cubeSize-rightSideSize;
            // blue side
            ctx.rect(portalBlue.x, yCube+cubeSize, rightSideSize, cubeSize);
            // orange side
            ctx.rect(portalOrange.x-leftSideSize, yCube+cubeSize, leftSideSize, cubeSize);
        }
            
        }
        moveCube();
        keyMovementUpdate();
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
     
    function checkRange(xCurr,yCurr,xMin,xMax,yMin,yMax){
        return (xCurr>=xMin&&xCurr<=xMax&&yCurr>=yMin&&yCurr<=yMax);
    }
    
    function switchPortal(ball,srcPortal,destPortal,speedReverse){
    eWidth=((speedReverse)? srcPortal.height*0.8:srcPortal.width*0.9);
    eHeight=((!speedReverse)? srcPortal.height*0.8:srcPortal.width*0.9);
       // draw entry point
       ctx.fillStyle="black";
   bezierCurve(ctx,srcPortal.x,srcPortal.y,eWidth,eHeight,"fill");
        // set the ball exit point
        ball.x=destPortal.x-(ball.x-srcPortal.x);
        
        ball.y=destPortal.y-(srcPortal.y-ball.y);
        //ball.y=destPortal.y;
        // draw exit point
         bezierCurve(ctx,destPortal.x,destPortal.y,eWidth,eHeight,"fill");

        if(speedReverse){
        // reverse the ball speed on the y axis
            ball.ySpeed*=(-1);
        // balancer!!!!! without this gravity reduction the first law of physics will not hold!!!!
            ball.ySpeed-=(gravity);
        }
    }
    
    function fun2(){
        if(!activeFun.fun2){
        
            yCube=canvas.height*0.5-cubeSize*1.5;
                       funPortalSettings(portalBlue,canvas.width*0.25,canvas.height*0.8,canvas.height*0.1,canvas.width*0.6);
            funPortalSettings(portalOrange,canvas.width*0.75,canvas.height*0.8,canvas.height*0.1,canvas.width*0.6);
            
            setHeight(portalBlue,parseInt(document.getElementById("blueHeight").value)/10*canvas.height);
            setHeight(portalOrange,parseInt(document.getElementById("orangeHeight").value)/10*canvas.height);
            activeFun.fun1=false;
            activeFun.fun2=true;
            activeFun.fun3=false;
        }
        innerPortalWidth=portalBlue.height*0.55;
        
        // draw portals
       drawPortal(portalBlue.x,portalBlue.y,portalBlue.height,portalBlue.width,"blue","lightblue");        drawPortal(portalOrange.x,portalOrange.y,portalOrange.height,portalOrange.width,"orange","yellow");
       if(checkRange(ball.x,ball.y,portalBlue.x-innerPortalWidth/2,portalBlue.x+innerPortalWidth/2,portalBlue.y,portalBlue.y+ball.ySpeed)){
                // ball eneterd blue portal
                // switch to orange portal
                switchPortal(ball,portalBlue,portalOrange,true);
        }
        if(checkRange(ball.x,ball.y,portalOrange.x-innerPortalWidth/2,portalOrange.x+innerPortalWidth/2,portalOrange.y,portalOrange.y+ball.ySpeed)){
            // ball entered orange portal
            // switch to blue portal
            switchPortal(ball,portalOrange,portalBlue,true);
        }

        drawBall();
        updateBallMovement(false);
        keyMovementUpdate();
    }
    
    function fun3(){
        if(!activeFun.fun3){
            yCube=canvas.height*0.5-cubeSize*1.5;
            funPortalSettings(portalBlue,canvas.width*0.1,canvas.height*0.5,canvas.width*0.1,canvas.height*0.5);
            funPortalSettings(portalOrange,canvas.width*0.9,canvas.height*0.5,canvas.width*0.1,canvas.height*0.5);
            activeFun.fun1=false;
            activeFun.fun2=false;
            activeFun.fun3=true;
        }
        innerPortalHeight=portalBlue.height*0.8;
   // draw portals
       drawPortal(portalOrange.x,portalOrange.y,portalOrange.width,portalOrange.height,"orange","yellow"); drawPortal(portalBlue.x,portalBlue.y,portalBlue.width,portalBlue.height,"blue","lightblue");
       
       if(checkRange(ball.x,ball.y,portalBlue.x+ball.xSpeed,portalBlue.x,portalBlue.y-innerPortalHeight/2,portalBlue.y+innerPortalHeight/2)&&ball.xSpeed<0){
                // ball eneterd blue portal
                // switch to orange portal
                switchPortal(ball,portalBlue,portalOrange,false);
        }
             if(checkRange(ball.x,ball.y,portalOrange.x,portalOrange.x+ball.xSpeed,portalOrange.y-innerPortalHeight/2,portalOrange.y+innerPortalHeight/2)&&ball.xSpeed>0){
                // ball eneterd blue portal
                // switch to orange portal
                switchPortal(ball,portalOrange,portalBlue,false);
        }

       drawBall();
       updateBallMovement(true);
       updatePortalMovement(portalBlue);
       updatePortalMovement(portalOrange);
       keyMovementUpdate();
    }
    
    function showDebugInfo(){
        if(activeFun.fun1){
            document.getElementById("debugInfo").innerHTML="(xCube, xCube+width): "+"("+xCube.toPrecision(4)+","+(xCube+cubeSize).toPrecision(4)+")<br />xSpeed: "+((xSpeed<0)? "⇦":"⇨")+" "+Math.abs(xSpeed.toPrecision(4));
        }else{
            document.getElementById("debugInfo").innerHTML="(x,y): "+"("+Math.abs(ball.x.toPrecision(3))+","+Math.abs(ball.y.toPrecision(3))+")<br />"+"(xSpeed,ySpeed,Acc.): "+"("+((ball.xSpeed<0)? "⇦ ":"⇨ " ) +Math.abs(ball.xSpeed.toPrecision(3))+","+((ball.ySpeed<0)? "⇧ ":"⇩ ")+(Math.abs(ball.ySpeed.toPrecision(3)))+","+((xAcc>0)? "⇦ ":"⇨ " ) +Math.abs(xAcc.toPrecision(3))+")";
        }
    }
    
    function drawLoop(){
        drawBackground();
        if(document.getElementById("fun1").checked){
            fun1();   
        }else if(document.getElementById("fun2").checked){
            fun2();
        }else if(document.getElementById("fun3").checked){
            fun3();
        }
        showDebugInfo();
    }
   alert(introMsg); animationInterval=setInterval(drawLoop,animationDelay);
}

window.onload=init;

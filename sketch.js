let vid = []; //array videos
let vidActivos = []; //array videos pulsados
let timer;
let colWidth, colHeight, tramo, modo; //ancho columnas y largo columnas

let ejeX = [
  '38.039', '37.958', '37.035',
  '38.112', '38.391', '53.840',
  '48.370', '54.390', '47.715',
  '46.370', '42.741', '37.956',
]; //coordenadas de x

let ejeY = [
  '23.837', '23.754', '22.112',
  '23.838', '23.802', '10.721',
  '24.392', '10.193', '12.874',
  '24.392', '23.380', '23.635',
]; //coordenadas de y

let mp4 = [
  'LIVE1.mp4', 'LIVE2.mp4',
  'LIVE3.mp4', 'LIVE4.mp4',
  'LIVE5.mp4', 'LIVE6.mp4',
  'LIVE7.mp4', 'LIVE8.mp4',
  'LIVE9.mp4', 'LIVE10.mp4',
  'LIVE11.mp4', 'LIVE12.mp4',
]; //videos subidos

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  blendMode(LIGHTEST);
  
  timer=0;
  colWidth = 60; 
  colHeight = height
  

  for (let i = 0; i < mp4.length; i++) {
    let v = createVideo('assets/' + mp4[i]);
    v.hide();
    vid.push(v);
  }
}

function draw() {
  background(0);
  tint(255,100);
  print(timer);
  
  
  for (let i = 0; i < vidActivos.length; i++) {
    let e = vidActivos[i]; //e = videos pulsados (vid random + mouseX)
    let v = e.video; // el vid random

    if (v.width > 0) {
      tramo = e.x; //extracción según mouseX
      colWidth = 40 - random(35);
      e.x=e.x+random(-5,5);

      image(
        v,
        e.x-colWidth/2, 0,  //posición en x
        colWidth, colHeight, // tamaño columna
        tramo, 0,  // extracción del vídeo
        colWidth, v.height  // tamaño origen
      );
    }
    
    if(e.x<0){
      e.x= e.x+random(0,2);
    }
  
    if(e.x>width){
      e.x=e.x+random(-2,0);
    }
    
    if(vidActivos.length>10){
      vidActivos.shift();
    }
  }
  
  push(); //no interferencia de blendModes
  blendMode(BLEND);
  background(0,20);
  noFill();
  stroke(255);
  strokeWeight(1);
  
  line(mouseX, 0, mouseX, mouseY-50); //linea vertical
  line(0, mouseY, mouseX-150, mouseY); //linea horizontal
  line(mouseX, mouseY+50, mouseX, height); //linea vertical
  line(mouseX+150, mouseY, width, mouseY); //linea horizontal
  
  rect(mouseX-150,mouseY-50,300,100)
  
  textSize(16);
  textAlign(LEFT, TOP);
  
  if (vidActivos.length > 0) {
    let ultimo = vidActivos[vidActivos.length-1]; //último video
    let idx = ultimo.index; //el i de ese video

    text( 'x = ' + ejeX[idx] + pwinMouseX, 
      mouseX + 10,
      mouseY - 80); //ejeX con mismo i
    
    text( 'y = ' + ejeY[idx] + pwinMouseY,
      mouseX + 160,
      mouseY - 20); //ejeY con mismo i
  }
  
  pop()
  
  drawingContext.save();
  drawingContext.beginPath(); //recorte del canvas en forma de rectángulo
  drawingContext.rect(mouseX - 150, mouseY - 50, 300, 100);
  drawingContext.clip();

  if(modo==0){ 
    blendMode(LIGHTEST);
  }else if(modo==1){
    blendMode(DIFFERENCE);
  }else if(modo==2){
    blendMode(SCREEN);
  }
  
  if(timer==0){
    modo=0
  }
  if(timer==300){
    modo=1
  }
  if(timer==600){
    modo=2
  }
  if(timer==650){
    modo=0
    timer=-1
  }

  tint(255, 180);

  for (let i = 0; i < vidActivos.length; i++) { //dibujar otra vez las columnas que apareceran solo en el recorte del canvas
    let e = vidActivos[i]; 
    let v = e.video; 

    if (v.width > 0) {
      image(
        v,
        e.x-colWidth/2, 0,  
        colWidth, colHeight, 
        tramo, 0,  
        colWidth, v.height  
      );
    }
  }
  
  drawingContext.restore();
  
  
  timer++;
}

function mousePressed() {
  let i = int(random(vid.length));
  let v = vid[i];
  
  v.loop();
  
  vidActivos.push({
    video: vid[i], //se guarda el array
    x: mouseX, //se guarda la posición de x
    index: i   // se guarda el número del video
  });
}


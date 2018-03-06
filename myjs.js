
var zmija=[];
var BrojPolja;
var hrana;
var score=0;
var putanja;
var prethodna="m";
var loop;
var speed;

function zapocni_igru(){
  BrojPolja=document.getElementById('broj-polja').value;
  document.getElementById("dugme-pocni").disabled = true;
  if(document.getElementById("izgubio") != null)
    document.getElementById("izgubio").remove();
  speed=document.getElementById('brzina').value;
  speed=320-15*speed;
  crtaj_polja();
  var zmija_polje=[];
  zmija_polje=pocetna_pozicija(BrojPolja);
  zmija.push(zmija_polje);
  crtaj_zmiju(zmija);
  hrana=generisi_hrenu();
  crtaj_hranu();


}
function crtaj_polja(){
  var brojac=0;
  for(i=0; i < BrojPolja; i++){
      for(j=0; j<BrojPolja; j++){
        var para = document.createElement("div");
        para.className="novo";
        para.id=i+"|"+j;
        document.getElementById("tabla").appendChild(para);
        console.log(i);
        brojac++;
      }
      var para = document.createElement("br");
      para.id="razmak-linija";
      document.getElementById("tabla").appendChild(para);
    }

}
function startuj(e){
//  console.log("rucni unos "+e.which);
  putanja=String.fromCharCode(e.which);
  if((putanja == 'w' && prethodna == 's') || (putanja == 's' && prethodna == 'w') || (putanja == 'a' && prethodna == 'd') || (putanja == 'd' && prethodna == 'a')){
    console.log("usao");
    putanja=prethodna;
    return;

  }
  igraj();
  clearInterval(loop);
  loop = setInterval(function(){ igraj() }, speed);
}

function igraj(){
  var tmp=[zmija[zmija.length-1][0],zmija[zmija.length-1][1]];
  document.getElementById(zmija[zmija.length-1][0]+"|"+zmija[zmija.length-1][1]).style.backgroundColor="black";
  for(i=zmija.length-1;i >= 1; i--){
    zmija[i][0] = zmija[i-1][0];
    zmija[i][1] = zmija[i-1][1];
  }
  //alert(e);
  if(putanja== 'w'){
    zmija[0][0]--;}
  if(putanja == 's'){
    zmija[0][0]++;
    }
  if(putanja == 'a'){
    zmija[0][1]--;
  }
  if(putanja == 'd'){
    zmija[0][1]++;
  }
  prethodna=putanja;

  if(zmija[0][0] < 0)
    zmija[0][0]=BrojPolja-1;
  if(zmija[0][1] < 0)
    zmija[0][1]=BrojPolja-1;
  if(zmija[0][0] > BrojPolja-1)
    zmija[0][0]=0;
  if(zmija[0][1] > BrojPolja-1)
    zmija[0][1]=0;

  var NovaPozicija=zmija[0][0]+"|"+zmija[0][1];
  for(var i=4; i< zmija.length; i++){
    var PoljeZmije=zmija[i][0]+"|"+zmija[i][1];
    if(PoljeZmije == NovaPozicija){
      izgubio();
    }
  }
  if(zmija[0][0] == hrana[0] && zmija[0][1] == hrana[1]){
    //alert("pojeo si");
    zmija.push(tmp);
    score++;
    document.getElementById("score").innerHTML="Trenutni skor : "+score;
    hrana=generisi_hrenu();
    crtaj_hranu(hrana);
  }
  crtaj_zmiju(zmija);

}

function pocetna_pozicija(b){
  var velicina=b-6;
  visina=Math.floor(Math.random() * velicina) + 3;
  sirina=Math.floor(Math.random() * velicina) + 3;
  //alert(visina+"|"+sirina);
  return [visina,sirina];
}

function generisi_hrenu(){
  visina=Math.floor(Math.random() * BrojPolja);
  sirina=Math.floor(Math.random() * BrojPolja);
  var i;
  for(i=0; i < zmija.length; i++){
    var PoljeZmije=zmija[i][0]+"|"+zmija[i][1];
    var PoljeHrane=visina+"|"+sirina;
  //  alert(PoljeHrane + " "+ PoljeZmije);
    if(PoljeZmije == PoljeHrane ){
      return generisi_hrenu();

    }

  }
  return [visina, sirina];
}
function crtaj_zmiju(){
  for(var i=0; i< zmija.length; i++){
    a =(i <= 50)? 255-i*5 : a;
    document.getElementById(zmija[i][0]+"|"+zmija[i][1]).style.backgroundColor='rgb('+a+','+0+','+0+')';
  }
}
function crtaj_hranu(){
  document.getElementById(hrana[0]+"|"+hrana[1]).style.backgroundColor="green";
}
function izgubio(){
  for(i=0; i<BrojPolja;i++)
    for(j=0;j<BrojPolja;j++)
      document.getElementById(i+"|"+j).remove();
  document.getElementById("razmak-linija").remove();
  document.getElementById("dugme-pocni").disabled = false;
  var para = document.createElement("p");
  para.id="izgubio";
  para.className="izgubio";
  var node = document.createTextNode("izgubio, tvoj score je "+score);
  para.appendChild(node);
  document.getElementById("tabla").appendChild(para);
  zmija=[];
  score=0;
  putanja='w';
}

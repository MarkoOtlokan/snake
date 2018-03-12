
var zmija=[];
var BrojPolja;
var hrana;
var score=0;
var putanja;
var prethodna="m";
var loop;
var speed;
var unesena_brzina;
var br=1;
var a=true;

function zapocni_igru(){
  if((document.getElementById('broj-polja').value == "") || (document.getElementById('brzina').value == "")){
    alert("fill all the fields");
    return;
  }

  a=false;
  BrojPolja=document.getElementById('broj-polja').value;
  if(BrojPolja > 50 || BrojPolja <3){
    alert("size of board 3-50");
    return;
  }
  unesena_brzina=document.getElementById('brzina').value;
  if(unesena_brzina > 20 || unesena_brzina < 1 ){
    alert("speed 1-20");
    return;
  }
  document.getElementById("dugme-pocni").disabled = true;
  if(document.getElementById("izgubio") != null)
    document.getElementById("izgubio").remove();
  speed=320-15*unesena_brzina;
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
  var velicina=Math.floor(800/BrojPolja);
  velicina--;
  for(i=0; i < BrojPolja; i++){
      for(j=0; j<BrojPolja; j++){
        var para = document.createElement("div");
        para.className="novo";
        para.id=i+"|"+j;
        para.width=velicina;
        para.height=velicina;
        document.getElementById("tabla").appendChild(para);
        console.log(i);
        brojac++;
      }
      var para = document.createElement("br");
      para.id="razmak-linija";
      document.getElementById("tabla").appendChild(para);
    }
  var list = document.getElementsByClassName("novo");
  for (index = 0; index < list.length; ++index) {
    list[index].setAttribute("style","width:"+velicina+"px; height: "+velicina+"px");
  }
}

function startuj(e){
//  console.log("rucni unos "+e.which);
  if(a == true)
    return;
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
  document.getElementById(zmija[zmija.length-1][0]+"|"+zmija[zmija.length-1][1]).style.backgroundColor='rgba(0, 0, 0, 0.7)';
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
  for(var i=3; i< zmija.length; i++){
    var PoljeZmije=zmija[i][0]+"|"+zmija[i][1];
    if(PoljeZmije == NovaPozicija){
      izgubio();
      return;
    }
  }
  if(zmija[0][0] == hrana[0] && zmija[0][1] == hrana[1]){
    //alert("pojeo si");
    br++;
    speed=(speed > 50)? speed-2 : speed;
    zmija.push(tmp);
    score+=unesena_brzina*br;
    document.getElementById("score").innerHTML="score : "+score;
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
  var div = document.createElement("div");
  div.className="kraj";
  div.id="kraj";
  document.getElementById("za_kraj").appendChild(div);
  var para = document.createElement("p");
  para.id="izgubio";
  para.className="izgubio";
  var node = document.createTextNode("you lost, your score is  "+score);
  para.appendChild(node);
  document.getElementById("kraj").appendChild(para);
  unesi_skor();
  zmija=[];
  score=0;
  putanja='w';
  a=true;
  return;
}
function unesi_skor(){

    var forma=document.createElement("form");
    forma.setAttribute("method","post");
    forma.setAttribute("action","tabela.php")
    forma.className="unesi_skor";

    var ime=document.createElement("input");
    ime.setAttribute("type","text");
    ime.setAttribute("name","ime");

    var para = document.createElement("p");
    para.id="izgubio";
    para.className="izgubio";

    var node = document.createTextNode("Your name: ");
    para.appendChild(node);

    var submit=document.createElement("input");
    submit.setAttribute("type","submit");
    submit.setAttribute("value","submit score");

    var sscore=document.createElement("input");
    sscore.setAttribute("type","hidden");
    sscore.setAttribute("name","score");
    sscore.setAttribute("id","bodovi");
    sscore.setAttribute("value",score);

    forma.appendChild(sscore);
    forma.appendChild(para);
    forma.appendChild(ime);
    forma.appendChild(submit);

    document.getElementById("kraj").appendChild(forma);
    var sscore=score.toString();

  }

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"/>
    <title>igraj</title>
    <link rel="stylesheet" type="text/css" href="zmijica.css">
  </head>
  <body onkeypress="startuj(event)">
    <script src="myjs.js"></script>
    <div class="veliki-tata">


      <div class="unos">
        <p>
          size of board 3-50
        </p>
        <input id="broj-polja" type="number" placeholder="3-50" min="3" max="50" />
        <p>
          speed 1-20
        </p>
        <input id="brzina" type="number" placeholder="1-20" min="1" max="20" /><br /><br />
        <button type="button" id="dugme-pocni" onclick="zapocni_igru()" >start game</button>
        <p>
          Controls: w,a,s,d<br />
          after a while it becomes more difficult
        </p>
        <p id="score">
          score : 0;
        </p>
      </div>

      <div class="rang-list">
        <p class="fame">
          HALL OF FAME
        </p>
        <?php
        $json=file_get_contents("rezultati.txt");
        $niz=explode("@",$json);
        array_pop($niz);
      //  print_r($niz);
        foreach ($niz as $key ) {
          $json_data=json_decode($key,true);

          echo "<p>
          {$json_data['name']} - {$json_data['score']}
          </p>";

        }


         ?>
      </div>

      <div class="tabl" id="tabla">

      </div>
      <div class="za_kraj" id="za_kraj">

      </div>
    </div>


  </body>
</html>

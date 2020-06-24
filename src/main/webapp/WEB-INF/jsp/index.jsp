<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="shortcut icon" href="images/favicon.ico?v=<%=System.currentTimeMillis()%>" type="image/x-icon">
  <title>Scrambler</title>

  <script type="text/javascript" src="scripts/libs/jquery-3.4.1/jquery-3.4.1.js"></script>
  <script type="text/javascript" src="scripts/libs/jquery-ui-1.12.1/jquery-ui.js"></script>
  <script type="text/javascript" src="scripts/libs/chart.js/Chart.js"></script>

  <script type="text/javascript" src="scripts/ajax.js"></script>
  <script type="text/javascript" src="scripts/scramble.js"></script>
  <script type="text/javascript" src="scripts/graph.js"></script>

  <link rel="stylesheet" type="text/css" href="style/libs/font-awesome-4.7.0/css/font-awesome.css">
  <link rel="stylesheet" type="text/css" href="scripts/libs/jquery-ui-1.12.1/jquery-ui.css">
  <link rel="stylesheet" type="text/css" href="style/page.css">

  <script>
    $(document).ready(cube.onload);
  </script>
</head>

<body>

<div class="left">
  <div class="buttons">
    <input type="radio" name="puzzleType" id="five" value="555">
    <label for="five">5x5</label>
    <input type="radio" name="puzzleType" id="three" value="333" checked>
    <label for="three">3x3</label>
    <input type="radio" name="puzzleType" id="two" value="222">
    <label for="two">2x2</label>
    <button id="graph" value="graph">Graph</button>
    <button id="Scramble" value="Scramble">Scramble</button>
  </div>
  <div class="scramble"></div>
  <div class="break"></div>
  <div class="image"></div>
</div>
<div class="right">
  <div class="buttons">
    <input type="radio" name="solveMethod" id="cfop" value="cfop" checked>
    <label for="cfop">CFOP</label>
    <input type="radio" name="solveMethod" id="roux" value="roux">
    <label for="roux">Roux</label>
  </div>
  <div class="clock">00:00.00</div>
  <div class="break"></div>
  <div class="timings">
    <div class="solves">No times yet</div>
    <div class="averages"></div>
  </div>
</div>

</body>
</html>
<%@ page import="java.util.Properties" %>
<%@ page language="java" contentType="text/html;charset=UTF-8" %>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="shortcut icon" href="images/favicon.ico?v=<%=System.currentTimeMillis()%>" type="image/x-icon">
  <title>Cube timings</title>

  <script type="text/javascript" src="scripts/libs/jquery-3.4.1/jquery-3.4.1.js"></script>
  <script type="text/javascript" src="scripts/libs/jquery-ui-1.12.1/jquery-ui.js"></script>
  <script type="text/javascript" src="scripts/ajax.js"></script>
  <script type="text/javascript" src="scripts/scramble.js"></script>

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
    <button value="Scramble">Scramble</button>
  </div>
  <div class="scramble"></div>
  <div class="break"></div>
  <div class="image"></div>
</div>
<div class="right">
  <div class="buttons">
    <input type="radio" name="solveMethod" id="roux" value="roux" checked>
    <label for="roux">Roux</label>
    <input type="radio" name="solveMethod" id="cfop" value="cfop">
    <label for="cfop">CFOP</label>
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
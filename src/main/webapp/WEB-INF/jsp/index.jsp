<%@ page language="java" contentType="text/html;charset=UTF-8" %>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="shortcut icon" href="images/favicon.ico?v=<%=System.currentTimeMillis()%>" type="image/x-icon">
  <title>OpenText Augmented Authoring</title>

  <script type="text/javascript" src="scripts/_jquery-3.4.1/jquery-3.4.1.js"></script>
  <script type="text/javascript" src="scripts/ajax.js"></script>
  <script type="text/javascript" src="scripts/scramble.js"></script>

  <link rel="stylesheet" type="text/css" href="style/page.css">

  <script>
    $(document).ready(cube.onload);
  </script>
</head>

<body>

<div id="left">
  <div id="scramble"></div>
  <div id="break"></div>
  <div id="image"></div>
</div>
<div id="right">
  <div id="clock">00:00.00</div>
  <div id="break"></div>
  <div id="timings">
    <div id="times">No times yet</div>
    <div id="averages"></div>
  </div>
</div>

</body>
</html>
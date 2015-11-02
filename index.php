<!DOCTYPE html>
<html>
<head>
    <style>
        #wrapper{
            margin-left: 120px;
            overflow: auto;
            font-family: "proxima-nova",sans-serif;
        }
        #wrapper p{
            color: #27AE60;
            font-size: 20px;
            font-weight: bold;
            padding-left: 125px;
        }
        .issues {
            border: solid;
            border-color: #eaeaea;
            -webkit-border-radius: 28;
            -moz-border-radius: 28;
            border-radius: 28px;
            overflow: auto;
            height: 484px;
            width: 750px;
            padding-right: 35px;
            padding-left: 35px;
        }
        .issues ul, li{
            list-style-type: none;
        }
        .issues h2{
            left: 50%;
            margin-left: 250px;
            color: #8be8b0;
        }
        .issues h4{
            color: #27AE60;
        }
        .start{
            background: #FFFFFF;
            border: 2px solid #eaeaea;
            color: #27AE60;
            font-weight: 600;
            font-size: 14px;
            text-align: center;
            cursor: pointer;
            padding: 7px 16px;
            -webkit-border-radius: 50px;
            -moz-border-radius: 50px;
            border-radius: 50px;
        }
        .start:hover{
            border-color: #999;
        }

        .issues::-webkit-scrollbar {
            display: none;
        }
        
    </style>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
    <script src="http://github.hubspot.com/vex/js/vex.js"></script>
    <script src="http://github.hubspot.com/vex/js/vex.dialog.js"></script>
    <link href="http://github.hubspot.com/vex/css/vex.css" rel="stylesheet" />
    <link href="http://github.hubspot.com/vex/css/vex-theme-flat-attack.css" rel="stylesheet" />
    <script src="test.js"></script>
</head>
<body>
<div class="issue" id="wrapper">
<div class="issues" id="result" name="issuesresult">
</div>
<p>Don't see your issues here? Click to start your own! &nbsp; <input type="button" class="start" value="Start" /></p>
</div>
</body>
</html>
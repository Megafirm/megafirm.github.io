@echo off
:options
cls
echo.    ____                  __         ____            __     ____               _           __
echo.   / __ \__  ______ ___  / /_       / __ )____ _____/ /    / __ \_________    (_)__  _____/ /_
echo.  / / / / / / / __ `__ \/ __ \     / __  / __ `/ __  /    / /_/ / ___/ __ \  / / _ \/ ___/ __/
echo. / /_/ / /_/ / / / / / / /_/ /    / /_/ / /_/ / /_/ /    / ____/ /  / /_/ / / /  __/ /__/ /_
echo./_____/\__,_/_/ /_/ /_/_.___/    /_____/\__,_/\__,_/    /_/   /_/   \____/_/ /\___/\___/\__/
echo.                                                                        /___/
echo.1: Create Project
echo.2: Open Projects
echo.3: Open Project Folder
set option=
set /p option=
if '%option%'=='1' goto create
if '%option%'=='2' goto open
if '%option%'=='3' goto fileopen
cls
goto options

:create
cls
echo.    ____                  __         ____            __     ____               _           __
echo.   / __ \__  ______ ___  / /_       / __ )____ _____/ /    / __ \_________    (_)__  _____/ /_
echo.  / / / / / / / __ `__ \/ __ \     / __  / __ `/ __  /    / /_/ / ___/ __ \  / / _ \/ ___/ __/
echo. / /_/ / /_/ / / / / / / /_/ /    / /_/ / /_/ / /_/ /    / ____/ /  / /_/ / / /  __/ /__/ /_
echo./_____/\__,_/_/ /_/ /_/_.___/    /_____/\__,_/\__,_/    /_/   /_/   \____/_/ /\___/\___/\__/
echo.                                                                        /___/
echo.('back' to go back)
echo.New Project Name:
set /p name=
cd %localhost%
if '%name%'=='back' goto options
mkdir %name%
cd %name%
mkdir public
cd public
::index.html
echo.^<!DOCTYPE html^>>index.html
echo.^<html^>>>index.html
echo.  ^<head^>>>index.html
echo.    ^<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.10.2/p5.js"^>^</script^>>>index.html
echo.    ^<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.11/addons/p5.dom.min.js"^>^</script^>>>index.html
echo.    ^<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.10.2/addons/p5.sound.min.js"^>^</script^>>>index.html
echo.    ^<script src="https://code.jquery.com/jquery-3.4.1.min.js"^>^</script^>>>index.html
echo.    ^<script src="js/main.js"^>^</script^>>>index.html
echo.    ^<script src="js/canvas.js"^>^</script^>>>index.html
echo.    ^<link rel="stylesheet" type="text/css" href="css/style.css"^>>>index.html
echo.    ^<meta charset="utf-8"/^>>>index.html
echo.    ^<title^>%name%^</title^>>>index.html
echo.  ^</head^>>>index.html
echo.  ^<body^>>>index.html
echo.  ^</body^>>>index.html
echo.^</html^>>>index.html
::js
mkdir js
::main.js
cd js
echo.function setup() {>main.js
echo.  setupCanvas();>>main.js
echo.  hideFreeWHA();>>main.js
echo.}>>main.js
echo.>>main.js
echo.function draw() {>>main.js
echo.  background(255);>>main.js
echo.}>>main.js
cd ..
::canvas.js
cd js
echo.//canvas setup>canvas.js
echo.let canvas;>>canvas.js
echo.let width, height;>>canvas.js
echo.let padding = 20;>>canvas.js
echo.let fullscreen = true;>>canvas.js
echo.>>canvas.js
echo.function setupCanvas() {>>canvas.js
echo.  canvas = createCanvas(window.innerWidth - padding, window.innerHeight - padding);>>canvas.js
echo.  canvas.style('display', 'block');>>canvas.js
echo.  width = canvas.width;>>canvas.js
echo.  height = canvas.height;>>canvas.js
echo.  colorMode(HSB, 360, 100, 100, 255);>>canvas.js
echo.}>>canvas.js
echo.>>canvas.js
echo.//hide freeWHA logo>>canvas.js
echo.function hideFreeWHA() {>>canvas.js
echo.  $(document).ready(function() {>>canvas.js
echo.    $('body').find('img[src$="https://www.freewebhostingarea.com/images/poweredby.png"]').remove();>>canvas.js
echo.  });>>canvas.js
echo.}>>canvas.js
echo.>>canvas.js
echo.//window resized>>canvas.js
echo.function windowResized() {>>canvas.js
echo.  if (fullscreen) {>>canvas.js
echo.    canvas = resizeCanvas(window.innerWidth - padding, window.innerHeight - padding);>>canvas.js
echo.    width = window.innerWidth;>>canvas.js
echo.    height = window.innerHeight;>>canvas.js
echo.  }>>canvas.js
echo.}>>canvas.js
cd ..>>canvas.js
::css
mkdir css
::style.css
cd css
echo.head {>style.css
echo.}>>style.css
echo.>>style.css
echo.body {>>style.css
echo.}>>style.css
cd ..
::data folder
mkdir data
::open atom
goto atom

:open
cls
echo.    ____                  __         ____            __     ____               _           __
echo.   / __ \__  ______ ___  / /_       / __ )____ _____/ /    / __ \_________    (_)__  _____/ /_
echo.  / / / / / / / __ `__ \/ __ \     / __  / __ `/ __  /    / /_/ / ___/ __ \  / / _ \/ ___/ __/
echo. / /_/ / /_/ / / / / / / /_/ /    / /_/ / /_/ / /_/ /    / ____/ /  / /_/ / / /  __/ /__/ /_
echo./_____/\__,_/_/ /_/ /_/_.___/    /_____/\__,_/\__,_/    /_/   /_/   \____/_/ /\___/\___/\__/
echo.                                                                        /___/
echo.Projects:
dir /a:d /b
echo.
echo.('back' to go back)
echo.Enter to continue to projects
::if '%name%'=='back' goto options
::echo.Choose a Project:
set option=
set /p option=
::if exist '%name%' (
::cd '%name%'
if '%option%'=='' (
cd %localhost%
atom . ../
exit
) else if '%option%'=='back' (
set option=''
goto options
)
goto open

:fileopen
cd %localhost%
cls
%SystemRoot%/explorer.exe "%CD%"
exit

:atom
atom . index.html js/main.js ../../
exit
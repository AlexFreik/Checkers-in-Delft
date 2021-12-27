const canvas = document.getElementById('canvas-game')
canvas.width  = 800;
canvas.height = 800;
canvas.style.width  = '800px';
canvas.style.height = '800px';

const ctx = canvas.getContext('2d')

ctx.fillStyle = 'rgb(40, 40, 40)'
ctx.fillRect(0, 0, 1000, 500)

ctx.fillStyle = 'white'
ctx.font = "30px Arial";
ctx.fillText('Hello World', 10, 50)

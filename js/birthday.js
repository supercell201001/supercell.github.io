const bday = document.querySelectorAll('#happybday path');
window.addEventListener('beforeunload', function(event) { 
    unlockScroll()
    window.scrollTo(0, 0);
    lockScroll();
});
window.addEventListener('load', function(event) { 
  window.scrollTo(0, 0);
});

for(let i = 0; i<bday.length; i++) {
    console.log(`Letter ${i+1} is ${bday[i].getTotalLength()}`);
}

let masterTL = gsap.timeline();

masterTL
.from('#btn_playPause', 3, {
  autoAlpha: 0,
  ease: "power1.in",
  yoyo:true,
  repeat: 5
})
.set('html, body', {
  overflow: 'visible'
});


gsap.registerPlugin(ScrollTrigger);
let parallaxTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".container",
        start: "center center",
        end: "1000 center",
        scrub: 1,
        onEnter: () => {
          window.scrollTo(0, 0);
        }
    }    
})

/* ANIMATION SEQUENCE */
parallaxTl
.to('#first', 6, {
    y: '-=100'
}, '-=6')
.to('.content, .blur', 6, {
    top: '0%'
}, '-=6');

masterTL.add(parallaxTl)

/* ----- PLAY MUSIC ----- */
const playlist = ["hbd_jazz.mp3", "jazz10.mp3", "vintagechristmas.mp3", "ghiblirelax.mp3"];
var playlistLength = playlist.length;

var audio = document.getElementById("losAudio");
var btn_playPause = document.getElementById("btn_playPause");

function losAudio_playPause() {
  var isPaused = losAudio.paused;
  losAudio[isPaused ? "play" : "pause"]();  
}

btn_playPause.addEventListener("click", losAudio_playPause);


// play jazz ver once rom ver ends
var audio = document.getElementById('losAudio');
audio.addEventListener('ended', function() {
  var randomIndex = Math.floor(Math.random() * playlistLength);
  audio.src = "img/" + playlist[randomIndex];
  audio.pause();
  audio.load();
  audio.play();
  console.log("playing music: " + playlist[randomIndex]);
})

/* ----- FIREWORKS ----- */
// helper functions
const PI2 = Math.PI * 2
const random = (min, max) => Math.random() * (max - min + 1) + min | 0
const timestamp = _ => new Date().getTime()

// container
class Birthday {
  constructor() {
    this.resize()

    // create a lovely place to store the firework
    this.fireworks = []
    this.counter = 0

  }
  
  resize() {
    this.width = canvas.width = window.innerWidth
    let center = this.width / 2 | 0
    this.spawnA = center - center / 4 | 0
    this.spawnB = center + center / 4 | 0
    
    this.height = canvas.height = window.innerHeight
    this.spawnC = this.height * .1
    this.spawnD = this.height * .5
    
  }
  
  onClick(evt) {
     let x = evt.clientX || evt.touches && evt.touches[0].pageX
     let y = evt.clientY || evt.touches && evt.touches[0].pageY
     
     let count = random(3,5)
     for(let i = 0; i < count; i++) this.fireworks.push(new Firework(
        random(this.spawnA, this.spawnB),
        this.height,
        x,
        y,
        random(0, 260),
        random(30, 110)))
          
     this.counter = -1
     
  }
  
  update(delta) {
    ctx.globalCompositeOperation = 'copy';
    ctx.fillStyle = `rgba(1,10,28,1)`;
    ctx.fillRect(0, 0, this.width, this.height)

    ctx.globalCompositeOperation = 'lighter'
    for (let firework of this.fireworks) firework.update(delta)

    // if enough time passed... create new new firework
    this.counter += delta * 3 // each second
    if (this.counter >= 1) {
      this.fireworks.push(new Firework(
        random(this.spawnA, this.spawnB),
        this.height,
        random(0, this.width),
        random(this.spawnC, this.spawnD),
        random(0, 360),
        random(30, 110)))
      this.counter = 0
    }

    // remove the dead fireworks
    if (this.fireworks.length > 1000) this.fireworks = this.fireworks.filter(firework => !firework.dead)

  }
}

class Firework {
  constructor(x, y, targetX, targetY, shade, offsprings) {
    this.dead = false
    this.offsprings = offsprings

    this.x = x
    this.y = y
    this.targetX = targetX
    this.targetY = targetY

    this.shade = shade
    this.history = []
  }
  update(delta) {
    if (this.dead) return

    let xDiff = this.targetX - this.x
    let yDiff = this.targetY - this.y
    if (Math.abs(xDiff) > 3 || Math.abs(yDiff) > 3) { // is still moving
      this.x += xDiff * 2 * delta
      this.y += yDiff * 2 * delta

      this.history.push({
        x: this.x,
        y: this.y
      })

      if (this.history.length > 20) this.history.shift()

    } else {
      if (this.offsprings && !this.madeChilds) {
        
        let babies = this.offsprings / 2
        for (let i = 0; i < babies; i++) {
          let targetX = this.x + this.offsprings * Math.cos(PI2 * i / babies) | 0
          let targetY = this.y + this.offsprings * Math.sin(PI2 * i / babies) | 0

          birthday.fireworks.push(new Firework(this.x, this.y, targetX, targetY, this.shade, 0))

        }

      }
      this.madeChilds = true
      this.history.shift()
    }
    
    if (this.history.length === 0) this.dead = true
    else if (this.offsprings) { 
        for (let i = 0; this.history.length > i; i++) {
          let point = this.history[i]
          ctx.beginPath()
          ctx.fillStyle = 'hsl(' + this.shade + ',100%,' + i + '%)'
          ctx.arc(point.x, point.y, 1, 0, PI2, false)
          ctx.fill()
        } 
      } else {
      ctx.beginPath()
      ctx.fillStyle = 'hsl(' + this.shade + ',100%,50%)'
      ctx.arc(this.x, this.y, 1, 0, PI2, false)
      ctx.fill()
    }

  }
}

let canvas = document.getElementById('birthday')
let ctx = canvas.getContext('2d')

let then = timestamp()

let birthday = new Birthday
//window.onresize = () => birthday.resize()
document.onclick = evt => birthday.onClick(evt)
document.ontouchstart = evt => birthday.onClick(evt)

  ;(function loop(){
  	requestAnimationFrame(loop)

  	let now = timestamp()
  	let delta = now - then

    then = now
    birthday.update(delta / 1000)
  	

  })()
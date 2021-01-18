<template>
<div class="content">
  <div class="header">
    <div class="text no-select" data-splitting>Tillykke med fødselsdagen, Astrid!</div>
  </div>

  <div class="container">
    <template v-if="showPresent">
      <div class="gift no-select">
        <img id="img" class="fade" src="../assets/astridGift.png">
      </div>
      <div id="gift-info" class="info fade no-select">
        Et biografbesøg med mig efter dit valg :)
      </div>
    </template>

    <template v-else>
      <div id="presents" class="presents fade">
        <div class="present one" @click="openPresent()">
          <div class="lid"></div>
          <div class="box"></div>
          <div class="bow"></div>
          <div class="ribbon"></div>
        </div>
        <div class="present two" @click="openPresent()">
          <div class="lid"></div>
          <div class="box"></div>
          <div class="bow"></div>
          <div class="ribbon"></div>
        </div>
        <div class="present three" @click="openPresent()">
          <div class="lid"></div>
          <div class="box"></div>
          <div class="bow"></div>
          <div class="ribbon"></div>
        </div>
      </div>

      <div id="info" class="info fade no-select">
        Klik for at åbne
        <img class="arrow" src="../assets/arrow.png" />
      </div>
    </template>

    <audio
      id="music"
      loop
      src="https://frederick.win/upload/birthday/celebration.mp3"
      preload="auto"
    ></audio>
  </div>
</div>
</template>

<script>
import Mojs from 'mo-js';
import Splitting from 'splitting';

export default {
  name: 'Astrid',
  data() {
    return {
      delay: 2000,
      showConfetti: true,
      showPresent: false,
      canOpenPresent: false,
      intervalId: 0,
    };
  },
  methods: {
    bursty($event) { // eslint-disable-line no-unused-vars
      const burst = new Mojs.Burst({
        left: 0,
        top: 0,
        radius: { 0: 200 },
        count: 20,
        degree: 360,
        children: {
          fill: { white: '#9d0208' },
          duration: 2000,
        },
      }).tune({ x: event.pageX, y: event.pageY }); // eslint-disable-line no-restricted-globals
      burst.replay();
      setTimeout(() => burst.el.parentNode.removeChild(burst.el), 2100); // 2100 because burst duration is 2000
    },
    randomizedConfetti() {
      if (!this.showConfetti) return;
      const x = Math.floor(Math.random() * (document.body.clientWidth - 100) + 0);
      const y = Math.floor(Math.random() * (window.innerHeight - 200) + 0);
      const burst = new Mojs.Burst({
        left: 0,
        top: 0,
        radius: { 0: 200 },
        count: 20,
        degree: 360,
        children: {
          fill: { white: '#BDE0FE' },
          duration: 2000,
        },
      }).tune({ x, y }); // eslint-disable-line no-restricted-globals
      burst.replay();
      setTimeout(() => burst.el.parentNode.removeChild(burst.el), 2100); // 2100 because burst duration is 2000
    },
    openPresent() {
      if (!this.canOpenPresent) return;
      const info = document.getElementById('info');
      const presents = document.getElementById('presents');

      presents.classList.add('fade');
      info.classList.add('fade');

      this.showConfetti = false;

      setTimeout(() => {
        this.showPresent = true;

        setTimeout(() => document.getElementById('img').classList.remove('fade'), 50);
        setTimeout(() => document.getElementById('gift-info').classList.remove('fade'), 1000);
      }, this.delay);
    },
  },
  mounted() {
    const music = document.getElementById('music');
    const info = document.getElementById('info');
    const presents = document.getElementById('presents');

    this.intervalId = setInterval(() => this.randomizedConfetti(), 500);

    setTimeout(() => presents.classList.remove('fade'), 1000);

    setTimeout(() => {
      info.classList.remove('fade');
      this.canOpenPresent = true;
    }, 3000);

    document.addEventListener('click', this.bursty);

    music.volume = 0.5;
    music.play();

    Splitting();
  },
  beforeDestroy() {
    window.clearInterval(this.intervalId);
    document.removeEventListener('click', this.bursty);
  },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Caveat&display=swap');

$border-color: #2c3a49;
$border: 3px solid $border-color;
$border-radius: 5px;

.gift {
  display: flex;
  justify-content: center;
  opacity: 1;
  transition: opacity 2s;

  img {
    width: 230px;
    transform: scaleX(1.5);
    opacity: 1;
    transition: opacity 2s;
  }
}

.content {
  margin-top: 90px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.header {
  max-width: 640px;
  margin: 0 auto;
}

.info {
  font-family: 'Caveat', cursive;
  font-size: 1.5em;
  color: black;
  text-align: center;
  opacity: 1;
  transition: opacity 2s;
  margin-top: 1em;
}

.no-select {
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}

.fade {
  opacity: 0 !important;
}

.arrow {
  height: 25px;
  width: 25px;
}

.text {
  min-width: 100%;
  text-align: center;
  color: white;
  text-shadow: 1px 1px $border-color;
  font-size: 3em;
  margin-bottom: 1em;
  font-family: 'Fredoka One', cursive;
}

.presents {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 200px;
  opacity: 1;
  transition: opacity 2s;
}

@mixin present(
  $name,
  $positionx,
  $box-color,
  $bow-color,
  $dot-color,
  $width,
  $height,
  $z-index
) {
  position: relative;
  left: $positionx;
  width: $width;
  height: $height;
  z-index: $z-index;

  &:hover {
    animation: 0.5s #{$name};
  }

  .lid {
    background: $box-color;
  }
  .box {
    background-image: radial-gradient($dot-color 20%, transparent 20%),
      radial-gradient($dot-color 20%, transparent 20%);
    background-color: $box-color;
  }
  .ribbon {
    background: $bow-color;
    &::before {
      top: 19%;
    }
  }
  .bow {
    background: $bow-color;
    &::before,
    &::after {
      background: $bow-color;
    }
  }

  @keyframes #{$name} {
    0% {
      width: $width;
      height: $height;
    }
    30% {
      width: calc(#{$width} + 10px);
      height: calc(#{$height} - 10px);
    }
    60% {
      width: calc(#{$width} - 10px);
      height: calc(#{$height} + 10px);
    }
    100% {
      width: $width;
      height: $height;
    }
  }
}

.one {
  @include present('one', 20px, #8ecae6, #ffb703, #219ebc, 130px, 120px, 10);
}

.two {
  @include present('two', 0, #ffcbf2, #c0fdff, transparent, 120px, 160px, 0);
}

.three {
  @include present('green', -20px, #ffa69e, #faf3dd, #b8f2e6, 115px, 100px, 1);
}

.present {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  .lid {
    height: 20%;
    width: calc(100% + 10px);
    border: $border;
    border-radius: $border-radius;
    box-shadow: inset 2px 2px rgba(255, 255, 255, 0.5),
      3px 0 rgba(0, 0, 0, 0.15);
  }
  .box {
    width: 100%;
    height: 100%;
    background-position: 0 0, 20px 20px;
    background-size: 40px 40px;
    border: $border;
    border-top: 0;
    border-bottom-left-radius: $border-radius;
    border-bottom-right-radius: $border-radius;
    box-shadow: inset -3px 3px rgba(0, 0, 0, 0.3), 3px 0 rgba(0, 0, 0, 0.15);
  }
  .ribbon {
    position: absolute;
    top: -3px;
    width: 30px;
    height: calc(100% - 3px);
    border: $border;
    border-radius: $border-radius;
    box-shadow: inset 2px 2px rgba(255, 255, 255, 0.5);
    &::before {
      display: block;
      content: '';
      position: absolute;
      width: 100%;
      height: 3px;
      background: rgba(0, 0, 0, 0.3);
    }
  }
  .bow {
    position: absolute;
    top: -20px;
    width: 20px;
    height: 20px;
    border: $border;
    border-radius: 50%;
    box-shadow: inset 2px 2px rgba(255, 255, 255, 0.5),
      inset -2px -3px rgba(0, 0, 0, 0.3);
    &::before,
    &::after {
      display: block;
      content: '';
      position: absolute;
      top: -10px;
      width: 30px;
      height: 30px;
      border: $border;
      border-radius: 50%;
      box-shadow: inset 2px 2px rgba(255, 255, 255, 0.5),
        inset -2px -3px rgba(0, 0, 0, 0.3);
      z-index: -1;
    }
    &::before {
      left: 15px;
    }
    &::after {
      right: 15px;
    }
  }
}
</style>

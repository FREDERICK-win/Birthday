<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import 'splitting/dist/splitting';
@import 'splitting/dist/splitting-cells';

body {
  // background: linear-gradient(25deg, #EDF2FB, #ABC4FF);
  background: #abc4ff;
  overflow: hidden;
}

.text .char {
  animation: slide-in 1s cubic-bezier(0.5, 0, 0.5, 1) both;
  animation-delay: calc(60ms * var(--char-index));
}

@keyframes slide-in {
  from {
    transform: translateY(-1em) rotate(-0.5turn) scale(0.5);
    opacity: 0;
  }
}
</style>

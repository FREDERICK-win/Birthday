<template>
  <div class="guard">
    <div class="browser">
      <div class="mask"></div>
    </div>
    <div class="form__field">
      <input
        type="text"
        class="form__input"
        v-model="key"
        :placeholder="text"
        @keyup="checkPassword"
        @focus="handlePlaceholder"
        @blur="handlePlaceholder"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Guard',
  data() {
    return {
      text: 'Hvem er det?',
      key: '',
      delay: 2000,
    };
  },
  methods: {
    checkPassword() {
      const { routes } = this.$router.options;

      routes.forEach((route) => {
        if (!route.props?.validKeys) return;
        if (!route.props.validKeys.includes(this.key.toLowerCase())) return;
        document.getElementsByClassName('form__input')[0].disabled = true;
        document.getElementsByClassName('guard')[0].classList.add('fade');
        setTimeout(() => this.$router.push(route.name), this.delay);
      });
    },
    handlePlaceholder() {
      const input = document.getElementsByClassName('form__input')[0];
      if (input.placeholder === this.text) input.setAttribute('placeholder', '');
      else input.setAttribute('placeholder', this.text);
    },
  },
};
</script>

<style lang="scss" scoped>
.guard {
  opacity: 1;
  transition: opacity 2s;
}

.fade {
  opacity: 0 !important;
}

input {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  outline: 0;
}

.form__field {
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  z-index: 1;
}

.form__input {
  border-radius: 0.3em;
  border-style: solid;
  border-width: 2px;
  font-size: 2em;
  padding: 0.5em 1em;
  text-align: center;
}

.mask {
  background-repeat: no-repeat;
  background-image: linear-gradient(to bottom, #000 8px, transparent 5px),
    radial-gradient(circle at 35% 9%, #fff 40px, transparent 41px),
    radial-gradient(circle at 35% 9%, #000 48px, transparent 49px),
    radial-gradient(circle at 65% 9%, #fff 40px, transparent 41px),
    radial-gradient(circle at 65% 9%, #000 48px, transparent 49px),
    linear-gradient(100deg, transparent 40%, #d59d64 40%),
    linear-gradient(-100deg, transparent 40%, #e0a66b 40%);
  background-size: 60%, 100%, 100%, 100%, 100%, 9% 45%, 10% 45%;
  background-position: 50% 0, 0 0, 0 0, 0 0, 0 0, 45% 0, 55% 0;
  height: 100%;
  position: absolute;
  top: 25%;
  width: 100%;
}
.mask:after,
.mask:before {
  content: "";
  position: absolute;
}
.mask:before {
  background-color: #222;
  border-radius: 4px;
  box-shadow: 120px 0 0 #222;
  height: 30px;
  left: 25%;
  top: -20px;
  width: 78px;
}
.mask:after {
  background-color: #222;
  border-radius: 4px;
  height: 50px;
  left: 50%;
  transform: translateX(-50%);
  top: 40%;
  width: 120px;
  z-index: 0;
}
.browser {
  background-color: #f1f1f1;
  background-image: radial-gradient(
      circle at 8px 8px,
      #fd635d 3px,
      transparent 4px
    ),
    radial-gradient(circle at 18px 8px, #febe40 3px, transparent 4px),
    radial-gradient(circle at 28px 8px, #30c947 3px, transparent 4px),
    linear-gradient(to bottom, #c8c8c9 5%, transparent 5%),
    linear-gradient(
      to bottom,
      #f1f1f1 10%,
      transparent 10%,
      transparent 20%,
      #f1f1f1 20%,
      #f1f1f1 25%,
      transparent 25%,
      transparent 50%,
      #f1f1f1 50%,
      #f1f1f1 55%,
      transparent 55%,
      transparent 60%,
      #f1f1f1 60%,
      #f1f1f1 65%,
      transparent 65%,
      transparent 70%,
      #f1f1f1 70%,
      #f1f1f1 75%,
      transparent 75%,
      transparent 80%,
      #f1f1f1 80%,
      #f1f1f1 85%,
      transparent 85%,
      transparent 95%,
      #f1f1f1 95%,
      #f1f1f1 100%
    ),
    linear-gradient(
      to bottom,
      #f1f1f1 10%,
      transparent 10%,
      transparent 30%,
      #f1f1f1 30%,
      #f1f1f1 35%,
      transparent 35%,
      transparent 95%,
      #f1f1f1 95%,
      #f1f1f1 100%
    ),
    linear-gradient(
      to right,
      transparent 5%,
      #e2e2e2 5%,
      #e2e2e2 30%,
      transparent 30%,
      transparent 40%,
      #e2e2e2 40%,
      #e2e2e2 95%,
      transparent 95%,
      transparent 100%
    );
  background-size: 100%, 100%, 100%, 100%, 65%, 30%, 100%;
  background-position: 0 0, 0 0, 0 0, 0 0, 100% 0, 0 0, 0 0;
  background-repeat: no-repeat;
  border: 1px solid #a2a2a2;
  border-radius: 8px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  display: inline-block;
  height: 300px;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 30%;
  width: 400px;
  z-index: 1;
}
</style>

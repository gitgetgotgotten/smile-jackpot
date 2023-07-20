<template>
  <div id="cash-out-wrapper" @mouseenter="moveButton" @mouseleave="resetButtonPosition">
    <button ref="cashOutEl" id="cash-out" @click="cashOut">CASH OUT</button>
  </div>
</template>

<script>
import {ref} from 'vue'

export default {
  emits: ['cashedOut'],

  setup(_, {emit}) {
    const cashOutEl = ref(null)

    /**
     * Prevent the `cashOut` from working properly by making the button un-clickable in order to keep the cash
     */
    const cashOut = () => {
      if (Math.random() > 0.4) {
        emit('cashedOut');
      }
    }
    /**
     * Prevent the `cashOut` from working properly by moving the button to a random position in order to keep the cash
     */
    const moveButton = () => {
      if (Math.random() <= 0.5) {
        const randomDistance = 300;
        const randomDirection = Math.floor(Math.random() * 4) + 1;
        if (randomDirection === 1) {
          cashOutEl.value.style.transform = `translateY(-${randomDistance}px)`;
        } else if (randomDirection === 2) {
          cashOutEl.value.style.transform = `translateY(${randomDistance}px)`;
        } else if (randomDirection === 3) {
          cashOutEl.value.style.transform = `translateX(-${randomDistance}px)`;
        } else if (randomDirection === 4) {
          cashOutEl.value.style.transform = `translateX(${randomDistance}px)`;
        }
      }
    }
    /**
     * Reset the position of the button to its original place
     */
    const resetButtonPosition = () => {
      cashOutEl.value.style.transform = '';
    }

    return {
      cashOutEl,
      cashOut,
      moveButton,
      resetButtonPosition,
    }
  },
};
</script>

<style scoped>
#cash-out-wrapper {
  display: inline-block;
}
</style>
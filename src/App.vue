<template>
  <div id="app">
    <SlotMachine />
  </div>
</template>

<script>
import SlotMachine from './components/SlotMachine.vue';

export default {
  components: {
    SlotMachine,
  },
};
</script>

<style>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
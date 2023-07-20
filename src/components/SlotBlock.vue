<template>
  <div class="slot-block">
    <img v-if="spinning" alt="arrow down" src="/src/assets/icons/spinner.svg" width="50" height="50"/>
    <img v-else :id="icon" :alt="icon" :src="`/src/assets/icons/${icon}.svg`" width="50" height="50"/>
  </div>
</template>

<script>
export default {
  props: {
    spinning: {
      type: Boolean,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
  },
};
</script>

<style scoped>
.slot-block {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border: 1px solid #000;
}
</style>
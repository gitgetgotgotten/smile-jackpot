<template>
  <div>
    <div class="slot-machine">
      <SlotBlock v-for="(_, i) in 3" :key="i" :icon="rolledBlocks[i].icon" :spinning="spinning[i]"/>
      <button id="roll-button" :disabled="isSpinning || credits === 0" @click="roll">
        {{ isSpinning ? 'Rolling...' : 'Roll' }}
      </button>
    </div>
    <CashOutButton @cashedOut="settlement"/>
  </div>
</template>

<script>
import SlotBlock from './SlotBlock.vue';
import CashOutButton from './CashOutButton.vue';
import {ref, reactive} from 'vue';

export default {
  components: {
    SlotBlock,
    CashOutButton,
  },
  setup() {
    const tinyReRollChance = 0.3;
    const largeReRollChance = 0.6;
    const tinyCredits = 40;
    const mediumCredits = 60;
    const credits = ref(10);
    const user = reactive({
      credits: 0
    });

    const spinning = reactive([false, false, false]);
    const isSpinning = ref(false);

    const blocks = [
      {symbol: 'C', reward: 10, icon: 'cherry'},
      {symbol: 'L', reward: 20, icon: 'lemon'},
      {symbol: 'O', reward: 30, icon: 'orange'},
      {symbol: 'W', reward: 40, icon: 'watermelon'}
    ];

    const rolledBlocks = reactive([
      {icon: 'arrow-down'},
      {icon: 'arrow-down'},
      {icon: 'arrow-down'},
    ]);

    /**
     * Transfer what the users have in their `credits` to their user account credits
     */
    const settlement = () => {
      const creditsValue = credits.value;
      credits.value = 0;
      user.credits += creditsValue;
    };

    /**
     * Start the game, decrease from the user's credits, and roll the blocks
     */
    const roll = () => {
      isSpinning.value = true;
      spinning.forEach((_, index) => (spinning[index] = true));
      rollBlocks();
      calculateResult();
    };

    /**
     * Get a random symbol for each block
     */
    const rollBlocks = () => {
      rolledBlocks.forEach((_, index) => {
        const randomIndex = Math.floor(Math.random() * blocks.length);
        rolledBlocks[index] = blocks[randomIndex];
      });
    };

    /**
     * Check if all blocks match, needs to roll again?, and increase the credits if the blocks match
     */
    const calculateResult = () => {
      const allBlocksMatch =
        rolledBlocks[0].symbol === rolledBlocks[1].symbol &&
        rolledBlocks[1].symbol === rolledBlocks[2].symbol;

      if (allBlocksMatch) {
        if (credits.value < tinyCredits || rollAgainChance() === false) {
          credits.value += rolledBlocks[0].reward;
          showResult();
        } else {
          roll();
        }
      } else {
        credits.value--;
        showResult();
      }
    };

    /**
     * Check if it needs to roll again by chance
     * @returns {boolean}
     */
    const rollAgainChance = () => {
      let rollAgain = false;
      if (credits.value >= tinyCredits && credits.value <= mediumCredits) {
        rollAgain = Math.random() <= tinyReRollChance;
      } else if (credits.value > mediumCredits) {
        rollAgain = Math.random() <= largeReRollChance;
      }

      return rollAgain;
    };

    /**
     * Show the last result in the blocks
     */
    const showResult = () => {
      // Show 1st block after 1 second
      setTimeout(() => {
        spinning[0] = false;
      }, 1000);

      // Show 2nd block after 2 seconds
      setTimeout(() => {
        spinning[1] = false;
      }, 2000);

      // Show 3rd block after 3 seconds
      setTimeout(() => {
        spinning[2] = false;
        isSpinning.value = false;
      }, 3000);
    };

    return {
      tinyReRollChance,
      largeReRollChance,
      tinyCredits,
      mediumCredits,
      credits,
      user,
      spinning,
      isSpinning,
      blocks,
      rolledBlocks,
      settlement,
      roll,
      showResult
    };
  }
};

</script>

<style scoped>
.slot-machine {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
}
</style>
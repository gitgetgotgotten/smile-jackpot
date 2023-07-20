import {describe, test, expect} from 'vitest';
import {mount} from '@vue/test-utils';
import SlotMachine from '/src/components/SlotMachine.vue';
import SlotBlock from '/src/components/SlotBlock.vue';
import CashOutButton from '/src/components/CashOutButton.vue';

describe('SlotMachine', () => {
  // To be used inside some test()s
  const wrapper = mount(SlotMachine);

  test('should load <SlotMachine>', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('should have 3 <SlotBlock>s', () => {
    const slotBlocks = wrapper.findAllComponents(SlotBlock);
    expect(slotBlocks.length).toBe(3);
  });

  test('should have 1 <CashOutButton>', () => {
    const cashOutButton = wrapper.findAllComponents(CashOutButton);
    expect(cashOutButton.length).toBe(1);
  });

  test('should have a roll button', () => {
    const rollButton = wrapper.find('button#roll-button');
    expect(rollButton.exists()).toBe(true);
    expect(rollButton.element.id).toBe('roll-button');
  });

  test('should have correct data', () => {
    expect(wrapper.vm.tinyReRollChance).toBe(0.3);
    expect(wrapper.vm.largeReRollChance).toBe(0.6);
    expect(wrapper.vm.tinyCredits).toBe(40);
    expect(wrapper.vm.mediumCredits).toBe(60);
    expect(wrapper.vm.credits).toEqual(10);
    expect(wrapper.vm.user).toEqual({credits: 0});
    expect(wrapper.vm.spinning).toEqual([false, false, false]);
    expect(wrapper.vm.isSpinning).toBe(false);
    expect(wrapper.vm.blocks).toEqual([
      {symbol: 'C', reward: 10, icon: 'cherry'},
      {symbol: 'L', reward: 20, icon: 'lemon'},
      {symbol: 'O', reward: 30, icon: 'orange'},
      {symbol: 'W', reward: 40, icon: 'watermelon'},
    ]);
    expect(wrapper.vm.rolledBlocks).toEqual([
      {icon: 'arrow-down'},
      {icon: 'arrow-down'},
      {icon: 'arrow-down'},
    ]);
  });

  test('should transfer `credits` to user\'s credits', () => {
    const wrapper = mount(SlotMachine);
    wrapper.vm.user.credits = 100;
    wrapper.vm.settlement();
    expect(wrapper.vm.user.credits).toBe(110);
  });

  test('should change spinning states and have valid rolledBlocks after running roll()', () => {
    const wrapper = mount(SlotMachine);
    const tempRolledBlocks = wrapper.vm.rolledBlocks;

    // Spinning changed to true
    wrapper.vm.roll();
    expect(wrapper.vm.isSpinning).toBe(true);
    expect(wrapper.vm.spinning).toEqual([true, true, true]);

    // Blocks exist in blocks and are valid
    const exists = wrapper.vm.rolledBlocks.some((obj, index) => {
      const tempRolledBlock = tempRolledBlocks[index];
      return obj.symbol === tempRolledBlock.symbol &&
        obj.reward === tempRolledBlock.reward &&
        obj.icon === tempRolledBlock.icon;
    });
    expect(exists).toBe(true);
  });

  test('should increase credits depending on the symbol reward when the symbols match and user has less than 40 credits', () => {
    const wrapper = mount(SlotMachine);
    const tempCredits = wrapper.vm.credits;
    wrapper.vm.roll();

    const rolledBlocks = wrapper.vm.rolledBlocks;
    if (
      rolledBlocks[0].symbol === rolledBlocks[1].symbol &&
      rolledBlocks[1].symbol === rolledBlocks[2].symbol
    ) {
      if (wrapper.vm.credits < wrapper.vm.credits.tinyCredits) {
        expect(wrapper.vm.credits).toBe(tempCredits + rolledBlocks[0].reward);
      }
    }
  });

  test('should decrement 1 unit from credits when the symbols don\'t match', () => {
    const wrapper = mount(SlotMachine);
    const tempCredits = wrapper.vm.credits;
    wrapper.vm.roll();

    const rolledBlocks = wrapper.vm.rolledBlocks;
    if (
      rolledBlocks[0].symbol !== rolledBlocks[1].symbol ||
      rolledBlocks[1].symbol !== rolledBlocks[2].symbol
    ) {
      expect(wrapper.vm.credits).toBe(tempCredits - 1);
    }
  });
});
<template>
  <div class="input-field select">
    <select v-model="optionValue">
      <option v-for="(option, key) in options" :key="key" :value="option">
        {{ option }}
      </option>
    </select>
    <label>{{ label }}</label>
  </div>
</template>

<script>
import { watch, ref } from "@vue/runtime-core";

export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const optionValue = ref(props.options[0]);

    watch(
      () => optionValue.value,
      (newValue) => {
        emit("update:modelValue", newValue);
      }
    );

    return { optionValue };
  },
};
</script>

<style lang="scss" scoped>
.select {
    width: 100%;
}
</style>
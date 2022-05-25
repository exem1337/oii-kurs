<template>
  <div class="flex">
    <p class="range-field">
      <label for="test5">{{ label }}</label>
      <input type="range" id="test5" :min="min" :max="max" v-model="value" />
    </p>
    <p>{{ value }}</p>
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
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
  },
  setup(props, { emit }) {
    const value = ref(0);

    watch(
      () => value.value,
      (newValue) => {
        emit("update:modelValue", newValue);
      }
    );

    return { value };
  },
};
</script>

<style lang="scss" scoped>
.flex {
    display: flex;
}
</style>
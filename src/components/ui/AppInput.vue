<template>
  <div class="input-field text">
    <input
      :placeholder="placeholder"
      id="first_name"
      type="text"
      class="validate"
      v-model="value"
    />
    <label for="first_name">{{ label }}</label>
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
    placeholder: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const value = ref("");

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
.text {
    width: 100%;
}
</style>
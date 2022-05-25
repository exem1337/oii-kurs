<template>
  <div class="switch">
    <label>
      {{ off }}
      <input type="checkbox" v-model="value" />
      <span class="lever"></span>
      {{ on }}
    </label>
  </div>
</template>

<script>
import { watch, ref } from "@vue/runtime-core";
export default {
  props: {
    on: {
      type: String,
      required: true,
    },
    off: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const value = ref(false);

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
.switch {
    margin: 10px;
}
</style>
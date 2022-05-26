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
import { watch, ref, onMounted } from "@vue/runtime-core";
import M from "materialize-css";

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
    value: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const optionValue = ref(props.value);

    watch(
      () => optionValue.value,
      (newValue) => {
        emit("update:modelValue", newValue);
      }
    );

    onMounted(() => {
      console.log(props.value)
      M.AutoInit();
      emit("update:modelValue", props.value);
    })

    return { optionValue };
  },
};
</script>

<style lang="scss" scoped>
.select {
    width: 100%;
}
</style>
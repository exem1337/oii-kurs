<template>
  <a class="waves-effect waves-light btn">{{ label }}</a>
</template>

<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {}
  },
});
</script>

<style lang="scss" scoped>
.btn {
  float: right;
  margin-right: 15px;
}
</style>

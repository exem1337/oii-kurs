<template>
  <div class="page">
    <app-header />
    <app-form />
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import M from "materialize-css";
import { onMounted } from "@vue/runtime-core";
import AppHeader from './components/AppHeader.vue';
import AppForm from './components/AppForm.vue';
export default {
  name: "App",
  components: {
    AppHeader,
    AppForm
  },
  setup() {
    onMounted(() => {
      M.AutoInit();
    });
    const sas = ref("");
    const sus = ref("");
    const sqs = ref(false);
    const range = ref(0);
    return { sus, sas, sqs, range };
  },
};
</script>

<style lang="scss">
#app {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>

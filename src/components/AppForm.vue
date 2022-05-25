<template>
  <div class="form">
    <div class="flex">
      <div class="card horizontal">
        <app-input label="ФИО" placeholder="ФИО" v-model="form.name" />
        <app-switch on="Мужской" off="Женский" v-model="form.sex" />
        <app-range label="Возраст" v-model="form.age" />
      </div>
      <div class="card horizontal switches">
        <app-switch
          on="Обеспечен кредит"
          off="Не обеспечен кредит"
          v-model="form.creditGuearanteed"
        />
        <app-switch
          on="Есть недвижимость"
          off="Нет недвижимости"
          v-model="form.hasHome"
        />
        <app-switch
          on="Есть банковский счет"
          off="Нет банковского счета"
          v-model="form.hasBankAccount"
        />
        <app-switch
          on="Есть страховка"
          off="Нет страховки"
          v-model="form.insurance"
        />
      </div>
      <div class="card horizontal switches">
        <app-range
          label="Срок работы на данном направлении"
          v-model="form.workPath"
        />
        <app-range
          label="Срок работы на данном предприятии"
          v-model="form.workPlace"
        />
				<app-range
          label="Срок проживания на данной местности"
          v-model="form.livingInThisArea"
        />
        <app-range
          label="Срок ссуды (мес)"
          v-model="form.insuranceAge"
          :min="0"
          :max="24"
        />
        <app-select
          label="Основание направления расходов"
          :options="moneyPaths"
          v-model="form.moneyPaths"
        />
      </div>
    </div>

    <app-button label="Рассчитать" @click="onDecision" />
  </div>
</template>

<script>
import { ref } from "@vue/runtime-core";
import AppSwitch from "./ui/AppSwitch.vue";
import AppRange from "./ui/AppRange.vue";
import AppSelect from "./ui/AppSelect.vue";
import decide from "../scripts/system";
import AppInput from "./ui/AppInput.vue";
import AppButton from "./ui/AppButton.vue";

export default {
  components: {
    AppSwitch,
    AppRange,
    AppSelect,
    AppInput,
    AppButton,
  },
  setup() {
    const form = ref({
      creditGuearanteed: false,
      livingInThisArea: 0,
      age: 0,
      hasHome: false,
      hasBankAccount: false,
      workPath: 0,
      workPlace: 0,
      sex: false,
      insurance: false,
      insuranceAge: 0,
      moneyPaths: "",
      name: "",
    });

    const moneyPaths = [
      "Выплаты по исполнительным документам",
      "Выплаты по кредитам/займам",
      "Затраты на образование",
      "Иное",
      "Мобильная связь/интернет",
      "Одежда, продукты питания",
      "Оплата услуг (мед, юрид, и т.п)",
      "Покупка и ремонт недвижимости",
      "Покупка товаров длительного пользования",
      "Помощь родственникам",
      "Содержание/аренда недвижимости",
      "Турпоездки, развлечения",
    ];

    const onDecision = () => {
      M.toast({
        html: decide(form.value)
          ? "Вам выдан кредит"
          : "Вам отказано в выдаче кредита",
      });
    };

    // watch(
    //   () => form.value.livingInThisArea,
    //   (newValue) => {
    //     console.log(newValue);
    //   }
    // );

    return { form, moneyPaths, onDecision };
  },
};
</script>

<style lang="scss" scoped>
.form {
  margin: 0 auto;
  max-width: 1500px;
}

.flex {
  display: flex;
  justify-content: space-around;
}

.card {
  padding: 15px;
  display: flex;
  flex-direction: column;
  height: fit-content;
  align-items: center;
  justify-content: center;
	margin: 15px;
	width: 500px;
}
</style>
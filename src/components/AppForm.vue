<template>
  <div class="form">
    <div class="flex">
      <div class="card horizontal">
        <p>Добавление критерия</p>
        <app-input
          label="Название критерия"
          placeholder="Название критерия"
          v-model="newCriteria.name"
        />
        <div
          class="criteria-state"
          v-for="(state, key) in newCriteria.states"
          :key="key"
        >
          <div class="flex">
            <p>{{ state }}</p>
            <button>Удалить</button>
          </div>
        </div>
        <app-input
          label="Название термы"
          placeholder="Название термы"
          v-model="newTerm"
        />
        <div class="flex">
          <app-button label="Добавить терму" @click="onAddNewTerm" />
          <app-button label="Добавить критерий" @click="onAddNewCriteria" />
        </div>
      </div>
      <div class="card horizontal">
        <div class="criteria" v-for="(crit, key) in form" :key="key">
          <app-select
            :label="crit.name"
            :options="crit.states"
            v-model="crit.value"
            :value="crit.states[0]"
          />
        </div>
      </div>
      <!-- <div class="card horizontal">
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
      </div> -->
    </div>

    <app-button label="Рассчитать" @click="onDecision" />

    <div class="card horizontal new-rule">
      <p>Добавить новое правило</p>
      ЕСЛИ
      <div v-for="(criteria, key) in newRuleCriterias" :key="key">
        <span v-if="key != 0">И</span>
        <app-select
          :label="criteria.name"
          :options="criteria.states"
          v-model="newRuleCriterias[key].value"
          :value="criteria.states[0]"
        />
      </div>
      ТО
      <app-select
        label="Результат"
        :options="[`Выдать кредит`, `Не давать кредит`]"
        v-model="newRuleResultOptions"
        :value="`Выдать кредит`"
      />
      <app-button label="Добавить правило" @click="onAddNewRule" />
    </div>

    <div class="card horizontal">
      <p>Редактирование базы правил</p>
      <div class="rule" v-for="(rule, key) in rules" :key="key">
        ЕСЛИ
        <div v-for="(criteria, key) in rule.criterias" :key="key">
          <span v-if="key != 0">И</span>
          <app-select
            :label="criteria.name"
            :options="criteria.states"
            v-model="criteria.value"
            :value="criteria.value"
          />
        </div>
        ТО
        <app-select
          label="Результат"
          :options="[`Выдать кредит`, `Не давать кредит`]"
          v-model="rule.result"
          :value="rule.result"
        />{{rule}}
      </div>
    </div>
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
import { useStore } from "vuex";
import M from "materialize-css";
export default {
  components: {
    AppSwitch,
    AppRange,
    AppSelect,
    AppInput,
    AppButton,
  },
  setup() {
    // const form = ref({
    //   creditGuearanteed: false,
    //   livingInThisArea: 0,
    //   age: 0,
    //   hasHome: false,
    //   hasBankAccount: false,
    //   workPath: 0,
    //   workPlace: 0,
    //   sex: false,
    //   insurance: false,
    //   insuranceAge: 0,
    //   moneyPaths: "",
    //   name: "",
    // });

    const store = useStore();

    const form = ref([]);

    const newCriteria = ref({
      name: "",
      states: [],
      value: ''
    });

    const newRule = ref({
      criterias: newRuleCriterias,
      result: "",
    });

    const newRuleResultOptions = ["Выдать кредит", "Не давать кредит"];
    const rules = ref([]);
    const newRuleCriterias = ref([]);
    const newRuleCriteriasValues = ref([])
    const newTerm = ref("");
    const newRuleResult = ref('');

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
      // M.toast({
      //   html: decide(form.value)
      //     ? "Вам выдан кредит"
      //     : "Вам отказано в выдаче кредита",
      // });
      console.log(form.value);
    };

    const onAddNewCriteria = () => {
      form.value.push({
        ...newCriteria.value,
        // value: "",
      });
      M.AutoInit();
      newRuleCriterias.value.push({
        ...newCriteria.value,
        // value: "",
      });
    };

    const onAddNewRule = () => {
      console.log(newRuleCriterias.value)
      rules.value.push({
        criterias: newRuleCriterias.value,
        result: newRuleResult.value,
      });
      // console.log(rules.value);
    };

    const onAddNewTerm = () => {
      newCriteria.value.states.push(newTerm.value);
    };

    // watch(
    //   () => form.value.livingInThisArea,
    //   (newValue) => {
    //     console.log(newValue);
    //   }
    // );

    return {
      form,
      moneyPaths,
      onDecision,
      newCriteria,
      newTerm,
      onAddNewTerm,
      onAddNewCriteria,
      rules,
      newRuleCriterias,
      newRule,
      newRuleResultOptions,
      onAddNewRule,
      newRuleCriteriasValues,
      newRuleResult
    };
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

.new-rule {
  display: flex;
}
</style>
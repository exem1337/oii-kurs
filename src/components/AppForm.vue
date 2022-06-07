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
            <app-button label="Удалить" />
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
        <h5 v-if="!form.length">Для начала работы, добавьте критерий</h5>
        <div class="criteria" v-for="(crit, key) in form" :key="key">
          <app-select
            :label="crit.name"
            :options="crit.states"
            v-model="crit.value"
            :value="crit.states[0]"
          />
        </div>
      </div>
    </div>

    <app-button label="Рассчитать" @click="onDecision" />

    <div class="card horizontal ruleCard">
      <p>Редактирование базы правил</p>
      <div class="rule" v-for="(rule, key) in rules" :key="key">
        ЕСЛИ
        <div
          class="ruleItem"
          v-for="(criteria, key) in rule.criterias"
          :key="key"
        >
          <span v-if="key != 0">И</span>
          <app-select
            :label="criteria.name"
            :options="criteria.states"
            v-model="criteria.value"
            :value="criteria.value"
          />
        </div>
        <span class="to">ТО</span>
        <app-select
          label="Результат"
          :options="[`Выдать кредит`, `Не давать кредит`]"
          v-model="rule.result"
          :value="rule.result"
        />
      </div>
    </div>
    <teleport to="#app">
      <div class="modall">
        <div class="modal-inner">
          <p>Ваш результат: Выдать кредит</p>
        </div>
      </div>
    </teleport>
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
      value: "",
    });

    const newRule = ref({
      criterias: newRuleCriterias,
      result: "",
    });

    const newRuleResultOptions = ["Выдать кредит", "Не давать кредит"];
    const rules = ref([]);
    const newRuleCriterias = ref([]);
    const newRuleCriteriasValues = ref([]);
    const newTerm = ref("");
    const newRuleResult = ref("");

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
      console.log(rules.value);
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
      newCriteria.value = {
        name: "",
        states: [],
        value: "",
      };
    };

    const onAddNewRule = () => {
      console.log(newRuleCriterias.value);
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
      newRuleResult,
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
  align-items: top;

  p {
    margin-right: 15px;
  }
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

.rule {
  display: flex;
  align-items: center;

  .ruleItem {
    margin: 15px;
    display: flex;
    align-items: center;

    span {
      margin-right: 15px;
    }
  }
}

.ruleCard {
  width: fit-content;
}

.to {
  margin-right: 15px;
}

.modall {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
  width: 100%;
  height: 100%;
  z-index: 20;
}

.modall .modal-inner {
  width: 500px;
  height: 200px;
  background-color: #fff;
  border-radius: 6px;

  box-shadow: -3px 5px 25px 0px rgba(34, 60, 80, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 2rem;
}
</style>
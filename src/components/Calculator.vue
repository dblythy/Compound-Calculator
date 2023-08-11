<template>
  <div class="fullscreen">
    <TextInput
      v-model.number="deposit"
      prefix="$"
      label="Start deposit amount"
      type="number"
    />

    <TextInput
      v-model.number="interest"
      suffix="%"
      label="Interest Rate"
      type="number"
      :step="0.01"
    />

    <div class="row">
      <TextInput
        v-model.number="term"
        label="Investment term"
        type="number"
        :step="1"
      />
      <SelectInput
        v-model="termPeriod"
        label="Investment Period"
        :options="['months', 'years']"
      />
    </div>

    <SelectInput
      v-model="interestPeriod"
      label="Interest Period"
      :options="['Monthly', 'Quarterly', 'Annually', 'At Maturity']"
    />
    {{ balance.result }}
    <div v-if="balance?.error">
      {{ balance.error }}
    </div>
    <template v-if="balance?.result">
      <div class="row result">
        Final Balance {{ formatCurrency(balance.result) }}
      </div>
      <div class="row result">
        Total Interest Earned {{ formatCurrency(balance.result - deposit) }}
      </div>
    </template>
  </div>
</template>

<script>
import TextInput from './TextInput.vue';
import SelectInput from './SelectInput.vue';
export default {
  name: 'Calculator',
  components: {
    TextInput,
    SelectInput,
  },
  data() {
    return {
      deposit: 10000,
      interest: 1.1,
      term: 3,
      termPeriod: 'months',
      interestPeriod: 'Monthly',
      formatCurrency: new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: 'AUD',
      }).format,
    };
  },
  computed: {
    balance() {
      try {
        if (!this.interest || !this.deposit || !this.term) {
          return {};
        }
        const rate = this.interest / 100;
        const totalMonths =
          this.termPeriod === 'years' ? this.term * 12 : this.term;
        let result = this.deposit;
        const totalDays = {
          Annually: 1,
          Quarterly: 4,
          Monthly: 12,
          'At Maturity': 12 / totalMonths,
        };
        const minimumMonths = {
          Annually: 12,
          Quarterly: 3,
          Monthly: 1,
          'At Maturity': 0,
        };
        if (totalMonths < minimumMonths[this.interestPeriod]) {
          throw `${this.interestPeriod} must have a minimum of ${
            minimumMonths[this.interestPeriod]
          } months`;
        }
        for (let i = 0; i < totalMonths; i++) {
          if (this.interestPeriod === 'Annually' && i % 12 !== 0) {
            continue;
          }
          if (this.interestPeriod === 'Quarterly' && i % 3 !== 0) {
            continue;
          }
          if (this.interestPeriod === 'At Maturity' && i + 1 !== totalMonths) {
            continue;
          }
          const interestEarned =
            (result * rate) / totalDays[this.interestPeriod];
          result += interestEarned;
        }
        return { result };
      } catch (error) {
        return { error };
      }
    },
  },
};
</script>

<style>
.fullscreen {
  height: 100vh;
  width: 100vh;
}
.row {
  display: flex;
}
.result {
  font-size: 20px;
  margin-top: 20px;
}
</style>

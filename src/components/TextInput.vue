<template>
  <div class="text-input">
    <label :for="label">{{label}}</label>
    <span v-if="prefix" class="prefix">{{prefix}}</span>
    <input :name="label" :type="type" v-model="_value" :step="step" />
    <span v-if="suffix" class="suffix">{{suffix}}</span>
  </div>
</template>

<script>
export default {
  props: {
    prefix: String,
    modelValue: [String, Number],
    label: String,
    type: String,
    suffix: String,
    step: Number,
  },
  emits: ['update:modelValue'],
computed: {
  _value: {
    get () { return this.modelValue },
    set (value) { this.$emit('update:modelValue', value) },
  },
},
}
</script>

<style>
.text-input {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
  .text-input input {
    font-size: 14px;
    background: #fff;
    border: none;
    outline: none;
    padding: 0.5rem;
  }
.text-input:focus-within {
  border-color: #777;
}
.text-input label {
  width: 100%;
  text-align: left;
}
</style>
<template>
  <div class="select-input">
    <label :for="label">{{ label }}</label>
    <select :name="label" v-model="_value">
      <option v-for="option of options" :value="option" :key="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'SelectInput',
  props: {
    label: String,
    modelValue: String,
    options: Array,
  },
  emits: ['update:modelValue'],
  computed: {
    _value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
};
</script>

<style>
.select-input {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.select-input label {
  width: 100%;
  text-align: left;
}
.select-input select {
  font-size: 14px;
  background: #fff;
  border: none;
  outline: none;
  padding: 0.5rem;
}
</style>

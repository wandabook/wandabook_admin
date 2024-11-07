<script setup lang="ts">
  import type { PropType } from 'vue';
  const props = defineProps({
    label: String,
    type: String,
    placeholder: String,
    customClasses: String,
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: [String, Number] as PropType <string | number>,
    },
    max: Number
  }
  );
  const emit = defineEmits(['update:modelValue'])
  const updateValue = (event: Event) => {
    emit("update:modelValue", (event.target as HTMLInputElement).value);
  };
</script>

<template>
  <div :class="customClasses">
    <label class="mb-2.5 block text-black dark:text-white" v-if="label">
      {{ label }}
      <span v-if="required" class="text-meta-1">*</span>
    </label>
    <template v-if="props.type=='textarea'">
      <textarea :placeholder="placeholder ?? ''" :disabled="disabled" :value="modelValue" @input="updateValue" :required="required" :maxlength="max" 
      class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-1.5 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-slate-50 dark:disabled:bg-black  dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
    </template>
    <template v-else>
      <input :type="props.type" :placeholder="placeholder ?? ''" :disabled="disabled" :value="modelValue" @input="updateValue" :required="required" :maxlength="max" 
      class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-1.5 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-slate-50 dark:disabled:bg-black  dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
    </template>

    </div>
</template>
<style scoped></style>

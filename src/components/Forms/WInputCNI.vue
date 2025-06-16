<template>
    <div>
        <label class="block mb-2 text-sm font-bold" for="cni">
            {{ label || t('form.cni') }}
        </label>

        <input id="cni" type="text" :value="modelValue" @input="onInput" :required="required"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 uppercase"
            :placeholder="t('form.cni_placeholder')" autocomplete="off" />

        <p v-if="modelValue && !isValidCNI(modelValue)" class="text-red-500 text-sm mt-1">
            {{ t('form.cni_invalid') }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineProps<{
    modelValue: string
    label?: string,
    required: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const { t } = useI18n()

const isValidCNI = (value: string): boolean => {
    return /^[A-Z]?\d{8,11}$/.test(value.toUpperCase())
}

const onInput = (e: Event) => {
    const val = (e.target as HTMLInputElement).value.toUpperCase()
    emit('update:modelValue', val)
}
</script>

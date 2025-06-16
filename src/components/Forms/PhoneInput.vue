<template>
    <div class="relative">
        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm select-none">
            +237
        </span>
        <input type="tel"
            class="pl-14 pr-3 py-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="6XXXXXXXX" maxlength="9" :value="modelValue?.replace('+237', '')" @input="onInput"
            :required="required" />
    </div>
</template>

<script setup lang="ts">
// Props
defineProps<{
    modelValue: string,
    required: boolean
}>()

// Emits
const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()

const onInput = (event: Event) => {
    const raw = (event.target as HTMLInputElement).value.replace(/\D/g, '') // chiffres uniquement
    if (raw.length <= 9) {
        emit('update:modelValue', raw ? `+237${raw}` : '')
    }
}
</script>

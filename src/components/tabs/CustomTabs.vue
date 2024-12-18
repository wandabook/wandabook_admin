<template>
    <div class="flex flex-wrap">
        <div class="w-full">
            <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row cursor-pointer">
                <li v-for="(tab, index) in tabs" :key="index" class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                    <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                        @click="selectTab(index + 1)" :class="{
                            'text-blue-600 bg-white': openTab !== index + 1,
                            'text-white bg-blue-600': openTab === index + 1
                        }">
                        {{ tab.name }}
                    </a>
                </li>
            </ul>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    tabs: {
        type: Array<any>,
        required: true,
        default: () => []
    }
});
const emit = defineEmits(['tab-selected'])
const openTab = ref(1);
const selectTab = (tabIndex: any) => {
    openTab.value = tabIndex;
    emit("tab-selected", tabIndex); // Emit an event when a tab is selected
}
</script>

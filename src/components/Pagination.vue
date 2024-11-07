<script setup lang="ts">
import { onBeforeMount, onMounted, ref, computed } from 'vue';

const props = defineProps({
    totalPage: {
        type: Number,
        required: true
    },
    totalElement: {
        type: Number,
        required: true
    },
    pageSize: {
        type: Number,
        required: true
    }
});
const currentPage = ref(1);
const toElement = computed(() => {
    return props.pageSize * currentPage.value
});
const showingElement = computed(() => {
    return props.totalElement - props.pageSize + 1
})
</script>
<template>
    <div class="flex items-center justify-between border-t border-slate-200 bg-white dark:bg-boxdark px-4 py-3 sm:px-6">
        <div class="flex flex-1 justify-between sm:hidden">
            <a href="#"
                class="relative inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50">Previous
            </a>
            <a href="#"
                class="relative ml-3 inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50">Next
            </a>
        </div>
        <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
                <p class="text-sm text-slate-700">
                    Showing
                    <span class="font-medium">{{ showingElement }}</span>
                    to
                    <span class="font-medium">{{ toElement }}</span>
                    of
                    <span class="font-medium">{{ totalElement }}</span>
                    results
                </p>
            </div>
            <div>


                

                <nav aria-label="Page navigation example" class="isolate inline-flex -space-x-px rounded-md shadow-sm">
                    <ul class="inline-flex -space-x-px text-base h-10">
                        <li>
                            <a href="#" class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-slate-500 bg-white border border-e-0 border-slate-300 rounded-s-lg hover:bg-slate-100 hover:text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white">Previous</a>
                        </li>
                        <li>
                            <a href="#" class="flex items-center justify-center px-4 h-10 leading-tight text-slate-500 bg-white border border-slate-300 hover:bg-slate-100 hover:text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white">1</a>
                        </li>
                        <li>
                            <a href="#" class="flex items-center justify-center px-4 h-10 leading-tight text-slate-500 bg-white border border-slate-300 hover:bg-slate-100 hover:text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white">2</a>
                        </li>
                        <li>
                            <a href="#" aria-current="page" class="flex items-center justify-center px-4 h-10 text-black border border-slate-300 bg-slate-200 hover:bg-blue-100 dark:border-slate-700 dark:bg-slate-700 dark:text-white">3</a>
                        </li>
                        <li>
                            <a href="#" class="flex items-center justify-center px-4 h-10 leading-tight text-slate-500 bg-white border border-slate-300 hover:bg-slate-100 hover:text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white">4</a>
                        </li>
                        <li>
                            <a href="#" class="flex items-center justify-center px-4 h-10 leading-tight text-slate-500 bg-white border border-slate-300 hover:bg-slate-100 hover:text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white">5</a>
                        </li>
                        <li>
                            <a href="#" class="flex items-center justify-center px-4 h-10 leading-tight text-slate-500 bg-white border border-slate-300 rounded-e-lg hover:bg-slate-100 hover:text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white">Next</a>
                        </li>
                    </ul>
                </nav>




            </div>
        </div>
    </div>
</template>

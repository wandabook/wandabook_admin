<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useRestaurantStore } from '@/stores/config'

  const subTotal = ref(61.96);
  const tax = ref(1.75);
  const restaurantStore = useRestaurantStore();
  const totalAmount = computed(() => {
      return subTotal.value + tax.value;
  });
</script>
<template>
    <div class="bg-slate-100 p-4 rounded-lg shadow-md"> 
      <div class="flex justify-between mb-2">
        <span class="text-slate-600">Total dishes</span>
        <span class="font-medium">{{ restaurantStore.currentOrderSummary.totalItems }}</span>
      </div>
      <div class="border-t border-dashed border-slate-400"></div> 
      <div class="flex justify-between mt-4">
        <span class="font-bold">Total Amount</span>
        <span class="font-bold">${{ restaurantStore.currentOrder?.totalPrice.toFixed(2) }}</span> 
      </div>
    </div>
</template>
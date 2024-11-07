import { defineStore } from 'pinia';
import type DisheDTO from '@/types/DisheDTO';
import type OrderDTO from '@/types/OrderDTO';
import type OrderDTODish from '@/types/OrderDTO';

export const useRestaurantStore = defineStore('restaurant', {
  state: () => ({
    orders: [] as OrderDTO[],
    currentOrder: null as OrderDTO | null, 
  }),
  actions: {
    createOrder(tableID: number) {
      const newOrder: OrderDTO = {
        orderCode: generateCode(tableID), // Fonction pour générer un ID unique
        dishes: [],
        totalPrice: 0,
        tableID,
        state: 'EDITING',
      };
      this.currentOrder = newOrder;
    },
    placeOrder() {
      if(this.currentOrder){
        this.currentOrder.state = 'IN KITCHEN';
        this.orders.push(this.currentOrder);
        this.currentOrder = null;
      }
    },
    addDishToOrder(_dish: DisheDTO) {
      this.$patch((state) => {
        if (state.currentOrder) {
          const currentDish = state.currentOrder.dishes.find(item => item.dishe.code === _dish.code);
          if (currentDish) {
            const index = state.currentOrder.dishes.findIndex(item => item.dishe.code === currentDish.dishe.code);
            currentDish.totalNumber++;
            state.currentOrder.dishes[index] = currentDish;
            console.log('zaza')
            state.currentOrder.totalPrice = computeTotalPrice(state.currentOrder);
          } else {
            state.currentOrder.dishes.push({
              dishe: _dish,
              totalNumber: 1,
            });
            // const orderTotalPrice = roundUpToTwoDecimals(state.currentOrder.totalPrice) + roundUpToTwoDecimals(_dish.price);
            state.currentOrder.totalPrice = computeTotalPrice(state.currentOrder);
          }
        }
      });
    },
    addDishToOrderWithCode(dishId: string) {
      this.$patch((state) => {
        if (state.currentOrder) {
          const dishToAdd = state.currentOrder.dishes.find(item => item.dishe.code === dishId);
          if (dishToAdd) {
            const index = state.currentOrder.dishes.findIndex(item => item.dishe.code === dishToAdd.dishe.code);
            dishToAdd.totalNumber++;
            state.currentOrder.dishes[index] = dishToAdd;
            state.currentOrder.totalPrice = computeTotalPrice(state.currentOrder);
          }
        }
        // console.log('removeDishFromOrder', state.currentOrder)
      });
    },
    removeDishFromOrder(dishId: string) {
      this.$patch((state) => {
        if (state.currentOrder) {
          const dishToRemove = state.currentOrder.dishes.find(item => item.dishe.code === dishId);
          if (dishToRemove) {
            const index = state.currentOrder.dishes.findIndex(item => item.dishe.code === dishToRemove.dishe.code);
            if(dishToRemove.totalNumber == 1){
              state.currentOrder.dishes.splice(index, 1);
              state.currentOrder.totalPrice = computeTotalPrice(state.currentOrder);
            }else {
              dishToRemove.totalNumber--;
              state.currentOrder.dishes[index] = dishToRemove;
              state.currentOrder.totalPrice = computeTotalPrice(state.currentOrder);
            }
          }
        }
        // console.log('removeDishFromOrder', state.currentOrder)
      });
    },
    sendOrderToKitchen(orderCode: string) {
      const order = this.orders.find(o => o.orderCode === orderCode);
      if (order) {
        order.state = 'IN KITCHEN';
      }
    },
  },
  getters: {
    getOrdersByTable: (state) => {
      return state.orders;
    },
    currentOrderSummary(state) { 
      let totalItems = 0;

      if (state.currentOrder) {
        totalItems = 0;
        state.currentOrder.dishes.forEach(item => {
          totalItems += item.totalNumber
        });
      }

      return {totalItems};
    },
    getTotalPrice: (state) => {
      if(state.currentOrder){
        computeTotalPrice(state.currentOrder)
      }
    }
  }
});

const generateCode = (tableNumber:number) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Mois commence à 0
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  return `T${tableNumber}_${year}${month}${day}_${hours}${minutes}${seconds}`;
}

const computeTotalPrice = (order: OrderDTO) => {
  let totalPrice: number = 0;
  order.dishes.forEach(item => {
    totalPrice += item.totalNumber * item.dishe.price;
  });
  return totalPrice;
}



<script setup lang="ts">
    import { defineAsyncComponent, onBeforeMount, ref } from 'vue'
    import ButtonAction from '@/components/Buttons/ButtonAction.vue';
    import TableOne from '@/components/Tables/TableOne.vue';
    import { fetchProduct } from '@/services/database';

    const pageTitle = 'Product';
    const SpinnerOverPage = defineAsyncComponent(() => import('@/components/Utilities/SpinnerOverPage.vue'));
    const NewMenuForm = defineAsyncComponent(() => import('@/views/MenuView/NewMenuForm.vue'));
    const titles = ref([
        {
            name: 'Image',
            label: 'image',
            type: 'image',
            event: "view",
        },
        {
            name: 'Title',
            label: 'Title',
            type: 'url',
            event: "view",
            filterable: true,
        },
        {
            name: 'Description',
            type: "text",
            label: 'Description',
        },
        {
            name: 'Category',
            type: "text",
            label: 'Category',
            filterable: true,
        },
        {
            name: 'AvailableQuantity',
            type: "text",
            label: 'Quantity',
            filterable: false,
        }
    ]);
    const filterOptions = ref([
        {
            name: 'All',
            api: '',
        },
        {
            name: 'Today',
            api: 'today',
        },
        {
            name: 'This week',
            api: 'thisweek',
        },
        {
            name: 'Last Week',
            api: 'lastweek',
        },

    ]);
    const isloading = ref(false);
    const products = ref([]);
    const rawProducts = ref([]);

    const fetProduct = async () => {
        isloading.value = true;
        try {
            const result = await fetchProduct();
            const productList = result.map((product: any) => {
                let img = "";
                product.content.forEach((ctn: any) =>{
                    if(ctn.typex.Code ==  "COVER"){
                        img = ctn.Body
                    }
                })
                return {
                    ...Object.fromEntries(Object.entries(product).filter(([key]) => key !== "content")),
                    Image: img,
                    AvailableQuantity: `${product.AvailableQuantity} ${product.QuantityUnitCode}`
                }
            });
            console.log("productList", productList);
            products.value = productList;
            rawProducts.value = result;
        } catch (er) {
            console.log('error', er);
        } finally {
            isloading.value = false
        }
    }
    const isViewing = ref(true)
    const selectedProduct = ref<any>();
    const viewProduct = (ts: any) => {
        isViewing.value = true;
        selectedProduct.value = rawProducts.value.filter((item:any) => item.Code == ts.Code)[0];
        console.log("selectedProduct", `/products/${selectedProduct.value.Code}/view`)
        window.location.href = `/products/${selectedProduct.value.Code}/view`
    }
    onBeforeMount(async () => {
        await fetProduct();
    });
    const cancel = () => {
        isViewing.value = true;

    }
    const handleAddMenu = (e:any) => {
        isViewing.value = false;

    }
</script>

<template>
    <div>
        <div class="flex flex-col gap-10" v-if="isViewing">
            <TableOne :items="titles" :datas="products" :options="filterOptions" @view="viewProduct" :filterable="true">
                <template v-slot:headerButton>
                    <button-action @click="handleAddMenu" custom-classes="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                        Add Menu
                    </button-action>
                </template>
            </TableOne>
        </div>
        <SpinnerOverPage v-if="isloading" />
        <template v-if="!isViewing">
            <new-menu-form @cancel="cancel" :action="'add'"></new-menu-form>
        </template>
    </div>
</template>

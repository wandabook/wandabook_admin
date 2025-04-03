<template>
    <div class="">
        <h1 class="text-xl font-semibold mb-4">{{ $t('catalogues') }}</h1>

        <div class="flex justify-end mb-4">
            <button @click="openCreateModal" class="bg-blue-500 text-white p-2 rounded">
                {{ $t('add_catalogue') }}
            </button>
        </div>

        <ag-grid-vue :columnDefs="columnDefs" :rowData="catalogues" :pagination="true" :domLayout="'autoHeight'"
            class="ag-theme-quartz" @row-clicked="onRowClicked" @cellClicked="onCellClicked"
            :autoSizeStrategy="autoSizeStrategy"></ag-grid-vue>

        <!-- Create/Edit Modal -->
        <div v-if="isModalOpen"
            class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-99 shadow-lg">
            <div class="bg-white p-6 rounded-lg md:w-1/3">
                <h2 class="text-xl mb-4" v-if="isEditing">{{ $t('edit_catalogue') }}</h2>
                <h2 class="text-xl mb-4" v-else>{{ $t('new_catalogue') }}</h2>
                <form @submit.prevent="saveBook">
                    <input v-model="formData.title" type="text" :placeholder="$t('title')"
                        class="border p-2 w-full mb-4" required />
                    <textarea v-model="formData.description" :placeholder="$t('descriptions')"
                        class="border p-2 w-full mb-4" required></textarea>
                    <input v-model="formData.image" type="text" :placeholder="$t('image_url')"
                        class="border p-2 w-full mb-4" required />
                    <input v-model="formData.url" type="text" :placeholder="$t('link')" class="border p-2 w-full mb-4"
                        required />
                    <select v-model="formData.status" class="border p-2 w-full mb-4" required>
                        <option value="active">{{ $t('active') }}</option>
                        <option value="inactive">{{ $t('inactive') }}</option>
                    </select>
                    <div class="flex justify-end space-x-5">
                        <button type="button" class="bg-red text-white p-2 rounded" @click="closeModal"
                            :disabled="isCreation">
                            {{ $t('cancel') }}
                        </button>
                        <button type="submit" class="bg-blue-500 text-white p-2 rounded" :disabled="isCreation">
                            <Spinner v-if="isCreation" />

                            <span v-if="isEditing">{{ $t('edit_catalogue') }}</span>
                            <span v-else>{{ $t('save_catalogue') }}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <confirmation-popup v-if="showPopup" :title="popupTitle" :message="popupMessage" :onConfirm="confirmAction"
        :onCancel="cancelAction" />
</template>

<script setup lang="ts">
import { AgGridVue } from "ag-grid-vue3";
import { defineComponent, ref } from 'vue';
import 'ag-grid-community/styles/ag-grid.css';
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { createDocumentGlobal, deleteDocumentGlobal, editDocumentGlobal, getDocumentsGlobal } from "../lib/appwrite";
import { catalogueCollection } from "../components/Utilities/constants";
import Spinner from "../components/Utilities/Spinner.vue";
import Actions from "./Actions.vue";
import ConfirmationPopup from "@/components/Alerts/ConfirmPopup.vue"
import { useI18n } from "vue-i18n";
const { t } = useI18n({ useScope: "global" });
defineComponent({
    components: { Actions, AgGridVue }
})
const autoSizeStrategy = {
    type: "fitGridWidth",
    defaultMinWidth: 100,
}
const isCreation = ref(false);
const isEditing = ref(false);
const catalogues = ref();
const selectDocument = ref('');
const showPopup = ref(false);
const popupTitle = ref("");
const popupMessage = ref("");
const fetchBooks = async () => {
    const result = await getDocumentsGlobal(catalogueCollection);
    if (result.documents != null && result.documents.length > 0) {
        catalogues.value = result.documents;
    } else {
        catalogues.value = [];
    }
    console.log(result);
}
const openCreateModal = () => {
    formData.value = { title: '', description: '', image: '', status: 'active', url: "", };
    isModalOpen.value = true;
    currentBookId.value = null;
};
const openEditModal = (bookId: string) => {
};
const onRowClicked = (e: any) => {

}
const saveBook = async () => {
    isCreation.value = true;
    if (isEditing.value) {
        editDocumentGlobal(catalogueCollection, selectDocument.value, formData.value);
    } else {
        await createDocumentGlobal(catalogueCollection, formData.value);
    }
    isCreation.value = false;
    isModalOpen.value = false;
    isEditing.value = false;
    fetchBooks();

};
const deleteBook = async (bookId: string) => {
    await deleteDocumentGlobal(catalogueCollection, bookId);
    fetchBooks();

}
const confirmAction = () => {
    deleteBook(selectDocument.value)
    showPopup.value = false;
};

const cancelAction = () => {
    showPopup.value = false;
};
const closeModal = () => {
    isModalOpen.value = false;
    formData.value = { title: '', description: '', image: '', status: 'active', url: "", };
}
const onCellClicked = (e: any) => {
    const action = e.event.srcElement.dataset.action;
    selectDocument.value = e.data.$id;
    if (action === 'edit') {
        onEditPricing(e.data);
    } else if (action === 'delete') {
        popupTitle.value = "Delete Patron";
        popupMessage.value = "Are you sure you want to delete this patron? This action cannot be undone.";
        showPopup.value = true;
    }
}
const onEditPricing = (e: any) => {
    formData.value = { title: e.title, description: e.description, image: e.image, status: e.status, url: e.url };
    isModalOpen.value = true;
    isEditing.value = true;
}
const onDeletePricing = (data: any) => {
    console.log('this is the data to', data);
}
const columnDefs = [
    { headerName: t("title"), field: "title", sortable: true },
    { headerName: t("description"), field: "description" },
    { headerName: t("image_url"), field: "image" },
    { headerName: t("link"), field: "url" },
    { headerName: t("status"), field: "status" },
    {
        field: "button",
        headerName: "Actions",
        cellRenderer: Actions,
        cellRendererParams: {
            'onEdit': onEditPricing,
            'onDelete': onDeletePricing
        },

    }
];
const formData = ref({
    title: '',
    description: '',
    image: '',
    url: "",
    status: 'active'
});
const isModalOpen = ref(false);
const currentBookId = ref(null);

fetchBooks();
</script>

<style scoped>
.container {
    max-width: 1200px;
    margin: 0 auto;
}
</style>

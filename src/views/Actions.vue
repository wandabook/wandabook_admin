<template>
    <div class="action-buttons">
        <button @click="onEdit" data-action="edit">Edit</button>
        <button @click="onDelete" data-action="delete">Delete</button>
    </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['cellButtonClicked', 'delete']);
const onEdit = () => {
    emit('cellButtonClicked', { edit: true });
};
const onDelete = () => {
    emit('delete')
};

</script>

<style>
.action-buttons {
    display: flex;
    gap: 10px;
    margin-top: 1px;
}

.action-buttons button {
    padding: 0px 10px;
    border: none;
    cursor: pointer;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 10%;
}

.action-buttons button:first-of-type {
    background-color: #007bff;
}

.action-buttons button:last-of-type {
    background-color: #dc3545;
}
</style>

<template>
    <div class="action-buttons">
        <button @click="onEdit">Edit</button>
        <button @click="onDelete">Delete</button>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps(
    {
        value: String, data: Object, onEditClicked: Function, onDeleteClicked: Function
    }
)
const onEdit = () => {
    //  props.onEditClicked(this.data);
};
const onDelete = () => {
    //   props.onDeleteClicked(props.data);
};

</script>

<style scoped>
.action-buttons {
    display: flex;
    gap: 10px;
}

button {
    padding: 5px 10px;
    border: none;
    cursor: pointer;
    color: white;
}

button:first-of-type {
    background-color: #007bff;
}

button:last-of-type {
    background-color: #dc3545;
}
</style>

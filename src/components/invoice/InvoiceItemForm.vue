<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  item: Object,
});

const emit = defineEmits(["update:item", "remove"]);

const updateItem = (field, value) => {
  emit("update:item", { ...props.item, [field]: value });
};

const removeItem = () => {
  emit("remove");
};
</script>

<template>
  <div class="item-form mb-3 border p-3 mt-3">
    <fieldset>
      <label class="form-label mt-4">Descripción</label>
      <input
        class="form-control"
        type="text"
        v-model="props.item.description"
        @input="updateItem('description', $event.target.value)"
        placeholder="Descripción"
      />
    </fieldset>
    <fieldset>
      <label class="form-label mt-4">Cantidad</label>
      <input
        class="form-control"
        type="number"
        v-model="props.item.quantity"
        @input="updateItem('quantity', $event.target.value)"
        placeholder="Cantidad"
      />
    </fieldset>
    <fieldset>
      <label class="form-label mt-4">Precio Unitario</label>
      <input
        class="form-control"
        type="number"
        v-model="props.item.unit_price"
        @input="updateItem('unit_price', $event.target.value)"
        placeholder="Precio Unitario"
      />
    </fieldset>
    <fieldset>
      <label class="form-label mt-4">Total Precio</label>
      <input
        class="form-control"
        type="number"
        v-model="props.item.total_price"
        @input="updateItem('total_price', $event.target.value)"
        placeholder="Total Precio"
      />
    </fieldset>
    <button @click="removeItem" class="btn btn-danger mt-2">
      Eliminar Item
    </button>
  </div>
</template>

<style scoped></style>

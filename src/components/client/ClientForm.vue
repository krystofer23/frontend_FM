<script setup>
import { ref, watch, computed } from "vue";
import { clientStore } from "@/stores/clientStore";

const props = defineProps({
  state: Boolean,
  row: Object,
  isEditMode: Boolean,
});

const emit = defineEmits(["close"]);

const formData = ref({
  id: 0,
  name: "",
  document_type: "",
  document_number: "",
});

watch(
  () => props.row,
  (newRow) => {
    if (newRow && Object.keys(newRow).length) {
      formData.value = { ...newRow };
    } else {
      formData.value = {
        id: 0,
        name: "",
        document_type: "",
        document_number: "",
      };
    }
  },
  { immediate: true }
);

const sendForm = () => {
  if (
    formData.value.name &&
    formData.value.document_type &&
    formData.value.document_number
  ) {
    if (props.isEditMode) {
      clientStore().edit(formData.value, formData.value.id);
    } else {
      clientStore().create(formData.value);
    }
    close();
  } else {
    alert("Ingrese los campos");
  }
};

const close = () => {
  formData.value = {
    name: "",
    document_type: "",
    document_number: "",
  };
  emit("close");
};
</script>

<template>
  <div class="container mb-4" v-show="props.state">
    <div>
      <form>
        <fieldset>
          <label class="form-label mt-4">Nombre</label>
          <input
            class="form-control"
            type="text"
            placeholder="Nombre..."
            v-model="formData.name"
          />
        </fieldset>
        <div>
          <label for="exampleSelect1" class="form-label mt-4"
            >Tipo de Documento</label
          >
          <select class="form-select" id="" v-model="formData.document_type">
            <option value="DNI">DNI</option>
            <option value="RUC">RUC</option>
          </select>
        </div>
        <fieldset>
          <label class="form-label mt-4">N° de documento</label>
          <input
            class="form-control"
            type="text"
            placeholder="N° de documento..."
            v-model="formData.document_number"
          />
        </fieldset>
        <button @click.prevent="sendForm()" class="btn btn-primary mx-1 mt-3">
          {{ props.isEditMode ? "Actualizar" : "Guardar" }}
        </button>
        <button @click.prevent="close()" class="btn btn-danger mx-1 mt-3">
          Cancelar
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>

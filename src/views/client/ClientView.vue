<script setup>
import { ref, onMounted } from "vue";
import { clientStore } from "@/stores/clientStore";

import ClientForm from "@/components/client/ClientForm.vue";

const row = ref({});
const state = ref(false);
const isEditMode = ref(false);
const load = ref(true);

const editClient = (client) => {
  row.value = client;
  isEditMode.value = true;
  state.value = true;
};

const addClient = () => {
  row.value = {};
  isEditMode.value = false;
  state.value = true;
};

onMounted(async () => {
  await clientStore().list();
  load.value = false;
});
</script>

<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center py-3">
      <h3>Clientes</h3>
      <button @click="addClient" class="btn btn-primary">
        Agregar cliente
      </button>
    </div>
  </div>

  <ClientForm
    :state="state"
    :row="row"
    :isEditMode="isEditMode"
    @close="state = false"
  />

  <div class="container" v-if="load">Cargando...</div>
  <table v-else class="container table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        <th scope="col">Tipo de Documento</th>
        <th scope="col">N° Documento</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(client, index) in clientStore().clients" :key="index">
        <th scope="row">{{ index + 1 }}</th>
        <td>{{ client.name }}</td>
        <td>{{ client.document_type }}</td>
        <td>{{ client.document_number }}</td>
        <td>
          <button class="btn btn-info" @click="editClient(client)">
            editar
          </button>
          <button
            class="btn btn-danger"
            @click="clientStore().delete(client.id)"
          >
            eliminar
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped></style>

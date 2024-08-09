<script setup>
import { ref, onMounted } from 'vue';
import InvoiceForm from '@/components/invoice/InvoiceForm.vue';
import { invoiceStore } from '@/stores/invoiceStore';

const row = ref({});
const state = ref(false);
const isEditMode = ref(false);
const load = ref(true);

const addInvoice = () => {
  row.value = {};
  isEditMode.value = false;
  state.value = true;
};

const editInvoice = (invoice) => {
  row.value = invoice;
  isEditMode.value = true;
  state.value = true;
};

onMounted(async () => {
  await invoiceStore().list();
  load.value = false;
});
</script>

<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center py-3">
      <h3>Facturas</h3>
      <button @click="addInvoice" class="btn btn-primary">
        Agregar factura
      </button>
    </div>

    <InvoiceForm :state="state" :invoice="row" :isEditMode="isEditMode" @close="state = false" />

    <div class="container" v-if="load">Cargando...</div>
    <table v-else class="container table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Número de Factura</th>
          <th scope="col">Fecha de Emisión</th>
          <th scope="col">Subtotal</th>
          <th scope="col">IGV</th>
          <th scope="col">Total</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(invoice, index) in invoiceStore().invoices" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ invoice.invoice_number }}</td>
          <td>{{ invoice.issue_date }}</td>
          <td>{{ invoice.subtotal }}</td>
          <td>{{ invoice.igv }}</td>
          <td>{{ invoice.total }}</td>
          <td>
            <button class="btn btn-info" @click="editInvoice(invoice)">Editar</button>
            <button class="btn btn-danger" @click="invoiceStore().delete(invoice.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>

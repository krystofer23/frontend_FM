<script setup>
import { ref, computed, watch, onMounted } from "vue";
import InvoiceItemForm from "./InvoiceItemForm.vue";
import { invoiceStore } from "@/stores/invoiceStore";
import { clientStore } from "@/stores/clientStore";

const props = defineProps({
  state: Boolean,
  invoice: Object,
  isEditMode: Boolean,
});

const emit = defineEmits(["close"]);

const formData = ref({
  id: 0,
  client_id: "",
  invoice_number: "",
  issue_date: "",
  subtotal: 0,
  igv: 0,
  total: 0,
  items: [],
});

const subtotal = computed(() => {
  return formData.value.items.reduce(
    (sum, item) => sum + item.quantity * item.unit_price,
    0
  );
});

const computedIGV = computed(() => {
  const igvPercentage = parseFloat(formData.value.igv) || 0;
  return (subtotal.value * igvPercentage) / 100;
});

const total = computed(() => {
  return subtotal.value + computedIGV.value;
});

const addItem = () => {
  formData.value.items.push({
    invoice_id: "",
    description: "",
    quantity: 1,
    unit_price: 0,
    total_price: 0,
  });
};

const removeItem = (index) => {
  formData.value.items.splice(index, 1);
};

const updateItem = (index, field, value) => {
  formData.value.items[index][field] = value;
  formData.value.items[index].total_price =
    formData.value.items[index].quantity *
    formData.value.items[index].unit_price;
  formData.value.subtotal = subtotal.value;
};

const sendForm = () => {
  if (
    formData.value.client_id &&
    formData.value.invoice_number &&
    formData.value.issue_date &&
    formData.value.items.length
  ) {
    formData.value.subtotal = subtotal.value;
    formData.value.total = total.value;
    if (props.isEditMode) {
      invoiceStore().edit(formData.value, formData.value.id);
    } else {
      invoiceStore().create(formData.value);
    }
    close();
  } else {
    alert("Complete todos los campos");
  }
};

const close = () => {
  formData.value = {
    id: 0,
    client_id: "",
    invoice_number: "",
    issue_date: "",
    subtotal: 0,
    igv: 0,
    total: 0,
    items: [],
  };
  emit("close");
};

watch(
  () => props.invoice,
  (newInvoice) => {
    if (newInvoice && Object.keys(newInvoice).length) {
      formData.value = { ...newInvoice };
    } else {
      formData.value = {
        id: 0,
        client_id: "",
        invoice_number: "",
        issue_date: "",
        subtotal: 0,
        igv: 0,
        total: 0,
        items: [],
      };
    }
  },
  { immediate: true }
);

onMounted(() => {
  clientStore().list();
});
</script>

<template>
  <div class="container mb-4" v-show="props.state">
    <div>
      <form>
        <fieldset>
          <label class="form-label mt-4">ID Cliente</label>
          <select class="form-select" id="" v-model="formData.client_id">
            <option
              :value="row.id"
              v-for="row in clientStore().clients"
              :key="row.id"
            >
              {{ row.name }}
            </option>
          </select>
        </fieldset>
        <fieldset>
          <label class="form-label mt-4">Número de Factura</label>
          <input
            class="form-control"
            type="text"
            v-model="formData.invoice_number"
            placeholder="Número de Factura"
          />
        </fieldset>
        <fieldset>
          <label class="form-label mt-4">Fecha de Emisión</label>
          <input
            class="form-control"
            type="date"
            v-model="formData.issue_date"
          />
        </fieldset>
        <fieldset>
          <label class="form-label mt-4">Subtotal</label>
          <input
            class="form-control"
            type="number"
            :value="subtotal"
            readonly
          />
        </fieldset>
        <fieldset>
          <label class="form-label mt-4">IGV (%)</label>
          <input
            class="form-control"
            type="number"
            v-model="formData.igv"
            placeholder="IGV (%)"
          />
        </fieldset>
        <fieldset>
          <label class="form-label mt-4">Total</label>
          <input class="form-control" type="number" :value="total" readonly />
        </fieldset>

        <div v-for="(item, index) in formData.items" :key="index">
          <InvoiceItemForm
            :item="item"
            @update:item="updateItem(index, $event.field, $event.value)"
            @remove="removeItem(index)"
          />
        </div>

        <button @click.prevent="addItem" class="btn btn-secondary mx-1 mt-3">
          Añadir Item
        </button>
        <button @click.prevent="sendForm" class="btn btn-primary mx-1 mt-3">
          {{ props.isEditMode ? "Actualizar" : "Guardar" }}
        </button>
        <button @click.prevent="close" class="btn btn-danger mx-1 mt-3">
          Cancelar
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>

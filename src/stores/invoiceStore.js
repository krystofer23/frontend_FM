import { defineStore } from "pinia";
import axios from "axios";

export const invoiceStore = defineStore("invoiceStore", {
    state: () => ({
        invoices: []
    }), 
    actions: {
        async list () {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/invoice/list`);
                this.invoices = response.data.data;
            }
            catch (e) {
                console.log(e);
            }
        },
        async create (formData) {
            try {
                const headers = {
                    "Content-Type": "application/json"
                };
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/invoice/create`, formData, { headers });
                this.list();
                alert("Factura creada")
            } catch (e) {
                console.log(e);
            }
        },
        async edit (formData, id) {
            try {
                const response = await axios.put(`${import.meta.env.VITE_API_URL}/invoice/edit/${id}`, formData);
                this.list();
                alert("Factura actualizada")
            }
            catch (e) {
                console.log(e);
            }
        },
        async delete (id) {
            try {
                const response = await axios.delete(`${import.meta.env.VITE_API_URL}/invoice/delete/${id}`);
                this.list();
                alert("Factura eliminada")
            }
            catch (e) {
                console.log(e);
            }
        }
    }
});
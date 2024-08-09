import { defineStore } from "pinia";
import axios from "axios";

export const clientStore = defineStore("clientStore", {
    state: () => ({
        clients: []
    }), 
    actions: {
        async list () {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/client/list`);
                this.clients = response.data.data;
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
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/client/create`, formData, { headers });
                this.list();
                alert("Cliente creado")
            } catch (e) {
                console.log(e);
            }
        },
        async edit (formData, id) {
            try {
                const response = await axios.put(`${import.meta.env.VITE_API_URL}/client/edit/${id}`, formData);
                this.list();
                alert("Cliente actualizado")
            }
            catch (e) {
                console.log(e);
            }
        },
        async delete (id) {
            try {
                const response = await axios.delete(`${import.meta.env.VITE_API_URL}/client/delete/${id}`);
                this.list();
                alert("Cliente eliminado")
            }
            catch (e) {
                console.log(e);
            }
        }
    }
});
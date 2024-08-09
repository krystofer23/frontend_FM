<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div class="container-fluid">
        <h3 class="text-white">Facturas Manuales</h3>
        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarColor01">
            <ul class="navbar-nav me-auto d-flex align-items-center">
                <li class="nav-item px-2 text-white">
                    <RouterLink to="/"><span :class="$route.path === '/' ? 'nav-link active' : ''">Inicio</span></RouterLink>
                </li>
                <li class="nav-item px-2 text-white">
                    <RouterLink to="/clientes"><span :class="$route.path === '/clientes' ? 'nav-link active' : ''">Clientes</span></RouterLink>
                </li>
                <li class="nav-item px-2 text-white">
                    <RouterLink to="/facturas"><span :class="$route.path === '/facturas' ? 'nav-link active' : ''">Facturas</span></RouterLink>
                </li>
            </ul>
        </div>
        </div>
    </nav>
    <RouterView />
</template>

<style scoped></style>

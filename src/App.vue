<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <header class="bg-black">
    <div class="mx-auto max-w-6xl py-10">
      <h1 class="text-4xl uppercase text-white text-center font-extrabold">
        Administración de clientes
      </h1>
    </div>
  </header>
  <main class="max-w-6xl mx-auto mt-10">
    <RouterView />
  </main>
</template>

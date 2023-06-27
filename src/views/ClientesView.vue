<script setup>
import RouterLink from "../components/ui/RouterLink.vue";
import Heading from "../components/ui/Heading.vue";
defineProps({
  titulo: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div class="flex justify-between">
    <Heading>{{ titulo }}</Heading>
    <RouterLink to="agregar-cliente">Agregar Cliente</RouterLink>
  </div>
</template>

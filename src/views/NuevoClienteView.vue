<script setup>
import { FormKit } from "@formkit/vue";
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
    <RouterLink to="inicio" hover="bg-gray-500" color="hover:bg-gray-700"
      >Volver</RouterLink
    >
  </div>
  <div class="mx-auto mt-10 bg-gray-500 shadow">
    <FormKit type="form">
      <FormKit
        type="text"
        label="Nombre"
        placeholder="Nombre del CLiente"
        help="Colaca el nombre del cliente"
        validation="required|min:3|max:50"
        :validation-messages="{
          required: 'El nombre es obligatorio',
          min: 'El nombre debe tener al menos 3 caracteres',
          max: 'El nombre debe tener menos de 50 caracteres',
        }"
      />
    </FormKit>
  </div>
</template>

<script setup>
import { FormKit } from "@formkit/vue";
import RouterLink from "../components/ui/RouterLink.vue";
import Heading from "../components/ui/Heading.vue";
import { ref, computed, onMounted, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import ClienteService from "../services/ClienteService";
const router = useRouter();
const route = useRoute();
const { id } = route.params;
const areaDeTrabajo = ref([
  {
    id: 1,
    nombre: "Administración",
  },
  {
    id: 2,
    nombre: "Tesorería",
  },
  {
    id: 3,
    nombre: "Almacén",
  },
]);
const areaDeTrabajoOptions = computed(() => {
  return areaDeTrabajo.value.map((area) => area.nombre);
});
const formData = reactive({});
onMounted(() => {
  ClienteService.obtenerCliente(id)
    .then(({ data }) => {
      Object.assign(formData, data);
    })
    .catch((error) => {
      console.log(error);
    });
});

defineProps({
  titulo: {
    type: String,
  },
});
const handleEditar = (data) => {
  ClienteService.actualizarCliente(id, data)
    .then(() => {
      console.log("Cliente Editado");
      //redireccionar al inicio
      router.push({ name: "listado-clientes" });
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>
<template>
  <div class="flex justify-between">
    <Heading>{{ titulo }}</Heading>
    <RouterLink
      to="listado-clientes"
      hover="bg-gray-500"
      color="hover:bg-gray-700"
      >Volver</RouterLink
    >
  </div>
  <div class="mx-auto mt-10 bg-gray-200 shadow">
    <div class="mx-auto md:w-2/3 py-20 px-6">
      <FormKit
        type="form"
        submit-label="Guardar Cambios"
        incomplete-message="No se puedo enviar el formulario, por favor revisa los campos"
        @submit="handleEditar"
        :value="formData"
      >
        <FormKit
          type="text"
          label="Nombre"
          name="nombre"
          placeholder="Nombre del CLiente"
          validation="required"
          :validation-messages="{
            required: 'El Nombre del Cliente es Obligatorio',
          }"
          v-model="formData.nombre"
        />
        <FormKit
          type="text"
          label="Apellido"
          name="apellido"
          placeholder="Apellido del CLiente"
          validation="required"
          :validation-messages="{
            required: 'El Apellido del Cliente es Obligatorio',
          }"
          v-model="formData.apellido"
        />
        <FormKit
          type="number"
          label="DNI"
          name="dni"
          placeholder="Número de DNI XXXXXXXX"
          maxlength="8"
          validation="required||min:11111111||max:99999999"
          :validation-messages="{
            required: 'El DNI del Cliente es Obligatorio',
            min: 'El DNI debe tener 8 dígitos',
            max: 'El DNI debe tener 8 dígitos',
          }"
          v-model="formData.dni"
        />
        <FormKit
          type="email"
          label="Email"
          name="email"
          placeholder="Email del CLiente"
          validation="required||email"
          :validation-messages="{
            required: 'El Email del Cliente es Obligatorio',
            email: 'El Email no es válido',
          }"
          v-model="formData.email"
        />
        <FormKit
          type="text"
          label="Teléfono"
          name="telefono"
          placeholder="Teléfono: XXX-XXX-XXX"
          validation="?matches:/^[0-9]{3}-[0-9]{3}-[0-9]{3}$/"
          :validation-messages="{
            matches: 'El Teléfono no es válido',
          }"
          v-model="formData.telefono"
        />
        <FormKit
          type="text"
          label="Empresa"
          name="empresa"
          placeholder="Empresa del CLiente"
          validation="required"
          :validation-messages="{
            required: 'La Empresa del Cliente es Obligatoria',
          }"
          v-model="formData.empresa"
        />
        <FormKit
          type="select"
          label="Area de Trabajo"
          name="areaDeTrabajo"
          validation="required"
          :validation-messages="{
            required: 'La Empresa del Cliente es Obligatoria',
          }"
          :options="areaDeTrabajoOptions"
          v-model="formData.areaDeTrabajo"
        />
        <FormKit
          type="text"
          label="Puesto"
          name="puesto"
          placeholder="Puesto de Trabajo del CLiente"
          v-model="formData.puesto"
        />
        <FormKit
          type="text"
          label="Observaciones"
          name="observaciones"
          placeholder="Observaciones del CLiente"
          v-model="formData.observaciones"
        />
      </FormKit>
    </div>
  </div>
</template>
<style>
.formkit-wrapper {
  max-width: 100%;
}
</style>

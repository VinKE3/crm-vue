<script setup>
import { onMounted, ref, computed } from "vue";
import ClienteService from "../services/ClienteService";
import RouterLink from "../components/ui/RouterLink.vue";
import Heading from "../components/ui/Heading.vue";
import Cliente from "../components/Cliente.vue";

const clientes = ref([]);

onMounted(() => {
  ClienteService.listarClientes()
    .then(({ data }) => {
      clientes.value = data;
    })
    .catch((error) => {
      console.log(error);
    });
});

defineProps({
  titulo: {
    type: String,
    required: true,
  },
});

const existenClientes = computed(() => {
  return clientes.value.length > 0;
});
const actualizarEstado = ({ id, estado }) => {
  ClienteService.cambiarEstado(id, { estado: !estado })
    .then(() => {
      //refrescar la lista de clientes
      const i = clientes.value.findIndex((cliente) => cliente.id === id);
      clientes.value[i].estado = !estado;
    })
    .catch((error) => {
      console.log(error);
    });
};
const eliminarCliente = ({ id }) => {
  ClienteService.eliminarCliente(id)
    .then(() => {
      clientes.value = clientes.value.filter((cliente) => cliente.id !== id);
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>
<template>
  <div class="flex justify-between">
    <Heading>{{ titulo }}</Heading>
    <RouterLink to="agregar-cliente">Agregar Cliente</RouterLink>
  </div>
  <div
    v-if="existenClientes"
    class="flow-root mx-auto mt-10 p-5 bg-white shadow"
  >
    <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <table class="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                class="p-2 text-left text-sm font-extrabold text-gray-600"
              >
                Nombre
              </th>
              <th
                scope="col"
                class="p-2 text-left text-sm font-extrabold text-gray-600"
              >
                Empresa
              </th>
              <th
                scope="col"
                class="p-2 text-left text-sm font-extrabold text-gray-600"
              >
                Estado
              </th>
              <th
                scope="col"
                class="p-2 text-left text-sm font-extrabold text-gray-600"
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <Cliente
              v-for="cliente in clientes"
              :key="cliente.id"
              :cliente="cliente"
              @actualizar-estado="actualizarEstado"
              @eliminar-cliente="eliminarCliente"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div v-else class="mx-auto mt-10 bg-gray-200 shadow">
    <div class="mx-auto md:w-2/3 py-20 px-6">
      <p class="text-center text-gray-600 uppercase font-extrabold">
        No hay clientes registrados, agrega uno nuevo
      </p>
    </div>
  </div>
</template>

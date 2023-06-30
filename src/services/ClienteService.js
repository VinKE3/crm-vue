import api from "../lib/axios";

export default {
  listarClientes() {
    return api.get("/clientes");
  },
  registrarCliente(cliente) {
    return api.post("/clientes", cliente);
  },
  obtenerCliente(id) {
    return api.get(`/clientes/${id}`);
  },
  actualizarCliente(id, cliente) {
    return api.put(`/clientes/${id}`, cliente);
  },
  cambiarEstado(id, estado) {
    return api.patch("/clientes/" + id, estado);
  },

  eliminarCliente(id) {
    return api.delete("/clientes/" + id);
  },
};

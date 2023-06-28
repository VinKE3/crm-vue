import api from "../lib/axios";

export default {
  listarClientes() {
    return api.get("/clientes");
  },
  registrarCliente(cliente) {
    return api.post("/clientes", cliente);
  },
};

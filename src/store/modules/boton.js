export default {
  namespaced: true,
  name: "boton",

  state: {
    estadoBoton: true,
  },
  mutations: {
    mostrarEliminar(state, payload) {
      state.estadoBoton = payload;
    },
  },
};

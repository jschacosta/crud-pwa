export default {
  namespaced: true,
  name: "dialog",

  state: {
    estadoPost: { estado: false, tipo: "nuevo" },
    datosPost: {
      escogido: "",
      titulo: "",
      cuerpo: "",
      idPost: "",
    },
  },
  mutations: {
    dialogoPost(state, payload) {
      state.estadoPost.estado = !state.estadoPost.estado;
      state.estadoPost.tipo = payload;
    },
    enviarTexto(state, payload) {
      state.datosPost = payload;
    },
  },
};

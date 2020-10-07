<template>
  <v-btn class="mx-2" :color="color" @click="accion()">{{ texto }}</v-btn>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "BotonAccion",
  props: {
    texto: String,
    color: String,
  },
  methods: {
    ...mapMutations("dialog", ["dialogoPost", "enviarTexto"]),
    ...mapMutations("boton", ["mostrarEliminar"]),
    accion() {
      if (this.texto === "Crear Post") {
        const datosPost = {
          escogido: "",
          titulo: "",
          cuerpo: "",
          idPost: "",
        };
        this.enviarTexto(datosPost);
        this.dialogoPost("nuevo");
      }
      if (this.texto === "Desactivar Edición") {
        this.mostrarEliminar(true);
      }
      if (this.texto === "Borrar Post") {
        this.mostrarEliminar(false);
      }
    },
  },
};
</script>

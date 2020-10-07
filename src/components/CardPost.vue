<template>
  <v-card
    class="d-flex flex-column"
    :height="imagen != 'xs' ? 270 : 300"
    color="#355070"
    dark
  >
    <v-btn
      class="botonflotante"
      fab
      x-small
      dark
      color="error"
      v-if="!estadoBoton"
      @click="borrarPost()"
    >
      <v-icon> mdi-delete </v-icon>
    </v-btn>
    <v-card-title class="headline mb-3">
      {{ titulo }}
    </v-card-title>
    <v-card-subtitle>{{ cuerpo }}</v-card-subtitle>
    <v-spacer></v-spacer>
    <v-card-actions class="d-flex justify-end mb-1">
      <v-btn text @click="editarPost()" small fab dark
        ><v-icon left>mdi-pencil</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn text outlined @click="irPost()">Ver Post</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";
export default {
  name: "CardPost",
  props: {
    titulo: String,
    cuerpo: String,
    id: Number,
    userId: Number,
  },
  computed: {
    ...mapState(["usuarios", "posts"]),
    ...mapState("boton", ["estadoBoton"]),
    imagen() {
      switch (this.$vuetify.breakpoint.name) { // para identificar ancho de pantalla
        case "xs":
          return "xs";
        case "sm":
          return "sm";
        case "md":
          return "md";
        case "lg":
          return "lg";
        case "xl":
          return "xl";
      }
    },
  },
  methods: {
    ...mapMutations(["obtenerPosts"]),
    ...mapActions(["ordenarPosts"]),
    ...mapMutations("dialog", ["dialogoPost", "enviarTexto"]),
    editarPost() {
      const index = this.usuarios.findIndex((item) => item.id === this.userId);
      const datosPost = {
        escogido: this.usuarios[index].name,
        titulo: this.titulo,
        cuerpo: this.cuerpo,
        idPost: this.id,
      };
      this.enviarTexto(datosPost);
      this.dialogoPost("editar");
    },
    borrarPost() {
      const posts = this.posts;
      const index = posts.findIndex((item) => item.id === this.id);
      posts.splice(index, 1);
      this.obtenerPosts(posts);
      this.ordenarPosts(posts);
    },
    irPost() {
      this.$router.push({ path: `/post/${this.id}` });
    },
  },
};
</script>
<style scoped>
.botonflotante {
  top: 0;
  right: 0;
  position: absolute;
  margin: -15px 0 0px -0px;
}
</style>

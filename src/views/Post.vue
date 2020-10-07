<template>
  <div class="container mt-3 mb-15">
    <v-row class="mb-5">
      <v-col :cols="imagen != 'xs' ? '2' : '4'">
        <v-btn
          rounded
          small
          color="#2C3A47"
          @click="$router.push({ path: `/` })"
          dark
          >Volver</v-btn
        >
      </v-col>
    </v-row>
    <v-card class="mx-auto" max-width="344">
      <v-img :src="urlFoto" height="200px"></v-img>

      <v-card-title>
        {{ post.title }}
      </v-card-title>

      <v-card-actions>
        <v-btn color="orange lighten-2" text>
          Acerca del Autor
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
          <v-card-text>
            <v-card-title class="mb-5">{{ user.name }}</v-card-title>
            <v-card-subtitle>Email:{{ user.email }}</v-card-subtitle>
            <v-card-subtitle>Ciudad:{{ user.address.city }}</v-card-subtitle>
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data: () => ({
    show: false,
    urlFoto: "",
  }),
  computed: {
    ...mapState(["fotos", "posts", "usuarios"]),
    post() {
      const index = this.posts.findIndex(
        (item) => item.id == this.$route.params.id
      );
      return this.posts[index];
    },
    user() {
      const index = this.usuarios.findIndex(
        (item) => item.id == this.post.userId
      );
      return this.usuarios[index];
    },
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
    ...mapMutations(["obtenerFotos"]),
  },
  async created() {
    var todasFotos = [];
    if (this.fotos.length != 0) {
      await fetch("https://jsonplaceholder.typicode.com/photos")
        .then((response) => response.json())
        .then((json) => {
          todasFotos = json;
          this.obtenerFotos(json);
        })
        .catch((e) => {
          console.log(e);
        });
      if (todasFotos.length != 0) {
        const index = todasFotos.findIndex(
          (item) => item.id == this.$route.params.id
        );

        this.urlFoto = todasFotos[index].url;
      }
      if (todasFotos.length === 0) {
        const index = this.fotos.findIndex(
          (item) => item.id == this.$route.params.id
        );
        this.urlFoto = this.fotos[index].url;
      }
    }
  },
};
</script>

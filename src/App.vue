<template>
  <v-app>
    <v-app-bar app dense color="#1d3557" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <h2>Crud con Vue js</h2>
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
    <v-footer class="font-weight-medium" color="#1d3557" dense dark>
      <v-col class="text-center subtitle-2 ma-0 pa-0" cols="12">
        {{ new Date().getFullYear() }} — <strong>Johann Schwarze</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
export default {
  name: "App",
  methods: {
    ...mapMutations(["obtenerUsuarios", "obtenerPosts", "obtenerFotos"]),
    ...mapActions(["ordenarPosts"]),
  },
  async created() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        this.obtenerUsuarios(json);
      })
      .catch((e) => {
        console.log(e);
      });
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => {
        this.obtenerPosts(json);
        this.ordenarPosts(json);
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>

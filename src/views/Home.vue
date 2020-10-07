<template>
  <v-container class="mx-auto mt-2">
    <v-row class="d-flex justify-center">
      <BotonAccion texto="Crear Post" color="success" />
      <BotonAccion texto="Borrar Post" color="error" v-if="estadoBoton" />
      <BotonAccion texto="Desactivar Edición" v-else color="warning" />
    </v-row>
    <ItemsPosts />
    <Dialogo />
    <SnackBar /> 
    <SinConexion v-if="posts.length===0"/>
  </v-container>
</template>

<script>
import ItemsPosts from "@/components/ItemsPosts.vue";
import Dialogo from "@/components/Dialogo.vue";
import BotonAccion from "@/components/BotonAccion.vue";
import SinConexion from "@/components/SinConexion.vue";
import SnackBar from "@/components/SnackBar.vue";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: {
    ItemsPosts,
    BotonAccion,
    Dialogo,
    SinConexion,
    SnackBar
  },
  computed: {
    ...mapState("boton", ["estadoBoton"]),
    ...mapState(["posts"]),
  },
};
</script>

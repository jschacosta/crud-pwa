<template>
  <v-dialog v-model="estadoPost.estado" persistent max-width="600px" >
    <v-card color="#fefeff" class="container">
      <v-card-text>
        <v-card-title v-if="estadoPost.tipo === 'nuevo'" class="headline"
          >Crea un Nuevo Post</v-card-title
        >
        <v-card-title v-if="estadoPost.tipo === 'editar'" class="headline" 
          >Edita el Post</v-card-title
        >
        <v-text-Field
          label="Titulo de Post"
          v-model="datosPost.titulo"
        ></v-text-Field>
        <v-text-Field
          label="Descripción de Post"
          v-model="datosPost.cuerpo"
        ></v-text-Field>
        <v-select
          :items="nombresUsers"
          v-model="datosPost.escogido"
          label="Nombre Editor"
        ></v-select>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn  text @click="salir">Salir</v-btn>
        <v-btn
          color="success"
          text
          @click="crearPost()"
          v-if="estadoPost.tipo === 'nuevo'"
          >Enviar</v-btn
        >
        <v-btn
          color="success"
          text
          @click="editarPost()"
          v-if="estadoPost.tipo === 'editar'"
          >Editar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "Dialogo",
  computed: {
    ...mapState("dialog", ["estadoPost", "datosPost"]),
    ...mapState(["posts"]),
    ...mapState(["usuarios"]),
    nombresUsers() {
      var users = [];
      for (let usuario of this.usuarios) {
        users.push(usuario.name);
      }
      return users;
    },
  },
  methods: {
    ...mapMutations("dialog", ["dialogoPost"]),
    ...mapMutations(["obtenerPosts"]),
    ...mapMutations('textoSnack',["agregarSnack"]),
    ...mapActions(["ordenarPosts"]),
    salir() {
      this.dialogoPost("");
    },
    crearPost() {
      const posts = this.posts
      const indexUser = this.usuarios.findIndex(
        (item) => item.name === this.datosPost.escogido
      );
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
          title: this.datosPost.titulo,
          body: this.datosPost.cuerpo,
          userId: this.usuarios[indexUser].id,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          const indexPostId = posts.findIndex(
        (item) => item.id === json.id
        );
        if(indexPostId===-1){
          posts.push(json)
        }
        if(indexPostId!=-1){
          const idUltimo=posts[0].id
          json.id=idUltimo+1
          posts.push(json)
        }
          this.obtenerPosts(posts);
          this.ordenarPosts(posts);
          this.dialogoPost("");
          let aviso="Haz creado un nuevo Post"
          this.agregarSnack(aviso)
        });
    },
    editarPost() {
      let posts = this.posts
      let users = this.usuarios
      const indexUserId = users.findIndex(
        (item) => item.name === this.datosPost.escogido
      );
      const indexPostId = posts.findIndex(
        (item) => item.id === this.datosPost.idPost
      );
      posts[indexPostId]={
        id: this.datosPost.idPost,
        title: this.datosPost.titulo,
        body: this.datosPost.cuerpo,
        userId: this.usuarios[indexUserId].id,
      }
      this.obtenerPosts(posts);
      this.ordenarPosts(posts);
      this.dialogoPost("");
      let aviso="Haz editado el Post"
      this.agregarSnack(aviso)
    },
  },
};
</script>

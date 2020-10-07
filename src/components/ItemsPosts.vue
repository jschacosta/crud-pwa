<template>
  <v-container >
    <v-item-group>
      <v-row>
        <v-col
          v-for="post in postsPaginas[page - 1]"
          :key="post.id"
          cols="12"
          md="6"
        >
          <CardPost
            :titulo="post.title"
            :cuerpo="post.body"
            :id="post.id"
            :userId="post.userId"
          ></CardPost>
        </v-col>
      </v-row>
    </v-item-group>
    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="postsPaginas.length"
        :total-visible="6"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import CardPost from "./CardPost.vue";
export default {
  name: "Posts",
  components: {
    CardPost,
  },
  data: () => ({
    page: 1,
  }),
  computed: {
    ...mapState(["postsPaginas"]),
  },
  methods: {
    ...mapActions(["obtenerPosts"]),
  },
};
</script>

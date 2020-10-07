import Vue from 'vue'
import Vuex from 'vuex'

import dialog from './modules/dialog'
import boton from './modules/boton'
import textoSnack from './modules/snack'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    usuarios:[],
    posts:[],
    postsPaginas:[], // 10 posts por página
    fotos:[{id:1}]
  },
  mutations: {
    obtenerUsuarios(state,payload){
      state.usuarios=payload
    },
    obtenerPosts(state,payload){
      state.posts=payload
    },
    obtenerPostsPaginas(state,payload){
      state.postsPaginas=payload
    },
    obtenerFotos(state,payload){
      state.fotos=payload
    }
  },
  actions: {
    ordenarPosts({commit},payload){  // ordena post de forma que queden 10 items por página
      const ordenados = payload.sort(function (valor1,valor2){ // funcion que ordena los posts del ultimo al primero
      if (valor1.id > valor2.id) return -1;
      if (valor1.id < valor2.id) return 1;
      })
      const paginas = Math.ceil(ordenados.length / 10);
      const datosPaginas = [];
      for (var i = 0; i < paginas; i++) {
        datosPaginas.push([]);
      }
      var j = 0;
      var k = 0;
      for (let item of ordenados) {
        datosPaginas[k].push(item);
        j++;
        if (j === 10) {
          k++;
          j = 0;
        }
      }
      commit('obtenerPostsPaginas',datosPaginas)
    }
  },
  modules: {
    dialog,
    boton,
    textoSnack, 
  }
})

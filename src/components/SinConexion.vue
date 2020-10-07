<template>
<v-card class="general elevation-8 pa-0 ">
    
<v-list class="pa-0 ma-0">
  <v-list-item-content  class="normal"> 
            <v-list-item-title class="headline mb-1 d-flex justify-center ">
              No tienes Conexion a Internet
            </v-list-item-title>
          </v-list-item-content>
</v-list>
</v-card>
</template>

<script>
export default {
    name:'SinConexion'
}
</script>
<style scoped>
.normal{
  background-color:  #E0E0E0;
  color: #2C3A47
}
.general{
  width: 800px;
  margin-left: auto;
  margin-right: auto;
}  
</style>   

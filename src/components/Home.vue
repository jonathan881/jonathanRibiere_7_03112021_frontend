<template >
  <div>
  <div class="home">
    <img alt="Groupomania logo" src="../assets/icon-above-font.png">
    "Bienvenue sur le réseau social interne pour les employés de Groupomania"
  </div>
  <div class="hello">
    <p>
      Vous avez déjà un compte : <router-link to="/login">Connexion</router-link><br>
      Sinon pas de souci l'inscription c'est par ici : <router-link to="/register">Inscription</router-link>
    </p>
    
  </div>
  </div>
<div id="app">
  <Header />
  <div class="post" v-for="todo of todos" :key="todo.id" >
    <div> 
    <p class="userName">Message envoyée par : {{ todo.User.username }} {{todo.id}}</p> 
    </div> 
      <div class="title">
        <h2>Titre : {{ todo.title }}</h2> 
      </div>
  <div>
     <img class="image-post" v-bind:src=todo.attachment title="post-img" />
  </div>
  <div class="description">
    <p>{{ todo.content }}</p>
  </div>
  <div class="date">
    {{ todo.createdAt }}
  </div>
  
  </div>
</div>
</template>

<script>
import Header from './Header.vue'
import axios from "axios";
export default {
  name: 'Home',
  
     data() {
      return {
        todos: [],
        id: 'Number',
        
      };  
    },
       created() {
                axios.get('http://localhost:3000/api/messages', {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(response => {
                    this.todos = response.data;
                    console.log(response);
    
                })
              
            },
  
  components: {
    Header,
  }
}
</script>

<style scoped>
#app{
  width: 100%;
  background-color: #1c2c49;
}
.post{
  border: solid #d83c50;
  border-radius: 5px;
  margin-bottom: 20px;
  background-color:  #b0acb4;
  width: 80%;
  margin-left: 10%;
}
.userName{
  margin-top: 5px;
}
h2{
  text-align: initial;
    margin-left: 1rem;
    font-size: 1.2rem;
}
img{
  width: 16rem;
  height: 16rem;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
<template >

<div id="app">
  <div>Partager avec nous vos souvenire</div>
  <div class="post" v-for="todo of todos" :key="todo.id" >
    <div> 
    <p class="userName">Message envoyée par : {{ todo.User.username }} {{todo.id}}</p> 
    </div> 
      <div class="title">
        <h2>Titre : {{ todo.title }}</h2> 
      </div>
  <div>
     <img v-if="todo.attachment" class="image-post" v-bind:src=todo.attachment title="post-img" />
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
import axios from "axios";
export default {
  name: 'Home',
  
     data() {
      return {
        todos: [],
        id: 'Number',
        attachment: "",
        
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
  width: -webkit-fill-available;
    margin: 10px;
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
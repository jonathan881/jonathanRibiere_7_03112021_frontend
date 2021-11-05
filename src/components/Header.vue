<template>
    <nav class="header">
        <div class="header_titre">
          <a class="titre" href="http://localhost:8081/">Groupomania</a>
        </div>
        <div class="header_btn" v-show="userConnected">
        <div class="header_btn-a">
          <router-link to="/profile"><i class="fas fa-user"></i></router-link>
        </div> 
          <div class="header_btn-a">
          <router-link to="/messages/new"><i class="fas fa-comment"></i></router-link>
        </div> 
        <div>
          <a class="header_btn-b" v-on:click="logout" href="/login" ><i class="fas fa-door-open"></i></a>
        </div>         
        </div>
    </nav>

</template>


<script>
export default {
  name: "Header",
   computed: {
      // Vérifier si l'utilisateur est connecté
      userConnected() {
        if(this.$route.path == "/register" || this.$route.path == "/login" ) {
        return false
        } else {
        return true
        }
      }
    },
  methods: {
    handleClick() {
      localStorage.removeItem('token');
      this.$router.push('/')
    },
    logout()
    {
      localStorage.clear();
      this.$router.push('users/login')

    }
  }
}
</script>

<style>
.header{
    display: flex;
    justify-content: space-between;
    width: 100%;
    background-color: #d4545c;
    box-shadow: 0px 3px 5px black;
}
.header_titre{
    width: 30%;
    color: antiquewhite;
    margin-top: 16px;
    font-size: initial;
}
.titre{
  color: #1c2c49;
}
a{
    font-family: inherit;
    text-decoration: none;
}
.header_btn{
    width: 50%;
    display: flex;
    justify-content: flex-end;
    margin-right: 10px;
    margin-top: 16px;
    
}
.header_btn-a{
    margin-right: 2rem;
    font-size: 1.5rem;
    
    
}
.header_btn-b{
    font-size: 1.5rem;
    
    
}
.fas {
  color: #1c2c49;
}

</style>
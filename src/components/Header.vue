<template>
    <nav class="header">
        <div class="header_titre">
          <a href="http://localhost:8081/">Groupomania</a>
        </div>
        <div class="header_btn" v-show="userConnected">
        <div class="header_btn-a">
          <router-link to="/profile">Profile</router-link>
        </div> 
          <div class="header_btn-a">
          <router-link to="/messages/new">Publier</router-link>
        </div> 
        <div>
          <a class="header_btn-b" v-on:click="logout" href="/login" >Se deconnecter</a>
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
}
.header_titre{
    width: 30%;
    color: antiquewhite;
}
.header_btn{
    width: 50%;
    display: flex;
    justify-content: flex-end;
    margin-right: 10px;
    margin-top: 16px;
    
}
.header_btn-a{
    margin-right: 10px;
    
    
}

</style>
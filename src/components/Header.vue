<template>
    <nav class="header">
        <div class="header_titre">
            <p>Groupomania</p>
        </div>
        <div class="header_btn">
        <div class="header_btn-a">
          <router-link to="/profile">Mon profile</router-link>
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
    margin-bottom: 3rem;
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
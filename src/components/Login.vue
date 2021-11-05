<template >

<div id="template">
 <form @submit.prevent="login" class="contenair" >
     <h1 class="contenair_titre">Connexion :</h1>
     <div>
     <label for="email">Votre email :
     <input v-model="email"  type="email" class="" placeholder="Email" 
      aria-required="true" aria-invalid="true" /> <br>
   <span>Veuillez respecter le format de l'email (exemple@domaine.fr)</span>
</label>
     </div>
     <div>
      <label for="password">Mots de passe :
     <input type="password"  v-model="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" class="" placeholder="Password" aria-required="true" aria-invalid="true"> <br>
     <span>Doit contenir au moins un chiffre et une lettre majuscule et minuscule, et au moins 6 caractères ou plus</span>     
      </label>
     </div>
     <button  class="" type="submit">Connexion</button>
  </form>
  <div>
    Sinon pas de souci l'inscription c'est par ici : <router-link to="/register">Inscription</router-link>
  </div>
</div>
</template>

<script>
import axios from "axios"
export default {
    name: "Login",
    data() {
        return {
            email: "",
            password: "",
            username: "",
                    }
    },
    methods: {
       
        login() {
            axios.post('http://localhost:3000/api/users/login', {
                email: this.email,
                password: this.password
            })
           .then(response => {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('userId', response.data.userId);
                    localStorage.setItem('username', response.data.username);
                    localStorage.setItem('isAdmin', response.data.isAdmin);

                    this.$router.push('/profile');
                })
                
       }
    }
}
</script>
<style>
#template{
    width: 100%;
}
.contenair{
border: solid #d83c50;
border-radius: 30px;
background-color:  #b0acb4;
width: 60%;
margin-left: 20%;
margin-top: 40px;
}

</style>
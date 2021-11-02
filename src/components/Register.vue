<template>
    <form @submit.prevent="handleSubmit" class=exemple-pattern-css >
        <h1 class="h3 mb-3 fw-normal">Inscription :</h1>
        <label for="email">Votre email :
     <input v-model="email"  type="email" class="form-control" placeholder="Email" 
      aria-required="true" aria-invalid="true" />
   <span>Veuillez respecter le format de l'email (exemple@domaine.fr)</span>
</label>
        <label for="email">Votre pseudo :
        <input type="text" v-model="username" pattern="^[a-z0-9_-]{3,16}$" class="form-control" placeholder="Pseudo" required aria-required="true" aria-invalid="true" />
        <span>Votre pseudo dois contenire entre 3 et 16 caractère en minuscule </span>
        </label>
        <label for="password">Mots de passe :
     <input type="password"  v-model="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" class="form-control" placeholder="Password" aria-required="true" aria-invalid="true"> 
     <span>Doit contenir au moins un chiffre et une lettre majuscule et minuscule, et au moins 8 caractères ou plus</span>     
      </label>
        <button class="w-100 btn btn-lg btn-primary" type="submit">Créer mon compte</button>  
    </form>
</template>

<script>
import axios from 'axios'
export default {
    name: "Register",
    data() {
        return {
            email: "",
            username: "",
            password: "",
        }
    },
    methods: {
        async handleSubmit(){
          await axios.post("http://localhost:3000/api/users/register", {
            
                email: this.email,
                username: this.username,
                password: this.password
               
        });
       
       this.$router.push('/login')
}}}
</script>

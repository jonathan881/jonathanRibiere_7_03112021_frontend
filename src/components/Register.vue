<template>
    <!-- Formulaire Signup -->
    <div class="form-container">
        <h1 class="formTitle">S'inscrire</h1>
        <form @submit.prevent="signUp"  action="" id="form" class="validation">
            <div class="form-input">
                <label for="email"></label>
                <input v-model="email"  type="email" class="form-control" placeholder="Email" 
      aria-required="true" aria-invalid="true" />
            </div>
            <div class="form-input">
                <label for="username"></label>
                <input type="text" v-model="username" class="form-control" placeholder="Pseudo" required aria-required="true" aria-invalid="true" />
            </div>
            <div class="form-input
            ">
                <label for="password"></label>
                <input type="password"  v-model="password" class="form-control" placeholder="Password" aria-required="true" aria-invalid="true"> 
            </div>
            <div class="submitContainerBtn">
                <input type="submit" class="submitBtn" value="S'inscrire !" />
            </div>
           <div class="ContainerMsgErr">
            <p class="my-3 text-danger">{{ signupErrorMsg }}</p>
            </div>
        </form>
        <div>
            Vous avez déjà un compte : <router-link to="/login">Connexion</router-link>

        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Signup',
    data () {
        return {
            // Récupérer les entrées utilisateur grâce à v-model
            email: '',
            username: '',
            password: '',
            signupErrorMsg: '',
            // Vérification des entrées utilisateur
            nameRegex: /^[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ- ']{1,30}$/,
            emailRegex: /^[a-z0-9._-]+@[a-z0-9.-]{2,}[.][a-z]{2,3}$/,
            passwordRegex: /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20})$/,
        }
    },
    methods:{
        // Envoi des informations utilisateur vers la Backend pour créer un nouveau compte
        signUp() {
            let emailCheck = this.emailRegex.test(this.email);
            let usernameCheck = this.nameRegex.test(this.username);
            let passwordCheck = this.passwordRegex.test(this.password);
            if (emailCheck == false) {
                this.signupErrorMsg = 'Email invalide'
            } else if (usernameCheck == false) {
                this.signupErrorMsg = 'Username est invalide'
            } else if (passwordCheck == false) {
                this.signupErrorMsg = 'Mot de passe doit contenir entre 6 et 20 caractères, minimum 1 majuscule, 1 minuscule et 1 chiffre'
            } else {
                const userData = new FormData();
                userData.append('email', this.email);
                userData.append('username', this.username);
                userData.append('password', this.password);
                console.log(userData)
                axios.post('http://localhost:3000/api/users/register', {  
               
                    email: this.email,
                username: this.username,
                password: this.password,
                
            })
        
            }
            this.$router.push('/login')
}}}
</script>

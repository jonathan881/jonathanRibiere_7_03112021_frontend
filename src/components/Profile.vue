<template>
    <div class="profileComponent">
        <section class="profile-container">
            <h1 >Mes coordonnées</h1>
            <div class="profileInfos">
                <p class="profileInfo"><span class="profileInfo-span">username: </span>{{profileInfos.username}}</p>
                <p class="profileInfo"><span class="profileInfo-span">E-mail: </span>{{profileInfos.email}}</p>
            </div>
        </section>
        <!-- Modification des coordonnées utilisateur -->
        <section class="form-container">
            <h1 class="updateProfileTitle">Modifier mon profil</h1>
            <form @submit.prevent="updateProfile"  id="form" class="validation">
                <div class="form-input">
                    <label for="username"></label>
                    <input type="text" v-model="username" name="username" id="username" placeholder="Nouveau username">
                </div>
                <div class="submitContainerBtn">
                    <input type="submit" class="submitBtn" @click="updateProfile" value="Modifier">
                    <button class="deleteProfileBtn" @click="deleteProfile">Supprimer</button>
                </div>
                <div class="ContainerMsgErr">
                    <p class="updateProfileErrMsg">{{ updateProfileErrMsg }}</p>
                </div>
            </form>
        </section>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Profile',
    data () {
        return {
            // Récupérer les inputs grâce à v-model
            profileInfos: '',
            username: '',
            updateProfileErrMsg: '',
            deleteProfileErrorMsg: '',
            // Verification des entrés utilisateur
            nameRegex: /^([a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ- ']{1,30})?$/,
        }
    },
    // Si l'utilisateur est introuvable, afficher la page login
    created() {
        if (localStorage.getItem('token') === null) {
            this.$router.push('/login')
        }
    },
    // Récupérer les informations de l'utilisateur du Backend
    mounted() {
        axios.get('http://localhost:3000/api/users/profile', {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}})
        .then(res => {
            console.log(res);
            this.profileInfos = res.data;
           
        }, err => {
            console.log(err.response);
            this.$router.push('/login')
            this.error = err.response.data.error;
        })
    },
    methods: {
        // Modification du profil utilisateur
        updateProfile() {
            let usernameCheck = this.nameRegex.test(this.username);
            if (usernameCheck == false) {
                this.updateProfileErrMsg = 'Username est invalide'
            } else {
                const formData = new FormData();
                formData.append('username', this.username);
                console.log(formData);
                axios.put('http://localhost:3000/api/users/update', formData, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}})
                .then(res => {
                    console.log(res);
                    this.updateProfileErrMsg = '',
                    this.username = '';
                    this.updatedProfile()
                }, err => {
                    console.log(err.response);
                    this.updateProfileErrMsg = err.response.data.error;
                })
                }
        }, 
        // Redemader les informations utilisateur (modifiées) au Backend
        updatedProfile() {
            axios.get('http://localhost:3000/api/users/profile', {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}})
            .then(res => {
                console.log(res);
                this.profileInfos = res.data;
                
            }, err => {
                console.log(err.response);
                this.$router.push('/login')
                this.error = err.response.data.error;
            })
        },
        // Supprimer le profile (le compte utilisateur)
        deleteProfile() {
            if (confirm("êtes vous sur de supprimer difinitivement votre compte ? Appuyez sur OK pour confirmer")) {
                axios.delete('http://localhost:3000/api/users/delete', {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}})
            .then(res => {
            console.log(res);
            localStorage.clear();
            this.$router.push('/register')
            }, err => {
                console.log(err.response);
                this.deleteProfileErrorMsg = err.response.data.error;
            })
            }
        }
    }
}
</script>

<style scoped>
.profile-container{
  margin-top: 1rem;
}
h1{
  font-size: 1rem;
}
</style>
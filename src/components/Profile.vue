<template>

<div class="">
					<p class="">Pseudo</p>
					<div class=""></div>
					
					<p class="">Email</p>
					<div class="">{{ todo.userId }}</div>
				</div>

				<button @click="modifyProfile" class="">Enregister <i class=""></i></button>
			

   <div class="profile">
      <h1>Pour supprimer votre compte, il suffit de clicker sur se boutton : </h1>
   </div>
   <div>
   <button
        type="button"
         @click="deleteAccount"
         >Supprimer mon compte
     </button>
   </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Profile",
   data(){
    return {
      userId: "",
      };
    },
    created() {
      this.displayProfile();
    },
  //props: ['users'] ,
  methods: {
  //Profil d'un user
    displayProfile() { 
      const userId = localStorage.getItem('userId');
      axios.get('http://localhost:3000/api/users/' + userId, {
        headers: {
						Authorization: 'Bearer ' + localStorage.getItem('token')
					}
				})
    },

    deleteAccount() {
      axios
        .delete("http://localhost:3000/api/users/profile", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(() => {
          localStorage.clear();
          location.replace("http://localhost:3000/api/users/register");
        })
        .catch(error => console.log(error));
        this.$router.push('/login')
    },
  }
  
};
</script>

<style scoped>
h1{
  font-size: 1rem;
}
</style>
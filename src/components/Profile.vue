<template>
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
   data: () => {
    return {
      users: [],
      };
    },

  methods: {
  //Profil d'un user
  async created() {
    try {
      const res = await axios.get("http://localhost:3000/api/users/profile");
      this.users = res.data;
    } catch (e) {
      console.error(e);
    }
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
<template>
<div class="message"> 
<div class="">
            <h1>Que voulez-vous partager aujourd'hui ?</h1>
        </div>
    <form @submit.prevent="createPost" class="form">
        <h2>Titre de votre message :</h2>
        <div>
            <textarea  class="form-control" required placeholder="50 caractères max"
                aria-label="Titre du post"  name="title" v-model="title"
                ></textarea>
        </div>
         <div id="preview" v-if="preview">
                <img class="preview" :src="preview" :alt="preview">
            </div>                        
                <div class="form-group">Choisir une image (jpg, gif, png)> <br>
                <label>Ajouter une photo   <small>(optionnel)</small></label>
                    <input title="post-img" type="file" ref="file"  enctype="multipart/form-data" name="file" class="selectImage"  id="file" @change="selectFile">    
                    </div>

                <div class="form-group">
                    <label>Description</label>
                    <textarea rows="5" required v-model="content" class="form-control"  name="image" placeholder="300 caractères max, sans caractère spécial" ></textarea>
                    </div>
                <br>
                <div class="form-group">
                    <button type="submit" class="btn btn-primary">Envoyer</button>   		       
                    </div>
                <p>{{errMsg}}</p> 
            </form>
            </div>
</template>

<script>
import axios from "axios"
export default {
    name: "NewMessages",
    data() {
        return {
            title: null,
            file: '',
            content: null,
            preview: null,
            errMsg: null,
        }
    },
   methods: {
        selectFile(event) {
            /* sur le onchange on va attribuer cette valeur à file (nécessaire pour l'envoi au backend) */
            this.file = this.$refs.file.files[0]
            let input = event.target
            if(input.files) {
                let reader = new FileReader()
                reader.onload = (e) => {
                    this.preview = e.target.result
                }
                reader.readAsDataURL(input.files[0])
            }
        },
        createPost() {
            /* on peut envoyer un post sans image mais il faut au moins qu'il y est un texte */     
            if (!this.title) {
                this.errMsg = "Error => vous devez remplir le champ titre pour créer une nouvelle publication!"
                return
            } 
            /* on créé un objet formData afin de pouvoir ajouter le texte et surtout le file choisi */
            let formData = new FormData()
            formData.append('title', this.title)
            formData.append('file', this.file)
            formData.append('content', this.content)
            formData.append('userId', localStorage.getItem('userId'))
            axios.post('http://localhost:3000/api/messages/new', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },              
            })  
                .then(() => {
                    //window.location.reload()
                    this.$router.push('/')  
                })          
                .catch(error => console.log(error))
                 
            //this.$router.push('/')       
        },
         
    }
}
</script>
<style  scoped>
.message{
    width: 100%;
}
h1{
    font-size: initial;
}
.form {  
    border: solid 2px;
    border-radius: 10px;
    margin-left: 20%;
    margin-right: 20%;
}
h2{
    font-size: initial;
}
.form-group{
    font-size: small;
}
.selectImage{
    width: 80%;
}
</style>
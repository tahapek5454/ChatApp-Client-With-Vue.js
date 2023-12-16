<template>
    <div class="container p-4">
        <div class="row justify-content-center">
            <div class="col-4">
                <div class="mb-3">
                    <h1>Giriş Yap</h1>
                </div>
                <div class="mb-3">
                    <label for="userName" class="form-label">Kullanıcı Adı</label>
                    <input type="text" class="form-control" id="userName" v-model="user.userName"  @keyup.enter="login">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Şifre</label>
                    <input type="password" class="form-control" id="password" v-model="user.password"  @keyup.enter="login">
                </div>
                <br>
                <button type="button" class="btn btn-secondary" @click="login">Giriş Yap</button>
            </div>
        </div>
    </div>
</template>


<script>

import { defineComponent } from 'vue';


export default defineComponent({

    data(){
        return{
            user: {
                userName: null,
                password: null 
            }
        }
    },
    methods:{
        login(){
            if(this.user.userName != null  && this.user.password != null){
                this.$store.commit('setUser', this.user);

                this.$appAxios.get(`Users/${this.user.userName}`).then(a => {
                    console.log(a);
                    if(a.data.userName !== "")
                        this.$router.push('/');
                    else
                        this.$router.push('/register');
                });
            }
        }
    }

})
</script>
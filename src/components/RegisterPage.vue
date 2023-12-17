<template>
    <div class="container p-4">
        <div class="alert alert-warning" role="alert">
             {{ info }}
        </div>

        <div class="row justify-content-center">
            <div class="col-4">
                <div class="mb-3">
                    <h1>Kayıt Ol</h1>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" v-model="user.email"  @keyup.enter="register">
                </div>
                <div class="mb-3">
                    <label for="userName" class="form-label">Kullanıcı Adı</label>
                    <input type="text" class="form-control" id="userName" v-model="user.userName"  @keyup.enter="register">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Şifre</label>
                    <input type="password" class="form-control" id="password" v-model="user.password"  @keyup.enter="register">
                </div>
                <br>
                <div class="d-flex justify-content-between">
                    <button type="button" class="btn btn-secondary" @click="register">Üye Ol</button>
                    <button type="button" class="btn btn-primary" @click="()=> $router.push('/login')">Zatem Bir Hesabım Var</button>
                </div>
            </div>

        </div>

        <div v-if="danger" class="alert alert-danger" role="alert">
             {{ danger }}
        </div>
    </div>
</template>


<script>
import { defineComponent } from 'vue';

export default defineComponent({

    data(){
        return{
            user: {
                email: null ,
                userName: null ,
                password: null ,
            },
            info : "Resmi bir mail girmenize gerek yoktur. Uygulama Kullanıcı Adını referans alarak çalışır.",
            danger : null
        }
    },
    methods:{
        register(){
            if(this.user.userName != null  && this.user.password != null){
                this.$store.commit('setUser', this.user);

                this.$appAxios.post("Users", this.user).then(a => {
                    console.log(a);
                    if(a.data == -1){
                        console.log("sadsad");
                        this.danger = "Kullanıcı adı zaten kayıtlı lütfen başka bir kullanıcı adı giriniz."
                        return 
                    }
                    this.$router.push('/');
                });

            }
        }
    }

})
</script>
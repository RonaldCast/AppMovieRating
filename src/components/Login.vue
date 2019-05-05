<template>
    <div>
        <div class="login">
            <a  @click="facebook" class="btn facebook" >Login with Facebook</a>
            <a class="btn google" @click="google"> LOGIN WITH GOOGLE</a>
        </div>

        
        <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field id="email" v-model="email" label="Email" :rules="emailRules" required></v-text-field>
            <v-text-field id="password" label="Password" v-model="password" required></v-text-field>
            <v-btn id="login" @click="submit" :disabled="!valid">submit</v-btn>
            <v-btn id="clear_input" @click="clear"> clear </v-btn>
        </v-form>
    </div>
</template>
<script>
import axios from 'axios'
import bus from '../bus.js'

export default {
    data(){
        return{
            valid: true,
            email: '',
            password: '',
            emailRules:[
                v => !!v || 'E-mail is required',
                v => /\S+@\S+\.\S+/.test(v) || 'E-mail must be valid',

            ]
        }
    }, 
    methods:{
        async submit(){
           
            return axios({
               method: 'post',
               data:{
                   email: this.email,
                   password: this.password
               },
               url: '/users/login',
               headers  :{
                   'Contect-Type': 'application/json',
               }, 
            })
            .then((response) => {
                window.localStorage.setItem('auth', response.data.token);
                this.$swal('Great!', 'You are ready to start!', 'success');
                bus.$emit('refreshUser')
                this.$router.push({name: 'Home'})
            })
            .catch((error) => {
                const message = error.response.data.message;
                this.$swal('oh oo!', `${message}`, 'error');
                this.$router.push({name: 'Login'})
            })
        },
        clear(){
            this.$refs.form.reset();
        },

        facebook(){
            return axios({
                method: 'GET', 
                url:'/login/facebook',
                headers:{
                     'Content-Type': 'application/json',
                     'Access-Control-Allow-Origin': '*'
                }
            })
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error)
            })

            
        }, 
        google(){
                return axios({
                                method: 'GET', 
                                url:'/login/google',
                                headers:{
                                    'Content-Type': 'application/json',
                                }
                            })
                            .then((response) => {
                                console.log(response.data)
                            })
                            .catch((error) => {
                                console.log(error)
                            })
        }


    }
}
</script>
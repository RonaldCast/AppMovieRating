<template>
    <div>
        <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field label="Name" v-model="name" required></v-text-field>
            <v-text-field label="Email" v-model="email" :rules="emailRules" required></v-text-field>
            <v-text-field label="Password" v-model="password" required></v-text-field>
            <v-text-field label="confirm Password" v-model="confirm_password"></v-text-field>
            <v-btn @click="submit" :disabled="!valid"> submit </v-btn>
            <v-btn @click="clear">clear</v-btn>
        </v-form>
    </div>
</template>
<script>
/* eslint-disable */

import axios from 'axios';

export default {

    data() {
        return {
           valid: true,
            name: '',
            email: '',
            password: '',
            confirm_password: '',
            emailRules:  [ v => !!v || 'E-mail is required', v => /\S+@\S+\.\S+/.test(v) || 'E-mail must be valid'] 
        }
    },

    methods:{
        async submit() {
            if (this.$refs.form.validate()) {
                return axios({
                    method: 'post',
                    data:{
                        name: this.name,
                        email: this.email,
                        password: this.password
                    },
                    url:'/users/register',// /users/register
                    headers:{
                        'Content-Type':'application/json',
                    },
                })
                .then(() =>{
                    this.$swal(
                        'Great!',
                        'You have been succesfully registerd!',
                        'success',
                    );
                    this.$router.push({name: 'Login'});
                })
                .catch((error) => {
                    const message = error.response.data.message;
                    this.$swal('Oh oo!',`${message}`, 'error');
                })
            }
        },
    },
    clear() {
        this.$refs.form.reset();
    },

}
</script>



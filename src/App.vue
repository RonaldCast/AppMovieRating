<template>
  <v-app id="inspire">
    <v-navigation-drawer fixed v-model="drawer" app>
      <v-list class="list" dense>
        <router-link v-bind:to="{ name: 'Home' }" class="side_bar_link">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon id="home">home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>Home</v-list-tile-content>
          </v-list-tile>
        </router-link>
        <router-link v-bind:to="{ name: 'Contact' }" class="side_bar_link">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon id="contact">contact_mail</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>Contact</v-list-tile-content>
          </v-list-tile>
        </router-link>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon id="drawer" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Home</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn id="add_movie_link" flat :to="{name: 'AddMovie' }" v-if="current_user">
          Add Movie
        </v-btn>
        <v-btn id="user_email" flat v-if="current_user">
          {{current_user.email}}
        </v-btn>
        <v-btn flat v-bind:to="{ name: 'Register' }" v-if="!current_user" id="register_btn">
          Register
        </v-btn>
        <v-btn flat v-bind:to="{ name: 'Login' }" v-if="!current_user" id="login_btn">Login</v-btn>
        <v-btn id="logout_btn" flat v-if="current_user" @click="logout">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <v-container fluid>
        <div id="app">
          <router-view/>
        </div>
      </v-container>
    </v-content>

    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
/* eslint-disable */ 
  import './assets/stylesheets/main.css'
  import axios from 'axios'
  import bus from './bus.js'

  export default {
    props: {
      source: String
    },
    data() {
      return {
        drawer: null,
        current_user: null
      }
    },
    mounted(){
      this.fetchUsers()
      this.listenToEvents()
    },
    methods:{
      listenToEvents(){
        bus.$on('refreshUser', () => {
          this.fetchUsers();
        })
      },
      async fetchUsers(){
        return axios({
          method: 'get',
          url: '/api/current_user'
        })
        .then((response) => {
            this.current_user = response.data.current_user;
        })
        .catch(() => {
        });

      },

      logout(){
        return axios({
          method: 'get',
          url: '/api/logout'
        })
        .then(() => {
          bus.$emit('refreshUser');
          this.$router.push({name: 'Home'})
           
        })
        .catch((err) => {
          console.log(err)
        })
      }
    }
  }
</script>

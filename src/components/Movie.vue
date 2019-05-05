<template>
    <v-layout row wrap>
        <v-flex  xs4>
            <v-card>
                <v-card-title primary-title>
                    <div>
                        <div class="headline">
                               {{movie.name}}
                        </div>
                        <span class="grey--text">
                            {{movie.release_year}}  ‧ {{movie.genre }}
                        </span>
                    </div>
                </v-card-title>
                <h6 id="rate_movie" class="card-title" v-if="currente_user" @click="rate">Rate this movie</h6>
                <v-card-text>
                    {{ movie.description }}
                </v-card-text>
            </v-card>
        </v-flex>
        
    </v-layout>
</template>
<script>
import axios from 'axios'
import StarRating from 'vue-star-rating'
import Vue from 'vue';

const wrapper = document.createElement('div')

//shared srate
const state = {
    note: 0, 
};

//crate component to content 
const RatingComponent = Vue.extend({
    data(){
        return{
            rating: 0
        }
    },
    watch:{
        rating(newVal){
            state.note = newVal;
        },
    },
    template:`
     <div class="rating">
         How was your experience getting help with this issues?
        <star-rating v-model="rating" :show-rating="false"></star-rating>
     </div>
    `,
    components:{'star-rating': StarRating}
})

const component = new RatingComponent().$mount(wrapper)

export default {
    name:'Movie',
    data() {
        return {
            movie:[]
        }
    },
    mounted() {
        this.fetchMovie()
    },
    methods: {
        async rate(){
            this.$swal({
                content: component.$el,
                buttons:{
                    confirm:{
                        value: 0
                    }
                }
            }),then(() => {
                return axios({
                    method: 'post',
                    data:{
                        rate:stare.note
                    },
                    url:`/movies/rate/${movieId}`,
                    headers:{
                        'Content-Type': 'application/json'
                    }
                }).then(() => {
                    this.$swal(`Thank you for rating! ${state.note}`, 'success');
                })
                .catch((error) => {
                    const message = error.response.data.message;
                    this.$swal('Oh oo!', `${message}`, 'error');
                })
                
            })
        },
        async fetchMovie(){
            return axios ({
                method: 'get',
                url: `/api/movies/${this.$route.params.id}`
            })
            .then((response) => {
                this.movie = response.data;
            })
            .catch(() => {

            })
        }
    },
}
</script>

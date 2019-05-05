/* eslint-disable */

import Vue from 'vue'
import Contact from '@/components/Contact'
const expect = require('chai').expect

describe('Contact vue', function(){
    it('should render correct contents', () => {
        const Constructor = Vue.extend(Contact);
        const vm = new Constructor().$mount();
        expect(vm.$el.querySelector('.contact h1').textContext)
        .to.equal('this is contact')

    })
})

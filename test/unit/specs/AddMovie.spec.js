/* eslint-disable */

import Vue from 'vue';
import AddMovie from '@/components/AddMovie'
const expect = require('chai').expect

describe('AddMovie', () => {
    let cmp, vm;

    beforeEach(() => {
        cmp = Vue.extend(AddMovie)
        vm = new cmp({
            data:{
                years: ['2018', '2017', '2016', '2015']
            }
        }).$mount()
    })

    it('equal year to ["2018", "2017", "2015"]', () => {
        console.log(vm.years)

        expect(vm.years).to.eql(['2018', '2017', '2016', '2015'])
    })

    it('has submit() method', () => {
        assert.deepEqual(typeof vm.submit, 'function')
    })

    it('has a clear method', () =>{
        assert.deepEqual(typeof vm.clear, 'function')
    })
})
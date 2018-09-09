import Vue from 'vue';
import MulChooser from '@/components/mul-chooser'

const seed = {
  MulChooser
}

Object.keys(seed).forEach(key => {
  Vue.component(key, seed[key]);
});

export default seed;

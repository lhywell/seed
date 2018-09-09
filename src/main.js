import Vue from 'vue';
import MulChooser from '@/components/mul-chooser'

const tdseed = {
  MulChooser
}

Object.keys(tdseed).forEach(key => {
  Vue.component(key, tdseed[key]);
});

export default tdseed;

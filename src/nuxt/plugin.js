import Vue from "vue";
import TwicPics from "@twicpics/components/vueXXX";
const options = JSON.parse( `<%= JSON.stringify(options) %>` );

export default () => {
    Vue.use( TwicPics, options );
};

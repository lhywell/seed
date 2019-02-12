<template>
    <div id="ex-mul-chooser">
        <mul-chooser v-model="indexs" :data="this.officeListState" :disable="false" @on-change="_onChooserChange"></mul-chooser>
    </div>
</template>
<script>
export default {
    data() {
        return {
            indexs: [],
            officeListState: []
        }
    },
    created() {
        this.getDistrictPromise()
            .then((res) => {
                this.officeListState = res.data.data;
                this.indexs = [0, 1]
            })
    },
    methods: {
        _onChooserChange(val) {
            console.log(val);
        },
        getDistrictPromise() {
            let origin = location.origin;
            let url = origin + '/static/chooser.json';

            let config = {
                method: 'get',
                url: url
            }

            return this.$axios(config);
        },
        getDistrict(responseA) {

        },
    }
}

</script>
<style>
#ex-mul-chooser #MulChooser {}

</style>

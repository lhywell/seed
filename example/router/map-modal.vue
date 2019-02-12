<template>
    <div id="ex-map-modal">
        <Button @click="open" class="">打开弹出框</Button>
        <map-modal v-model="isShow" :data="editItem" :map="this.map" @on-cancel="handleCancel" @on-submit="handleSubmit"></map-modal>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isShow: false,
            editItem: {
                id: 152,
                userId: 10019,
                name: '天使之橙',
                poiid: [],
                event: {
                    clientX: 0,
                    clientY: 0
                }
            },
            map: null
        }
    },
    created() {

    },
    methods: {
        open(e) {
            this.editItem.event.clientX = e.clientX;
            this.editItem.event.clientY = e.clientY;

            this.isShow = true;
        },
        handleCancel(val) {
            console.log(val);
            this.isShow = false;
        },
        handleSubmit(val) {
            console.log(val);
            this.isShow = false;
        }
    }
}

</script>
<style>


</style>

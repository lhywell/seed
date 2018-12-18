<template>
    <div id="MulChooser">
        <div class="chooser-select">
            <span class="all" :class="{allActive:allActive}" @click="selectAll">全选</span>
            <span class="cancel" :class="{cancelActive:cancelActive}" @click="cancelAll">取消选择</span>
        </div>
        <div class="chooser-list">
            <ul>
                <li v-for="(item,index) in data" :class="{'active':checkActive(index)}" @click="toggleSelection(index)">
                    <span v-if='item.name.length > 4' :title='item.name'>{{item.name.substr(0,3)}}...</span>
                    <span v-else>{{item.name}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import _ from 'lodash';

export default {
    name: 'MulChooser',
    mixins: [],
    components: {},
    props: {
        value: {
            type: Array,
            default: function() {
                return [];
            }
        },
        data: {
            type: Array,
            default: function() {
                return [];
            }
        },
        disable: {
            type: Boolean,
            default: function() {
                return false;
            }
        }
    },
    data() {
        return {
            nowIndex: [],
            allActive: true,
            cancelActive: false,
        }
    },
    computed: {},
    watch: {
        value(val, oldVal) {
            this.nowIndex = val;
        }
    },
    mounted() {},
    methods: {
        selectAll() {
            if (this.disable) {
                return;
            }
            this.cancelActive = false;
            this.allActive = !this.cancelActive;

            this.nowIndex.splice(0);
            //全部选中
            this.data.map((item, index) => {
                this.nowIndex.push(index)
            })
            this.$emit('on-change', this.nowIndex)
        },
        cancelAll() {
            if (this.disable) {
                return;
            }
            this.cancelActive = true;
            this.allActive = !this.cancelActive;

            //全部置灰
            this.nowIndex.splice(0);
            this.$emit('on-change', this.nowIndex)
        },
        toggleSelection(index) {
            if (this.disable) {
                return;
            }
            if (this.nowIndex.indexOf(index) === -1) {
                this.nowIndex.push(index)
            } else {
                this.nowIndex = _.remove(this.nowIndex, (idx) => {
                    return idx !== index;
                })
            }
            this.$emit('on-change', this.nowIndex)

            //1.所有行政区被选中时，「全选」不可点击
            //2.所有行政区未被选中时，「取消选择」按钮不可点击
            //3.行政区部分选中时，「全选」「取消选择」均可点击
            let nowLen = this.nowIndex.length;
            let len = this.data.length;
            if (nowLen === len) {
                this.allActive = true;
            } else {
                this.allActive = false;
            }
            if (nowLen === 0) {
                this.cancelActive = true;
            } else {
                this.cancelActive = false;
            }
        },
        checkActive(index) {
            return this.nowIndex.indexOf(index) !== -1;
        }
    }
}

</script>
<style>
</style>
<style scoped>
@import '../../assets/css/mul-chooser/mul-chooser.css';

</style>
<style>
#editCanvas {
    .ivu-modal-mask {
        background-color: inherit;
    }
}
</style>

<template>
    <div class="ivu-selectgroup" ref="ivu-selectgroup">
        <div class="group" v-for="(item,index) in count" :key="item.id" :class="{super:item.list.length > 1}">
            <!-- index代表組， -->
            <single-condition ref="single-condition" v-model="conditionModel" v-for="(x,y) in item.list" :key="x.id" :index="[index,y]" :data="data" @on-plus="plusCondition" @on-minus="minusCondition" @on-change="changeCondition" class="and" :class="{last:y===item.list.length-1,or:isRelation === 'union'}"></single-condition>
            <template v-if="item.list.length > 1">
                <div class="relation" @click="toggleRelation(index)">
                    <span class="intersection" :class="{active:isRelation==='intersection'}" ref="relation">交</span>
                    <span class="union" :class="{active:isRelation==='union'}" ref="union">并</span>
                </div>
                <span class="line-top"></span>
                <span class="line-bottom"></span>
                <span class="line-left"></span>
            </template>
        </div>
    </div>
</template>
<script>
import singleCondition from './single-condition'
import utils from '@/lib/utils';

export default {
    mixins: [],
    name: 'select-group',
    props: {
        data: {
            type: Object,
            default: function() {
                return {};
            }
        },
        /*
         * 负责展示
         * count:[[{
             id:Number,
             list:Array
         },{}],[{}],[{}]]
         *数组中每项代表条件组[{}]，每个条件组下可以再分条件项对象,每个对象有id属性表示随机数，list属性表示条件项
         */
        count: {
            type: Array,
            default: function() {
                return [];
            }
        },
        /*
         * 负责导出条件数据
         * filters.conditionGroups:[{
                relation:String,
                conditions:Array
            },{},{}]
         *数组每项代表条件组，每个条件组对象有一个relation属性表示交集还是并集,每个conditions下可以再分条件项，
         */
        filters: {
            type: Object,
            default: function() {
                return {};
            }
        },

    },
    data() {
        return {
            conditionModel: {},
            isRelation: 'intersection',
        }
    },
    computed: {},
    watch: {},
    components: {
        singleCondition
    },
    created() {},
    activated() {},
    deactivated() {},
    mounted() {},
    updated() {},
    methods: {
        changeCondition(obj) {
            let index = obj.index[0],
                subIndex = obj.index[1],
                c = obj.condition;

            let ojt = this.filters.conditionGroups[index];
            if (ojt['conditions'] === undefined) {
                ojt['conditions'] = [];
            }
            ojt['conditions'][subIndex] = c;
        },
        minusCondition(x) {
            let index = x[0],
                subIndex = x[1];

            //剩余最后一项,刪除掉整个组
            let c = this.count[index];
            if (c['list'].length === 1) {
                this.count.splice(index, 1);

                this.filters.conditionGroups.splice(index, 1);

                this.$emit('on-minus', true);
                return;
            }
            this.$emit('on-minus', false);
            c['list'].splice(subIndex, 1);

            let f = this.filters.conditionGroups[index];
            if (f['conditions'].length === 2) {
                //属性赋值为空
                f['relation'] = '';
            }
            if (f) {
                f['conditions'].splice(subIndex, 1);
            }
        },
        plusCondition(x) {
            let index = x[0],
                subIndex = x[1];

            let item = this.count[index].list;

            item.push({
                id: utils.random()
            });

            let f = this.filters.conditionGroups[index];
            f['conditions'].push({});
            if (f['conditions'].length >= 1 && f['relation'] === '') {
                f['relation'] = 'and';
            }
            this.$emit('on-plus');
        },
        toggleRelation() {
            if (this.isRelation === 'intersection') {
                this.isRelation = 'union';
                this.filters.conditionGroups[0]['relation'] = 'or';
            } else {
                this.isRelation = 'intersection';
                this.filters.conditionGroups[0]['relation'] = 'and';
            }
        }
    }
}

</script>
<style scoped>
.ivu-selectgroup {
    padding: 0 24px;
    margin-top: 0;
    height: 100%;
    min-height: 140px;
    font-size: 13px;
    .group {
        position: relative;
        border-bottom: 1px solid rgba(23, 35, 61, 0.10);
        .relation {
            position: absolute;
            left: -10px;
            top: 50%;
            margin-top: -20px;
            border-radius: 2px;
            border: 1px solid #AC3FC0;
            z-index: 1;
            font-size: 12px;
        }
        .intersection {
            background: #fff;
            width: 24px;
            height: 20px;
            display: block;
            color: #AC3FC0;
            line-height: 20px;
            text-align: center;
            cursor: pointer;
        }
        .intersection.active {
            background: #AC3FC0;
            width: 24px;
            height: 20px;
            display: block;
            color: #fff;
            line-height: 20px;
            text-align: center;
            cursor: pointer;
        }
        .union {
            background: #fff;
            width: 24px;
            height: 20px;
            display: block;
            color: #AC3FC0;
            line-height: 20px;
            text-align: center;
            cursor: pointer;
        }
        .union.active {
            background: #AC3FC0;
            width: 24px;
            height: 20px;
            display: block;
            color: #fff;
            line-height: 20px;
            text-align: center;
            cursor: pointer;
        }
        .line-top {
            position: absolute;
            left: 8px;
            top: 32px;
            border-top: 1px solid rgba(23, 35, 61, 0.10);
            border-left: 1px solid rgba(23, 35, 61, 0.10);
            width: 24px;
            height: calc(100% - 64px);
            /*減去两个32px*/
        }
        .line-bottom {
            position: absolute;
            left: 8px;
            bottom: 32px;
            border-top: 1px solid rgba(23, 35, 61, 0.10);
            width: 24px;
        }
        .line-left {
            position: absolute;
            left: 8px;
            top: 0;
            border-left: 1px solid rgba(23, 35, 61, 0.10);
        }
    }
    .group:last-child {
        border-bottom: 0;
    }
    .super {
        padding: 0 0 0 32px;
        .ivu-condition {
            border-bottom: 1px solid #E3E3E3;
            position: relative;
        }
        .ivu-condition:after {
            position: absolute;
            left: 50%;
            bottom: -9px;
            margin-left: -20px;
            width: 40px;
            height: 20px;
            line-height: 20px;
            background: #fff;
            text-align: center;
        }
        .and:after {
            content: 'and';
        }
        .or:after {
            content: 'or';
        }
        .last {
            border-bottom: 0;
        }
        .last:after {
            content: '';
        }
    }
}

</style>
<style type="text/css">


</style>

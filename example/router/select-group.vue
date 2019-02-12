<template>
    <div class='ex-select-group'>
        <div v-if="visible">
            <Button type="primary" class="add" style="width:134px" @click="addCondition">
                <Icon type="plus-round"></Icon>添加筛选条件
            </Button>
        </div>
        <select-group ref="selectGroup" :data="conditionData" :count='count' :filters="filters" @on-minus="onMinus"></select-group>
        <Button type="primary" class="submit" :class="{disabled:this.count.length===0}" @click="submit">开始筛选</Button>
        <a href="javascript:void(0)" v-if='this.count.length !== 0' class="clear" @click="clearConditions">清空条件</a>
    </div>
</template>
<script>
import utils from '@/lib/utils';
import classification from '../data/classification';
export default {
    data() {
        return {
            visible: true,
            conditionData: {},
            count: [],
            filters: {
                groupRelation: 'and',
                conditionGroups: []
            },
        }
    },
    mounted() {

    },
    methods: {
        addCondition() {
            this.conditionData = Object.assign({}, {
                custom: [{
                    'key': '距离',
                }],
                installation: classification
            });
            this.visible = false;
            this.addGroup();
        },
        addGroup() {
            this.count.push({
                id: utils.random(),
                list: [{}]
            });

            this.filters.conditionGroups.push({
                relation: '',
                conditions: []
            });
        },
        onMinus(x) {
            console.log(x)
            if (x) {
                this.visible = true;
            }
        },
        submit() {
            //验证方法
            let ary = [];
            this.$refs['selectGroup'].$refs['single-condition'].map(item => {
                item.validate((valid) => {
                    if (valid === false) {
                        //如果未验证通过，数组里插入任意一个值
                        ary.push(0);
                    }
                });
            });

            //全部验证通过
            if (ary.length === 0) {
                console.log('全部验证通过', this.filters)
            }
        },
        clearConditions() {
            this.visible = true;
            this.count.splice(0);
            this.recValue = '';
            this.filters.conditionGroups.splice(0);

            this.$emit('on-clear');
        },
    }
}

</script>
<style scoped>


</style>
<style>
.ex-select-group {
    width: 672px;
}

</style>

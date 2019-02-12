<template>
    <div class="ivu-condition">
        <div class="condition-group">
            <template>
                <div class="type">
                    <Select v-model="obj.classification" style="width:100px" :class="{error:error.type}" transfer @on-change="changeType">
                        <Option v-for="item in newData.typeList" :value="item.value" :key="item.value">{{item.label}}</Option>
                    </Select>
                    <!-- 选择设施 -->
                    <template>
                        <div v-if="obj.classification === 'poi'" style="display: inline-block;">
                            <Cascader style="width:200px" transfer :data="newData.installation" v-model="obj.installation" :class="{error:error.installation}" @on-change="changeCascader"></Cascader>
                        </div>
                        <div v-if="obj.classification === 'poi' && obj.installation.length > 0" style="display: inline-block;">
                            <div class="distance">
                                <div class="l">
                                    <span>距离</span>
                                    <i class="ivu-icon ivu-icon-arrow-down-b ivu-select-arrow"></i>
                                </div>
                                <div class="r">
                                    <Select v-model="obj.distance" style="width:90px" :class="{error:error.distance}" transfer @on-change="changeDistanceM">
                                        <Option v-for="item in newData.distanceMList" :value="item.value" :key="item.value">{{item.label}}</Option>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div v-if="obj.classification === 'poi' && obj.installation.length > 0 && obj.distance !== 0" class="opration" style="display: inline-block;">
                            <Select v-model="obj.numCompareSymbol" style="width:90px" :class="{error:error.numCompareSymbol}" transfer @on-change="changeOperation">
                                <Option v-for="item in newData.operationList" :value="item.value" :key="item.value">{{item.label}}</Option>
                            </Select>
                            <div class="r">
                                <Input v-model.number="obj.num" placeholder="-" style="width: 60px" :class="{error:error.num}"></Input><span>个</span>
                            </div>
                        </div>
                    </template>
                    <!-- 选择我的门店 -->
                    <template>
                        <div class="myshop" v-if="obj.classification === 'store'">
                            <Select v-model="obj.customParam" style="width:120px" :class="{error:error.customParam}" transfer @on-change="changeStoreParam">
                                <Option v-for="item in newData.custom" :value="item.key" :disabled="item.disabled" :key="item.key">{{item.key}}</Option>
                            </Select>
                        </div>
                        <div v-if="obj.classification === 'store' && obj.customParam ==='距离'" style="display: inline-block;">
                            <!-- 选我的门店,选择距离 -->
                            <Select v-model="obj.customValue" style="width:90px" :class="{error:error.customValue}" transfer @on-change="changeStoreDistance">
                                <Option v-for="item in newData.distanceMList" :value="item.value" :key="item.value">{{item.label}}</Option>
                            </Select>
                        </div>
                        <div v-if="obj.classification === 'store' && obj.customParam === '距离' && obj.customValue > 0" class="opration" style="display: inline-block;">
                            <Select v-model="obj.numCompareSymbol" style="width:90px" :class="{error:error.numCompareSymbol}" transfer @on-change="changeOperation">
                                <Option v-for="item in newData.operationList" :value="item.value" :key="item.value">{{item.label}}</Option>
                            </Select>
                            <div class="r">
                                <Input v-model.number="obj.num" placeholder="-" style="width: 60px" :class="{error:error.num}"></Input><span>个</span>
                            </div>
                        </div>
                        <div v-if="obj.classification === 'store' && obj.customParam !=='距离' && obj.customParam !=='' && customShow" style="display: inline-block;">
                            <!-- 选我的门店,未选择距离,多选 -->
                            <Select v-model="obj.customValue" multiple :style="'width:'+newData.customList.length*80+'px;max-width:200px;'" :class="{error:error.customValue}" transfer @on-change="changeCustom">
                                <Option v-for="item in newData.customList" :value="item" :key="item">{{item}}</Option>
                            </Select>
                        </div>
                        <div class="myshop" v-if="obj.classification === 'store' && obj.customParam !=='距离' && obj.customParam !=='' && !customShow" style="display: inline-block;">
                            <Select v-model="obj.customSymbol" style="width:90px" :class="{error:error.customSymbol}" transfer @on-change="changeCustomSymbol">
                                <Option v-for="item in newData.operationList" :value="item.value" :key="item.value">{{item.label}}</Option>
                            </Select>
                            <!-- 选我的门店,未选择距离,输入框 -->
                            <Input class="customValue" v-model.number="obj.customValue" :class="{error:error.customValue}" placeholder="0" style="width: 60px"></Input>
                        </div>
                    </template>
                    <!-- 选择增益排斥品牌 -->
                    <template>
                        <div class="zengyi" v-if="obj.classification.length >0 && obj.classification !== 'store' && obj.classification !== 'poi'">
                            <div class="distance">
                                <div class="l">
                                    <span>距离</span>
                                    <i class="ivu-icon ivu-icon-arrow-down-b ivu-select-arrow"></i>
                                </div>
                                <div class="r">
                                    <Select v-model="obj.distance" style="width:90px" :class="{error:error.distance}" transfer @on-change="changeDistanceM">
                                        <Option v-for="item in newData.distanceMList" :value="item.value" :key="item.value">{{item.label}}</Option>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div v-if="obj.classification.length >0 && obj.classification !== 'store' && obj.classification !== 'poi' && obj.distance !== 0" class="opration" style="display: inline-block;">
                            <Select v-model="obj.numCompareSymbol" style="width:90px" :class="{error:error.numCompareSymbol}" transfer @on-change="changeOperation">
                                <Option v-for="item in newData.operationList" :value="item.value" :key="item.value">{{item.label}}</Option>
                            </Select>
                            <div class="r">
                                <Input v-model.number="obj.num" placeholder="-" style="width: 60px" :class="{error:error.num}"></Input><span>个</span>
                            </div>
                        </div>
                    </template>
                </div>
            </template>
        </div>
        <div class="handler">
            <a href="javascript:void(0)" class="subtraction" @click="subtraction">
                <Icon type="minus-round"></Icon>
            </a>
            <a href="javascript:void(0)" class="addition" @click="addition">
                <Icon type="plus-round"></Icon>
            </a>
        </div>
    </div>
</template>
<script>
export default {
    mixins: [],
    name: 'single-condition',
    props: {
        data: {
            type: Object,
            default: function() {
                return {};
            }
        },
        index: {
            type: Array,
            default: function() {
                return [];
            }
        }
    },
    data() {
        return {
            basicData: {
                typeList: [{
                        value: 'poi',
                        label: '设施'
                    },
                    {
                        value: 'store',
                        label: '我的门店'
                    },
                    {
                        value: 'helper',
                        label: '增益品牌'
                    },
                    {
                        value: 'competitor',
                        label: '排斥品牌'
                    }
                ],
                distanceMList: [{
                        value: 100,
                        label: '100米'
                    }, {
                        value: 300,
                        label: '300米'
                    }, {
                        value: 500,
                        label: '500米'
                    }, {
                        value: 800,
                        label: '800米'
                    }, {
                        value: 1000,
                        label: '1000米'
                    },
                    {
                        value: 1500,
                        label: '1500米'
                    }
                ],
                operationList: [{
                        value: '>',
                        label: '大于'
                    },
                    {
                        value: '<',
                        label: '小于'
                    },
                    {
                        value: '=',
                        label: '等于'
                    },
                    {
                        value: '>=',
                        label: '大于等于'
                    },
                    {
                        value: '<=',
                        label: '小于等于'
                    }
                ]
            },
            obj: {
                type: '',
                classification: '',
                distance: 0,
                num: 0,
                numCompareSymbol: '',
                installation: [],
                customParam: '',
                customValue: null,
                customSymbol: ''
            },
            error: {
                type: false,
                installation: false,
                distance: false,
                numCompareSymbol: false,
                num: false,
                customParam: false,
                customValue: false,
                customSymbol: false
            },
            newData: {},
            customShow: null
        }
    },
    computed: {},
    watch: {},
    components: {},
    created() {},
    activated() {},
    deactivated() {},
    mounted() {
        this.newData = Object.assign({}, this.data, this.basicData);
    },
    updated() {},
    methods: {
        changeType() {
            this.$emit('on-change', {
                index: this.index,
                condition: this.obj
            });
            this.clearRed();
            this.validType();

            //https://jira.tendcloud.com/browse/SLBS-797
            this.newData.custom.map(item => {
                if (item.class === 'enum') {
                    if (item.list.length === 0) {
                        item.disabled = true;
                    } else {
                        item.disabled = false;
                    }
                }
            })
        },
        changeCascader(val) {
            this.obj.type = val.join(',');

            this.$emit('on-change', {
                index: this.index,
                condition: this.obj
            });
            this.clearRed();
            this.validCascader();
        },
        changeDistanceM() {
            this.$emit('on-change', {
                index: this.index,
                condition: this.obj
            });
            this.clearRed();
            this.validDistanceM();
        },
        changeStoreDistance() {
            this.$emit('on-change', {
                index: this.index,
                condition: this.obj
            });
            this.clearRed();
            this.validStoreDistance();
        },
        changeCustom() {
            this.$emit('on-change', {
                index: this.index,
                condition: this.obj
            });
            this.clearRed();
            this.validCustom();
        },
        changeCustomSymbol() {
            this.$emit('on-change', {
                index: this.index,
                condition: this.obj
            });
            this.clearRed();
            this.validCustomSymbol();
        },
        changeOperation() {
            this.$emit('on-change', {
                index: this.index,
                condition: this.obj
            });
            this.clearRed();
            this.validOperation();
        },
        changeStoreParam(val) {
            this.obj.customValue = null;
            if (val === '距离') {
                this.obj.customSymbol = '=';
            }
            if (val !== '距离') {
                this.newData.custom.map(item => {
                    if (item.class === 'enum' && val === item.key) {
                        this.customShow = true;

                        this.newData.customList = item.list;
                    }
                    if (item.class === 'number' && val === item.key) {
                        this.customShow = false;
                        this.obj.customValue = 0;
                    }
                })
            }
            this.$emit('on-change', {
                index: this.index,
                condition: this.obj
            });
            this.clearRed();
            this.validStoreParam();
        },
        subtraction() {
            this.$emit('on-minus', this.index);
        },
        addition() {
            this.$emit('on-plus', this.index);
        },
        validType() {
            //报错显示红色
            if (this.obj.classification.length === 0) {
                this.error.type = true;
            } else {
                this.error.type = false;
            }
        },
        validCascader() {
            if (this.obj.type.length === 0) {
                this.error.installation = true;
            } else {
                this.error.installation = false;
            }
        },
        validDistanceM() {
            if (this.obj.distance === 0) {
                this.error.distance = true;
            } else {
                this.error.distance = false;
            }
        },
        validStoreDistance() {
            if (Object.prototype.toString.call(this.obj.customValue) === "[object Null]" || Object.prototype.toString.call(this.obj.customValue) === "[object Undefined]") {
                this.error.customValue = true;
                return;
            }
            if (Object.prototype.toString.call(this.obj.customValue) === "[object Array]" && this.obj.customValue.length === 0) {
                this.error.customValue = true;
                return;
            }
            this.error.customValue = false;
        },
        validCustom() {
            if (Object.prototype.toString.call(this.obj.customValue) === "[object Null]" || Object.prototype.toString.call(this.obj.customValue) === "[object Undefined]") {
                this.error.customValue = true;
                return;
            }
            if (Object.prototype.toString.call(this.obj.customValue) === "[object Array]" && this.obj.customValue.length === 0) {
                this.error.customValue = true;
                return;
            }
            this.error.customValue = false;
        },
        validCustomSymbol() {
            if (this.obj.customSymbol.length === 0) {
                this.error.customSymbol = true;
            } else {
                this.error.customSymbol = false;
            }
        },
        validOperation() {
            if (this.obj.numCompareSymbol.length === 0) {
                this.error.numCompareSymbol = true;
            } else {
                this.error.numCompareSymbol = false;
            }
        },
        validStoreParam() {
            if (this.obj.customParam.length === 0) {
                this.error.customParam = true;
            } else {
                this.error.customParam = false;
            }
        },
        showRed() {
            this.validType();
            if (this.obj.classification === 'poi') {
                this.validCascader();
                this.validDistanceM();
                this.validOperation();
            }
            if (this.obj.classification === 'store') {
                this.validStoreParam();
                this.validStoreDistance();
                this.validOperation();
                this.validCustom();
                this.validCustomSymbol();
            }

            if (this.obj.classification !== 'store' && this.obj.classification !== 'poi') {
                this.validDistanceM();
                this.validOperation();
            }

            if (typeof this.obj.num === 'string') {
                this.error.num = true;
            } else {
                this.error.num = false;
            }
        },
        clearRed() {
            this.error = {
                type: false,
                installation: false,
                distance: false,
                numCompareSymbol: false,
                num: false,
                customParam: false,
                customValue: false,
                customSymbol: false
            };
        },
        valid(isSuccess) {
            //执行回调
            if (this.obj.classification === 'poi') {
                //选中设施
                if (this.error.type === false && this.error.installation === false && this.error.distance === false && this.error.numCompareSymbol === false && this.error.num === false) {
                    //验证成功
                    isSuccess(true);
                } else {
                    //验证失败
                    isSuccess(false);
                }
            }

            if (this.obj.classification === 'store' && this.obj.customParam === '距离') {
                if (this.error.type === false && this.error.customParam === false && this.error.customValue === false && this.error.numCompareSymbol === false && this.error.num === false) {
                    //验证成功
                    isSuccess(true);
                } else {
                    //验证失败
                    isSuccess(false);
                }
            }
            if (this.obj.classification === 'store' && this.obj.customParam !== '距离') {
                if (this.error.type === false && this.error.customParam === false && this.error.customValue === false) {
                    //验证成功
                    isSuccess(true);
                } else {
                    //验证失败
                    isSuccess(false);
                }
            }

            if (this.obj.classification !== 'poi' && this.obj.classification !== 'store') {
                if (this.error.type === false && this.error.distance === false && this.error.numCompareSymbol === false && this.error.num === false) {
                    //验证成功
                    isSuccess(true);
                } else {
                    //验证失败
                    isSuccess(false);
                }
            }

        },
        //父组件调用
        validate(isSuccess) {
            this.showRed();

            this.valid(isSuccess);
        }
    }
}

</script>
<style scoped>


</style>
<style type="text/css">
@define-mixin unit {
    display: inline-block;
    width: 32px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    border: 1px solid var(--border-color);
    margin-left: -1px;
}
.ivu-condition {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 16px 0;

    margin-top: -5px;
    .condition-group {
        .type {
            display: inline-block;
            vertical-align: top;
        }
        .ivu-select,
        .ivu-cascader {
            margin-right: 4px;
            margin-top: 4px;
            vertical-align: top;
        }
        .ivu-cascader {
            display: inline-block;
        }
        .distance {
            display: inline-block;
            margin-right: 4px;
            vertical-align: top;
            .l {
                display: inline-block;
                width: 74px;
                border: 1px solid var(--border-color);
                height: 28px;
                line-height: 28px;
                padding-left: 12px;
                margin-right: 4px;
                margin-top: 4px;
                position: relative;
            }
            .r {
                display: inline-block;
                vertical-align: top;
            }
        }
        .myshop,
        .zengyi {
            display: inline-block;
            vertical-align: top;
            .ivu-select {
                display: inline-block;
                vertical-align: top;
            }
            .customValue {
                margin-top: 4px;
            }
        }
        .zengyi {
            margin-right: 0;
            .distance {
                margin-right: 0;
            }
        }
        .opration {
            display: inline-block;
            margin-right: 4px;

            vertical-align: top;
            .ivu-select {
                display: inline-block;
                vertical-align: top;
            }
            .r {
                display: inline-block;
                vertical-align: top;
                margin-top: 4px;
                span {
                    vertical-align: middle;
                    @mixin unit;
                }
            }
        }
        .ivu-select .ivu-select-selection {
            height: 28px;
        }
        .ivu-select.ivu-select-multiple .ivu-select-selection {
            height: auto;
        }
        .ivu-select-multiple .ivu-tag {
            height: 20px;
            line-height: 20px;
        }
        .ivu-input {
            height: 28px;
        }
        .error {
            .ivu-select-selection {
                border: 1px solid #ed3f14;
            }
            .ivu-input {
                border: 1px solid #ed3f14;
            }
        }
    }
    .handler {
        white-space: nowrap;
        .subtraction,
        .addition {
            width: 28px;
            height: 28px;
            border: 1px solid var(--border-color);
            border-radius: 2px;
            line-height: 28px;
            text-align: center;
            font-size: 12px;
            background: #fff;
            display: inline-block;
            cursor: pointer;
            color: var(--color-icon);
        }
    }
}

</style>

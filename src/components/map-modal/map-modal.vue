<template>
    <Modal v-model="showModal" width="262" :closable="true" :mask-closable="false" title="编辑研究区域" id="editCanvas" ref="editCanvas" class-name="selfModal editModal" @on-cancel="handleCancel('formValidate')">
        <!--内容-->
        <div class="arrow"></div>
        <Form label-position="top" ref="formValidate" :model="formValidate" :rules="ruleValidate">
            <template>
                <Form-item label="区域名称" prop="name">
                    <Input placeholder="请输入区域名称" v-model="formValidate.name"></Input>
                </Form-item>
            </template>
            <template>
                <div class="type">
                    <div class="head">
                        <div class="title">构建方式</div>
                    </div>
                    <RadioGroup v-model="radioModel" @on-change="radioChange">
                        <Radio label="按区域半径"></Radio>
                        <Radio label="按步行时间"></Radio>
                    </RadioGroup>
                </div>
            </template>
            <template v-if="circleShow">
                <div class="time">
                    <div class="head">
                        <div class="title">区域半径</div>
                        <span class="minute">{{scope/1000}}km</span>
                    </div>
                    <div class="slider">
                        <Slider v-model="scope" :step="10" :min="200" :max="3000">
                        </Slider>
                        <div class="text">
                            <span>0.2km</span>
                            <span>1.5km</span>
                            <span>3km</span>
                        </div>
                    </div>
                </div>
            </template>
            <template v-if="!circleShow">
                <div class="time">
                    <div class="head">
                        <div class="title">步行时间</div>
                        <span class="minute">{{scope}} 分钟</span>
                    </div>
                    <div class="slider">
                        <Slider v-model="scope" :step="1" :min="10" :max="30"></Slider>
                        <div class="text">
                            <span>10分钟</span>
                            <span>20分钟</span>
                            <span>30分钟</span>
                        </div>
                    </div>
                </div>
            </template>
        </Form>
        <div slot="footer" class="footer" style="display: flex;">
            <Button type="primary" size="large" @click="handleSubmit('formValidate')">保存</Button>
            <Button type="ghost" size="large" class="cancle" @click="handleCancel('formValidate')">取消</Button>
        </div>
    </Modal>
</template>
<script>
import selfModel from '@/lib/selfModel';

export default {
    name: 'MapModal',
    mixins: [selfModel],
    components: {},
    props: {
        value: {
            type: Boolean,
            default: function() {
                return false;
            }
        },
        data: {
            type: Object,
            default: function() {
                return {};
            }
        },
        map: {
            type: Object,
            default: function() {
                return {};
            }
        }
    },
    data() {
        const validateName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('名称不能为空'));
                return;
            }
            //https://jira.tendcloud.com/browse/SLBS-343
            if (value !== '' && value.length > 16) {
                callback(new Error('研究区域名字不可以超过16个字符'));
                return;
            }
            callback();
        };
        return {
            formValidate: {
                name: '',
            },
            ruleValidate: {
                name: [
                    { validator: validateName, trigger: 'blur' }
                ]
            },
            radioModel: '按区域半径',
            showModal: false,
            circleShow: true,
            storeName: '',
            scope: 200
        }
    },
    computed: {},
    watch: {
        value(val, oldVal) {
            if (val) {
                let shop = this.data;
                this.formValidate.name = shop.name;

                //设置弹出框坐标
                let dom = this.$refs.editCanvas.$el.lastChild;

                this.$nextTick(() => {
                    //==>selfModel.js
                    this.setPosition(shop.event, dom, this.map);
                })

                this.showModal = true;
            } else {
                this.showModal = false;
            }
        }
    },
    created() {},
    mounted() {},
    methods: {
        radioChange(val) {
            if (val === '按区域半径') {
                this.circleShow = true;
                this.scope = 200;
            } else {
                this.circleShow = false;
                this.scope = 10;
            }
        },
        handleCancel(name) {
            try {
                this.$refs[name].resetFields();
            } catch (e) {

            } finally {
                this.$emit('on-cancel');
            }
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let shop = this.data;
                    if (shop.type === 1) {
                        //我的门店
                        if (this.radioModel === '按区域半径') {
                            let obj = {
                                name: this.formValidate.name,
                                ids: this.data.id,
                                type: 'circle',
                                value: this.scope
                            };
                            this.$emit('on-submit', obj);
                        } else {
                            let obj = {
                                name: this.formValidate.name,
                                ids: this.data.id,
                                type: 'walk',
                                value: this.scope
                            };
                            this.$emit('on-submit', obj);
                        }
                    } else {
                        //增益排斥品牌
                        if (this.radioModel === '按区域半径') {
                            let obj = {
                                name: this.formValidate.name,
                                poiIds: [this.data.poiid],
                                type: 'circle',
                                userBrandId: this.data.id,
                                userId: this.data.userId,
                                value: this.scope
                            };
                            this.$emit('on-submit', obj);
                        } else {
                            let obj = {
                                name: this.formValidate.name,
                                poiIds: [this.data.poiid],
                                type: 'walk',
                                userBrandId: this.data.id,
                                userId: this.data.userId,
                                value: this.scope
                            };
                            this.$emit('on-submit', obj);
                        }
                    }

                } else {
                    this.$Message.error('表单验证失败!');
                }
            })
        },
    }
}

</script>
<style>


</style>
<style scoped>
@import '../../assets/css/mapModal/mapModal.css';

</style>
<style>
#editCanvas {
    .ivu-modal-mask {
        background-color: inherit;
    }
    .selfModal {
        color: var(--color-title);
        overflow: inherit;
        .arrow {
            float: left;
            border: 8px solid transparent;
            border-right-color: #fff;
            width: 0;
            height: 0;
            position: absolute;
            top: 35px;
            left: -16px;
            margin-top: -25px;
        }
        .ivu-modal {
            top: 0;
        }
        .ivu-modal-header {
            background: #F8F8F9;
        }
        .ivu-modal-footer {
            border: 0;
        }
        .ivu-modal-header-inner {
            font-size: 14px;
        }

        .ivu-modal-body {
            font-size: 13px;
            .ivu-form-item {
                margin-bottom: 0;
                .ivu-form-item-label {
                    font-size: 13px;
                    color: var(--color-title);
                    font-weight: bold;
                }
            }
            .type {
                margin-top: 20px;
                .head {
                    margin-bottom: 10px;
                    font-weight: bold;
                }
            }
            .time {
                position: relative;
                .head {
                    margin-top: 20px;
                    font-weight: bold;
                    .minute {
                        position: absolute;
                        right: 0;
                        top: 0;
                        font-weight: normal;
                    }
                }
                .slider {
                    .text {
                        display: flex;
                        justify-content: space-between;
                    }
                }
            }
            .footer {
                margin-top: 28px;
                .cancle {
                    border: 0
                }
                .ivu-form-item-content {
                    display: flex;
                    justify-content: flex-end;
                }
                .ivu-btn-large {
                    padding: 4px 15px;
                    font-size: 14px;
                    border-radius: var(--border-radius);
                }
            }
        }
    }

    .ivu-modal-header {
        padding: 10px 16px 6px;
    }
    .ivu-modal-header-inner {
        font-size: 14px;
        width: 88%;
    }
    .ivu-modal-close .ivu-icon-ios-close-empty {
        font-size: 28px;
        top: -2px;
    }
    .ivu-modal-content {
        border-radius: 2px;
        @add-mixin shadow;
    }
}

</style>

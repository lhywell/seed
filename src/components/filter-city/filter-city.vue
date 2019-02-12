<template>
    <div id="filterCity" class="filterCity">
        <div class="search">
            <i class="icon-search"></i>
            <AutoComplete v-model="searchCity" class='select_city_auto' :data="this.searchList" @on-search="searchEnter" placeholder="搜索城市" style="width:160px" :filter-method="filterMethod" @on-select="selectedCity">
            </AutoComplete>
        </div>
        <div class="body">
            <div class="city">
                <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
                    <Checkbox v-for="item in cityArray" :key="item" :label="item"></Checkbox>
                </CheckboxGroup>
            </div>
        </div>
        <div class="footer">
            <div>已选{{num}}个</div>
            <div>
                <div class="cancle" @click="handleCancel">取消</div>
                <Button type="primary" size="large" @click="handleSubmit">更新城市</Button>
            </div>
        </div>
    </div>
</template>
<script>
import citySelect from '@/lib/citySelect';

export default {
    name: 'SelectCity',
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
        }
    },
    data() {
        return {
            searchCity: '',
            num: 0,
            orginList: [],
            searchList: [],
            checkAllGroup: [],
            cityArray: [],
        }
    },
    computed: {},
    watch: {
        data(val, oldVal) {
            if (val.length == 0) {
                this.reset();
            } else {
                //数据从父类传过来
                let tableData = val[0];
                let city = [];
                tableData.map((item, index) => {
                    city.push(item.city);
                });

                //设置右侧选中项
                this.cityArray = _.uniq(city);
            }
        },
        value(val, oldVal) {
            if (val.length > 0) {
                this.checkAllGroup = val;
            }
        }
    },
    created() {},
    mounted() {
        this.getSearchArray();
    },
    methods: {
        getSearchArray() {
            this.orginList = citySelect;

            let array = this.orginList.map((item) => {
                return item.citys;
            });
            //用于搜索
            this.searchList = _.flattenDeep(array);
        },
        searchEnter(x) {},
        filterMethod(keyword, option) {
            return option.indexOf(keyword) !== -1;
        },
        selectedCity(cityName) {
            if (cityName) {
                if (this.checkAllGroup.indexOf(cityName) === -1) {
                    this.checkAllGroup.push(cityName);
                }
            }
        },
        reset() {
            this.checkAllGroup.splice(0);
            this.num = 0;
        },
        checkAllGroupChange(x) {
            this.num = x.length;
            this.$emit('on-change', x);
        },
        handleSubmit() {
            this.$emit('on-submit', this.checkAllGroup);
        },
        handleCancel() {
            this.$emit('on-cancel', this.checkAllGroup);
        },
    }
}

</script>
<style scoped>
@import '../../assets/css/filter-city/filter-city.css';

</style>
<style>
#filterCity {
    .ivu-input {
        padding: 4px 0 4px 34px;
        height: 40px;
        line-height: 40px;
        border-radius: 0;
        border-top-left-radius: 2px;
        border-top-right-radius: 2px;
        border: 0;
    }
    .ivu-poptip-body-content {
        overflow: auto;
    }
    label {
        .ivu-checkbox {
            margin-right: 8px;
        }
    }
    .ivu-select-dropdown-list {
        height: auto;
        max-height: 200px;
    }
    .search {
        .ivu-select-item {
            text-align: left;
        }
    }
    .select_city_auto {
        .ivu-input:focus {
            box-shadow: none;
        }
    }
}

</style>

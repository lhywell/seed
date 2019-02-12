<template>
    <div class='page_table_c'>
        <div class='header_area'>
            <div class='l_area'>
                <slot name="header_left"></slot>
            </div>
            <div class='r_area'>
                <slot name="header_right"></slot>
            </div>
        </div>
        <div class='table_container'>
            <Table :height='table.height' :columns="this.table.columns" :data="table.showData" @on-filter-change='filterChange' @on-selection-change="selectionChange">
            </Table>
        </div>
        <div class='page_container'>
            <Page :total="table.data.length" :current="table.currentPage" @on-change="changePage" :page-size="table.pageSize" @on-page-size-change='pageSizeChange' show-sizer show-elevator class='page' placement='top'>
            </Page>
            <div class='clearfix'></div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'TablePlus',
    props: {
        options: {},
    },
    data() {
        return {
            table: _.merge({
                columns: [],
                data: [],
                currentPage: 1,
                pageSize: 10,
                showData: []
            }, this.options),
        }
    },
    watch: {
        'options.data': {
            handler: function(val, oldVal) {
                // this.table = _.merge(this.table, val);
                this.table.data = _.cloneDeep(val)
                this.init(this.options.isDelete)
            },
            deep: true
        },
    },
    mounted() {},
    computed: {},
    methods: {
        init(val) {
            if (this.table.data.length) {
                //为删除意向门店操作
                if (val) {
                    //最后一页只有一个元素
                    if (this.table.data.length % this.table.pageSize === 0) {
                        //不是第一页则向前跳转一页
                        if (this.table.currentPage !== 1) {
                            let currPage = this.table.currentPage - 1
                            this.changePage(currPage)
                        }
                        //第一页则无变化
                        else
                            this.changePage(1)
                    } else
                        this.changePage(this.table.currentPage)
                } else
                    this.changePage(1);
            } else
                this.changePage(1);
        },
        //页码改变的回调
        changePage(pageNum) {
            const size = this.table.pageSize;
            if (this.table.data.length > 0) {
                this.table.showData = this.table.data.slice((pageNum - 1) * size, pageNum * size);
                this.table.currentPage = pageNum;
            } else {
                this.table.showData = []
                this.table.currentPage = 1;
            }
        },
        pageSizeChange(size) {
            this.table.pageSize = size;
            this.changePage(1);
        },
        filterChange(params) {

        },
        selectionChange(value) {
            //只要选中项发生变化时就会触发
            this.$emit('on-selection-change', value);
        }
    }
}

</script>
<style scoped>
@import '../../assets/css/table-plus/table-plus.css';

</style>
<style>
.page_table_c {
    .page_container {
        font-size: 14px !important;
        .ivu-page-options-sizer {
            width: 96px;
        }
        .ivu-select-selected-value {
            font-size: 14px !important;
        }
    }

    .ivu-table-filter-select-item {
        font-size: 14px !important;
        line-height: 22px;
    }
}

</style>

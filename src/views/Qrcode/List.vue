<template>
  <div>
    <filter-component @search="searchTable()" @reset="resetForm('filterForm')">
      <el-form ref="filterForm" :model="filterForm">
        <el-form-item prop="name">
          <el-input type="text" v-model="filterForm.name" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="mobile">
          <el-input type="text" v-model="filterForm.mobile" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item prop="status">
          <el-input type="text" v-model="filterForm.status" placeholder="状态"></el-input>
        </el-form-item>
      </el-form>
      <template slot="moreBtns">
        <el-button type="success" icon="el-icon-plus" @click="handleAction('add')">创建</el-button>
      </template>
    </filter-component>

    <el-table :data="tableData" border v-loading="tableDataLoading" style="width: 100%;">
      <el-table-column type="index" header-align="center" align="center" width="60" label="序号" show-overflow-tooltip/>
      <el-table-column prop="name" header-align="center" align="center" label="二维码名称" show-overflow-tooltip/>
      <el-table-column prop="images" header-align="center" align="center" label="产品图片" show-overflow-tooltip/>
      <el-table-column prop="audio" header-align="center" align="center" label="音乐" show-overflow-tooltip/>
      <el-table-column prop="backgroundColor" header-align="center" align="center" label="背景颜色" show-overflow-tooltip/>
      <el-table-column prop="buttonColor" header-align="center" align="center" label="按钮颜色" show-overflow-tooltip/>
      <el-table-column prop="carousel" header-align="center" align="center" label="跑马灯" show-overflow-tooltip/>
      <el-table-column prop="links" header-align="center" align="center" label="包含砍价链接" show-overflow-tooltip/>
      <el-table-column prop="activityDetail" header-align="center" align="center" label="活动详情" show-overflow-tooltip/>
      <el-table-column fixed="right" header-align="center" align="center" width="160" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleAction('modify', scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="handleAction('shareSetting', scope.row)">分享设置</el-button>
          <el-button type="text" size="small" @click="handleAction('deleteRow', scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>

    <!-- 创建二维码 -->
    <add-qrcode v-if="addQrcodeVisible" ref="addQrcodeBox"></add-qrcode>

    <!-- 分享设置 -->
    <share-setting v-if="shareSettingVisible" ref="shareSettingBox"></share-setting>

  </div>
</template>

<script>
  import AddQrcode from './base/AddQrcode'
  import ShareSetting from './base/ShareSetting'
  import { getQrcodeList } from '@/api/qrcode'
  import { PageInit } from '@/views/common/mixins/PageInit.js'
  export default {
    name: 'qrcode',
    mixins: [ PageInit ],
    components: {
      AddQrcode,
      ShareSetting
    },
    data(){
      return {
        filterForm: {},

        addQrcodeVisible: false,
        shareSettingVisible: false,
      }
    },
    filters: {
      formatStatus(val){
        return val === 1 ? '可用' : '不可用'
      }
    },
    methods: {
      async getTableData(params = {}){
        const pager = `pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
        const res = await getQrcodeList(pager, params)
        if(res.code == 0){
          const { list, currPage, pageSize, totalCount } = res.data
          this.tableData = list
          this.pageIndex = currPage
          this.pageSize = pageSize
          this.totalPage = totalCount
        }
      },
      // 操作
      handleAction(type, row){
        switch(type){
          case 'add':
            this.addQrcodeVisible = true
            this.$nextTick(() => {
              this.$refs.addQrcodeBox.open(null)
            })
            break
          case 'modify':
            this.addQrcodeVisible = true
            this.$nextTick(() => {
              this.$refs.addQrcodeBox.open(row)
            })
            break
          case 'shareSetting':
            this.shareSettingVisible = true
            this.$nextTick(() => {
              this.$refs.shareSettingBox.open()
            })
            break
          case 'deleteRow':
            this.$confirm('确定要删除此账号?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message.success('删除成功!')
            }).catch(() => {
                  
            })
            break
        }
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>
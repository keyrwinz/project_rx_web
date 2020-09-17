<template>
  <!-- This Pager is for front end utilization only. try Src/components/increment/Generic/Modal/Modal.vue -->
  <div class="pull-right" style="display:block">
    <ul class="pagination">
      <li class="page-item" v-if="actPage > 1"><span class="page-link" @click="onPrevious()">Previous</span></li>
      <li class="page-item" v-if="actPage >= 2"><span class="page-link" @click="onSelectedPage(actPage - 1)">{{actPage - 1}}</span></li>
      <li class="page-item"><span class="page-link bg-primary" @click="onSelectedPage(actPage)">{{actPage}}</span></li>
      <li class="page-item" v-if="actPage < numberPages"><span class="page-link" @click="onSelectedPage(actPage + 1)">{{actPage + 1}}</span></li>
      <li class="page-item" v-if="actPage < numberPages"><span class="page-link" @click="onNext()">Next</span></li>
    </ul>
  </div>
</template>
<style <style lang="scss" scoped>
@import "~assets/style/colors.scss";
.btn-default{
  height: 40px !important;
  border: solid 1px #ccc !important;
}
.page-link{
  line-height: 40px !important;
  padding-top: 0px !important;
  padding-bottom: 0px !important;
  padding-left: 20px !important;
  padding-right: 20px !important;
}
.bg-primary{
  color: #ffffff !important;
  background: $primary !important;
}
@media (max-width: 992px){
}
</style>
<script>
export default {
  name: 'PagerComponent',
  props: [
    'actPage',
    'numberPages'
  ],
  methods: {
    onPrevious(){
      this.$parent.activePage--
    },
    onNext(){
      this.$parent.activePage++
    },
    onSelectedPage(num){
      this.$parent.activePage = num
    }
  }
}
</script>

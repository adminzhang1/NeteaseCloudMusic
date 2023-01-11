<template>
  <div class="g-bd3 clearfix">
    <Left />
    <Right />
  </div>
</template>

<script>
import Left from '@/components/ToplistComponents/Left'
import Right from '@/components/ToplistComponents/Right'
import { mapState,mapMutations,mapActions } from 'vuex'
export default {
  name: 'toplist',
  components: {
    Left,Right
  },
  computed: {
    ...mapState('toplist',['defaultId','selectId','toplist'])
  },
  data(){
    return {
      id: '',
    }
  },
  methods: {
    ...mapMutations('toplist',['setSelect','setUpdate','setFeature']),
    ...mapActions('toplist',['getNewUpdate','getNewFeature']),
  },
  watch: {
    '$route.query.id': {
      immediate: true,
      handler(newVal){
        if(newVal){
          this.id = newVal
          this.setSelect(parseInt(newVal))
        }else{
          this.id = this.defaultId
          this.setSelect(this.defaultId)
        }
        this.getNewUpdate(newVal ? this.selectId : this.defaultId)
        this.getNewFeature(newVal ? this.selectId : this.defaultId)
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>

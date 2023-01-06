<template>
  <div class="mrc-modal-container">
    <div class="mrc-container-top">
      {{ title }}
      <i class="clear" @click="clear">×</i>
    </div>
    <QR v-if="mode === 'QR'"/>
    <MoreMode v-else />
  </div>
</template>

<script>
import QR from './QR'
import MoreMode from './MoreMode'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'login',
  components: {
    QR,MoreMode
  },
  computed: {
    ...mapState('login', ['title'])
  },
  data(){
    return {
      mode: 'QR'
    }
  },
  methods: {
    ...mapMutations('login', ['clear']),
  },
  mounted(){
    this.$bus.$on('switchMode',(data) => {
      this.mode = data
    })
  }
}
</script>

<style lang="less" scoped>
</style>

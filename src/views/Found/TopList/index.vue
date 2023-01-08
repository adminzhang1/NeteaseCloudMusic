<template>
  <div class="g-bd3 clearfix">
    <Left />
    <Right />
  </div>
</template>

<script>
import Left from '@/components/ToplistComponents/Left'
import Right from '@/components/ToplistComponents/Right'
export default {
  name: 'toplist',
  components: {
    Left,Right
  },
}
</script>

<style lang="less" scoped>

</style>

<template>
  <option :value="optionSelect.id">{{optionSelect.title}}</option>
</template>

<script>
  export default {
    props: ['optionSelect'],
  }
</script>

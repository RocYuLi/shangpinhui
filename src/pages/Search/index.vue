<template>
    <div>
        <h1>params参数 {{$route.params.keyword}}</h1>
        <h1>query参数 {{$route.query.k}}</h1>
        <!-- 这是search -->
        <TypeNav/> 
    </div>
</template>


<script>

 export default{
      name:"Search",
      

 }
</script>

<style scoped>

</style>
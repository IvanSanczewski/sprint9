<template>
  <div class="books">
    <h1>This is the Books page</h1>
    <p>These are the new books</p>
  </div>
</template>

<script>
export default {
  name: 'Books',
  setup () {
    console.log('books page')
  }
}
</script>

<style>
.books {
    color: rgb(39, 133, 83)
}
</style>
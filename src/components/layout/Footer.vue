<template>
  <footer class="footer">
    <div class="container-fluid">
      <nav class="float-left">
        <ul>
          <li>
            <a @click="$store.state.appData.page = 40">About</a>
          </li>
          <li>
            <a @click="$store.state.appData.page = 41">Privacy</a>
          </li>
          <li>
            <a href="">Licenses</a>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>


<style scoped>
	a{
		cursor: pointer;
	}
</style>

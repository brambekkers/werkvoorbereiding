<template>
	<li class="nav-item pl-4">
		<a class="nav-link" :class="{ pointer: canClick }" @click.prevent="toPage()">
			<i v-bind:class="icon"></i> 
			<p>{{itemProps.name}}</p>
		</a>
	</li>
</template>

<script>
	export default {
		name: "SidebarProjectMenuItem",
		props: ["itemProps"],
		computed: {
			wvbActive(){
				if(this.werkvoorbereiding){
					if(Object.keys(this.werkvoorbereiding).length > 0){
						return true
					}
				}
				return false
			},
			werkvoorbereiding(){
				return this.$store.state.werkvoorbereiding
			},
			appData(){
				return this.$store.state.appData
			},
			canClick(){
				if(this.wvbActive){
					if(this.werkvoorbereiding.stap < 1 && this.itemProps.page === 1){
						return true
					}
					if(this.werkvoorbereiding.stap >= this.itemProps.page){
						return true
					}
					if(this.werkvoorbereiding.stap < this.itemProps.page){
						return false
					}
				}else{
					if(this.itemProps.page === 1){
						return true
					}else{
						return false
					}
				}
			},
			icon(){
				if(this.wvbActive){
					if(this.werkvoorbereiding.stap < 1 && this.itemProps.page === 1){
						return "far fa-circle"
					}
					if(this.werkvoorbereiding.stap > this.itemProps.page){
						return "far fa-check-circle"
					}
					if(this.werkvoorbereiding.stap === this.itemProps.page){
						return "far fa-circle"
					}
					if(this.werkvoorbereiding.stap < this.itemProps.page){
						return "far fa-times-circle"
					}
				}else{
					if(this.itemProps.page === 1){
						return "far fa-circle"
					}else{
						return "far fa-times-circle"
					}
				}
			}
		},
		methods: {
			toPage(){
				if(this.canClick){
					this.$store.state.appData.page = this.itemProps.page
				}
			}	
		},
	};
</script>


<style scoped>
	.pointer {
		cursor: pointer;
	}
</style>
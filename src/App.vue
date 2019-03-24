<template>
	<div id="app" class="wrapper">
		<transition 
			name="bounce" 
			mode="out-in" 
			:duration="{ enter: 1000, leave: 1000 }" 
			enter-active-class="bounceInLeft"
  			leave-active-class="bounceOutUp">
			<Landing v-if="page === 0"/>
		</transition>

		<transition 
			name="bounce" 
			mode="out-in" 
			:duration="{ enter: 1000, leave: 1000 }" 
			enter-active-class="bounceInLeft"
  			leave-active-class="bounceOutLeft">
			<Sidebar data-html2canvas-ignore v-if="page != 0"/>
		</transition>
		<Main v-if="page != 0"/>
		<!-- <Help data-html2canvas-ignore v-if="page != 0"/> -->
	</div>
</template>

<script>
	import "vue2-animate/dist/vue2-animate.min.css"
	import "./assets/css/material-dashboard.css";

	import Firebase from "./Firebase";
	
	import $ from "jquery";
	import popper from "popper.js";
	import bootstrap from "bootstrap";
	
	import Swal from 'sweetalert2'

	import Sidebar from "./components/layout/Sidebar";
	import Main from "./components/layout/Main";
	import Help from "./components/pages/attributes/Help.vue";
	import Landing from "./components/pages/Landing.vue";

	export default {
		name: "app",
		watch: {
			werkvoorbereiding: {
				handler(newValue) {
					this.firebase.WvbToFb(this.werkvoorbereiding);
				},
				deep: true
			},
		},
		components: {
			Sidebar,
			Main,
			Help,
			Landing
		},
		computed: {
			firebase(){
				return this.$store.state.firebase 
			},
			werkvoorbereiding() {
				return this.$store.state.werkvoorbereiding
			},
			page() {
				return this.$store.state.appData.page
			}
		},
		created() {
			this.$store.state.firebase = new Firebase(this.$store.state)
		}
	};
</script>

<style>
	html{
		overflow-x: hidden;
	}
	
	.main-panel>.content {
		margin-top: 10px;
		padding: 30px 15px;
		min-height: calc(100vh - 165px);
	}
	.swal-text {
		text-align: center;
	}
	
	.stats a{
		color: #999999
	}
	
</style>
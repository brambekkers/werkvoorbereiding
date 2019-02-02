<template>
	<div class="content">
		<div class="container-fluid">
			<div class="row justify-content-center">
				<div class="col-md-10 col-lg-8 col-xl-7 col-xxl-5 col-xxxl-4">
					<div class="card">
						<CardHeader :text="{title: 'Gereedschap', subtitle: 'Welke tools heb je tot je beschikking' }"/>
						<div class="card-body">
							<div class="row">
								<div class="col-md-6 border-right">
									<h5 class="title text-center"><strong>Electrisch gereedschap</strong></h5>
									<hr class="mt-0">
									<GereedschapItem v-bind:key="key" v-for="(value, key) in gereedschap" :toolKey="key" :category="'gereedschap'"/>
								</div>
								<div class="col-md-6">
									<h5 class="title text-center"><strong>Machines</strong></h5>
									<hr class="mt-0">
									<GereedschapItem v-bind:key="key" v-for="(value, key) in machines" :toolKey="key" :category="'machines'"/>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<button type="button" class="btn btn-lg btn-block btn-danger btn-fill" @click="previousStep()">
								<div class="row">
									<div class="col-2"><i aria-hidden="true" class="fa fa-chevron-left"></i></div>
									<div class="col-10">Vorige stap</div>
								</div>
							</button></div>
						<div class="col-md-6">
							<button class="btn btn-lg btn-block btn-bg-teal" @click="nextStep()">
								<div class="row">
									<div class="col-10">Volgende stap</div>
									<div class="col-2"><i aria-hidden="true" class="fa fa-chevron-right"></i></div>
								</div>
							</button></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import GereedschapItem from "./attributes/GereedschapItem"
	import CardHeader from "./attributes/Card-header.vue";

	export default {
		name: "Gereedschap",
		components: {
			GereedschapItem, CardHeader
		},
		computed: {
			gereedschap() {
				return this.$store.state.werkvoorbereiding.gereedschap.gereedschap
			},
			machines() {
				return this.$store.state.werkvoorbereiding.gereedschap.machines
			}
		},
		methods: {
			previousStep() {
				this.$store.state.appData.page--
			},
			nextStep() {
				this.$store.state.appData.page++
				if(this.$store.state.appData.page > this.$store.state.werkvoorbereiding.stap){
					this.$store.state.werkvoorbereiding.stap = this.$store.state.appData.page
				}
			}
		},
	};
</script>


<style scoped>
</style>
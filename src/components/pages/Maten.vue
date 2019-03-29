<template>
	<div class="content">
		<div class="container-fluid">
			<form role="form" @submit.prevent="nextStep()">
				<div class="row justify-content-center">
					<div class="col-xl-12">
						<div class="card">
							<CardHeader :text="{title: 'Maten', subtitle: 'Hoe groot zijn je onderdelen' }"/>
							<div class="card-body">
	                            <draggable v-model="$store.state.werkvoorbereiding.maten">
									<div class="row" v-bind:key="index" v-for="(maat, index) in maten">
										<div class="col-8 col-md-4 col-xl-3">
											<div class="input-group mb-2">
												<div class="input-group-prepend">
													<span id="basic-addon1" class="input-group-text">
														<i class="fab fa-slack-hash"></i>
													</span>
												</div>
												<input type="text" placeholder="Naam onderdeel" data-toggle="tooltip" 
												data-placement="top" required="required" class="form-control" 
												data-original-title="Welk onderdeel ga je bematen?"
												v-model="maat.naam">
											</div>
										</div>
										<div class="col-4 col-md-4 col-xl-1">
											<div class="input-group mb-2">
												<input type="number" placeholder="Aantal" data-toggle="tooltip" 
												data-placement="top" required="required" class="form-control" 
												data-original-title="Hoeveel stuks heb je van dit onderdeel?"
												v-model="maat.aantal">
											</div>
										</div>
										<div class="col-6 col-md-4 col-xl-2">
											<div class="input-group mb-2">
												<select data-toggle="tooltip" data-placement="top" required="required" 
												class="form-control" data-original-title="Welk component?"
												v-model="maat.component">
													<option value="" selected disabled hidden>Kies een component</option>
													<option v-bind:key="index" v-for="(component, index) in componenten">{{component.naam}}</option>
												</select>
											</div>
										</div>
										<div class="col-6 col-md-4 col-xl-2">
											<div class="input-group mb-2">
												<select data-toggle="tooltip" data-placement="top" required="required" 
												class="form-control" data-original-title="Welk materiaal?"
												v-model="maat.materiaal">
													<option value="" selected disabled hidden>Kies een materiaal</option>
													<optgroup label="Massiefhout"  v-if="massief">
														<option v-bind:key="index" v-for="(materiaal, index) in massief">{{materiaal.naam}}</option>												
													</optgroup>
													<optgroup label="Plaatmateriaal" v-if="plaatmateriaal">
														<option v-bind:key="index" v-for="(materiaal, index) in plaatmateriaal">{{materiaal.naam}}</option>												
													</optgroup>
													<optgroup label="Fineer" v-if="fineer">
														<option v-bind:key="index" v-for="(materiaal, index) in fineer">{{materiaal.naam}}</option>												
													</optgroup>
												</select>
											</div>
										</div>
										<div class="col-4 col-md-2 col-xl-1">
											<div class="input-group mb-2">
												<input type="number" placeholder="Lengte" min="1" data-toggle="tooltip" 
												data-placement="top" required="required" class="form-control" 
												data-original-title="Wat is de lengte in mm?"
												v-model="maat.lengte">
											</div>
										</div>
										<div class="col-4 col-md-2 col-xl-1">
											<div class="input-group mb-2">
												<input type="number" placeholder="Breedte" min="1" data-toggle="tooltip" 
												data-placement="top" required="required" class="form-control" 
												data-original-title="Wat is de breedte in mm?"
												v-model="maat.breedte">
											</div>
										</div>
										<div class="col-4 col-md-2 col-xl-1">
											<div class="input-group mb-2">
												<input type="number" placeholder="Dikte" min="1" data-toggle="tooltip" 
												data-placement="top" required="required" class="form-control" 
												data-original-title="Wat is de dikte in mm?"
												v-model="maat.dikte">
											</div>
										</div>
										<div class="col-12 col-md-2 col-xl-1">
											<div class="input-group mb-2">
												<button type="button" class="btn btn-danger btn-sm btn-block" @click="removeMaten(index)">
													<i class="fa fa-trash"></i>
												</button>
											</div>
										</div>
										<div class="col-12 d-block d-xl-none">
											<hr class="mt-0">
										</div>
									</div>
								</draggable>
								<hr> 
								<button type="button" class="btn" @click="newMaat()">
									<i class="fa fa-plus mr-3"></i>Nieuw onderdeel
								</button>
							</div>
						</div>
						<div class="row">
							<div class="col-md-6">
								<button type="button" class="btn btn-lg btn-block btn-danger btn-fill" @click="previousStep()">
									<div class="row">
										<div class="col-2"><i aria-hidden="true" class="fa fa-chevron-left"></i></div>
										<div class="col-10">Vorige stap</div>
									</div>
								</button>
							</div>
							<div class="col-md-6">
								<button type="submit" class="btn btn-lg btn-block btn-bg-teal">
									<div class="row">
										<div class="col-10">Volgende stap</div>
										<div class="col-2"><i aria-hidden="true" class="fa fa-chevron-right"></i></div>
									</div>
								</button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	import $ from "jquery";
	import CardHeader from "./attributes/Card-header.vue";
    import draggable from 'vuedraggable'


	export default {
		name: "Maten",
		components: { CardHeader, draggable },
		computed: {
			maten() {
				return this.$store.state.werkvoorbereiding.maten
			},
			componenten() {
				return this.$store.state.werkvoorbereiding.componenten
			},
			materialen() {
				return this.$store.state.werkvoorbereiding.materialen
			},
			massief(){
				if(this.materialen.massief){
					return this.materialen.massief
				}else{
					return false
				}
			},
			plaatmateriaal(){
				if(this.materialen.plaatmateriaal){
					return this.materialen.plaatmateriaal
				}else{
					return false
				}
			},
			fineer(){
				if(this.materialen.fineer){
					return this.materialen.fineer
				}else{
					return false
				}
			},
			fineer(){
				if(this.materialen.fineer){
					return this.materialen.fineer
				}else{
					return false
				}
			},
			overigeMaterialen(){
				if(this.$store.state.werkvoorbereiding.overigematerialen){
					return this.$store.state.werkvoorbereiding.overigematerialen
				}else{
					return false
				}
			},
		},
		methods: {
			newMaat() {
				if(!this.maten){
					this.$set(this.$store.state.werkvoorbereiding, 'maten', [])
				}
				this.$store.state.werkvoorbereiding.maten.push({
					naam: "",
					aantal: "", 
					breedte: "", 
					component: "", 
					dikte: "", 
					lengte: "", 
					materiaal: "",
				})
			},
			removeMaten(i) {
				this.$store.state.werkvoorbereiding.maten.splice(i, 1)
				this.$forceUpdate();
			},
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
		created() {
			$(function () {
				$('[data-toggle="tooltip"]').tooltip({'delay': { show: 500, hide: 0 }})
			})
		}
	};
</script>


<style scoped>
    .grabbing {
        cursor: move;
        /* fallback if grab cursor is unsupported */
        cursor: grab;
        cursor: -moz-grab;
        cursor: -webkit-grab;
    }

    /* (Optional) Apply a "closed-hand" cursor during drag operation. */
    .grabbing:active {
        cursor: grabbing;
        cursor: -moz-grabbing;
        cursor: -webkit-grabbing;
    }
</style>
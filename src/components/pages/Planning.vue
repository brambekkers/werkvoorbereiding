<template>
	<div class="content">
		<div class="container-fluid">
			<form role="form" @submit.prevent="nextStep()">
				<div class="row justify-content-center">
					<div class="col-xl-12">
						<div class="card">
							<div class="card-header card-header-success">
								<h3 class="card-title">
									<i class="fa fa-industry fa-lg pr-4"></i>Planning</h3>
								<p class="card-category">Wanneer ga je het maken?</p>
							</div>
							<div class="card-body">
								<div v-bind:key="planningIndex" v-for="(planning, planningIndex) in planning">
									<div class="row">
										<!-- Component -->
										<div class="col-md-3 col-xl-2">
											<div class="input-group mb-2">
												<div class="input-group-prepend">
													<span id="basic-addon1" class="input-group-text">
														<i class="fas fa-list-ul"></i>
													</span>
												</div>
												<select data-toggle="tooltip" data-placement="top" 
												title="" required="required" class="form-control"
												data-original-title="Voor welk component wil je een planning maken?"
												v-model="planning.component">
													<option value="" hidden disabled selected>Kies component</option>
													<option value="Gehele project">Gehele project</option>
													<option v-bind:key="index" v-for="(component, index) in componenten">{{component.naam}}</option>
												</select>
											</div>
										</div>
										<!-- Onderdeel -->
										<div class="col-md-3 col-xl-2">
											<div class="input-group mb-2">
												<select data-toggle="tooltip" data-placement="top" 
												title="" required="required" class="form-control" 
												data-original-title="Voor welk onderdeel?"
												v-model="planning.onderdeel">
													<option value="" hidden disabled selected v-if="!planning.component">Kies eerst een component</option>
													<option value="" hidden disabled selected v-if="planning.component">Kies een onderdeel</option>
													<option value="Alle onderdelen" v-if="planning.component">Alle onderdelen</option>
													<option v-bind:key="index" v-for="(component, index) in onderdelen(planningIndex)">{{component.naam}}</option>
												</select>
											</div>
										</div>
										<div class="col-10 col-md-3 col-xl-2">
											<div class="input-group mb-2">
												<button type="button" class="btn btn-teal btn-sm ml-auto" @click="newStap(planningIndex)">
													<i class="fa fa-plus mr-3"></i> Substap
												</button>
											</div>
										</div>
										<div class="col-2 col-md-3 col-xl-1">
											<div class="input-group mb-2">
												<button type="button" class="btn btn-danger btn-sm" @click="removePlanning(planningIndex)">
													<i class="fa fa-trash"></i>
												</button>
											</div>
										</div>
									</div>
									<div class="row" v-bind:key="index" v-for="(stap, index) in stappen(planningIndex)">
										<div class="col-1"></div>
										<div class="col-11">
											<div class="row">
												<!-- Stap -->
												<div class="col-6 col-md-4 col-xl-2">
													<div class="input-group mb-2">
														<div class="input-group-prepend">
															<span id="basic-addon1" class="input-group-text">
																<i class="far fa-hand-point-right"></i>
															</span>
														</div> 
														<select data-toggle="tooltip" data-placement="top"  
														required="required" class="form-control"
														data-original-title="Welke stap ga je doen?"
														v-model="stap.stap">
															<option value="" hidden selected disabled>Kies..</option>
															<option v-bind:key="index" v-for="(stap, index) in onderdeelStappen">{{stap}}</option>
														</select>
													</div>
												</div>
												<!-- Werkzaamheid -->
												<div class="col-6 col-md-4 col-xl-2">
													<div class="input-group mb-2">
														<select data-toggle="tooltip" data-placement="top"
														required="required" class="form-control" 
														data-original-title="Voor welke werkzaamheid?"
														v-model="stap.werkzaamheid">
															<option value="" hidden selected disabled>Kies..</option>
															<option v-bind:key="index" v-for="(werkzaamheid, index) in onderdeelWerkzaamheid(stap.stap)">{{werkzaamheid}}</option>
														</select>
													</div>
												</div>
												<!-- Bewerking -->
												<div class="col-6 col-md-4 col-xl-2">
													<div class="input-group mb-2">
														<select data-toggle="tooltip" data-placement="top"
														required="required" class="form-control" 
														data-original-title="Welke bewerking ga je uitvoeren?"
														v-model="stap.bewerking">
															<option value="" hidden selected disabled>Kies..</option>
															<option v-bind:key="index" v-for="(werkzaamheid, index) in onderdeelBewerking(stap.stap, stap.werkzaamheid)">{{werkzaamheid}}</option>
														</select>
													</div>
												</div>
												<!-- Gereedschap -->
												<div class="col-6 col-md-3 col-xl-2">
													<div class="input-group mb-2">
														<select data-toggle="tooltip" data-placement="top"
														required="required" class="form-control" 
														data-original-title="Heb je een gereedschap nodig?"
														v-model="stap.gereedschap">
															<option value="" hidden selected disabled>Selecteer gereedschap</option>
															<optgroup label="Gereedschap" v-if="gereedschappen.length > 0">
																<option :value="gereedschap" :key="index" v-for="(gereedschap, index) in gereedschappen">{{gereedschap}}</option>
															</optgroup>
															<optgroup label="Machines" v-if="machines.length > 0">
																<option :value="gereedschap" :key="index" v-for="(gereedschap, index) in machines">{{gereedschap}}</option>
															</optgroup>
															<optgroup label="Overig">
																<option value="Overig">Overig</option>
																<option value="Handgereedschap">Handgereedschap</option>
																<option value="Geen gereedschap">Geen gereedschap</option>
															</optgroup>
														</select></div>
												</div>
												<!-- Insteltijd -->
												<div class="col-3 col-md-3 col-xl-1">
													<div class="input-group mb-2">
														<input type="number" placeholder="Insteltijd" data-toggle="tooltip"
														data-placement="top" required="required" class="form-control" 
														data-original-title="Hoeveel minuten ben je bezig met instellen?"
														v-model="stap.insteltijd">
													</div>
												</div>
												<!-- Bewerkingstijd -->
												<div class="col-3 col-md-3 col-xl-1">
													<div class="input-group mb-2">
														<input type="number" placeholder="Bewerkingstijd" data-toggle="tooltip"
														data-placement="top" required="required" class="form-control" 
														data-original-title="Hoeveel minuten ben je bezig met één bewerking?"
														v-model="stap.bewerkingstijd">	
													</div>
												</div>
												<!-- Aantal -->
												<div class="col-3 col-md-2 col-xl-1">
													<div class="input-group mb-2">
														<input type="number" placeholder="Aantal" data-toggle="tooltip" 
														data-placement="top" required="required" class="form-control" 
														data-original-title="Hoe vaak ga je dezelfde handeling uitvoeren?"
														v-model="stap.aantal">
													</div>
												</div>
												<!-- Verwijderknop -->
												<div class="col-3 col-md-1 col-xl-1">
													<div class="input-group mb-2">
														<button type="button" class="btn btn-danger btn-sm" @click="removeStap(planningIndex, index)">
															<i class="fa fa-trash"></i>
														</button>
													</div>
												</div>
												<div class="col-12 d-block d-xl-none">
													<hr>
												</div>
											</div>
										</div>
									</div>
									<div class="col-12 d-block d-xl-none">
										<hr>
									</div>
								</div>
								<hr>
								<div class="row">
									<div class="col-md-6">
										<button type="button" class="btn" @click="newOnderdeel()">
											<i class="fa fa-plus mr-3"></i>
											Nieuw onderdeel
										</button> 
									</div>
									<div class="col-md-6">
										<button type="button" class="btn float-right">
											<i aria-hidden="true" class="fas fa-edit mr-3"></i> 
											Planning en kosten instellingen
										</button>
									</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-6">
								<button type="button" class="btn btn-lg btn-block btn-danger btn-fill">
									<div class="row">
										<div class="col-2"><i aria-hidden="true" class="fa fa-chevron-left"></i></div>
										<div class="col-10">Vorige stap</div>
									</div>
								</button></div>
							<div class="col-md-6">
								<button type="submit" class="btn btn-lg btn-block btn-bg-teal">
									<div class="row">
										<div class="col-12">Werkvoorbereiding afronden</div>
									</div>
								</button></div>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	import $ from "jquery";
	import planningGegevens from "../../assets/config/planningGegevens.js"

	export default {
		name: "Planning",
		computed: {
			werkvoorbereiding() {
				return this.$store.state.werkvoorbereiding
			},
			planning() {
				return this.$store.state.werkvoorbereiding.planning
			},
			componenten() {
				return this.$store.state.werkvoorbereiding.componenten
			},
			gereedschappen() {
				let keys = Object.keys(this.$store.state.werkvoorbereiding.gereedschap.gereedschap);
				if(keys){
					let filtered = keys.filter(function(key) {
						return this.$store.state.werkvoorbereiding.gereedschap.gereedschap[key]
					},this);

					return filtered
				}
			},
			machines() {
				let keys = Object.keys(this.$store.state.werkvoorbereiding.gereedschap.machines);
				if(keys){
					let filtered = keys.filter(function(key) {
						return this.$store.state.werkvoorbereiding.gereedschap.machines[key]
					},this);

					return filtered
				}
			},
			onderdeelStappen(){
				return Object.keys(planningGegevens)
			},
			
		},
		methods: {
			stappen(i){
				return this.$store.state.werkvoorbereiding.planning[i].stappen
			},
			onderdelen(i) {
				if(this.$store.state.werkvoorbereiding.maten){
					let onderdelen = this.$store.state.werkvoorbereiding.maten.filter((maten)=>{
						if(maten.component === this.$store.state.werkvoorbereiding.planning[i].component){
							return maten.naam
						}
					})
					return onderdelen
				}
			},
			onderdeelWerkzaamheid(i){
				if(i){
					return Object.keys(planningGegevens[i])
				}
			},
			onderdeelBewerking(i, j){
				if(i && j){
					return planningGegevens[i][j]
				}
			},
			newOnderdeel() {
				if(!this.planning){
					this.$store.state.werkvoorbereiding.planning = []
				}
				this.$forceUpdate();

				this.$store.state.werkvoorbereiding.planning.push({
					component: "",
					onderdeel: "",
					stappen: []
				})
				this.$forceUpdate();
			},
			newStap(i){
				if(!this.stappen(i)){
					this.$store.state.werkvoorbereiding.planning[i].stappen = []
				}
				this.$store.state.werkvoorbereiding.planning[i].stappen.push({
					aantal: "",
					bewerking: "",
					bewerkingstijd: "",
					gereedschap: "",
					insteltijd: "",
					stap: "",
					werkzaamheid: ""
				})
				this.$forceUpdate();
			},
			removePlanning(i) {
				this.$store.state.werkvoorbereiding.planning.splice(i, 1)
				this.$forceUpdate();
			},
			removeStap(planning, i) {
				this.$store.state.werkvoorbereiding.planning[planning].stappen.splice(i, 1)
				this.$forceUpdate();
			},
			previousStep() {
				this.$store.state.appData.page--
			},
			nextStep() {
				this.$store.state.appData.page++
			}
		},
		created() {
			$(function () {
				$('[data-toggle="tooltip"]').tooltip()
			})
		}
	};
</script>


<style scoped>
</style>
<template>
	<div class="form-group">
		<div class="material-switch">
			<input 
				@click="switchTool()"
				v-model="$store.state.werkvoorbereiding.gereedschap[category][toolKey]"
				v-bind:id="toolKey" 
				type="checkbox"> 
			<label v-bind:for="toolKey" class="label-teal"></label>
		</div>
		<label>{{toolKey}}</label>
	</div>
</template>

<script>
	import GereedschapItem from "../attributes/GereedschapItem"

	export default {
		name: "GereedschapItem",
		props: ["toolKey", "category"],
		computed:{
			gereedschap(){
				return this.$store.state.werkvoorbereiding.gereedschap[this.category][this.toolKey]
			}
		},
		methods: {
			switchTool(){
				this.$store.state.werkvoorbereiding.gereedschap[this.category][this.toolKey] = !this.gereedschap
			}
		},
	};
</script>


<style scoped>
	.material-switch {
		display: inline-block;
		margin-right: 15px;
	}

	.material-switch>input[type="checkbox"] {
		display: none;
	}

	.material-switch>input[type="checkbox"]:checked+label::before {
		background: #62B866;
		opacity: 0.5;
	}

	input[type=checkbox],
	input[type=radio] {
		box-sizing: border-box;
		padding: 0;
	}

	.material-switch>input[type="checkbox"]:checked+label::after {
		background: inherit;
		left: 20px;
		background-color: #43A047;
	}

	.material-switch>label {
		cursor: pointer;
		height: 0px;
		position: relative;
		width: 40px;
	}

	.material-switch>label::before {
		background: rgb(0, 0, 0);
		box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.5);
		border-radius: 8px;
		content: '';
		height: 16px;
		margin-top: -8px;
		position: absolute;
		opacity: 0.3;
		transition: all 0.4s ease-in-out;
		width: 40px;
	}

	.material-switch>label::after {
		background: rgb(255, 255, 255);
		border-radius: 16px;
		box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
		content: '';
		height: 24px;
		left: -4px;
		margin-top: -8px;
		position: absolute;
		top: -4px;
		transition: all 0.3s ease-in-out;
		width: 24px;
	}
</style>
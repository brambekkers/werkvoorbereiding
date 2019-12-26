<template>
	<div class="row">
		<div class="col">
			<button
				class="btn btn-lg btn-block btn-danger"
				@click.prevent="previousStep()"
			>
				<span class="btn-label">
					<i aria-hidden="true" class="fa fa-chevron-left mr-2"></i>
				</span>
				Vorige
			</button>
		</div>
		<div class="col">
			<button type="submit" class="btn btn-lg btn-block">
				Volgende
				<span class="btn-label">
					<i aria-hidden="true" class="fa fa-chevron-right ml-2"></i>
				</span>
			</button>
		</div>
	</div>
</template>

<script>
export default {
	name: "PreviousNextButton",
	props: ["previous"],
	methods: {
		previousStep() {
			this.$router.push(`/${this.previous}`);
		}
	}
};
</script>

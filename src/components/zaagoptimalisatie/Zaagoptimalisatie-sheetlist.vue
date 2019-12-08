<template>
	<div class="col-md-6 border-right">
		<div class="table-responsive">
			<h6 data-v-ce3b1120="" class="title col-form-label border-bottom my-1">
				<strong data-v-ce3b1120="">Plaatmateriaal</strong>
			</h6>

			<table class="table">
				<tbody>
					<tr v-bind:key="index" v-for="(sheet, index) in sheets">
						<td>{{ sheet.naam }}</td>
						<td>
							<input
								type="number"
								v-model="sheet.lengte"
								class="form-control text-right"
								placeholder="Lengte"
							/>
						</td>
						<td>
							x
						</td>
						<td>
							<input
								type="number"
								v-model="sheet.breedte"
								class="form-control"
								placeholder="breedte"
							/>
						</td>

						<td><i class="fas fa-arrows-alt-h"></i></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
export default {
	name: "ZaagoptimalistieSheetList",
	props: ["sheets"]
};
</script>

<style scoped lang="scss">
table {
	box-shadow: none;
}
.form-control {
	background-image: none !important;
	padding: 0;
	height: 100%;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
	-webkit-appearance: none;
	margin: 0;
}
</style>

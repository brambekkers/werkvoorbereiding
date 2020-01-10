<template>
	<div class="col-md-4 ">
		<div class="table-responsive">
			<h6 class="title col-form-label my-1">
				<strong>Plaatmateriaal</strong>
			</h6>
			<div class="table-responsive">
				<table class="table table-striped">
					<tbody>
						<tr v-bind:key="index" v-for="(sheet, index) in sheets">
							<td nowrap>{{ sheet.naam }}</td>
							<td>
								<input
									type="number"
									v-model.lazy="sheet.lengte"
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
									v-model.lazy="sheet.breedte"
									class="form-control"
									placeholder="breedte"
								/>
							</td>

							<!-- <td><i class="fas fa-arrows-alt-h"></i></td> -->
						</tr>
					</tbody>
				</table>
			</div>
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
	border: solid 1px #d6d6d6;
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

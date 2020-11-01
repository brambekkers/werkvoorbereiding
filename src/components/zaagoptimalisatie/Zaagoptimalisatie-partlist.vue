<template>
	<div class="col-md-8">
		<div class="table-responsive">
			<h6 class="title col-form-label my-1">
				<strong>Onderdelen</strong>
			</h6>
			<div class="table-responsive">
				<table class="table table-striped">
					<tbody>
						<tr v-bind:key="index" v-for="(part, index) in parts">
							<td nowrap class="text-left">{{ part.aantal }} x</td>
							<td class="text-left">
								{{ part.naam }}
							</td>
							<td>{{ part.lengte }} x {{ part.breedte }}</td>
							<td>
								{{ part.materiaal }}
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
	name: "ZaagoptimalistiePartList",
	props: ["parts"]
};
</script>

<style scoped lang="scss">
table {
	box-shadow: none;
	border: solid 1px #d6d6d6;
}
</style>

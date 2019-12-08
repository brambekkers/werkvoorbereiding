<template>
	<div class="col-md-6">
		<div class="table-responsive">
			<h6 data-v-ce3b1120="" class="title col-form-label border-bottom my-1">
				<strong data-v-ce3b1120="">Onderdelen</strong>
			</h6>
			<table class="table">
				<tbody>
					<tr v-bind:key="index" v-for="(part, index) in parts">
						<td>{{ part.aantal }} x</td>
						<td>
							{{ part.naam }}
						</td>
						<td>{{ part.lengte }} x {{ part.breedte }}</td>
						<td>
							{{ part.materiaal }}
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
	name: "ZaagoptimalistiePartList",
	props: ["parts"]
};
</script>

<style scoped lang="scss"></style>

<template>
	<div class="fixed-plugin">
		<i class="far fa-question-circle" @click="showHelp()"></i>
	</div>
</template>

<script>
	import Swal from 'sweetalert2'

	export default {
		name: "Help",
		methods: {
			showHelp(){
				Swal.fire({
					title: 'Sweet!',
					text: 'Modal with a custom image.',
					imageUrl: 'https://unsplash.it/400/200',
					imageWidth: 400,
					imageHeight: 200,
					imageAlt: 'Custom image',
				})
			}
		}
	};
</script>


<style scoped>
	i {
		font-size: 2rem;
		color: #FFFFFF;
		padding: 10px;
		border-radius: 0 0 6px 6px;
		width: auto;
	}

	i:hover {
		cursor: pointer;
		-webkit-animation-duration: 1.3s;
		-webkit-animation-name: heartBeat;
		-webkit-animation-timing-function: ease-in-out;
		animation-duration: 1.3s;
		animation-name: heartBeat;
		animation-timing-function: ease-in-out;
	}

	@-webkit-keyframes heartBeat {
		0% {
			-webkit-transform: scale(1);
			transform: scale(1);
		}

		14% {
			-webkit-transform: scale(1.3);
			transform: scale(1.3);
		}

		28% {
			-webkit-transform: scale(1);
			transform: scale(1);
		}

		42% {
			-webkit-transform: scale(1.3);
			transform: scale(1.3);
		}

		70% {
			-webkit-transform: scale(1);
			transform: scale(1);
		}
	}

	@-moz-keyframes heartBeat {
		0% {
			-webkit-transform: scale(1);
			transform: scale(1);
		}

		14% {
			-webkit-transform: scale(1.3);
			transform: scale(1.3);
		}

		28% {
			-webkit-transform: scale(1);
			transform: scale(1);
		}

		42% {
			-webkit-transform: scale(1.3);
			transform: scale(1.3);
		}

		70% {
			-webkit-transform: scale(1);
			transform: scale(1);
		}
	}

	@keyframes heartBeat {
		0% {
			-webkit-transform: scale(1);
			transform: scale(1);
		}

		14% {
			-webkit-transform: scale(1.3);
			transform: scale(1.3);
		}

		28% {
			-webkit-transform: scale(1);
			transform: scale(1);
		}

		42% {
			-webkit-transform: scale(1.3);
			transform: scale(1.3);
		}

		70% {
			-webkit-transform: scale(1);
			transform: scale(1);
		}
	}


	.fixed-plugin {
		position: fixed;
		top: 75%;
		right: 0;
		width: 64px;
		background: rgba(0, 0, 0, 0.3);
		z-index: 1031;
		border-radius: 8px 0 0 8px;
		text-align: center;
	}
</style>
<template>
	<div class="content my-0">
		<!-- Status -->
		<div class="row">
			<Status
				v-for="(item, key) in services"
				:key="`card_${key}`"
				:status="
                    typeof item.data === 'boolean'
                        ? item.data
                        : item.data.length
                "
				:text="item.text"
				:time="item.time"
			/>
		</div>
		<!-- Connection buttons -->
		<div class="row">
			<ConnectionButton
				v-for="(item, key) in services"
				:key="`button_${key}`"
				v-if="key === 'server' || services.server.data"
				:data="item.data"
				:btnFunction="item.function"
				:loading="item.loading"
				:btnTextOnConnect="item.btnTextOnConnect"
				:btnTextOnDisconnect="item.btnTextOnDisconnect"
				:btnColorOnConnect="item.btnColorOnConnect"
				:btnColorOnDisconnect="item.btnColorOnDisconnect"
			/>
		</div>
		<hr />
		<div class="row">
			<div class="col-3">
				<div class="card">
					<div class="card-header mb-0">
						<h4 class="card-title">Acties</h4>
					</div>
					<div class="card-body">
						<button
							class="btn btn-sm btn-block"
							@click="findProblems()"
						>
							Find Problems
						</button>
						<button
							class="btn btn-sm btn-block"
							@click="fixProblems()"
						>
							Fix Problems
						</button>
					</div>
				</div>
			</div>
			<div class="col-9">
				<Problems :problems="problems" />
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import Status from "@/components/admin/adminedit/Status.vue";
import Problems from "@/components/admin/adminedit/Problems.vue";
import ConnectionButton from "@/components/admin/adminedit/ConnectionButton.vue";

export default {
	name: "AdminEdit",
	components: { Status, ConnectionButton, Problems },
	data() {
		return {
			services: {
				server: {
					loading: false,
					text: "Server Status",
					function: this.toggleServer,
					data: false,
					time: null,
					interval: null,
					btnColorOnConnect: "btn-rose",
					btnColorOnDisconnect: "btn-success",
					btnTextOnConnect: "Disconnect",
					btnTextOnDisconnect: "Connect",
				},
				auth: {
					loading: false,
					function: this.getUsersFromAuth,
					data: [],
					time: null,
					text: "Auth Data",
					btnColorOnConnect: "",
					btnColorOnDisconnect: "btn-success",
					btnTextOnConnect: "Reload user data",
					btnTextOnDisconnect: "Get user data",
				},
				database: {
					loading: false,
					function: this.getUsersFromDB,
					data: [],
					time: null,
					text: "Database Data",
					btnColorOnConnect: "",
					btnColorOnDisconnect: "btn-success",
					btnTextOnConnect: "Reload database data",
					btnTextOnDisconnect: "Get database data",
				},
			},
			AxiosConfig: {
				headers: { "Access-Control-Allow-Origin": "*" },
				proxy: {
					host: "http://localhost:3000/",
					port: 3000,
				},
			},
			problems: { data: [], time: null },
		};
	},
	methods: {
		toggleServer() {
			console.log("toggle server");
			if (!this.services.server.data) {
				console.log("connect to server");
				this.services.server.interval = setInterval(
					this.checkServerStatus,
					5000
				);
			} else {
				console.log("disconnect server");
				this.disconnect();
			}
		},
		checkServerStatus() {
			this.getRequest("", "server");
		},
		getUsersFromAuth() {
			this.getRequest("getUsersFromAuth", "auth");
		},
		getUsersFromDB() {
			this.getRequest("getUsersFromDB", "database");
		},
		findProblems() {
			this.getRequest("findErrors", "problems");
		},
		fixProblems() {
			this.getRequest("fixErrors", "problems");
		},
		getRequest(link, key) {
			const isServices =
				key === "server" || key === "auth" || key === "database";
			const data = isServices ? this.services : this;

			data[key].loading = true;

			// Make a request
			axios
				.get(`http://localhost:3000/${link}`, this.AxiosConfig)
				.then((response) => {
					data[key].loading = false;
					data[key].data = response.data;
					data[key].time = this.getCurrentTime();
				})
				.catch((error) => {
					data[key].loading = false;
					data[key].data = [];
					data[key].time = null;
				});
		},
		getCurrentTime() {
			const today = new Date();
			const date = `${today.getDate()}-${
				today.getMonth() + 1
			}-${today.getFullYear()}`;
			const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
			return `${date} ${time}`;
		},
		disconnect() {
			clearInterval(this.services.server.interval);

			for (const key in this.services) {
				this.services[key].data = false;
				this.services[key].time = null;
			}
		},
	},

	async mounted() {},
};
</script>

<style scoped></style>

<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="col-xl-12">
                    <div class="card">
                        <CardHeader :text="{title: 'Nacalculatie', subtitle: 'Wat heb je daadwerkelijk gedaan?' }" />
                        <div class="card-body">
                            <draggable v-model="$store.state.werkvoorbereiding.nacalculatie">
                                <div class="row area" v-bind:key="index" v-for="(calculatie, index) in nacalculatie">
                                    <div class="col-12 col-sm-5 col-md-4 col-lg-4 col-xl-3">
                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                                <span id="basic-addon1" class="input-group-text grabbing">
                                                    <i class="fab fa-slack-hash"></i>
                                                </span>
                                            </div>
                                            <input type="date" placeholder="Welke handeling" data-toggle="tooltip"
                                                data-placement="top" required="required" class="form-control"
                                                data-original-title="Welk handeling heb je uitgevoerd?"
                                                v-model="calculatie.date">
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm-3 col-md-4 col-lg-5 col-lg-6">
                                        <div class="input-group mb-2">
                                            <input type="text" placeholder="Welke handeling" data-toggle="tooltip"
                                                data-placement="top" required="required" class="form-control"
                                                data-original-title="Welk handeling heb je uitgevoerd?"
                                                v-model="calculatie.naam">
                                        </div>
                                    </div>
                                    <div class="col-8 col-sm-2 col-md-3 col-lg-2">
                                        <div class="input-group mb-2">
                                            <input type="number" placeholder="Aantal minuten" min="1"
                                                data-toggle="tooltip" data-placement="top" required="required"
                                                class="form-control"
                                                data-original-title="Hoeveel minuten ben je daarmee bezig geweest?"
                                                v-model.number="calculatie.min">
                                        </div>
                                    </div>
                                    <div class="col-4 col-sm-2 col-md-1">
                                        <div class="input-group mb-2">
                                            <button type="button" class="btn btn-danger btn-sm btn-block"
                                                @click="removeRegistration(index)">
                                                <i class="fa fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="col-12 d-block d-sm-none">
                                        <hr class="mt-0">
                                    </div>
                                </div>
                            </draggable>
                            <hr>
                            <div class="row">
                                <div class="col-sm-6 col-md-8 col-xl-9">
                                    <button type="button" class="btn" @click="newRegistration()">
                                        <i class="fa fa-plus mr-3"></i>Nieuwe registratie
                                    </button>
                                </div>
                                <div class="col-sm-6 col-md-3 col-xl-2">
                                    <div class="d-flex">
                                        <p class="d-inline mr-auto my-0">Aantal registraties: </p>
                                        <p class="d-inline ml-auto my-0">{{registrationAmount}}</p>
                                    </div>
                                    <div class="d-flex">
                                        <p class="d-inline mr-auto my-0">Aantal minuten: </p>
                                        <p class="d-inline ml-auto my-0">{{minuteAmount}}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <button @click="$store.state.appData.page = 7"
                                class="btn btn-lg btn-block btn-danger btn-fill">
                                Naar Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import CardHeader from "./attributes/Card-header.vue";
    import draggable from 'vuedraggable'
    import newWvb from "@/assets/config/newWvb.js";


    export default {
        name: "NaCalculatie",
        components: {
            CardHeader,
            draggable
        },
        data() {
            return {
                nacalculatie: newWvb.nacalculatie
            };
        },
        watch: {
            nacalculatie: {
                handler() {
                    this.setData();
                },
                deep: true
            }
        },
        computed: {
            getNacalculatie() {
                return this.$store.getters.werkvoorbereidingsObject(
                    "nacalculatie"
                );
            },
            registrationAmount() {
                if (this.nacalculatie) {
                    return this.$store.state.werkvoorbereiding.nacalculatie.length
                }
                return 0
            },
            minuteAmount() {
                if (this.nacalculatie) {
                    let total = 0
                    for (const cal of this.nacalculatie) {
                        total += cal.min
                    }
                    return total
                }
                return 0
            }
        },
        methods: {
            updateGegevens() {
                if (this.getNacalculatie) {
                    this.nacalculatie = this.getNacalculatie;
                }
            },
            newRegistration() {
                this.nacalculatie.push({
                    naam: "",
                    date: null,
                    min: null,
                })
            },
            removeRegistration(i) {
                this.nacalculatie.splice(i, 1)
            },
            setData() {
                this.$store.commit("werkvoorbereiding", {
                    ...this.werkvoorbereiding,
                    nacalculatie: this.nacalculatie
                });
                this.$store.dispatch("dataToFirebase", {
                    path: `alleWVB/${this.werkvoorbereiding.id}`,
                    data: this.werkvoorbereiding
                })
            }
        },
        mounted() {
            window.$('[data-toggle="tooltip"]').tooltip({
                delay: { show: 500, hide: 0 }
            });
            this.updateGegevens();
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
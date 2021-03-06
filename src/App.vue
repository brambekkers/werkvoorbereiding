<template>
    <div id="app" class="wrapper" :class="{ darkmode: darkMode }">
        <transition name="bounce" mode="out-in" :duration="{ enter: 1000, leave: 1000 }" enter-active-class="bounceInLeft" leave-active-class="bounceOutUp">
            <Landing v-if="landingPage" />
        </transition>

        <Sidebar v-if="!landingPage && !isShare" />
        <Main v-if="!landingPage" />
        <Help v-if="!landingPage" />
    </div>
</template>

<script>
import fb from "firebase/app";
import "firebase/auth";
import "firebase/database";
// import "firebase/functions";

import "vue2-animate/dist/vue2-animate.min.css";
import "./assets/css/material-dashboard.css";

import Sidebar from "./components/layout/Sidebar";
import Main from "./components/layout/Main";
import Help from "./components/Help.vue";
import Landing from "./pages/Landing.vue";

export default {
    name: "app",
    data() {
        return {
            fbConfig: {
                apiKey: process.env.VUE_APP_apiKey,
                authDomain: process.env.VUE_APP_authDomain,
                databaseURL: process.env.VUE_APP_databaseURL,
                projectId: process.env.VUE_APP_projectId,
                storageBucket: process.env.VUE_APP_storageBucket,
                messagingSenderId: process.env.VUE_APP_messagingSenderId
            }
        };
    },
    components: {
        Sidebar,
        Main,
        Help,
        Landing
    },
    watch: {
        $route() {
            if (this.werkvoorbereiding) {
                if (this.werkvoorbereiding.basisgegevens && this.werkvoorbereiding.id) {
                    if (this.werkvoorbereiding.basisgegevens.project) {
                        this.$store.commit("canUpload", true);
                        this.$store.dispatch("wvbToFirebase");
                    }
                }
            }
        }
    },
    created() {
        this.$store.commit("initializeFbApp", fb.initializeApp(this.fbConfig));
    },
    computed: {
        werkvoorbereiding() {
            return this.$store.getters.werkvoorbereiding;
        },
        sidebar() {
            return this.$store.getters.sidebar;
        },
        landingPage() {
            return this.$store.getters.landingPage;
        },
        darkMode() {
            return this.$store.getters.instellingen.modus === "licht" ? false : true;
        },
        isShare() {
            return this.$route.name == "share";
        }
    }
};
</script>

<style lang="scss">
#app {
    overflow-x: hidden;
}

.main-panel {
    box-sizing: content-box;

    .content {
        padding: 4vh 15px;
        margin-top: 1vh;
        min-height: calc(100vh - 155px);
    }
}

// DARKMODE
.darkmode {
    background: #303030 !important;

    hr {
        background: #e7e7e7;
    }

    .navbar {
        i,
        a,
        .icon-bar {
            color: white !important;
        }

        .dropdown-menu {
            background: #343a40 !important;
            .dropdown-item:hover {
                background: #3f444b !important;
            }
        }

        .navbar-toggler .icon-bar {
            background-color: white !important;
        }
    }

    .sidebar {
        background: #212121 !important;

        &::before,
        .off-canvas-sidebar nav .navbar-collapse::before {
            background: #212121 !important;
        }

        i,
        p,
        a {
            color: white !important;
        }
    }

    // CARD
    div.card {
        background: #424242 !important;
        -webkit-box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.5);
        box-shadow: 2 1px 4px 0 rgba(0, 0, 0, 0.5);
        i,
        p,
        a,
        input,
        select,
        h6,
        h5,
        h4 {
            color: white !important;
        }

        select {
            option {
                background-color: #212121;
            }
        }

        textarea {
            background: #212121 !important;
            border: black 2px solid;
            border-radius: 5px;
        }
        .stap {
            background: rgba(0, 0, 0, 0.2);
        }

        .valutaSelect {
            background-color: #555555;
        }
    }
}

.swal-text {
    text-align: center;
}

.stats a {
    color: #999999;
}

.swal2-progress-steps {
    .swal2-progress-step {
        background: #bbb !important;
    }
    .swal2-active-progress-step {
        background: #666 !important;
    }
    .swal2-progress-step-line {
        background: #bbb !important;
    }
}

// Switch
.material-switch {
    display: inline-block;
    margin-right: 15px;
}

.material-switch > input[type="checkbox"] {
    display: none;
}

.material-switch > input[type="checkbox"]:checked + label::before {
    opacity: 0.5;
}

input[type="checkbox"],
input[type="radio"] {
    box-sizing: border-box;
    padding: 0;
}

.material-switch > input[type="checkbox"]:checked + label::after {
    background: inherit;
    left: 20px;
}

.material-switch > label {
    cursor: pointer;
    height: 0px;
    position: relative;
    width: 40px;
}

.material-switch > label::before {
    background: rgb(0, 0, 0);
    box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    content: "";
    height: 16px;
    margin-top: -8px;
    position: absolute;
    opacity: 0.3;
    transition: all 0.4s ease-in-out;
    width: 40px;
}

.material-switch > label::after {
    background: rgb(255, 255, 255);
    border-radius: 16px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    content: "";
    height: 24px;
    left: -4px;
    margin-top: -8px;
    position: absolute;
    top: -4px;
    transition: all 0.3s ease-in-out;
    width: 24px;
}

// Small switch
.material-switch > label.small::before {
    height: 10px;
    margin-top: -2px;
    width: 30px;
}

.material-switch > label.small::after {
    height: 18px;
    width: 18px;
    margin-top: -2px;
}

.material-switch > input[type="checkbox"]:checked + label.small::after {
    left: 13px;
}
</style>

<template>
    <div class="col-12">
        <WaitScreen v-if="!selectedUser && users.length === 0" :msg="'De userdata wordt opgehaald...'" />
        <template v-else-if="!selectedUser && users.length > 0">
            <!-- Search -->
            <div class="form-inline justify-content-end mb-2">
                <input class="form-control mr-sm-8 w-25" type="search" placeholder="Zoeken" aria-label="Search" v-model="filter" />
            </div>
            <!-- TABLE -->
            <b-table
                hover
                striped
                outlined
                borderless
                small
                :dark="darkMode"
                :items="userList"
                :fields="tableFields"
                :head-variant="darkMode ? 'dark' : 'light'"
                :per-page="perPage"
                :current-page="currentPage"
                responsive="sm"
                class="table"
                @row-clicked="setSelectedUser"
                tdClass="tdClass"
            ></b-table>

            <!-- Pagination -->
            <div class="bottomNavBar">
                <div id="pageAmountContainer" class="input-group mb-3">
                    <div class="input-group-prepend">
                        <label class="input-group-text" for="pageAmount">Users per pagina</label>
                    </div>
                    <select v-model="perPage" class="custom-select" id="pageAmount">
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option :value="users.length">Alles</option>
                    </select>
                </div>

                <ul class="pagination d-flex justify-content-center mt-2">
                    <b-pagination v-model="currentPage" :total-rows="userList.length" :per-page="perPage" />
                </ul>
            </div>
        </template>
        <AdminUserDetail :user="selectedUser" @closeDetail="closeDetail" v-else />
    </div>
</template>

<script>
import AdminUserDetail from "@/components/admin/Admin-userDetail.vue";
import WaitScreen from "@/components/WaitScreen.vue";

export default {
    name: "AdminUserList",
    props: ["users"],
    components: {
        AdminUserDetail,
        WaitScreen
    },
    data() {
        return {
            tableFields: [
                {
                    key: "id",
                    label: "ID",
                    sortable: false
                },
                {
                    key: "profiel.voornaam",
                    label: "Voornaam",
                    sortable: true
                },
                {
                    key: "profiel.tussenvoegsel",
                    label: " ",
                    sortable: true
                },
                {
                    key: "profiel.achternaam",
                    label: "Achternaam",
                    sortable: true
                },
                {
                    key: "profiel.email",
                    label: "Email",
                    sortable: true
                },
                {
                    key: "metadata.lastSignInTime",
                    label: "Laatst ingelogd",
                    sortable: true
                }
            ],
            filter: "",
            perPage: 10,
            currentPage: 1,
            selectedUser: null
        };
    },
    computed: {
        userList() {
            if (this.filter.length) {
                return this.users.filter((user) => {
                    if (user.profiel) {
                        const checks = ["voornaam", "achternaam", "id", "email"];

                        for (const check of checks) {
                            if (user.profiel[check] && user.profiel[check].match(this.filter)) return user;
                        }
                    }
                });
            }
            return this.users;
        },
        userAmount() {
            return Object.keys(this.users).length;
        },
        darkMode() {
            return this.$store.getters.instellingen.modus === "licht" ? false : true;
        }
    },
    methods: {
        // haveProfile(profile) {
        //   return profile ? true : false;
        // },
        haveWVB(alleWVB) {
            if (alleWVB) {
                return Object.keys(alleWVB).length;
            } else {
                return 0;
            }
        },
        setSelectedUser(data) {
            this.selectedUser = data;
        },
        closeDetail() {
            this.selectedUser = null;
        }
    }
};
</script>

<style lang="scss">
.table {
    -webkit-box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
}

.tdClass {
    cursor: pointer;
}

.bottomNavBar {
    margin: 10px 0;
    display: flex;
    flex-direction: row;

    #pageAmountContainer {
        width: 300px;
    }

    .pagination {
        justify-content: center;
        flex-grow: 1;
        margin-left: -100px;
    }
}
</style>

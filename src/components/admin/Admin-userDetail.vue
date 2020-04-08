<template>
  <div class="card pt-2">
    <div class="card-header d-flex justify-content-between">
      <h3 class="my-0">Profiel informatie</h3>
      <div class="w-25">
        <button
          class="col-8 btn btn-sm bg-secondary text-white mr-2 w-75 h-100"
          @click="$emit('closeDetail')"
        >
          <i class="fas fa-chevron-left mr-2"></i>Terug
        </button>
        <button
          class="col-4 btn btn-sm bg-danger text-white w-25 h-100"
          @click="deleteUser()"
        >
          <i class="far fa-times-circle fa-2x"></i>
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-12" v-if="haveProfile">
        <div class="row mt-2">
          <div class="col-3 d-flex justify-content-center">
            <img
              v-if="!user.profiel.foto"
              src="../../assets/img/default-avatar.png"
              class="rounded-circle avatar"
            />
            <img
              v-if="user.profiel.foto"
              :src="user.profiel.foto"
              class="rounded-circle avatar"
            />
          </div>
          <div class="col-5 profileInfo">
            <h5 class="border-bottom pb-1">
              <strong>Basisgegevens:</strong>
            </h5>
            <p>
              <strong class="text-strong">Naam:</strong>
              {{ user.profiel.voornaam }} {{ user.profiel.tussenvoegsel }}
              {{ user.profiel.achternaam }}
            </p>
            <p>
              <strong>E-mail:</strong>
              {{ user.profiel.email }}
            </p>
            <p>
              <strong>Klas:</strong>
              {{ user.profiel.klas }}
            </p>
            <p>
              <strong>Niveau:</strong>
              {{ user.profiel.niveau }}
            </p>
            <p>
              <strong>UID in profiel:</strong>
              {{ user.profiel.id }}
            </p>
            <p>
              <strong>Auth UID:</strong>
              {{ user.id }}
            </p>
          </div>
          <div class="col-md-4">
            <h5 class="border-bottom pb-1">
              <strong>Over:</strong>
            </h5>
            <p>{{ user.profiel.over }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-12 px-4 mt-2" v-if="haveWVB">
        <h5 class="border-bottom mb-0">
          <strong>Projecten:</strong>
        </h5>
        <table
          class="table table-hover table-striped"
          :class="{ 'table-dark': darkMode }"
        >
          <tbody>
            <tr
              scope="row"
              v-bind:key="key"
              v-for="(wvb, key, index) in user.alleWVB"
              @click="copyWvb(wvb)"
            >
              <td>{{ index + 1 }}</td>
              <td v-if="wvb.basisgegevens">{{ wvb.basisgegevens.project }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminUserDetail",
  props: ["user"],
  computed: {
    haveProfile() {
      return this.user && this.user.profiel ? true : false;
    },
    haveWVB() {
      if (this.user && this.user.alleWVB) {
        return Object.values(this.user.alleWVB).length > 0 ? true : false;
      }
      return false;
    },
    darkMode() {
      return this.$store.getters.instellingen.modus === "licht" ? false : true;
    }
  },
  methods: {
    deleteUser() {
      window.Swal.fire({
        title: "Weet je het zeker?",
        text:
          "Wanneer je deze user verwijderd kun je dit niet meer ongedaan maken! Check dus goed of dit klopt!",
        confirmButtonColor: "#F33527",
        confirmButtonText: "Ik weet het zeker!",
        showCancelButton: true,
        type: "warning"
      }).then((result) => {
        if (result.value) {
          window.Swal.fire({
            title: "Weet je het echt zeker?",
            text: "Na deze melding verwijder je de gebruiker echt!",
            confirmButtonColor: "#F33527",
            confirmButtonText: "Ik weet het echt zeker!",
            showCancelButton: true,
            type: "warning"
          }).then((result) => {
            if (result.value) {
              window.Swal.fire({
                text: "Poof! Je hebt de gebruiker is verwijderd!",
                type: "success"
              });
              this.$store.dispatch("deleteUser", this.user.id);
              this.user = {};
              this.$emit("closeDetail");
            }
          });
        }
      });
    },

    copyWvb(wvb) {
      window.Swal.fire({
        title: "Wil je deze wvb kopiëren?",
        text: "De werkvoorbereiding zal naar jouw account worden gekopieerd!",
        confirmButtonColor: "#4caf50",
        confirmButtonText: "Ja, doe dat!",
        showCancelButton: true,
        type: "info"
      }).then((result) => {
        if (result.value) {
          window.Swal.fire({
            text: "Poof! Je hebt een kopie!",
            type: "success"
          });
          this.$store.commit("werkvoorbereiding", wvb);
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.avatar {
  height: 200px;
  width: 200px;
  object-fit: cover;
}
.profileInfo {
  p {
    margin: 0;
    font-size: 1rem;
    // line-height: 18px;
  }
}

tr {
  cursor: pointer;
}
</style>

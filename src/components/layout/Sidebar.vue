<template>
  <aside
    id="main-sidebar"
    class="sidebar"
    data-color="green"
    :class="{ smallSidebar: isSidebarSmall }"
  >
    <div id="sidebarOverlay" :class="{ 'bg-dark': darkMode }"></div>
    <div class="logo text-center">
      <router-link to="/" class="simple-text logo-normal">WVB</router-link>
    </div>
    <div class="sidebar-wrapper">
      <ul class="nav">
        <SidebarMenuItem
          :itemProps="{
            page: 'dashboard',
            name: 'dashboard',
            icon: 'dashboard',
            sidebarSmall: isSidebarSmall
          }"
        />
        <SidebarMenuItem
          :itemProps="{
            page: user ? 'projecten' : 'login',
            name: 'projecten',
            icon: 'content_paste',
            sidebarSmall: isSidebarSmall
          }"
        />
        <SidebarMenuItem
          :itemProps="{
            page: user ? 'account' : 'login',
            name: 'profiel',
            secondName: 'account',
            icon: 'person',
            sidebarSmall: isSidebarSmall
          }"
        />
        <hr />
        <div
          class="projectMenuItems"
          @mouseenter="hoverSideBar('enter')"
          @mouseleave="hoverSideBar('leave')"
        >
          <transition
            name="bounce"
            mode="out-in"
            :duration="{ enter: 500, leave: 100 }"
            enter-active-class="bounceInLeft"
            leave-active-class="bounceOutLeft"
          >
            <div
              class="projectMenuName"
              v-if="isSidebarSmall"
              key="sidebarHidden"
            >
              <p>{{ $route.name }}</p>
            </div>

            <div v-else key="sidebarShow">
              <SidebarProjectMenuItem :itemProps="{ page: 'gegevens' }" />
              <SidebarProjectMenuItem :itemProps="{ page: 'componenten' }" />
              <SidebarProjectMenuItem :itemProps="{ page: 'materialen' }" />
              <SidebarProjectMenuItem :itemProps="{ page: 'maten' }" />
              <SidebarProjectMenuItem :itemProps="{ page: 'gereedschap' }" />
              <SidebarProjectMenuItem :itemProps="{ page: 'planning' }" />
              <SidebarProjectMenuItem
                :itemProps="{ page: 'nacalculatie' }"
                v-if="stap >= 7"
              />
            </div>
          </transition>
        </div>

        <hr />
        <SidebarMenuItem
          :itemProps="{
            page: 'importeren',
            name: 'importeren',
            icon: 'cloud_download',
            sidebarSmall: isSidebarSmall
          }"
        />
        <SidebarMenuItem
          :itemProps="{
            page: 'exporteren',
            name: 'exporteren',
            icon: 'cloud_upload',
            sidebarSmall: isSidebarSmall
          }"
        />
        <hr v-if="electron" />
        <SidebarExitItem
          v-if="electron"
          :itemProps="{ name: 'afsluiten', icon: 'exit_to_app' }"
        />

        <!-- Toggle sidebar -->
        <li class="nav-item shrink ">
          <a class="nav-link">
            <i class="material-icons" @click="toggleSidebar()">{{
              sidebarSmall ? "chevron_right" : "chevron_left"
            }}</i>
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
import SidebarProjectMenuItem from "./SidebarProjectMenuItem";
import SidebarExitItem from "./SidebarExitItem";
import SidebarMenuItem from "./SidebarMenuItem";
import isElectron from "is-electron";

export default {
  name: "Sidebar",
  data() {
    return {
      sidebarSmall: false,
      sidebarTempOpen: false
    };
  },
  computed: {
    electron() {
      return isElectron();
    },
    user() {
      return this.$store.getters.user;
    },
    werkvoorbereiding() {
      return this.$store.getters.werkvoorbereiding;
    },
    stap() {
      if (this.werkvoorbereiding) return this.werkvoorbereiding.stap;
      return 0;
    },
    darkMode() {
      return this.$store.getters.instellingen.modus === "licht" ? false : true;
    },
    isSidebarSmall() {
      return this.sidebarSmall && !this.sidebarTempOpen;
    }
  },
  methods: {
    toggleSidebar() {
      this.sidebarSmall = !this.sidebarSmall;

      if (this.sidebarSmall) {
        const el = document.querySelectorAll(".projectMenuItems");
        el[0].style.minHeight = `${el[0].clientHeight}px`;
      }
    },
    hoverSideBar(state) {
      if (this.sidebarSmall) {
        if (state === "enter") {
          this.sidebarTempOpen = true;
        } else this.sidebarTempOpen = false;
      }
    }
  },
  components: {
    SidebarProjectMenuItem,
    SidebarMenuItem,
    SidebarExitItem
  }
};
</script>

<style scoped lang="scss">
.sidebar {
  background-image: url("../../assets/img/standing.jpg");
  background-position: center;
  background-size: cover;
  opacity: 0.93;
  min-width: 260px;
  box-sizing: border-box;

  .sidebar-wrapper {
    width: 100%;
    overflow-x: hidden;
  }

  #sidebarOverlay {
    position: absolute;
    z-index: 3;
    width: 100%;
    height: 100%;
    display: block;
    background: #fff;
    opacity: 0.93;
  }

  .nav {
    position: flex;

    .shrink {
      position: absolute;
      width: 100%;
      bottom: 13px;

      .nav-link {
        width: 100%;
        height: 50px;
        margin: 0;
        padding: 0;
        line-height: 50px;
        text-align: right;

        &:hover {
          background: none;
        }

        i {
          float: none;
          border-radius: 5px 0 0 5px;
          width: 50px;
          height: 50px;
          line-height: 50px;
          margin: 0;
          color: white;
          background: #aaaaaa;
          cursor: pointer;

          &:hover {
            font-size: 2rem;
          }
        }
      }
    }
  }
}

@media (max-width: 991px) {
  .shrink .nav-link i {
    visibility: hidden;
  }
}

.smallSidebar {
  min-width: 80px;
  width: 80px;
}

.projectMenuItems {
  display: flex;

  div {
    width: 100%;
  }

  .projectMenuName {
    width: 100%;
    height: 100%;
    align-self: center;
    justify-self: center;

    display: flex;
    align-items: center;
    justify-content: center;

    p {
      display: block;
      writing-mode: vertical-rl;
      text-orientation: mixed;
      font-size: 18px;
      font-weight: 400;
    }
  }
}
</style>

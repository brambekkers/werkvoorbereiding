<template>
  <li class="nav-item">
    <a
      class="nav-link"
      @click.prevent="changePage"
      :style="{ 'background-color': hexColor }"
      :class="{ sidebarSmall: itemProps.sidebarSmall }"
    >
      <p :class="{ 'text-light': isBackground }">
        <i class="material-icons" :class="{ 'text-light': isBackground }">{{
          itemProps.icon
        }}</i>
        {{ linkName }}
      </p>
    </a>
  </li>
</template>

<script>
export default {
  name: "SidebarMenuItem",
  props: ["itemProps"],
  computed: {
    sidebar() {
      return this.$store.getters.sidebar;
    },
    linkName() {
      return this.itemProps.name ? this.itemProps.name : this.itemProps.page;
    },
    routeName() {
      return this.$route.name.trim().toLowerCase();
    },
    isBackground() {
      return (
        this.itemProps.name === this.routeName ||
        this.itemProps.secondName === this.routeName
      );
    },
    hexColor() {
      return this.isBackground ? this.$store.getters.hexColor : null;
    }
  },
  methods: {
    changePage() {
      this.$router.push(`/${this.itemProps.page}`);
      this.closeSidebar();
    },
    closeSidebar() {
      if (this.sidebar) {
        window.$("html").removeClass("nav-open");
        window.$(".navbar-toggler").removeClass("toggled");
        this.$store.commit("sidebar", false);
      }
    }
  }
};
</script>

<style scoped>
a {
  cursor: pointer;
}

.sidebarSmall {
  padding-left: 10px !important;
  width: 50px !important;
  overflow: hidden;
}
</style>

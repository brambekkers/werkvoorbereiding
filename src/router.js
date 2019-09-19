import Vue from 'vue';
import Router from 'vue-router';

// stop duplication error
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

// project pages
import Gegevens from './components/pages/Gegevens.vue';
import Componenten from './components/pages/Componenten.vue';
import Materialen from './components/pages/Materialen.vue';
import OverigeMaterialen from './components/pages/OverigeMaterialen.vue';
import Maten from './components/pages/Maten.vue';
import Gereedschap from './components/pages/Gereedschap.vue';
import Planning from './components/pages/Planning.vue';
import Dashboard from './components/pages/Dashboard.vue';
import NaCalculatie from './components/pages/Nacalculatie.vue';

// optie pages
import MateriaalOpties from './components/pages/MateriaalOpties.vue';
import PlanningOpties from './components/pages/PlanningOpties.vue';

import Importeren from './components/pages/Importeren.vue';
import Exporteren from './components/pages/Exporteren.vue';

// Profile pages
import Login from './components/pages/Login.vue';
import Register from './components/pages/Register.vue';
import ForgotPw from './components/pages/ForgotPw.vue';
import Profiel from './components/pages/Profiel.vue';
import Projecten from './components/pages/Projecten.vue';
import Statistieken from './components/pages/Statistieken.vue';

// Overige
import Instellingen from './components/pages/Instellingen.vue';
import Over from './components/pages/Over.vue';
import Privacy from './components/pages/Privacy.vue';
import Admin from './components/pages/Admin.vue';
import Licence from './components/pages/Licence.vue';

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		// Pages
		{ path: '*', name: 'Gegevens', component: Gegevens },
		{
			path: '/Gegevens',
			name: 'Gegevens',
			component: Gegevens
		},
		{
			path: '/Componenten',
			name: 'Componenten',
			component: Componenten
		},
		{
			path: '/Materialen',
			name: 'Materialen',
			component: Materialen
		},
		{
			path: '/OverigeMaterialen',
			name: 'OverigeMaterialen',
			component: OverigeMaterialen
		},
		{
			path: '/Maten',
			name: 'Maten',
			component: Maten
		},
		{
			path: '/Gereedschap',
			name: 'Gereedschap',
			component: Gereedschap
		},
		{
			path: '/Planning',
			name: 'Planning',
			component: Planning
		},
		{
			path: '/Dashboard',
			name: 'Dashboard',
			component: Dashboard
		},
		{
			path: '/NaCalculatie',
			name: 'NaCalculatie',
			component: NaCalculatie
		},
		// optie pages
		{
			path: '/MateriaalOpties',
			name: 'MateriaalOpties',
			component: MateriaalOpties
		},
		{
			path: '/PlanningOpties',
			name: 'PlanningOpties',
			component: PlanningOpties
		},
		{
			path: '/Importeren',
			name: 'Importeren',
			component: Importeren
		},
		{
			path: '/Exporteren',
			name: 'Exporteren',
			component: Exporteren
		},
		// Profile pages
		{
			path: '/login',
			name: 'Login',
			component: Login
		},
		{
			path: '/register',
			name: 'Register',
			component: Register
		},
		{
			path: '/forgotPw',
			name: 'ForgotPw',
			component: ForgotPw
		},
		{
			path: '/account',
			name: 'Account',
			component: Profiel
		},
		{
			path: '/Projecten',
			name: 'Projecten',
			component: Projecten
		},
		{
			path: '/Statistieken',
			name: 'Statistieken',
			component: Statistieken
		},
		// Overige
		{
			path: '/Instellingen',
			name: 'Instellingen',
			component: Instellingen
		},
		{
			path: '/Over',
			name: 'Over',
			component: Over
		},
		{
			path: '/Privacy',
			name: 'Privacy',
			component: Privacy
		},
		{
			path: '/Admin',
			name: 'Admin',
			component: Admin
		},
		{
			path: '/Licence',
			name: 'Licence',
			component: Licence
		}
	]
});

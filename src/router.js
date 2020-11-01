import Vue from 'vue';
import Router from 'vue-router';

// stop duplication error
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
	if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
	return originalPush.call(this, location).catch(err => err)
}

// project pages
import Gegevens from './pages/Gegevens.vue';
import Componenten from './pages/Componenten.vue';
import Materialen from './pages/Materialen.vue';
import OverigeMaterialen from './pages/OverigeMaterialen.vue';
import Maten from './pages/Maten.vue';
import Gereedschap from './pages/Gereedschap.vue';
import Planning from './pages/Planning.vue';
import Dashboard from './pages/Dashboard.vue';
import Share from './pages/Share.vue';
import NaCalculatie from './pages/Nacalculatie.vue';
import Optimalisatie from './pages/Optimalisatie.vue';

// optie pages
import MateriaalOpties from './pages/MateriaalOpties.vue';
import PlanningOpties from './pages/PlanningOpties.vue';

import Importeren from './pages/Importeren.vue';
import Exporteren from './pages/Exporteren.vue';

// Profile pages
import Login from './pages/Login.vue';
import Register from './pages/Register.vue';
import ForgotPw from './pages/ForgotPw.vue';
import Profiel from './pages/Profiel.vue';
import Projecten from './pages/Projecten.vue';
import Statistieken from './pages/Statistieken.vue';

// Overige
import Instellingen from './pages/Instellingen.vue';
import Over from './pages/Over.vue';
import Privacy from './pages/Privacy.vue';
import Admin from './pages/Admin.vue';
import AdminEdit from './pages/AdminEdit.vue';
import Licence from './pages/Licence.vue';

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
			path: '/share/:uid/:wvbid',
			name: 'share',
			component: Share
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
			path: '/Optimalisatie',
			name: 'Optimalisatie',
			component: Optimalisatie
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
			path: '/Admin/edit',
			name: 'AdminEdit',
			component: AdminEdit
		},
		{
			path: '/Licence',
			name: 'Licence',
			component: Licence
		}
	]
});

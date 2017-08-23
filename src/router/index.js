import Vue from 'vue';
import VueRouter from 'vue-router';
import UserPage from '../components/profile/profile.vue';
import profileDetal from '../components/profile/profileDetal.vue';
import profileAnswers from '../components/profile/profileAnswers.vue';
import profileRewievs from '../components/profile/profileRewievs.vue';
import profileBlog from '../components/profile/profileBlog.vue';
import profileFiles from '../components/profile/profileFiles.vue';

import DefaultView from '../components/defaultView/defaultView.vue';
import News from '../components/news/news.vue';

import Contacts from '../components/contacts/contacts.vue';
import ContactsFilter from '../components/contacts/filterContact.vue';

import Library from '../components/library/library.vue';
import LibraryClass from '../components/library/libraryClass.vue';
import LibraryCategory from '../components/library/libraryCategory.vue';
import LibraryItem from '../components/library/libraryItem.vue';
import LibrarySidebar from '../components/library/librarySidebar.vue';

import Measurements from '../components/measurements/measurements.vue';
import MedicalRecords from '../components/medicalRecords/medicalRecords.vue';
import Questions from '../components/questions/questions.vue';
import QuestionsSideBar from '../components/questions/questionsSideBar.vue';
import Messages from '../components/messages/messages.vue';
import Search from '../components/search/search.vue';
import SearchSidebar from '../components/search/searchSidebar.vue';
import Groups from '../components/groups/groups.vue'; 
import Organizations from '../components/organizations/organizations.vue';
import Consultations from '../components/consultations/consultations.vue';

import Settings from '../components/settings/settings.vue';
import SettingsTotal from '../components/settings/settingsTotal.vue';
import SettingsContacts from '../components/settings/settingsContacts.vue';
import SettingsSecurity from '../components/settings/settingsSecurity.vue';
import SettingsPrivacy from '../components/settings/settingsPrivacy.vue';
import settingsSidebar from "../components/settings/settingsSidebar.vue";

import AdminpageMain from '../components/adminpage/Adminpage.vue';
import AdminpageLibrary from '../components/adminpage/Library.vue';

import AdminpageLibraryClassSelect from '../components/adminpage/library/ClassSelector.vue';
import AdminpageLibraryCategorySelect from '../components/adminpage/library/CategorySelector.vue';
import AdminpageLibraryItemSelect from '../components/adminpage/library/ItemSelector.vue';

import AdminpageLibraryClassEditor from '../components/adminpage/library/ClassEditor.vue';
import AdminpageLibraryCategoryEditor from '../components/adminpage/library/CategoryEditor.vue';
import AdminpageLibraryItemEditor from '../components/adminpage/library/ItemEditor.vue';

Vue.use(VueRouter);

var router =  new VueRouter({
	mode: 'history', 
	routes: [ 
		{path: '/news', name: 'news', component: News, meta: {requiresAuth: true}},
		{path: '/contacts', name: 'contacts', components: {default:Contacts, sideBar:ContactsFilter}, props: (route) => ({ query: route.query.q })},
		{path: '/library', name: 'library', component: Library, 
			children: [
				{path: ':classUrl', name: 'libraryClass', component: LibraryClass,
					children: [
						{path: ':categoryUrl', name: 'libraryCategory', component: LibraryCategory, 
							children: [
								{path: ':itemUrl', name: 'libraryItem', redirect: {name: 'libraryItemPage'}}
							]
						}
					]
				}
			]
		}, 
		{path: '/library/:classUrl/:categoryUrl/:itemUrl', name: 'libraryItemPage', components: {default: LibraryItem, rightBar: LibraryItem, sideBar: LibrarySidebar}},
		{path: '/measurements', name: 'measurements', component: Measurements},
		{path: '/medicalRecords', name: 'medicalRecords', component: MedicalRecords},
		{path: '/questions', name: 'questions', components: {default: Questions, sideBar: QuestionsSideBar}},
		{path: '/messages', name: 'messages', component: Messages},
		{path: '/consultations', name: 'consultations', component: Consultations},
		{path: '/search', name: 'search', components: {default: Search, sideBar: SearchSidebar}},  
		{path: '/groups', name: 'groups', component: Groups},
		{path: '/organizations', name: 'organizations', component: Organizations},
		{path: '/settings', components: {default: Settings, sideBar: settingsSidebar},
			children: [
					{path: '', name: 'settings', component: SettingsTotal},
					{path: 'contacts', name: 'settingsContacts', component: SettingsContacts},
					{path: 'security', name: 'settingsSecurity', component: SettingsSecurity},
					{path: 'privacy', name: 'settingsPrivacy', component: SettingsPrivacy},
		]},
		{path: '/adminpage', name: 'adminpage', component: AdminpageMain,
			children: [
				{path: 'library', component: AdminpageLibrary, children: [
						{path: 'libClass', component: AdminpageLibraryClassSelect, children: [{path: ':classId', component: AdminpageLibraryClassEditor}]},
						{path: 'libCategory', component: AdminpageLibraryCategorySelect, children: [{path: ':categoryId', component: AdminpageLibraryCategoryEditor}]},
						{path: 'libItem', component: AdminpageLibraryItemSelect, children: [{path: ':itemId', component: AdminpageLibraryItemEditor}]},
					]
				}
			]
		},
		{path: '/:profileUrl', component: UserPage, props: true,
			children: [
					{path: '',  name: 'profile', component: profileDetal},
					{path: 'answers', name: 'profileAnswers', component: profileAnswers},
					{path: 'rewievs', name: 'profileRewievs', component: profileRewievs},
					{path: 'blog', name: 'profileBlog', component: profileBlog},
					{path: 'files', name: 'profileFiles', component: profileFiles} 
		]},
		{path: '/', name: 'defaultView', component: DefaultView},
	]
});

export default router;
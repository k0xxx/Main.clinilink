// URL and endpoint constants
import { baseAPI } from '../config';
const options = {
	loginUrl: baseAPI + 'auth/login/',
	signupUrl: baseAPI + 'auth/signup/',
	tokenUrl: baseAPI + 'auth/token/',
}

class Authenticate {
	constructor(Axios, router, loginUrl, signupUrl, logoutUrl) {
		this.Axios = Axios;
		this.router = router;
		this.loginUrl = loginUrl;
		this.signupUrl = signupUrl;
		this.logoutUrl = logoutUrl;
	}
	login(context, input){
		this.Axios.post(this.loginUrl, input).then((response) => {
			//console.log(response);
			if(response.data.user){
				this.setUserId(response.data.user.id);
				this.setToken(response.data.user.token);
				//context.isAuth = true;
				context.$router.replace('news');
			}else{
				input.error = response.data.info;
			}
		}, function(err){
			console.log(err);
		})
	}
	signup(context, input){
		this.Axios.post(this.signupUrl, input).then((response) => {
			console.log(response);
			if(response.data.user){
				input.isRegister = true;
			}else{
				input.error = response.data.info.message;
			}
			
			//context.$emit('auth');
			//context.$router.replace('asd');
			/*if(response.data.user){
				this.setToken(response.data.user.token);
				//this.saveUser(response.data.user);
				this.updateUserData(response.data.user.token);
				context.isAuth = true;
			}else{
				context.credentials.error = response.data.info;
			}*/
		}, function(err){
			console.log(err);
		})
	}
	logout(context, redirect = false, errorHandler = false) {
		this.removeToken();
		this.removeUserId();
		context.isAuth = false;
		context.$router.replace('/');
	}
	
	// Token
	check(){return validToken(this.getToken())}
	setToken(token){localStorage.setItem("token", token)}
	getToken(){return localStorage.getItem("token")}
	removeToken() {localStorage.removeItem("token")}
	
	// User ID
	setUserId(userId){localStorage.setItem("userId", userId)}
	getUserId(){return localStorage.getItem("userId")}
	removeUserId(){localStorage.removeItem("userId")}
	
}
function validToken(token) {
	if (typeof token != "undefined" && token != null) {
		return true;
	}
	return false;
}

function authJWT(Vue, Axios, router) {

	Vue.prototype.$auth = new Authenticate(Axios, router, options.loginUrl, options.signupUrl, options.logoutUrl);
	
	router.beforeEach((to, from, next) => {
		if (to.matched.some(record => record.meta.requiresAuth)) {
			// этот путь требует авторизации, проверяем залогинен ли
			// пользователь, и если нет, перенаправляем на страницу логина
			console.log('secure');
			//if (!auth.loggedIn()) {
			if (false) {
				next({
					path: '/login',
					//query: { redirect: to.fullPath }
				})
			} else {
				next()
			}
		} else {
			next() // всегда так или иначе нужно вызвать next()!
		}
	});
	
	Axios.interceptors.request.use(function (config) {
		if (!config.headers.common.hasOwnProperty('Authorization')) {
			config.headers.common['Authorization'] = localStorage.getItem("token");
		}
		
		return config;
	}, function (error) {
		return Promise.reject(error);
	});
	
}
export default authJWT;
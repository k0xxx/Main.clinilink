<template>
	<div id="app">
		<appHeader></appHeader> 
		<div id="mainView">
			<userMenu></userMenu>
			<router-view></router-view>
			<router-view name="sideBar"></router-view>
		</div>
	</div>
</template>   
  asdasd
<script>
import appHeader from './components/appHeader/appHeader.vue'  
import userMenu from './components/userMenu/userMenu.vue'  

export default {  
  name: 'app', 
  data () {  
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: { appHeader, userMenu } 
}
</script>

<style lang="scss">
*,
*::before,
*::after {
	-webkit-box-sizing: inherit;
	-moz-box-sizing: inherit;
	box-sizing: inherit; 
}
html {
    font-family: sans-serif;
	line-height: 1.15;
	-ms-text-size-adjust: 100%;
	-webkit-text-size-adjust: 100%;
} 
body {
    margin: 0;
	padding: 0;
    font-family: "Roboto", sans-serif;
    font-size: 1rem;
    font-weight: normal;
    line-height: 1.5;
    color: #292b2c;
    background-color: #F0F0F0;
	margin-top: 50px;
}
a {
    color: #329d81;
	text-decoration: none;
}
p {
  margin: 0 0 1em;
}
ul{
    list-style: none; 
    padding: 0px;
	margin: 0px;
}
img{
	display: block;
}
.list-item-filter{
	position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-flow: row wrap;
    -ms-flex-flow: row wrap;
    flex-flow: row wrap;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    margin-bottom: -1px;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.125);
}
.list-item-filter:hover{
	background-color: #F8F8F8;  
}
.active_filter{
	background-color: #329d81 !important;
	color: white !important;
}
	 
#mainView{
	position: relative;
	display: flex;
    flex-direction: row;
	width: 1140px;
    max-width: 100%;
	min-height: calc(100vh - 50px);
	margin: 0 auto;
}
#menuWrap{
	position: relative;
    flex: 0 0 calc(18% - 1rem);
    width: 18%;
    padding: 1rem 0.5rem 0.5rem;
    min-height: 100vh;
}
#view.noSideBar{
	flex: 0 0 calc(82% - 1rem);
    max-width: calc(82% - 1rem);
    padding: 1rem 0.5rem 0.5rem;
}
#view.withSideBar{
	flex: 0 0 calc(60% - 1rem);
    max-width: calc(60% - 1rem);
    padding: 1rem 0.5rem 0.5rem;
}

#mainView .sideBar{
	flex: 0 0 calc(22% - 1rem);
    max-width: calc(22% - 1rem);
    padding: 1rem 0.5rem 0.5rem;
}

.card {
	position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    background-color: #fff;
    border: 1px solid #ddd;
	border-radius: 0.25rem;
	margin-bottom: 1rem;
}
/*=============================================*/
/*===Normalize===*/
h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
    margin-bottom: 0.5rem;
    font-family: inherit;
    font-weight: 500;
    line-height: 1.1;
    color: inherit;
    margin-top: 0;    
}
/*===Project style===*/
.text-grey{
	color: grey;
}
.text-areas{
    width: calc(100% - 2px) !important;
    padding: 0 !important; 
} 
.grey-border{
	border-color: #ddd !important;
}
.input-calc-border-width{
	width: calc(100% - 2px) !important; 
	padding-right: 0px !important;
	padding-left: 0px !important; 
}
.text-primary{
    color: #329d81 !important;
}
.btn-primary{
    background: white !important;
    color: #329d81;
    border: 1px solid #329d81 !important;
    outline: none;
    border-radius: 4px;
    -webkit-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out; 
    cursor: pointer; 
} 
.btn-primary:hover{
    background: #278068 !important;
    color:white;
}
.btn-secondary{
	background-color: white !important;
    color: #329d81;
    border: 1px solid #ddd !important;
    outline: none;
    border-radius: 4px;
    -webkit-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out; 
    cursor: pointer; 
}
.btn-secondary:hover{
    background-color: #278068 !important;
    color:white;
}

select{
	background-color: white;
	outline: none;
	-webkit-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out; 
    cursor: pointer; 
	border: 1px solid #ddd !important;
	color: #329d81;  
}
select:hover{
	background-color: #F8F8F8 !important; 
}
input{
    border-color: #ddd;
    outline: none;
}
.input-container{
    margin-bottom: 0.5rem; 
    display: flex;
    flex-direction: column; 
}
.input-container input[placeholder]{
    font-size: 14px;  
} 
textarea{ 
    border-color: #ddd;
    outline: none; 
	box-sizing: border-box;
}
.textarea-container{
    margin-bottom: 0.5rem;
    display: flex; 
    flex-direction: column; 
}
textarea[placeholder]{
    font-size: 14px;
} 
.img-circle{
	border-radius: 100%; 
}
/*===flex===*/
.d-flex{
    display: flex !important;
}
.flex-column{
    flex-direction: column; 
}
.align-i-center{
    align-items: center;
}
.align-i-left{
    align-items:flex-start;
}
.align-i-right{
    align-items:flex-end;
}  
.align-i-stretch{
    align-items:stretch;
}  
.justify-content-center{
     justify-content: center;   
}
.justify-content-between{
     justify-content: space-between;   
}
.justify-content-around{
     justify-content: space-around;   
}
.justify-content-start{
     justify-content: flex-start;
}
.justify-content-end{
     justify-content: flex-end;
}  
/*===text-aligns===*/
.text-center{
    text-align: center;
}
.text-left{
    text-align: left;
}
.text-right{
    text-align: right;
}
.text-justify{
    text-align: justify;
}
/*===width===*/
.w-25{
    width:25%;
}
.w-50{ 
    width:50%;
}
.w-75{
    width:75%;
}
.w-100{
    width:100%;
}
/*===Paddings===*/
.p-50{
    padding: 0.5rem !important;    
}
.p-75{
    padding: 0.75rem;   
} 
.p-100{
    padding: 1rem;   
}
    
.pt-50{
    padding-top: 0.5rem;
}
.pt-75{
    padding-top: 0.75rem;
}
.pt-100{
    padding-top: 1rem;
}
    
.pb-50{
    padding-bottom: 0.5rem;
}
.pb-75{
    padding-bottom: 0.75rem;
}
.pb-100{
    padding-bottom: 1rem;
}
    
.pl-50{
    padding-left: 0.5rem;
}
.pl-75{
    padding-left: 0.75rem;
}
.pl-100{
    padding-left: 1rem;
}
    
.pr-50{
    padding-right: 0.5rem;
}
.pr-75{
    padding-right: 0.75rem;
}
.pr-100{
    padding-right: 1rem;
}
   
.px-25{
	padding-right: 0.25rem !important;
    padding-left: 0.25rem !important;
}
.px-50{
    padding-right: 0.5rem !important;
    padding-left: 0.5rem !important;
}
.px-75{
    padding-right: 0.75rem;
    padding-left: 0.75rem;
}
.px-100{
    padding-right: 1rem;
    padding-left: 1rem;
}
    
.py-50{
    padding-top: 0.5rem !important;
    padding-bottom: 0.5rem !important;
}
.py-75{
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
}
.py-100{
    padding-top: 1rem;
    padding-bottom: 1rem;
}     
/*===Margins===*/
.m-auto{
	margin: auto; 
}
.m-0{
    margin: 0rem !important;   
}
.m-50{
    margin: 0.5rem;   
}
.m-75{
    margin: 0.75rem;   
}
.m-100{
    margin: 1rem;   
}
.mx-25{
    margin-left: 0.25rem;
    margin-right: 0.25rem;   
}
.mx-50{
    margin-left: 0.5rem;
    margin-right: 0.5rem;
}
.mx-75{
    margin-left: 0.75rem;
    margin-right: 0.75rem;
}
.mx-100{
    margin-left: 1rem;
    margin-right: 1rem;
}
    
.mr-50{
    margin-right: 0.5rem; 
}
.mr-75{
    margin-right: 0.75rem;
}
.mr-100{
    margin-right: 1rem;
}
    
.ml-50{
    margin-left: 0.5rem;
}
.ml-75{
    margin-left: 0.75rem;
}
.ml-100{
    margin-left: 1rem;
}
    
.my-50{
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
}
.my-75{
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
}
.my-100{
    margin-top: 1rem;
    margin-bottom: 1rem;
}
    
.mt-50{
    margin-top: 0.5rem;
}
.mt-75{
    margin-top: 0.75rem;
}
.mt-100{
    margin-top: 1rem;
}
    
.mb-50{
    margin-bottom: 0.5rem;
}
.mb-75{
    margin-bottom: 0.75rem;
}
.mb-100{
    margin-bottom: 1rem;
}
/*===Floating====*/
.pull-right{
	float: right;
}
.pull-left{
	float: left;
}
.pull-center{
	margin: 0 auto;
}
/*===Border radius====*/
.border-left-radius{
	border-top-left-radius: 4px !important;
	border-bottom-left-radius: 4px !important;
	border-top-right-radius: 0px !important;
	border-bottom-right-radius: 0px !important;
}
.border-right-radius{
	border-top-right-radius: 4px !important;
	border-bottom-right-radius: 4px !important;
	border-top-left-radius: 0px !important;
	border-bottom-left-radius: 0px !important;
} 
.no-border-radius{
	border-radius: 0px !important;
}
/*===Input-sizing====*/
.input-small{
    height: 1rem;
    border-radius: 4px;
    border: 1px solid #ddd;
    padding: 2.5px 5px;
    
}
.input-middle{
    height: 1.3rem;
    border-radius: 4px;
    border: 1px solid #ddd;
    padding: 2.5px 5px;
}
.input-large{
    height: 1.8rem;
    border-radius: 4px;
    border: 1px solid #ddd;
    padding: 2.5px 5px;
} 
/*===button-sizing===*/
.btn-small{
    height: 1rem;
    border-radius: 4px;
}
.btn-middle{
    height: 1.3rem;
    border-radius: 4px;
}
.btn-large{
    height: 1.8rem;
    border-radius: 4px;
}
.btn-xlarge{
    height: 2.3rem;
    border-radius: 4pxs;
}
/*===buttons-type===*/
.btn{
    display: inline-block;
    font-weight: normal;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    padding: 0.15rem 0.4rem;
    font-size: 1rem; 
    border-radius: 0.25rem;
    -webkit-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
}
.btn-outline-danger {
    color: #d9534f;
    background-image: none;
    background-color: transparent;
    border-color: #d9534f;
}
.btn-outline-danger:hover{
    color:white;
    background-color: #d9534f;
}
.btn-outline-info {
    display: inline-block;
    color: #5bc0de;
    background-image: none;
    background-color: transparent;
    border-color: #5bc0de;
}
.btn-outline-info:hover{
    color: white;
    background-color: #5bc0de;
}
.btn-outline-warning {
    color: #f0ad4e;
    background-image: none;
    background-color: transparent;
    border-color: #f0ad4e;
}
.btn-outline-warning:hover{
    color:white;
    background-color: #f0ad4e;
}
/*===font-sizing===*/
.text-small{
    font-size: 0.75rem;  
}
.text-middle{
    font-size: 1rem;  
}
.text-large{
    font-size: 1.25rem;  
}
/*===font-weight===*/
.text-w-lighter{
    font-weight: lighter;
}
.text-w-normal{
    font-weight: lighter;
}
.text-w-bolder{
    font-weight: bolder;
}
.text-w-bold{
    font-weight: bold;
}
/*=============================================*/
</style>

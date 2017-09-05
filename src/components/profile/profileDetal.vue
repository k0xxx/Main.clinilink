<template>
    <div id="more_tab" role="tabpanel">
        <ul class="list-detail">
            <!-- Пользователь -->
			<li class="p-100 d-flex flex-column">
				<h3 class="text-primary"><strong><icon name="medkit" class="mr-50"></icon>О пользователе</strong></h3>
				<ul class="education">
					<li class="education_item">{{profileInfo.birthday | formatBirthday}}</li>
					<li class="education_item">Пол: {{profileInfo.gender}}</li>
					<li class="education_item">Группа крови: {{profileInfo.bloodType}}</li>
				</ul>
			</li>
			<!-- Опыт работы -->
			<profileDetailWorks v-if="profileInfo.status.id != 0"></profileDetailWorks> 
            <!-- End Опыт работы -->
            <!-- Сертификаты -->
			<profileDetailCertificate v-if="profileInfo.status.id != 0"></profileDetailCertificate>
            <!-- End Сертификаты -->
            <!-- End Курсы -->
            <profileDetailCourses v-if="profileInfo.status.id != 0"></profileDetailCourses>
            <!-- End Курсы-->
            <!-- Образование -->
			<profileDetailEducation v-if="profileInfo.status.id != 0"></profileDetailEducation>
            <!-- End Образование -->
            <!-- Навыки/интересы -->
            <profileDetailSkills></profileDetailSkills>
            <!-- END Навыки/интересы -->
        </ul>
    </div>
</template>

<script>
import { baseAPI } from '../../config.js';
import profileDetailWorks from './profileDetailWorks.vue';
import profileDetailCertificate from './profileDetailCertificate.vue';
import profileDetailCourses from './profileDetailCourses.vue';
import profileDetailEducation from './profileDetailEducation.vue';
import profileDetailSkills from './profileDetailSkills.vue';
export default {
	name: 'profileDetal',
	components:{
		profileDetailWorks,
		profileDetailCertificate,
		profileDetailCourses,
		profileDetailEducation,
		profileDetailSkills
	},
	data() {
		return {
			endpoint: baseAPI + 'profile/'+this.$route.params.profileUrl,
			profileInfo: {
				status: {
					id: 0
				},
				img: '/img/defaultProfile.png',
				grade: {
					rating: 0,
					votes: 0
				}
			}
		}
	},
	methods: {
		getProfileInfo: function(){
			this.$http.get(this.endpoint).then((response) => {
				console.log(response.data.profile);
				this.profileInfo = response.data.profile;
			}, function(err){
				console.log(err); 
			})
		},
    },
	created: function(){
		this.getProfileInfo();
	}
} 
</script> 
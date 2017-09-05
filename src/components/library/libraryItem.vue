<template>
	<div id="view" class="withSideBar">
		<div class="card p-75">
			<div class="spravochnik_home text-center d-flex pb-50">
                            <a href="#" class="hleb_croshka d-flex"><icon name="home" scale="1.3"></icon><icon name="arrow-right" class="mx-100" scale="0.7"></icon></a>
							<a href="#" class="hleb_croshka d-flex">Класс 1<icon name="arrow-right" class="mx-100" scale="0.7"></icon></a>
							<a href="#" class="hleb_croshka d-flex">(А00-А09)<icon name="arrow-right" class="mx-100" scale="0.7"></icon></a>
							<a href="#" class="hleb_croshka d-flex">А00</a>
            </div>
			<div class="library_header px-50 mt-50">
				<h1 class="pt-75">{{libItem.name}}</h1> 
				<p><small>Номер в соответствии с международной классификацией заболеваний МКБ 10 <strong>({{libItem.sub_index}})</strong></small></p>
			</div>
			
			<section id="lib_description" class="mt-75">
				<h2>Описание:</h2>
				<div id="description" class="editable">
					<div v-if="libItem.description" v-html="libItem.description"></div>
					<div v-else>В процессе заполнения</div> 
				</div>
			</section>
			
			<section id="lib_cause">
				<h2>Этиология:</h2>
				<div id="cause" class="editable">
					<div v-if="libItem.cause" v-html="libItem.cause"></div>
					<div v-else>В процессе заполнения</div> 
				</div>
			</section>
			
			<section id="lib_pathogenesis">
				<h2>Патогенез:</h2>
				<div id="pathogenesis" class="editable">
					<div v-if="libItem.pathogenesis" v-html="libItem.pathogenesis"></div>
				    <div v-else>В процессе заполнения</div> 
				</div>
			</section>
			
			<section id="lib_clinics">
				<h2>Клиническая картина:</h2>
				<div id="clinics" class="editable">
					<div v-if="libItem.clinics" v-html="libItem.clinics"></div>
				    <div v-else>В процессе заполнения</div> 
				</div>
			</section>
			
			<section id="lib_symptom">
				<h2>Основные синдромы(сиптомы):</h2>
				<div id="symptom" class="editable">
					<div v-if="libItem.symptom" v-html="libItem.symptom"></div>
				    <div v-else>В процессе заполнения</div> 
				</div>
			</section>
			
			<section id="lib_diagnosis">
				<h2>Диагностика:</h2>
				<div id="diagnosis" class="editable">
					<div v-if="libItem.diagnosis" v-html="libItem.diagnosis"></div>
				    <div v-else>В процессе заполнения</div> 
				</div>
			</section>
			
			<section id="lib_spec" class="mt-100">
				<h2>Разновидности:</h2>
				<div v-if="libItem.spec">
					<ul class="list-group">
						<li v-for="specItem in libItem.spec">{{specItem}}</li>
					</ul>
				</div>
				<div v-else>В процессе заполнения</div>
			</section>
			
<!--			<section id="lib_statistic">
				<h3 id="clinilinkStatLabel">Статистика Clinilink </h3>
				<div class="row">
					<div class="col-md-5">
						<div class="panel panel-default">
							<div class="panel-heading">
								<h3 class="panel-title">Пол:</h3>
							</div>
							<div class="panel-body">
								<div id="chartGender"></div>
							</div>
						</div>
					</div>
					<div class="col-md-7">
						<div class="panel panel-default">
							<div class="panel-heading">
								<h3 class="panel-title">Возраст:</h3>
							</div>     
							<div class="panel-body">
								<div id="chartAge"></div>
							</div>  
						</div>
					</div>
				</div>
			</section>
-->
			<!--<h1><strong>({{libItem.sub_index}})</strong> {{libItem.name}}</h1>
			
			<h4>Причина</h4>
			{{libItem.cause}}<br/>
			<h4>Причина</h4>
			{{libItem.clinics}}<br/>
			<h4>Причина</h4>
			{{libItem.description}}<br/>
			<h4>Причина</h4>
			{{libItem.diagnosis}}<br/>
			<h4>Причина</h4>
			{{libItem.drugs}}<br/>
			<h4>Причина</h4>
			{{libItem.index}}<br/>
			<h4>Причина</h4>
			{{libItem.item_id}}<br/>
			<h4>Причина</h4>
			{{libItem.item_type}}<br/>
			<h4>Причина</h4>
			{{libItem.key_words}}<br/>
			<h4>Причина</h4>
			{{libItem.main_url}}<br/>
			
			
			<h4>Причина</h4>
			{{libItem.pathogenesis}}<br/>
			<h4>Причина</h4>
			{{libItem.people_stat}}<br/>
			<h4>Причина</h4>
			{{libItem.prognosis}}<br/>
			<h4>Причина</h4>
			{{libItem.prophylaxis}}<br/>
			<h4>Причина</h4>
			{{libItem.spec}}<br/>
			
			<h4>Причина</h4>
			{{libItem.symptom}}<br/>
			<h4>Причина</h4>
			{{libItem.treatment}}<br/>-->
		</div>
	</div>
</template>

<script>
export default {
  name: 'libraryItem',
  data() {
    return {
		endpoint: 'https://api.clinilink.org/api/library/'+this.$route.params.classUrl+'/'+this.$route.params.categoryUrl+'/'+this.$route.params.itemUrl,
		libItem: {}
    }
  },
   methods: {
	getLibItem: function(){
		this.$http.get(this.endpoint).then((response) => {
			console.log(response.data);
			this.libItem = response.data.libraryItem;
		}, function(err){
			console.log(err); 
		})
	},
  },
  created: function(){
		this.getLibItem();
	}
}
</script>

<style>
.spravochnik_home{
	border-bottom: 1px solid #ddd;
}
.library_header{
	background: #eee;
	text-align: center;
}
.hleb_croshka {
	align-items: center;
}
</style>
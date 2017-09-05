<template>
	<footer id="footer_world">
        <div class="footer_head p-100">
            <div class="container">
                <ul class="social_menu d-flex justify-content-evenly w-100 my-100">
                    <li><a href="#"><icon name="twitter" scale="1.5"></icon></a></li>
                    <li><a href="#"><icon name="facebook" scale="1.5"></icon></a></li>
                    <li><a href="#"><icon name="youtube" scale="1.5"></icon></a></li>
                    <li><a href="#"><icon name="odnoklassniki" scale="1.5"></icon></a></li>
                    <li><a href="#"><icon name="vk"></icon scale="1.5"></a></li>
                </ul>
                <ul class="footer_links d-flex justify-content-between w-100 my-100">
                    <li><router-link to="/about-us">О нас</router-link></li>
                    <li><router-link to="/blog">Блог</router-link></li>
                    <li><router-link to="/library">Справочник</router-link></li>
                    <li><router-link to="/about-us">Условия</router-link></li>
                    <li><router-link to="/about-us">Политика конфиденциальности</router-link></li>
                    <li><router-link to="/about-us">Справочный центр</router-link></li>
                    <li><router-link to="/about-us">Компаниям</router-link></li>
                    <li><router-link to="/about-us">Разработчикам</router-link></li>
                </ul>
            </div>
        </div>
        <div class="footer_body p-75">
            <strong>© 2017 CliniLink</strong>
        </div>
        <!--<div class="container">
            <div class="col-md-12 footer_logo">
                <a href="https://clinilink.org/">CliniLink</a>
            </div>
            <div class="col-md-3 footer_item text-left">
                2017
            </div>
            <div class="col-md-3 footer_item">
                <a href="https://clinilink.org/about"><span>О сервисе</span></a>
            </div>
            <div class="col-md-3 footer_item">
                <a href="https://clinilink.org/terms"><span>Пользовательское <br> соглашение</span></a>
            </div>
            <div class="col-md-3 footer_item">
                <span>Контакты</span>
                <ul>
                    <li>ООО "КЛИНИЛИНК"</li>
                    <li>Москва, ул. Сокольнический Вал, д. 6, корп.2, оф. 5</li>
                    <li>Tel.: +7 (499) 394 73 01</li>
                </ul>
            </div>
        </div>-->
    </footer>
</template>

<script> 
export default {
  name: 'appFooter',   
  data() { 
    return {
      
    }
  }
}
</script>

<style>
#footer_world .footer_head{
    background: #464451;
    color: #E6E6E6;
}
#footer_world .footer_head .container{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: calc(1140px - 1rem);
    max-width: 100%;
    margin: 0 auto;
}
#footer_world .footer_head .container .social_menu li a{
    color: #fff;
    font-weight: bold;
}
#footer_world .footer_head .container .footer_links li a{
    color: #fff;
    font-weight: bold;
    cursor: pointer;
}
#footer_world .footer_head .container .footer_links li a:hover{
    border-bottom: 2px solid #329d81;
}
#footer_world .footer_body{
    text-align: center;
    background: #329d81;
    color: #fff;
}
</style>
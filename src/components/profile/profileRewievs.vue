<template>
    <div class="tab-pane p-75" id="reviews" role="tabpanel">
        <div class="card-block review">
            <div class="user_info d-flex w-100">
                <div class="avatar_container_dialog"> <img src="https://en.opensuse.org/images/0/0b/Icon-user.png" height="55px" alt="dialog avatar" class="avatar_dialog"> </div>
                <div class="user_info_title w-100">
                    <div class="col-12"><a href="#"><strong>Аноним</strong></a></div>
                    <div class="col-12 data_Question text-muted"><small> <strong>Сосудистая дестония</strong></small></div>
                </div>
            </div>
            <div class="text_of_dialog w-100 pt-50">Врач просто супер! Вылечил меня , осталась довольна, буду заказывать консультации еще!</div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'profileRewievs', 
  data() {
    return {
      msg: 'Ёто страница зарезервирована дл¤ ОТЗЫВОВ!'
    }
  }
}
</script> 
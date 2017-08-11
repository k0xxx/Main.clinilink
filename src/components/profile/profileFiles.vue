<template>
    <div class="tab-pane p-3" id="documents" role="tabpanel">
        <div class="container">
            <form>
                <button class="btn btn-outline-primary w-100" type="submit">Добавить документ</button>
            </form>
            <div class="card-columns mt-0">
                <div class=" contain_document pt-3">
                    <div class="name_document text-center text-white px-2 "> document#1.jpg </div>
                    <div class="delete_file d-flex justify-content-center py-2 text-white"> <i class="fa fa-trash-o"></i> </div> <img src="https://i.vimeocdn.com/video/590587169.jpg" alt="document" height="150px!important" class="img-fluid" data-description=" Hi this is doc №1" onclick="openModal(this)"> </div>
                <div class=" contain_document pt-3">
                    <div class="name_document text-center text-white px-2 "> document#2.jpg </div>
                    <div class="delete_file d-flex justify-content-center py-2 text-white"> <i class="fa fa-trash-o"></i> </div> <img src="http://bm.img.com.ua/nxs/img/prikol/images/large/3/9/315193.jpg" alt="document"     height="150px!important" class="img-fluid" data-description=" Hi this is doc №2" onclick="openModal(this)"> </div>
                <div class="contain_document pt-3">
                    <div class="name_document text-center text-white px-2 "> document#3.jpg </div>
                    <div class="delete_file d-flex justify-content-center py-2 text-white"> <i class="fa fa-trash-o"></i> </div> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Central_Californian_Coastline%2C_Big_Sur_-_May_2013.jpg/1200px-Central_Californian_Coastline%2C_Big_Sur_-_May_2013.jpg" alt="document" height="150px!important" class="img-fluid" data-description=" Hi this is doc №3" onclick="openModal(this)"> </div>
                <div class=" pt-3 contain_document">
                    <div class="name_document text-center text-white px-2 "> document#4.jpg </div>
                    <div class="delete_file d-flex justify-content-center py-2 text-white"> <i class="fa fa-trash-o"></i> </div> <img src="https://upload.wikimedia.org/wikipedia/commons/d/dd/Big_%26_Small_Pumkins.JPG" alt="document" height="150px!important" class="img-fluid" data-description=" Hi this is doc №4" onclick="openModal(this)"> </div>
                <div class="pt-3 contain_document">
                    <div class="name_document text-center text-white px-2 "> document#5.jpg </div>
                    <div class="delete_file d-flex justify-content-center py-2 text-white"> <i class="fa fa-trash-o"></i> </div> <img src="http://s3-eu-west-1.amazonaws.com/rudatasides/wp-content/uploads/2016/07/09203348/big-data-darpa.jpg" alt="document" height="150px!important" class="img-fluid" data-description="Hi this is doc №5" onclick="openModal(this)"> </div>
                <div class=" pt-3 contain_document">
                    <div class="name_document text-center text-white px-2 "> document#6.jpg </div>
                    <div class="delete_file d-flex justify-content-center py-2 text-white"> <i class="fa fa-trash-o"></i> </div> <img src="http://myscienceacademy.org/wp-content/uploads/2014/03/the-end-of-the-universe-big-crunch-big-chill-or-big-rip.jpg" alt="document" height="150px!important" class="img-fluid" data-description="Hi this is doc №6" onclick="openModal(this)"> </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'profileFiles',
  data() {
    return {
      msg: 'Ёто страница зарезервирована дл¤ ФАЙЛОВ!' 
    }
  }
}  
</script>  
// console.log("gk-working")
$("body").prepend('<div class="custom-translate" style="position:absolute;right:0;z-index:1;" id="google_translate_element"></div>')
// lang code
function googleTranslateElementInit() {
  new google.translate.TranslateElement({ 
    pageLanguage: 'en', 
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE, 
    includedLanguages: 'en,fi,fr,it,no,ru,es,sv',
    autoDisplay: false},'google_translate_element');
}

(function() {
  var googleTranslateScript = document.createElement('script');
  googleTranslateScript.type = 'text/javascript';
  googleTranslateScript.async = true;
  googleTranslateScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  ( document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0] ).appendChild( googleTranslateScript );
})();
/* $(document).ready(function () {
  $('.delete-lead').on('click', function (e) {
    //alert("This will delete Lead from the System");
    $target = $(e.target);
    var id = ($target.attr('data-id'));
    //console.log(id);
    $.ajax({
      type: 'DELETE',
      url: '/leads/' + id,
      success: function (response) {       
        window.location.href = '/leads/all';
      },
      error: function (err) {
        console.log(err);
      }
    });
  });
}); */
$(document).ready(function() {
  $('#myTable').DataTable( {
      dom: 'Bfrtip',
      buttons: [
          'copyHtml5',
          'excelHtml5',
          'csvHtml5',
          'pdfHtml5'
      ]
  } );
} );

//search filter on output table
 function myFunction() {
  //console.log("search ...")
  var input, filter, table, tr, td, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
} 

//  function check() {
//   document.getElementById("inp").value = document.getElementById("id").value;
// }




// Get modal element
var modal = document.getElementById('simpleModal');
// Get open modal button
var modalBtn = document.getElementById('modalBtn');
// Get close button
var closeBtn = document.getElementsByClassName('closeBtn')[0];

// Listen for open click
modalBtn.addEventListener('click', openModal);
// Listen for close click
closeBtn.addEventListener('click', closeModal);
// Listen for outside click
window.addEventListener('click', outsideClick);

// Function to open modal
function openModal(e){
  modal.style.display = 'block';
  console.log(e)
}

// Function to close modal
function closeModal(){
  modal.style.display = 'none';
}

// Function to close modal if outside click
function outsideClick(e){
  if(e.target == modal){
    modal.style.display = 'none';
  }
}

//on state chnage of dropdown
function openMoadal(e){
  console.log(e);
  modal.style.display = 'block';
  
}


//onchange of the drop down
// function onChangeState(event){
//   //console.log(event);
//   console.log("state changed");
// }
function onChangeState(){
  console.log(id);
  console.log("state changed");
}
document.addEventListener("DOMContentLoaded", function() {
  console.log("dom loaded");
  
});


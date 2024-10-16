//Variables
let currentStep = 1;


//Funciones

function randomWord(){
   fetch('https://random-word-api.herokuapp.com/word?number=2')
   .then(response => response.json())
   .then(data => {
      const randomName = `${data[0]}-${data[1]}`;
      document.getElementById('randomWord').innerText = randomName;
   })
   .catch(error => {
      document.getElementById('randomWord').innerText = 'Error al cargar las palabras';
      console.error('Error al obtener las palabras:', error);
   });
}

function showStep(step){
   document.querySelectorAll('.material-symbols-outlined').forEach((element, index)=>{
      element.className='material-symbols-outlined ' +
      (index + 1 === step ? 'fill-icon' : (index + 1 < step ? 'fill-icon' : 'pending'));
   });

   document.querySelectorAll('.step-content').forEach((element, index) => {
      element.className = 'step-content ' + (index + 1 === step ? 'active' : '');
   });
   }

function nextStep() {
   if (currentStep === 1) {
      if (document.querySelector('input[name="payment"]:checked')) {
         currentStep++;
         showStep(currentStep);
      }
      else{
         alert('Selecciona un método de pago.');
      }
   }
   else if (currentStep === 2) {
      document.getElementById('confirmation-message').style.display = 'flex';
      document.getElementById('confirmation-message').style.justifyContent= 'center';
      document.getElementById('confirmation-message').style.height= '100%';
      currentStep++;
      showStep(currentStep);
   }
}

function prevStep() {
   if (currentStep === 3) {
      document.getElementById('confirmation-message').style.display = 'none';
   }
   currentStep--;
   showStep(currentStep);
}

function confirmOrder() {
   document.getElementById('confirmation-message').style.display = 'block';
}

function submitOrder() {
   const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
   const clientForm = document.getElementById('client-form');

   let qrPay;
   if(paymentMethod === "yape"){
      qrPay=="img/yape-qr.png"
   }else if(paymentMethod === "plin"){
      qrPay=="img/plin-qr.png"
   }

   const summary = `
      <main class="ticket-system">
         <div class="top">
            <h1 class="title">Wait a second, your ticket is being printed</h1>
         <div class="printer" />
         </div>
         <div class="receipts-wrapper">
            <div class="receipts">
               <div class="receipt">
                  <div class="route">
                     <div class="item">
                        <span>Producto</span>
                        <h2><?=$producto->nombre?> X<?=$can?> </h2>
                     </div>
                  </div>
                  <div class="route">
                     <div class="item">
                        <span>Metodo de pago</span>
                        <h2>${paymentMethod}</h2>
                     </div>
                     <div class="item">
                        <span>Total a Pagar</span>
                        <h2>S/<?=$preTot?></h2>
                     </div>
                  </div>
                  <div class="details">
                     <div class="item">
                        <span>Nombre</span>
                        <h3>${clientForm.name.value} ${clientForm.lastname.value}</h3>
                     </div>
                     <div class="item">
                        <span>DNI</span>
                        <h3>${clientForm.dni.value}</h3>
                     </div>
                     <div class="item">
                     <span>Direccion</span>
                     <h3>
                        ${clientForm.department.value}/
                        ${clientForm.province.value}/
                        ${clientForm.district.value}
                     </h3>
                     <h6>${clientForm.address.value}</h6>
                     <h6>${clientForm.address2.value}</h6>
                     </div>
                     <div class="item">
                        <span>Email</span>
                        <h4>${clientForm.email.value}</h4>
                     </div>
                  </div>
               </div>
               <div class="receipt qr-code">
                  <div class="qr-dt-con">
                  <img class="qr" src"${qrPay}" alt="qrimg">
                  <span>+51 983 929 015</span>
                  <span>Henry Obed Cholan Romero</span>
                  </div>
                  <div class="description">
                     <h4 id="randomWord">Cargando...</h4>
                     <p>Has la tranferencia agregando este codigo como comentario</p>
                  </div>
               </div>
            </div>
         </div>
      </main>
   `;
   document.getElementById('summary').innerHTML = summary;
   currentStep++;
   showStep(currentStep);
   randomWord();
}


//Llamadas
showStep(currentStep);
randomWord();

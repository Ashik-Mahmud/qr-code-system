 /* 
 TODO:
 -
 -
 -
 -
 -
 -
  
 */

 /* STEP: 1. select all important elements */
 const qrCodeImage = document.getElementById("qr-code-image");
 const createQrButton = document.getElementById("qr-code-create-btn");
 const qrCodeField = document.getElementById("QrCodeField");


 /* STEP: 2. create a function for create QR CODE Image */
 const createQRCodeImage = () => {
     let value = qrCodeField.value;

     if (value) {
         var QrCode = new QRCode(qrCodeImage, {
             text: value,
             width: 228,
             height: 228,
             colorDark: "#000000",
             colorLight: "#ffffff",
         })
     } else {
         return alert("All fields are required.");
     }

     let imgSrc = qrCodeImage.querySelector("img").src;
     console.log(imgSrc)
 };
 createQrButton.addEventListener("click", createQRCodeImage);

 /* STEP: 2.1 create a function for download image  */
 const downloadQR = () => {
     let imgSrc = qrCodeImage.querySelector("img").src;
     console.log(imgSrc)
 };
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
         document.getElementById("downloadQRbtn").classList.remove("disabled");
         qrCodeField.value = '';
     } else {
         return alert("All fields are required.");
     }
 };
 createQrButton.addEventListener("click", createQRCodeImage);

 /* STEP: 2.1 create a function for download image  */
 const downloadQR = (event) => {
     let imgSrc = qrCodeImage.querySelector("img").src;
     event.target.href = imgSrc;
     event.target.setAttribute('download', 'qrcode-' + Math.round(Math.random() * 1000) + '.png');
 };



 /* STEP: 3. Create a function for open scanner camera  */
 const scannerCamera = document.getElementById("scanner-camera");
 const openCameraBtn = document.getElementById("open-camera-btn");
 const stopCameraBtn = document.getElementById("stop-camera-btn");
 const scanner = new QrScanner(scannerCamera, result => setResult(result), {
     onDecodeError: error => {
         document.getElementById("error").innerText = error;
     },
     highlightScanRegion: true,
     highlightCodeOutline: true,
 });
 const openCamera = () => {
     actionCamera(true);
 };
 const stopCamera = () => {
     actionCamera(false);
 };
 /* STEP: 3.1 set result from function */
 const setResult = (result) => {
     if (result) {
         document.getElementById("error").style.display = 'none';
         let nowDate = new Date();
         let dateAndTime = nowDate.toDateString() + ' ' + nowDate.toLocaleTimeString();
         document.getElementById("QrDataText").innerText = result.data;
     }
     actionCamera(false);
     return document.getElementById("permissionModalBtn").click();
 }

 /* STEP: 3.2 copy to Clipboard option by clicking copy button  */
 const copyData = (target) => {
     let data = document.getElementById("QrDataText").innerText;
     if (window.navigator.clipboard.writeText(data)) target.innerText = 'Copied Data';
     setTimeout(() => target.innerText = 'Copy', 4000)
 }











 const actionCamera = (isAction) => {
     if (isAction) {
         scanner.start();
         openCameraBtn.style.display = 'none';
         stopCameraBtn.style.display = 'block';
     } else {
         scanner.stop();
         openCameraBtn.style.display = 'block';
         stopCameraBtn.style.display = 'none';
     }

 }
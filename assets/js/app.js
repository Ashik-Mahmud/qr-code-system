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
         document.getElementById("QrDataText").innerText = result.data;
     }
     actionCamera(false);
     return document.getElementById("permissionModalBtn").click();
 }

 /* STEP: 3.2 copy to Clipboard option by clicking copy button  */
 const copyData = (target) => {
     let data = document.getElementById("QrDataText").innerText;
     if (window.navigator.clipboard.writeText(data)) {
         target.innerText = 'Copied Data'
     };
     setTimeout(() => target.innerText = 'Copy', 4000)
 }


 /* STEP: 4 add data from localStorage if user give permission */

 const saveIntoLocalStorage = () => {
     let qrCode = getCode();
     let data = document.getElementById("QrDataText").innerText;
     let nowDate = new Date();
     let dateAndTime = nowDate.toDateString() + ' ' + nowDate.toLocaleTimeString();
     if (qrCode[qrCode.length - 1]?.data === data) return alert("value is already has");
     qrCode.push({
         data,
         dateAndTime
     })
     localStorage.setItem('qr-codes', JSON.stringify(qrCode));
     document.getElementById("qr-code-body").innerHTML = ''
     displayDataFromLocalStorage()
 }
 const getCode = () => {
     const codes = localStorage.getItem('qr-codes');
     let codeArr;
     codes ? codeArr = JSON.parse(codes) : codeArr = [];
     return codeArr;
 }


 /* STEP: 5. Display all of data from localStorage */
 const displayDataFromLocalStorage = () => {
     let qrArr = getCode();
     qrArr?.forEach(({
         data,
         dateAndTime
     }, index) => {
         const tr = document.createElement("tr");
         tr.innerHTML = `<td>${index === 0 ? index+=1 : index+=1}</td>
                        <td title="${data}">
                            <span >${data.length > 30 ? data.substr(0, 30) : data }</span>
                        </td>
                        <td title="${dateAndTime}">${dateAndTime.length > 20 ? dateAndTime.substr(0, 20)+'..' : dateAndTime}</td>
                        <td><button class="btn btn-info btn-sm text-white" data="${data}" onclick="copyItem(this)">⎘</button></td>
                        <td><button class="btn btn-danger btn-sm" onclick="deleteItem(${index - 1})">&times;</button></td>`;
         document.getElementById("qr-code-body").appendChild(tr);
     })

 }
 /* STEP: 5.1. copy qr data by clicking the button */
 const copyItem = (target) => {
     let data = target.getAttribute('data');
     target.classList.add('copy')
     window.navigator.clipboard.writeText(data);
     setTimeout(() => target.classList.remove('copy'), 1500)
 }
 displayDataFromLocalStorage();


 /* STEP: 5.1 delete item from localStorage  */
 const deleteItem = (id) => {
     if (confirm("Do You want to delete it?")) {
         let qrArr = getCode();
         qrArr.splice(id, 1)
         localStorage.setItem('qr-codes', JSON.stringify(qrArr));
         document.getElementById("qr-code-body").innerHTML = ''
         displayDataFromLocalStorage();
     }
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
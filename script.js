
let getLatestOpenedImg;
let galleryImages = document.querySelectorAll(".galleryimg");

let fileName;
let windowWidth = window.innerWidth


function closeImg(){
    document.querySelector(".img-window").remove()
    console.log("close")
}

function changeImg(changeDir,f,g){
    let gallery = g
    let fileName = f

    document.querySelector("#current-img").remove()
    let getImgWindow = document.querySelector(".img-window")
    let newImg = document.createElement("img")
    getImgWindow.appendChild(newImg)

    let calcNewImg

    if (changeDir === 1){
        calcNewImg = getLatestOpenedImg +1
        if (calcNewImg > gallery.length){
            calcNewImg = 1
        }
    }
    else if (changeDir === 0){
        calcNewImg = getLatestOpenedImg -1
        if (calcNewImg < 1){
            calcNewImg = gallery.length
        }
    }

    
    newImg.setAttribute("src","images/gallery/" +calcNewImg+ ".jpg")
    newImg.setAttribute("id","current-img")

    getLatestOpenedImg = calcNewImg

    // newImg.onload = function(){
    //     let imgWidth = this.width
    //     let calcImgToEdge = ((windowWidth - imgWidth) /2)-80

    //     let nextBtn = document.querySelector(".img-btn-next")
    //     let prevBtn = document.querySelector(".img-btn-prev")
    //     nextBtn.style.cssText = "right: "+calcImgToEdge+"px;"
    //     prevBtn.style.cssText = "left: "+calcImgToEdge+"px;"
    // }
}


document.addEventListener("DOMContentLoaded", function(){


    const menuBtn = document.querySelector('.menu-btn');
    const nav = document.querySelector('.nav');
    let menuOpen = false;

    menuBtn.addEventListener('click', () => {
        if (!menuOpen) {
            menuBtn.classList.add('open');
            nav.classList.add('active');
            menuOpen = true;
        } else {
            menuBtn.classList.remove('open');
            nav.classList.remove('active');
            menuOpen = false;
        }
    });

    
    // GALLERY
    let galleryImages = document.querySelectorAll(".galleryimg")

    if(galleryImages){
        
        galleryImages.forEach(function(image,index){
            image.onclick = function(){
                let imgUrl = image.src
                let cutImgUrl = imgUrl.split("images/gallery/")[1]
                console.log(cutImgUrl)
                fileName = cutImgUrl.split("/")[0]
                

                getLatestOpenedImg = index +1; 

                let container = document.body
                let newImgWindow = document.createElement("div")
                container.appendChild(newImgWindow)
                newImgWindow.setAttribute("class","img-window")
                newImgWindow.setAttribute("onclick","closeImg()")

                let newImg = document.createElement("img")
                newImgWindow.appendChild(newImg)
                newImg.setAttribute("src","images/gallery/" + cutImgUrl)
                newImg.setAttribute("id","current-img")

                newImg.onload = function(){
                    let imgWidth = this.width
                    //let calcImgToEdge =  ((windowWidth - imgWidth) /2)-80
                    
                    let newPrevButton = document.createElement("a")
                    let newPrevImg = document.createElement("img")
                    newPrevImg.src = "images/icons/l-arrow.png";
                    newPrevImg.style.height = "100%";
                    newPrevButton.appendChild(newPrevImg)
                    newImgWindow.appendChild(newPrevButton)
                    newPrevButton.setAttribute("class","img-btn-prev")
                    newPrevButton.onclick = function(event) {
                        event.stopPropagation();
                        changeImg(0, fileName,galleryImages);
                    };
                    

                    let newNextButton = document.createElement("a");
                    let newNextImg = document.createElement("img");
                    newNextImg.src = "images/icons/r-arrow.png";
                    newNextImg.style.height = "100%";
                    newNextButton.appendChild(newNextImg);
                    newImgWindow.appendChild(newNextButton);
                    newNextButton.setAttribute("class", "img-btn-next");
                    newNextButton.onclick = function(event) {
                        event.stopPropagation();
                        changeImg(1, fileName, galleryImages);
                    };

                    

                }
            }
            
        })
        
    }

    // Hamburger
    // const menu_btn = document.querySelector(".hamburger")
    // const mobile_menu = document.querySelector(".mobile-nav")

    // menu_btn.addEventListener("click", function(){
    //     mobile_menu.classList.toggle("is-active")
    // })




    // Mailer
    const mailSubmit = document.querySelector("#form-submit")

    mailSubmit.addEventListener("click", async () => {
        console.log("pressed")
        let mail = document.querySelector("#email").value
        let message = document.querySelector("#message").value
        console.log(mail, message)
        if (mail == ""){
            alert("Contact us directly at: info@zct3.eu, thank you!")
        }
        else if(message == ""){
            alert("Contact us directly at: info@zct3.eu, thank you!")
        }
        else{
            try {
                const EmailResponse = await fetch('php/sendEmail.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        subject: 'Dotaz z webu',
                        mail: mail,
                        message: message
                    })
                })
                const Edata = await EmailResponse.json()
                console.log(Edata.message)
                document.querySelector("#email").value = ""
                document.querySelector("#message").value = ""
                alert("Contact us directly at: info@zct3.eu, thank you!")
            } catch (error) {
                document.querySelector("#email").value = ""
                document.querySelector("#message").value = ""
                alert("Contact us directly at: info@zct3.eu, thank you!")
                console.error('ERROR: ', error)
                

            }
        }
        
    })
    
})

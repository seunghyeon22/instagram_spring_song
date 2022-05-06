const profileImg = document.querySelector(".profile-img");
const bLogo = document.querySelector(".b-logo");

load();

function load(){
	//profileImg.src = getProfileImg();
}

bLogo.onclick = () =>{
	location.href ="/song/"
}
 
profileImg.onclick =() =>{
	location.href ="/song/account/profile"
}



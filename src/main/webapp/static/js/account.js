const profileUsername = document.querySelector(".profile-username");
const textInputs = document.querySelectorAll(".text-input");
const introduceText = document.querySelector(".text-textarea");
const submstBtn = document.querySelector(".submit-btm");

const profileImgFile = document.querySelector(".profile-img-file");
const profileImgRound = document.querySelector(".profile-img-round");
const updateImgBtn = document.querySelector(".update-img-button");


let usercode = 0;
let principal = getPrincipal();

load();

function load() {

	$.ajax({
		type: "get",
		url: "/app/profile/account/user",
		data: {
			"usercode": principal.usercode
		},
		dataType: "text",
		success: function(data) {
			let account = JSON.parse(data); //객체를 json 데이터로 변환
			pageLoad(account);
		},
		error: function() {
			alert("비동기 처리 오류");
		}

	});
	const profileImg = profileImgRound.querySelector("img");
	profileImg.src = getProfileImg();
}



function pageLoad(account) {
	usercode = account.usercode;
	profileUsername.textContent = account.username;
	textInputs[0].value = account.name;
	textInputs[1].value = account.username;
	textInputs[2].value = account.website;
	introduceText.value = account.introduce;
	textInputs[3].value = account.email;
	textInputs[4].value = account.phone;
	textInputs[5].value = account.gender;
}

submstBtn.onclick = () => {
	let account = createAccount();
	$.ajax({
		type: "put",
		url: "/app/profile/account/update",
		data: JSON.stringify(account), //json 데이터를 String객체로 변환
		contentType: "application/json; charset=utf-8",
		dataType: "text",
		success: function(data) {
			if (data == "true") {
				alert("회원정보 수정 완료")
				location.replace("/app/profile/account");
			} else {
				alert("이미 존자해는 사용자 이름입니다.")
			}

		},
		error: function() {
			alert("비동기 처리 오류");
		}
	});

}

function createAccount() {
	let account = {
		"usercode": usercode,
		"name": textInputs[0].value,
		"username": textInputs[1].value,
		"website": textInputs[2].value,
		"introduce": introduceText.vlaue,
		"email": textInputs[3].value,
		"phone": textInputs[4].value,
		"gender": textInputs[5].value
	}
	return account;
}
profileImgRound.onclick = () => {
	imgChange();
}
updateImgBtn.onclick = () => {
	imgChange();
}

function imgChange() {
	profileImgFile.click();
	profileImgFile.onchange = () => {
		let reader = new FileReader();

		reader.onload = (e) => {
			let profileImgUrl = e.target.result;
			let originImgUrl = profileImgRound.querySelector("img").src;
			profileImgRound.querySelector("img").src = profileImgUrl;

			if (confirm("프로필 이미지를 변경하시겠습니까?")) {
				let formData = new FormData(document.querySelector(".profile-box-form1"));
				$.ajax({
					type: "post",
					url: "/app/profile/account/update/img",
					data: formData,
					encType: "multipart/form-data", //multipart데이터 전달할 때 필수
					processData: false, //multipart데이터 전달할 때 필수
					contentType: false, //multipart데이터 전달할 때 필수
					dataType: "text",
					success: function(data) {
						alert("프로필 이미지가 변경되었습니다.");
						location.reload();
					},
					error: function() {
						alert("비동기 처리 오류");
					}
				});
			} else {
				profileImgRound.querySelector("img").src = originImgUrl;
			}
		}
		reader.readAsDataURL(profileImgFile.files[0]);
	}
}




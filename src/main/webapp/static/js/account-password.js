const profileUsername = document.querySelector(".profile-username");
const passwordInputs = document.querySelectorAll(".password-input");
const introduceText = document.querySelector(".text-textarea");
const submstBtn = document.querySelector(".submit-btn");
const boxItemLefts = document.querySelectorAll(".box-item-left");
const profileImgRound = document.querySelector(".profile-img-round");

let usercode = 0;
let principal = getPrincipal();

load();

function load() {
	profileUsername.textContent = principal.username;
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

function isEmpty(str) {
	return str == "" || str == null || typeof str == "undefined";
}

submstBtn.onclick = () => {
	for (let i = 0; i < passwordInputs.length; i++) {
		if (isEmpty(passwordInputs[i].value)) {
			const labelName = boxItemLefts[i + 1].querySelector("label").textContent;
			alert(labelName + "(을)를 입력해주세요.");
			return;
		} else if (i == 1 && passwordInputs[i].value != passwordInputs[i + 1].value) {
			alert("새 비밀번호가 일치하지 않습니다.");
			return;
		} else if (i == 2 && passwordInputs[i - 2].value == passwordInputs[i - 1].value) {
			alert("기존의 비밀번호와 동일한 비밀번호입니다.");
		}
	}
	$.ajax({
		type: "put",
		url: "/app/profile/account/password/update",
		data: JSON.stringify({
			originPassword :passwordInputs[0].value,
			newPassword :passwordInputs[1].value
		}),
		contentType : "application/json;charset=utf-8",
		dataType: "text",
		success: function(data) {
			if (data == "true") {
				alert("비밀번호 변경 완료. 다시 로그인 하세요.");
				location.replace("/app/logout");
			} else {
				alert("이전 비밀번호가 일치하지 않습니다.");
			}

		},
		error: function() {
			alert("비동기 처리 오류");
		}
	});

}








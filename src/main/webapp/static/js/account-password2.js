const profileUsername = document.querySelector(".profile-username");
const passwordInputs = document.querySelectorAll(".password-input");
const introduceText = document.querySelector(".text-textarea");
const submstBtn = document.querySelector(".submit-btn");

let usercode = 0;
let principal = getPrincipal();

load();

function load() {
	profileUsername.textContent = principal.username;
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
	if (isEmpty(passwordInputs[0].value) || isEmpty(passwordInputs[1].value)) {
		alert("비밀번호를 입력해 주세요");
	} else if (passwordInputs[0].value == passwordInputs[1].value) {
		alert("이전 비밀번호와 동일한 비밀번호는 사용할 수 없습니다.");passwordInputs
	} else if (passwordInputs[1].value != passwordInputs[2].value) {
		alert("새 비밀번호가 동일하지 않습니다.");
	} else {
		$.ajax({
			type: "put",
			url: "/app/profile/account/password/update",
			data: {
				"password":principal.password
			},
			dataType: "text",
			success: function(data) {
				if(data==true){
					alert("비밀번호 변경");
				}else{
					alert("이전 비밀번호를 확인하여 주세요.");
				}		
			},
			error: function() {
				alert("비동기 처리 오류");
			}
		})
	}



	/*$.ajax({
		type: "put",
		url : "/app/profile/account/update",
		data : JSON.stringify(account), //json 데이터를 String객체로 변환
		contentType : "application/json; charset=utf-8",
		dataType : "text",
		success: function(data){
			if(data=="true"){
				alert("회원정보 수정 완료")
				location.replace("/app/profile/account");
			}else{
				alert("이미 존자해는 사용자 이름입니다.")
			}

		},
		error:function(){
			alert("비동기 처리 오류");	
		}
	});*/

}








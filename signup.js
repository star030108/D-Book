let signupInfo = {
    emailFlag:false,
    email   : ""
};

$(document).ready(function(){

    $('.ui.dropdown').dropdown()
        
})


async function signup(){

    const $password      = $("#signup__password").val();
    const $passwordCheck = $("#signup__password-check").val();
    const $name          = $("#signup__name").val();

    if(signupInfo.emailFlag === false){
        alert("이메일을 설정해주세요.")
        return;
    }else if($password != $passwordCheck){
        alert("비밀번호가 일치하지 않습니다.");
    }else{
        
        const userData = {
            email : signupInfo.email,
            password : $password,
            name : $name,
            
        }

        let response = await $.ajax({
            type: 'post',
            url : `http://localhost:8080/users/signups`,
            contentType : 'application/json',
            data : JSON.stringify(userData),
            beforeSend:()=>{
                $("#loading__container").attr("style","display:inline-block;");
                $("#signup__button").attr("disabled",true);
            },
            error:()=>{
                $("#signup__button").attr("disabled",false);
                alert("회원가입 에러");
            },
            complete:()=>{
                $("#loading__container").attr("style","display:none;");
            }
        })

        if(response.message != null){
            $("#signup__button").attr("disabled",false);
            alert(response.message)
            return;
        }
    
        alert("로그인 페이지로 이동합니다.");
        window.location.href = "login";
    }
}

async function emailCheck(){
    
    const emailID   = $("#signup__email").val();
    const emailType = $("#signup__email-selectbox option:selected").val();
    const email     =  emailID + "@" + emailType;
   
    if(emailID === ""){
        alert("이메일 계정을 입력해주세요."); 
        return;
    }else if(emailType === ""){
        alert("이메일 종류를 선택해주세요."); 
        return;
    }

    const response = await $.ajax({
        type : 'get',
        url : `http://localhost:8080/users/${email}`,
        contentType : 'application/json'
    })

    if(response.email === "ok"){    

        const msg = email + " 이메일을 사용하시겠습니까?";
        if (confirm(msg)!=0) {
            $("#signup__email").attr("readonly",true);
            $('#signup__email-checkbtn').attr("disabled",true);
            signupInfo.emailFlag = true;
            signupInfo.email = email;
        } 
    }else{
        alert("중복된 이메일입니다.")
    }
    
}

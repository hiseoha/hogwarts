(function(){
    //로그인 모달
    const $body = document.querySelector('.body');
    const $loginBtn = document.querySelector('.login_btn');
    const $loginModal = document.querySelector('#login_main_body');

    $loginBtn.addEventListener('click', e=>{
        //로그인 날짜 및 시간
        const $loginDate = document.querySelector('.login_date');
        const $loginTime = document.querySelector('.login_time');
        
        let loginDate = new Date();
        const year = loginDate.getFullYear();
        const month = loginDate.getMonth() + 1;
        const date = loginDate.getDate();
        
        const hours = loginDate.getHours();
        const minutes = loginDate.getMinutes();

        function newHours(){
            if(hours < 13){
                return hours;
            } 
            return hours>11&&hours-12<10 ? '0'+hours-12 : hours-12;
        }

        $loginDate.innerHTML = `${year} - ${ month<10 ? '0'+ month : month} - ${ date<10 ? '0'+ date : date}`;
        $loginTime.innerHTML = ` ${hours>=12 ? 'PM' : 'AM'} ${newHours()} : ${minutes<10 ? '0'+minutes : minutes}`;

        $loginModal.classList.toggle('hidden', false);
        $body.classList.add('modal_overlay');
    })

    //로그인 데이터 저장

    const $loginFormBtn = document.querySelector('.login_form_btn') ;

    function postLoginData(){
        const data = {
            id: document.querySelector("input[name='u_id']").value,
            pw: document.querySelector("input[name='u_pw']").value,
        }
        axios.post('http://localhost:3000/login', data)
        .then(data => console.log(data.data));
    }

    $loginFormBtn.addEventListener('click', e=>{
        postLoginData();
    })

})();
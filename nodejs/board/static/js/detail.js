(function(){
    const $delBtn = document.querySelector('#delBtn');
    const $modBtn = document.querySelector('#modBtn');
    const $localConst = document.querySelector('#localConst');

    $delBtn.addEventListener('click', e=>{
        if(confirm('삭제 ㄱ')) {
            location.href = `delete?iboard=${$localConst.dataset.iboard}`;
        }
    })

    $modBtn.addEventListener('click', e=>{
        if(confirm('수정 ㄱ')) {
            location.href = `update?iboard=${$localConst.dataset.iboard}`;
        }
    })
})();
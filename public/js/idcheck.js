


function closeAndSendValue(){
    console.log('실행')
    const childId = document.getElementById('chlidId').value;
    window.opener.document.getElementById('user_id').value = childId
}   
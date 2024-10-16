const validateData = async (userData) => {
    let errors = []
    if(!userData.fristname){
        errors.push('ยังไม่ได้ระบุชื่อ')
    }
    if(!userData.lastname){
        errors.push('ยังไม่ด้ระบุนามสกุล')
    }
    if(!userData.age){
        errors.push('ยังไม่ได้ระบุอายุ')
    }
    if(!userData.gender){
        errors.push('ยังไม่ด้ระบุเพศ')
    }
    if(!userData.interest){
        errors.push('ยังไม่ได้ระบุสิ่งที่สนใจ')
    }
    if(!userData.description){
        errors.push('ยังไม่ด้ระบุรายละเอียด')
    }
    return errors
}

const submitData = async () => {
    let fristnameDom = document.querySelector('input[name=fristname]').value
    let lastnameDom = document.querySelector('input[name=lastname]').value
    let ageDom = document.querySelector('input[name=age]').value
    let genderDom = document.querySelectorAll('input[name=gender]') || {}
    let interestDom = document.querySelectorAll('input[name=interest]:checked') || {}
    let descriptionDom = document.querySelector('textarea[name=description]')

    let messageDom = document.getElementById('message')
    
    try{


        let genderCk
        for(let i=0; i<genderDom.length; i++){
            if(genderDom[i].checked){
                genderCk = genderDom[i].value
            }
        }

        let interestCk = ''
        for(let i=0; i<interestDom.length; i++){
            interestCk += interestDom[i].value
            if(i != interestDom.length-1){
                interestCk += ', '
            }
        }

        let userData = [{
            fristname: fristnameDom,
            lastname: lastnameDom,
            age: ageDom,
            gender: genderCk,
            interest: interestCk,
            description: descriptionDom.value
        }]
        //console.log('submit user DB :', userData)

        //validate data
        const errors = validateData(userData)
        console.log('show errors', errors)
        if(errors.length > 0){
            throw {
                message: 'someting wrong',
                errors: errors
            }
        }

        //เชื่อม axios 
        const response = await axios.post('http://localhost:8000/users', userData)
        //console.log('user DATA', response.data)

        messageDom.innerText = 'บันทึกเรียบร้อย'  
        messageDom.className = 'message success'

    }
    catch (error) {
        console.log('error', error)
        console.log('error data', error.errors)
        //show object ที่ error จากฝั่ง server
        // if(error.response){
        //     console.log(error.response.data.message)
        // }

        let htmlData = '<div>'
        //tempate neturial
        htmlData += `<div>${error.message}</div>`
        //htmlData += '<div>' + error.message + '</div>'
        htmlData += '<ul>'
        for(let i = 0; i < error.errors.length; i++) {
            htmlData += `<li>${error.errors[i]}</li>`
        }
        htmlData += '</ul>'
        htmlData += '</div>'
        
        messageDom.innerHTML = htmlData
        messageDom.className = 'message danger'

    }
}



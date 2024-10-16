// const validateData = (userData) => {
//     let errors = []
//     if(!userData.fristname){
//         errors.push('กรุณากรอกชื่อ')
//     }
//     if(!userData.lastname){
//         errors.push('กรุณากรอกนามสกุล')
//     }
//     if(!userData.age){
//         errors.push('กรุณากรอกอายุ')
//     }
//     if(!userData.interest){
//         errors.push('กรุณากรอกเสือกสิ่งที่สนใจ')
//     }
//     if(!userData.gender){
//         errors.push('กรุณากรอกเพศ')
//     }
//     if(!userData.lastname){
//         errors.push('กรุณากรอกนามสกุล')
//     }
//     if(!userData.description){
//         errors.push('กรุณาอธิบายเพิ่มเติม')
//     }
//     return errors
//}   

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

        //const errors = validateData(userData)

        // if(errors.length>0){
        //     throw{
        //         message: 'กรอกข้อมูลไม่ครบ',
        //         errors: errors,
        //         data: userData
        //     }
    
        // }
        
        const response = await axios.post('http://localhost:8000/users', userData)
        //console.log('user DATA', response.data)

        messageDom.innerText = 'บันทึกเรียบร้อย'  
        messageDom.className = 'message success'

    }
    catch (error) {
        console.log('error message',error.message)
        console.log('error', error)
        console.log(error.data)

        if(error.response){
            console.log(error.response.data.message)
        }

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



var data = []
var isEditable = location.href.indexOf('http://localhost:7000/user') !== -1
fetch('http://localhost:7000/api/users').then(async response => {
    data = await response.json();
}).then(() => {
    if(isEditable) {
        const [a , b, number] = location.pathname.split('/')
        const user = data.data.find(item => item.id === +number)
        const nickInput = document.querySelector('input[name="nick"]').value = user.nick
        const nombresInput = document.querySelector('input[name="nombres"]').value = user.nombres
        const apellidosInput = document.querySelector('input[name="apellidos"]').value = user.apellidos
        const passwordInput = document.querySelector('input[name="password"]').value = user.password
        const rolInput = document.querySelector('select[name=rol]').value = user.rol
        const correoInput = document.querySelector('input[name=correo]').value = user.correo
    }
})
const spans = document.querySelectorAll('span');
spans.forEach(item => item.style.display = 'none');
const submit = function() {
    const values =  getValues()
    let canGo = [];
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const nick = values[0];
    const nombres = values[1];
    const apellidos = values[2];
    const password = values[3];
    const correo = values[4];
    const rol = values[5];
    //here start custom validations
    const isUnique = data.data.find(item => {
        if(item.nick === nick)
            return item
    })
    
    if(nick === '' || isUnique) {
        canGo[0] = false;
        document.querySelector('span.nick').style.display = 'inline'
    }
    else {
        canGo[0] = true;
        document.querySelector('span.nick').style.display = 'none'
    }
    if(nombres === '') {
        canGo[1] = false;
        document.querySelector('span.nombres').style.display = 'inline'
    }
    else {
        canGo[1] = true;
        document.querySelector('span.nombres').style.display = 'none'
    }
    
    if(apellidos === '') {
        canGo[2] = false;
        document.querySelector('span.apellidos').style.display = 'inline'
    }
    else {
        canGo[2] = true;
        document.querySelector('span.apellidos').style.display = 'none'
    }

    if(password === '') {
        canGo[3] = false;
        document.querySelector('span.password').style.display = 'inline'
    }
    else {
        canGo[3] = true;
        document.querySelector('span.password').style.display = 'none'
    }   
    
    if(rol === '') {
        canGo[4] = false;
        document.querySelector('span.rol').style.display = 'inline'
    }
    else {
        canGo[4] = true;
        document.querySelector('span.rol').style.display = 'none'
    }
    
    if(correo === '') {
        canGo[5] = false;
        document.querySelector('span.correo').style.display = 'inline'
    }
    else {
        canGo[5] = true;
        document.querySelector('span.correo').style.display = 'none'
    }
    if(!emailRegex.test(correo)) {
        canGo[5] = false;
        document.querySelector('span.correo').style.display = 'inline'
    }
    else {
        canGo[5] = true
        document.querySelector('span.correo').style.display = 'none'
    }
    const finalcanGo = canGo.find(item => item === false)
    if(finalcanGo !== false) {
        if(isEditable) {
            const [a , b, number] = location.pathname.split('/');
            const user = data.data.find(item => item.id === +number)
            fetch("http://localhost:7000/api/users", {
                method: "put",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: user.id, nick, nombres, apellidos, password, rol, correo
                })
            })
            .then(response => {
                console.log('succesful')
                location.href = 'http://localhost:7000/users'
            })
            .catch(console.error)    
        }
        fetch("http://localhost:7000/api/users", {
            method: "post",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nick, nombres, apellidos, password, rol, correo
            })
        })
        .then(response => {
            console.log('succesful')
            location.href = 'http://localhost:7000/users'
        })
        .catch(console.error)
    }
}
const deleteUser = function(userID) {
    const isSure = confirm('estas seguro de eliminar el registro?')
    if(isSure) {
        fetch("http://localhost:7000/api/users", {
            method: "delete",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: userID
            })
        })
        .then(() => {
            console.log('succesful')
            location.reload();
        })
        .catch(console.error)
    }
}
function getValues() {
    const inputs = document.querySelectorAll('input')
    const selects = document.querySelectorAll('select')
    return [
        ...inputs,
        ...selects
    ].map(item => item.value)
}
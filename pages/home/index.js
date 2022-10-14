const url = "https://api.github.com/users/"
const userToSearch = document.getElementById('user-input')
const bttnGet = document.getElementById('bttn-get')
const recentList = document.getElementById('recent-list')
const recent = document.getElementById('recent')
let userSelected = {}
localStorage.removeItem('userSelected')
let recentUsers = []

getRecentUsers()
trackFormBttn()

function getRecentUsers() {
    if (localStorage.getItem("recentUsers") != null) {
        recentUsers = JSON.parse(localStorage.getItem("recentUsers"))
        fillRecentUsers()
    } if (recentUsers.length == 0) {
        recent.remove()
    }
}

function trackFormBttn() {
    bttnGet.addEventListener('click', () => {
        bttnGet.innerHTML = '<img src="../../img/spinner.svg">'
        return getUser()
    })
    userToSearch.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            bttnGet.innerHTML = '<img src="../../img/spinner.svg">'
            return getUser()
        }
    });
}

async function getUser() {
    await fetch(`${url}${userToSearch.value}`)
        .then(function (response) {
            return response.json();
        }).then(function (responseJson) {
            if (responseJson.message == 'Not Found') {
                bttnGet.innerHTML = ''
                bttnGet.innerText = 'Ver perfil do github'
                bttnGet.disabled = true
                if (document.getElementById('alert-user') == null) {
                    return userToSearch.insertAdjacentHTML('afterend', `
                         <span id='alert-user'>Usuário não encontrado</span>
                     `)
                } else {
                    return
                }
            }
            userSelected = responseJson
            if (recentUsers.length < 3 && recentUsers.includes(userSelected) == false) {
                recentUsers.push(userSelected)
            } else if (recentUsers.includes(userSelected) == false) {
                recentUsers.splice(0, 1)
                recentUsers.push(userSelected)
            }
            localStorage.setItem("recentUsers", JSON.stringify(recentUsers))
            localStorage.setItem("userSelected", JSON.stringify(userSelected))
            window.location.href = "../profile/index.html";
        })
};

function fillRecentUsers() {
    if (recentUsers.length == 0) {
        return null
    } else {
        recentUsers.map(user => {
            recentList.insertAdjacentHTML('beforeend', `
                <li class='recent-user'><img src="${user.avatar_url}" alt=""></li>
            `)
        })
    }
}
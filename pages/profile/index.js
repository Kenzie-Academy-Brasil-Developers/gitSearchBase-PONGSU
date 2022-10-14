let userInfos = document.getElementById('profile-infos')
let navBttns = document.getElementById('nav-bttns')
let postList = document.getElementById('post-list')
let repos = []

if (localStorage.getItem("userSelected") != null) {
    userSelected = JSON.parse(localStorage.getItem("userSelected"))
}

if (userSelected.email != null) {
    navBttns.insertAdjacentHTML('afterbegin', `
    <a id="link-email" href="${userSelected.email}"><button id="email-bttn">Email</button></a>
    `
    )
} else {
    navBttns.insertAdjacentHTML('afterbegin', `
    <a id="link-email" href=""><button id="email-bttn">Email</button></a>
    `
    )
}

userInfos.insertAdjacentHTML('afterbegin', `
<figcaption>
    <img src="${userSelected.avatar_url}" alt="">
</figcaption>
<aside>
    <h3 id="user-name">${userSelected.name}</h3>
    <h6 id="Ocupation">${userSelected.bio}</h6>
</aside>
`)

async function getRepos() {
    await fetch(`https://api.github.com/users/${userSelected.login}/repos`)
        .then(function (response) {
            return response.json();
        }).then(function (responseJson) {
            repos = responseJson
            return fillRepos()
        })
};

function fillRepos() {
    repos.map(repo => {
        postList.insertAdjacentHTML('afterbegin', `
        <article class="post">
        <h3 class="repo-title">${repo.name}</h3>
        <p class="repo-resum">${repo.description}</p>
        <div class="repo-bttns">
        <a id="link-email" target='blank' href="${repo.html_url}"><button class="repo-link">Repositório</button></a>
          <button class="demo-link">Demo</button>
        </div>
        </article>
        `)
    })
}

getRepos()
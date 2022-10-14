let recentUser = [...document.getElementsByClassName('recent-user')]

recentUser.map((user, index) => {
	user.addEventListener('click', () => {
		userSelected = recentUsers[index]
		localStorage.setItem("userSelected", JSON.stringify(userSelected))
		window.location.href = "../profile/index.html";
	})
	user.addEventListener('mouseover', () => {
		user.insertAdjacentHTML('beforeend', `
		<span id='link-recent-user'>Acessar este perfil</span>
		`)
	})
	user.addEventListener('mouseout', () => {
		document.getElementById('link-recent-user').remove()
	})
})
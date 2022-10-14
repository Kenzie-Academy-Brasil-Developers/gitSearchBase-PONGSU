userToSearch.addEventListener('keyup', () => {
	if (userToSearch.value.length > 0) {
		bttnGet.disabled = false
		document.getElementById('alert-user').remove()
	} else if (userToSearch.value.length == 0) {
		bttnGet.disabled = true
		document.getElementById('alert-user').remove()
	}
})
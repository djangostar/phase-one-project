fetch('https://api.imgflip.com/get_memes')
.then(res => res.json())
.then(data => console.log(data))
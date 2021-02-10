const searchSongs = async()=>{
    const searchText = document.getElementById('search-lyric').value 
   const url = ` https://api.lyrics.ovh/suggest/:${searchText}`
   //load data
  // console.log(url);
  const res= await fetch(url)
   const data = await res.json()
   displaySongs(data.data)
}

// const displaySongs = songs =>{
//     const songContainer =document.getElementById('song-container')

// songs.forEach(song => {
//     const li = document.createElement('li')
//     li.innerText = song.title
//     songContainer.appendChild(li)
// })
// }

const displaySongs = songs =>{
    const songContainer =document.getElementById('song-container')
     songContainer.innerHTML = ''  // song container k bar bar empty korar jonno 
songs.forEach(song => {
   // console.log(song)
    const songDiv = document.createElement('div')
    songDiv.className ='single-result row align-items-center my-3 p-3'
    songDiv.innerHTML = `<div class="col-md-9">
    <h3 class="lyrics-name">${song.title}</h3>
    <p class="author lead">Album by <span>${song.artist.name}</span></p>

    <audio controls>
  <source src="${song.preview}" type="audio/mpeg">
</audio>
</div>
<div class="col-md-3 text-md-right text-center">
    <button onClick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
</div>`
    songContainer.appendChild(songDiv)
})
}

const getLyric = (artist,title)=>{
    const url =`https://api.lyrics.ovh/v1/${artist}/${title}`
    //console.log(url);

    fetch(url)
    .then(res => res.json())
    .then(data=>displayLyrics(data.lyrics))
    .catch(error => console.log(error))
}

const displayLyrics = lyrics=>{
    const lyricsDiv = document.getElementById('song-lyrics')
    lyricsDiv.innerText = lyrics
}
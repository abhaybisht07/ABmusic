console.log("Welcome to ABmusic");

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let seekbar = document.getElementById('seekbar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Cream Paudara.", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Dhan Singh Ki Gadi.", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Sun Mera Gelya.", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Modern Kumaon.", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Meri Basanti.", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Bramchaari Chhoun.", filePath: "songs/2.mp3", coverPath: "covers/6.jpg"},
    {songName: "Tero Lehenga.", filePath: "songs/2.mp3", coverPath: "covers/7.jpg"},
    {songName: "Shri Mati Ji.", filePath: "songs/2.mp3", coverPath: "covers/8.jpg"},
    {songName: "Meri Gaadi.", filePath: "songs/2.mp3", coverPath: "covers/9.jpg"},
    {songName: "Mandaan.", filePath: "songs/4.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})


audioElement.addEventListener('timeupdate', ()=>{ 
    //  Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

seekbar.addEventListener('change', ()=>{
    audioElement.currentTime = seekbar.value * audioElement.duration/100;
})


const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
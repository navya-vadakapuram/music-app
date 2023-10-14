var music_list = [
    {
        image:"images/make-you-mine.jpg",
        name:"Make You Mine",
        artist:"frontman John Vaughn",
        music:"audio_files/make_you_mine.mp3"
  
    },
    {
        image:"images/calm-down.jpg",
        name:"Calm Down",
        artist:"Selena Gomez",
        music:"audio_files/calm_down.mp3"
    },
    {
        image:"images/heart-goes-on.jpg",
        name:"Heart goes on",
        artist:"Céline Dion",
        music:"audio_files/heart_goes_on.mp3"
    }
];

var now_playing = document.querySelector('.now-playing');
var song_name = document.querySelector('.song-name');
var song_artist = document.querySelector('.song-artist');
var song_image = document.querySelector('.song-image');

var curr_time = document.querySelector('.current-time');
var seek_slider = document.querySelector('.seek-slider');
var total_duration = document.querySelector('.total-duration');

var volume_slider = document.querySelector('.volume-slider');

var randomIcon = document.querySelector('.fa-random');

var playpause_btn = document.querySelector('.playpause-track');

//creating audio element
var curr_track = document.createElement('audio');

//initial values
var track_index = 0;
var isPlaying = false;
var isRandom = false;
var updateTimer; //why this var?

//reset function
function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

loadTrack(track_index);

function loadTrack(track_index){
    //i dont understand this line
    //clearInterval(updateTimer);
    reset();
    curr_track.src = music_list[track_index].music;
    curr_track.load();

    now_playing.textContent = "PLAYING "+track_index+1+" OF "+music_list.length;
    song_name.textContent = music_list[track_index].name;
    song_artist.textContent = music_list[track_index].artist;
    song_image.textContent = music_list[track_index].image;

    updateTimer = setInterval(setUpdate , 1000);

    curr_track.addEventListener('ended' , nextTrack);
}

//setUpdate function
function setUpdate(){
    var seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime *(100/curr_track.duration);
        seek_slider.value = seekPosition;

        var currentMinutes = Math.floor(curr_track.currentTime/60);
        var currentSeconds = Math.floor(curr_track.currentTime - currentMinutes*60);
        var durationMinutes = Math.floor(curr_track.duration/60);
        var durationSeconds = Math.floor(curr_track.duration - durationMinutes*60);

        if(currentSeconds < 10) currentSeconds = "0" + currentSeconds;
        if(currentMinutes < 10) currentMinutes = "0" + currentMinutes;
        if(durationSeconds < 10) durationSeconds = "0" + durationSeconds;
        if(durationMinutes < 10) durationMinutes = "0" + durationMinutes;

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

//nextTrack function
function nextTrack(){
    if(track_index < music_list.length-1 && isRandom == false){
        track_index += 1;
    }else if(track_index < music_list.length -1 && isRandom == true){
        var random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}

function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}

//playTrack function
function playTrack(){
    curr_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="fa-solid fa-pause"></i>';
}

//pauseTrack function
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
}



 function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
 }

 function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
 }

 function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
 }

 function repeatTrack(){
    var curr_index = track_index;
    loadTrack(curr_index);
    playTrack();
 }

 function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
 }


 function seekTo(){
    var seekto = curr_track.duration *(seek_slider.value/100);
    curr_track.currentTime = seekto;
 }

 function setVolume(){
    curr_track.volume = volume_slider.value/100;
 }
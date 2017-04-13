
var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber +  '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
    var $row = $(template);
    
    var clickHandler = function(){
        songNumberClicked = parseInt($(this).attr('data-song-number'));
        //clickHandler logic
        if (currentlyPlayingSongNumber === null) {
            $(this).html(pauseButtonTemplate);
            setSong(songNumberClicked);
            updatePlayerBarSong();
            currentSoundFile.play()
        } else if (currentlyPlayingSongNumber === songNumberClicked) {
            
            if (currentSoundFile.isPaused()){
                currentSoundFile.play();
                $(this).html(pauseButtonTemplate);
                $('.main-controls .play-pause').html(playerBarPauseButton);}
                else { currentSoundFile.pause();
                      $(this).html(playButtonTemplate);
                      $('.main-controls .play-pause').html(playerBarPlayButton);
            }
            //currentlyPlayingSongNumber = null;
            //currentSongFromAlbum = null;
            
        } else if (currentlyPlayingSongNumber !== songNumberClicked) {
            $currentlyPlayingSongElement = getSongNumberCell(currentlyPlayingSongNumber);
            $currentlyPlayingSongElement.html($currentlyPlayingSongElement.attr('data-song-number'));
            $(this).html(pauseButtonTemplate);
            currentSoundFile.stop();
            
            setSong(songNumberClicked);
            currentSoundFile.play();
            updatePlayerBarSong();
        }
        
    };
    
    var onHover = function(event) {
        
        if (parseInt($(this).find('.song-item-number').attr('data-song-number')) !== currentlyPlayingSongNumber){            
            $(this).find('.song-item-number').html(playButtonTemplate);
        }
    };
    
    var offHover = function(event) {

        if (parseInt($(this).find('.song-item-number').attr('data-song-number')) !== currentlyPlayingSongNumber){
            $(this).find('.song-item-number').html($(this).find('.song-item-number').attr('data-song-number'));
        }
    };
    //#1
    $row.find('.song-item-number').click(clickHandler);
    //#2
    $row.hover(onHover, offHover);
    //#3
    return $row;
 };

 var setCurrentAlbum = function(album) {
     currentAlbum = album;
     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');
     
 
     $albumTitle.text(album.title);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label)
     $albumImage.attr('src', album.albumArtUrl);
     
     $albumSongList.empty();
 
     for (var i = 0; i < album.songs.length; i++) {
         var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         $albumSongList.append($newRow);
     }
 };

var trackIndex = function(album,song) {
    return album.songs.indexOf(song);
};

var nextSong = function() {
    var currentIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    var previousIndex = currentIndex;
    currentIndex += 1;
    if (currentIndex >= currentAlbum.songs.length) {
        currentIndex = 0;
    }

    songNumberClicked = (currentIndex + 1);
    
    $currentlyPlayingSongElement = getSongNumberCell(currentlyPlayingSongNumber);
    
    if (currentlyPlayingSongNumber === null) {
        setSong(songNumberClicked);
        currentSoundFile.play();
        $currentlyPlayingSongElement = getSongNumberCell(currentlyPlayingSongNumber);
        $currentlyPlayingSongElement.html(pauseButtonTemplate);
        updatePlayerBarSong();
    } else if (currentlyPlayingSongNumber !== songNumberClicked) {
        $currentlyPlayingSongElement = getSongNumberCell(currentlyPlayingSongNumber);
        $currentlyPlayingSongElement.html($currentlyPlayingSongElement.attr('data-song-number'));
        setSong(songNumberClicked);
        currentSoundFile.play();

        $currentlyPlayingSongElement = getSongNumberCell(currentlyPlayingSongNumber);
        $currentlyPlayingSongElement.html(pauseButtonTemplate);
        
        updatePlayerBarSong();
    }
};

var previousSong = function() {
    var currentIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    var nextIndex = currentIndex;
    currentIndex -= 1;
    if (currentIndex < 0) {
        currentIndex = (currentAlbum.songs.length - 1);
    }

    songNumberClicked = (currentIndex + 1);
    
        $currentlyPlayingSongElement = getSongNumberCell(currentlyPlayingSongNumber);
    
    if (currentlyPlayingSongNumber === null) {
        $currentlyPlayingSongElement.html(pauseButtonTemplate);
        setSong(songNumberClicked);
        currentSoundFile.play();
        updatePlayerBarSong();
    } else if (currentlyPlayingSongNumber !== songNumberClicked) {
        $currentlyPlayingSongElement = getSongNumberCell(currentlyPlayingSongNumber);
        $currentlyPlayingSongElement.html($currentlyPlayingSongElement.attr('data-song-number'));
        setSong(songNumberClicked);
        
        currentSoundFile.play();
        $currentlyPlayingSongElement = getSongNumberCell(currentlyPlayingSongNumber);
        $currentlyPlayingSongElement.html(pauseButtonTemplate);
        
        updatePlayerBarSong();
    }
};

var togglePlayFromPlayerBar = function(){
    if (currentlyPlayingSongNumber !== null){
        $currentlyPlayingSongElement = getSongNumberCell(currentlyPlayingSongNumber);

        if (currentSoundFile.isPaused()){
            currentSoundFile.play();
            $currentlyPlayingSongElement.html(pauseButtonTemplate);
            $(this).html(playerBarPauseButton);}
            else { currentSoundFile.pause();
                  $currentlyPlayingSongElement.html(playButtonTemplate);
                  $(this).html(playerBarPlayButton);
        }
    }
};

var setSong = function(songNumber){
    if (currentSoundFile) {
        currentSoundFile.stop();
    }
    currentlyPlayingSongNumber = songNumber;
    currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
    currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
        formats: [ 'mp3' ],
        preload: true
    });
    
    setVolume(currentVolume);
};

var setVolume = function(volume) {
    if (currentSoundFile) {
        currentSoundFile.setVolume(volume);
    }
};

var getSongNumberCell = function(number) {
    return $('.song-item-number[data-song-number="' + number + '"]');
};

var updatePlayerBarSong = function(){
        $(document).find(".currently-playing .song-name").text(currentSongFromAlbum.title);
        $(document).find(".currently-playing .artist-name").text(currentAlbum.artist);
        $(document).find(".currently-playing .artist-song-mobile").text(currentAlbum.artist + ' - ' + currentSongFromAlbum.title);
        $('.main-controls .play-pause').html(playerBarPauseButton);        
    };
 
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';


var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentSoundFile = null;
var currentVolume = 80;
var songNumberClicked = null;
var $currentlyPlayingSongElement = null;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');
var $playPauseButton = $('.main-controls .play-pause');

$(document).ready(function() {    
    setCurrentAlbum(albumPicasso);
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
    $playPauseButton.click(togglePlayFromPlayerBar); 
});

    
    


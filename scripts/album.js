
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
            currentlyPlayingSongNumber = songNumberClicked;
            currentSongFromAlbum = currentAlbum.songs[currentlyPlayingSongNumber - 1]; 
            updatePlayerBarSong();
        } else if (currentlyPlayingSongNumber === songNumberClicked) {
            $(this).html(playButtonTemplate);
            currentlyPlayingSongNumber = null;
            currentSongFromAlbum = null;
            $('.main-controls .play-pause').html(playerBarPlayButton);
        } else if (currentlyPlayingSongNumber !== songNumberClicked) {
            var $currentlyPlayingSongElement = $(document).find('[data-song-number="' + currentlyPlayingSongNumber + '"]');
            $currentlyPlayingSongElement.html($currentlyPlayingSongElement.attr('data-song-number'));
            $(this).html(pauseButtonTemplate);
            currentlyPlayingSongNumber = songNumberClicked;
            currentSongFromAlbum = currentAlbum.songs[currentlyPlayingSongNumber - 1];
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
    
    var $currentlyPlayingSongElement = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    
    if (currentlyPlayingSongNumber === null) {
        currentlyPlayingSongNumber = songNumberClicked;
        $currentlyPlayingSongElement = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
        $currentlyPlayingSongElement.html(pauseButtonTemplate);
        currentSongFromAlbum = currentAlbum.songs[currentlyPlayingSongNumber - 1]; 
        updatePlayerBarSong();
    } else if (currentlyPlayingSongNumber !== songNumberClicked) {
        var $currentlyPlayingSongElement = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
        $currentlyPlayingSongElement.html($currentlyPlayingSongElement.attr('data-song-number'));
        currentlyPlayingSongNumber = songNumberClicked;
        currentSongFromAlbum = currentAlbum.songs[currentlyPlayingSongNumber - 1];

        $currentlyPlayingSongElement = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
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
    
    var $currentlyPlayingSongElement = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    
    if (currentlyPlayingSongNumber === null) {
        $currentlyPlayingSongElement.html(pauseButtonTemplate);
        currentlyPlayingSongNumber = songNumberClicked;
        currentSongFromAlbum = currentAlbum.songs[currentlyPlayingSongNumber - 1]; 
        updatePlayerBarSong();
    } else if (currentlyPlayingSongNumber !== songNumberClicked) {
        var $currentlyPlayingSongElement = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
        $currentlyPlayingSongElement.html($currentlyPlayingSongElement.attr('data-song-number'));
        currentlyPlayingSongNumber = songNumberClicked;
        currentSongFromAlbum = currentAlbum.songs[currentlyPlayingSongNumber - 1];

        $currentlyPlayingSongElement = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
        $currentlyPlayingSongElement.html(pauseButtonTemplate);
        
        updatePlayerBarSong();
    }
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
var songNumberClicked = null;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

$(document).ready(function() {    
    setCurrentAlbum(albumMarconi);
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
});

    
    


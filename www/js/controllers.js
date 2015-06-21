angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $cordovaCamera, $cordovaEmailComposer) {
  
  $scope.takePicture = function() {
    var options = { 
        quality : 75, 
        // destinationType : Camera.DestinationType.DATA_URL, 
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType : Camera.PictureSourceType.CAMERA, 
        allowEdit : true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 300,
        targetHeight: 300,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: true
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
        // $scope.imgURI = "data:image/jpeg;base64," + imageData;
        $scope.imgURI = imageData;
        // var image = document.getElementById('myImage');
        // image.src = imageData;
        // alert(image.src);
    }, function(err) {
        // An error occured. Show a message to the user
    });
  }

  $scope.open = function(){
    $cordovaEmailComposer.isAvailable().then(function() {
     // is available
   }, function () {
     // not available
   });

    var email = {
      to: 'dacur7@gmail.com',
      // cc: 'erika@mustermann.de',
      // bcc: ['john@doe.com', 'jane@doe.com'],
      attachments: [
        $scope.imgURI
        // "res: $scope.imgURI ",
        // $scope.imgURI,
        // "file://$scope.imgURI"
      ],
      subject: 'Picture sent from App',
      body: '<p>Hello, I am sending you this picture from your app.  I will be calling you soon to discuss our situation.</p><p>Thanks.</p>',
      isHtml: true
    };
    
     $cordovaEmailComposer.open(email).then(null, function () {
       // user cancelled email
     });
   }
})

.controller('ContactCtrl', function($scope){
  
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

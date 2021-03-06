'use strict';

angular.module('starter').factory('AuthService' ,
  function ($rootScope, $http, $location) {

        $rootScope.lineups2 = ['Jarred', 'Jacob', 'Johna!'];
        $rootScope.storesAvailable = ['BestBuy', 'Kmart', 'Target', 'Zehrs'];
        $rootScope.peopleLine = ['Marcus', 'Dom', 'Brain'];
        $rootScope.lineNumber = [1, 2, 3];

        return ({
          loginExample2: loginExample2,
          RegisterExample: RegisterExample,
          RegisterExample4: RegisterExample4,
          LoginExample3: LoginExample3,
          logout: logout,
          confirm: confirm,
          facebookLogin: facebookLogin
        });



    function loginExample2(email, password){
        console.log('email' + email);  console.log('password' + password);

        $http.post('/login', {email : email, password : password} )
           .success(function( data) {
              console.log (data);
              $location.path('/profile');
              console.log(data.user.local); console.log(data.user.local.email); console.log(data.user.local.password);
              $rootScope.userdata = data;

              //Its refered to as local because its stored in the database as local:
              $rootScope.userInfo= data.user.local; $rootScope.userEmail = data.user.local.email;
              $rootScope.userPassword = data.user.local.password;
              }, function() {});
    }


    function RegisterExample(email, password, fname, lname){
          console.log('firstname' + email);   console.log('lastname' + password);

            $http.post('/signup', {email : email, password : password } )
            .success(function( data) {
              console.log (data);
              $location.path('/profile');
              console.log(data.user.local); console.log(data.user.local.email); console.log(data.user.local.password);

              $rootScope.userdata = data;
              $rootScope.userName = data.user.local;
              console.log('This is the username in $rootScope: ' + $rootScope.userName);

              }, function() {});

    }


    function RegisterExample4(fname, lname, email, password,  passwordConf){
          console.log('fname: ' + fname); console.log('lname: ' + lname);
          console.log('email: ' + email); console.log('password: ' + password);
          console.log('passwordConf: ' + passwordConf);
//http://192.168.1.115:3000/signup22
            $http.post('https://thawing-ocean-11742.herokuapp.com/signup22', { fname: fname, lname: lname, email : email, password : password, passwordConf: passwordConf } )
            .success(function( data) {
              console.log (data);
              $location.path('/profile');

              console.log(data.user_id); console.log(data.firstname);
              console.log(data.email); console.log(data.password);

              $rootScope.userdata = data;
              $rootScope.fullName= data.firstname +" "+ data.lastname;
              $rootScope.userid= data._id;  $rootScope.userEmail = data.email;
              $rootScope.userPassword = data.password;
              }, function() {});
    }




    function facebookLogin(){
       document.addEventListener("deviceready", function() {
       try {
      if (window.cordova.platformId === "browser") {
               var appId = xxxx6138889xxxx; var version = "v2.0";      //tried for v.2.0 to v.2.7
              facebookConnectPlugin.browserInit(appId, version);
      }

      //STEP 2)  LOGIN SUCCESS, WHICH THEN GETS FACEBOOK USER INFORMATION:
       var fbLoginSuccess = function (userData) {
          //  window.alert("worked" + JSON.stringify(userData));

        facebookConnectPlugin.api('me/?fields=id,name,email', ['email','public_profile'],

            function (userData) {
               window.alert(userData.id); window.alert(userData.name);  window.alert(userData.email);
               $rootScope.userID = userData.id; $rootScope.name = userData.name;  $rootScope.email = userData.email;

      //STEP 3)  POSTS DATA TO BACKEND TO CHECK IF IN DATABASE:

       $http.post('http://192.168.1.115:3000/facebookSignupLogin', {userID: $rootScope.userID, name: $rootScope.name, email: $rootScope.email})
         .then(function(data) {

             window.alert(data);

              //PLEASE NOTE: TO GET THE FACEBOOK PICTURE THIS WAY I NEEDS
              //TO GET THE USERID, BUT I DONT HAVE USERID SAVED IN THIS DATABASE
              //SO

             $rootScope.useremail = data.email;   $rootScope.fullName = data.firstname;
             $rootScope.userid = data.facebook.id;

             //$scope.content = response.data;

         }, function() {  window.alert('didnt work'); });   },
               function (error) { console.error(error);  }  );
        };
       //STEP 1) FACEBOOK LOGIN SCREEN:
        facebookConnectPlugin.login(["email" ], fbLoginSuccess,
            function (error) { window.alert("" + error); } );
      } catch (e){ window.alert(e); }
      }, false);

    }



  //  var socket = io.connect('https://thawing-ocean-11742.herokuapp.com/#/:3000');
    //http://192.168.1.115: THIS WORKS FOR MOBILE LOGIN.
    //var socket = io.connect('http://192.168.1.115:3000');
//https://thawing-ocean-11742.herokuapp.com/#/home

    function LoginExample3(email, password){
        console.log('email: ' + email); console.log('password: ' + password);
//'http://192.168.1.115:3000/login22999'
      $http.post('https://thawing-ocean-11742.herokuapp.com/login22999', {email : email, password : password} )
         .success(function( data) {
           console.log (data);
           console.log (data.user);
           console.log (data.token);
           console.log ('THIS WORKED REALLY WELL OK BIG FELLA!');

           $location.path('/profile');


            $rootScope.userdata = data;
            //Its refered to as local because its stored in the database as local:
            $rootScope.fullName= data.user.firstname +" "+ data.user.lastname;
            $rootScope.userid= data.user._id; $rootScope.useremail = data.user.email;
            $rootScope.userPassword = data.user.password;
            $rootScope.usertoken = data.token;
            }, function() {});
    }


    function logout() {
            $rootScope.userdata = null;
            $rootScope.useremail = null;  $rootScope.username = null;
            $rootScope.userid = null;     $rootScope.usertoken = null;
            $rootScope.userEmail = null;  $rootScope.fullName = null;
            $rootScope.userid = null;     $rootScope.userPassword = null;

            $rootScope.imageSaved = false;
            $http.get('/logout')
              .success(function () {    console.log('LOGGED OUT!');    })
              .error(function () {      console.log('NOT LOGGED OUT!');   });
              $location.path('/app/home');
    }


  function confirm() {
    console.log('USER HIT CONFIRM:');
      $http.get('/confirm-login')
      .success(function (data) {
         console.log(data);

        // console.log(contains(arr, "google", "Blofeld")); //true
  //       console.log(contains(data, "google")); //true
         if (data.hasOwnProperty('google')) {
           console.log('GOOGLE DATA');   console.log(data);
           $rootScope.userdata = data;
           $rootScope.useremail = data.google.email;   $rootScope.fullName = data.google.name;
           $rootScope.userid = data.google.id;  $rootScope.usertoken = data.google.token;

           console.log("email"+data.google.email);  console.log("token"+data.google.token);
           console.log("id"+data.google.id);

         }  else if (data.hasOwnProperty('facebook')) {
           console.log('FACEBOOK DATA');   console.log(data);
           $rootScope.userdata = data;
              $rootScope.useremail = data.facebook.email;   $rootScope.fullName = data.facebook.name;
              $rootScope.userid = data.facebook.id;  $rootScope.usertoken = data.facebook.token;

              console.log("email"+data.facebook.email);  console.log("token"+data.facebook.token);
              console.log("id"+data.facebook.id);

              //THIS WILL SHOW THE CORRECT IMAGE:
              $rootScope.imageSaved = true;

        }  else if (data.hasOwnProperty('twitter')) {
          console.log('TWITTER');   console.log(data);
          $rootScope.userdata = data;
          $rootScope.useremail = data.twitter.username;   $rootScope.fullName = data.twitter.displayName;
          $rootScope.userid = data.twitter.id;  $rootScope.usertoken = data.twitter.token;

            console.log("token"+data.twitter.token);   console.log("id"+data.twitter.id);
            console.log("name"+data.twitter.displayName);  console.log("username"+data.twitter.username);
                  }  else {
                   console.log("Not logged in yet!");
              }
                    });
      }



    var People = [
      {   name: "Joe Watkins",   position: "UX Developer", skills: "HTML CSS Javascript" },
      { name: "Jen Smithers",  position: "Dev Ops", skills: "Alien Server Technology"  },
      { name: "Paul Anderson",  position: "Designer",    skills: "UI & UX Design"  },
      {  name: "Samantha Barton",  position: "Javascript Ninja",  skills: "All things JS" }
    ];

    return People;
});

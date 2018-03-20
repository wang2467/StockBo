import firebase from "firebase";

var config = {
	apiKey: "AIzaSyBlyFdoenF2kW0SfshiG_auv6Qw_eWf5t0",
	authDomain: "stockbo-b52c2.firebaseapp.com",
	databaseURL: "https://stockbo-b52c2.firebaseio.com",
	projectId: "stockbo-b52c2",
	storageBucket: "stockbo-b52c2.appspot.com",
	messagingSenderId: "128673305836"
};
firebase.initializeApp(config);
export default firebase;
export default firebase.auth;
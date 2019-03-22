import fb from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import firebaseConfig from "./assets/config/firebaseConfig.js";
    
export default class Firebase{
    constructor(app){

        this.app = app
        this.fb = fb.initializeApp(firebaseConfig);
        this.auth();
    }


    /////////////////////////////////////////////////////
    /////////////////////    Auth   /////////////////////
    /////////////////////////////////////////////////////    
    auth(){
        this.listenToAuth();
    }

    listenToAuth(){
        this.fb.auth().onAuthStateChanged(user => {
            if (user) {
                this.app.appData.user = user;
                console.log("User logged in as:", user.displayName);
                this.checkIfUserExist(user.uid);
                this.FbDatabaseListner(user.uid);
                this.checkRole(user.uid);
            } else {
                console.log("User logged out");
                this.resetAppOnLogout()
            }
        });
    }

    checkIfUserExist(userId) {
        let userDatabase = this.fb.database().ref(`users/${userId}`);
        userDatabase.on('value', function (snapshot) {
            if (snapshot.exists() === false) {
                this.setNewDataFb(userId);
            }
        }, this);
    }

    setNewDataFb(userId) {
        let userRef = this.fb.database().ref(`users/${userId}`)

        userRef.set({
            profiel: {
                achtergrond: "",
                achternaam: "",
                email: currentUser.email,
                foto: "",
                id: userId,
                klas: "",
                niveau: "",
                over: "",
                tussenvoegsel: "",
                voornaam: "",
            }
        });
        console.log('new user made')
    }

    checkRole(userId){
        let checkAdminRef = this.fb.database().ref(`roles/admin/${userId}`);

        checkAdminRef.on('value', function (snapshot) {
            if (snapshot.val()) {
                this.app.appData.admin = true
            }else{
                this.app.appData.admin = false
            }
        }, this);
    }


    /////////////////////////////////////////////////////
    ///////////////////// Database  /////////////////////
    /////////////////////////////////////////////////////
    
    FbDatabaseListner(userId) {
        let userDatabaseRef = this.fb.database().ref(`users/${userId}/`);

        userDatabaseRef.on('value', function (snapshot) {
            this.app.userData = snapshot.val()
        }, this);
    }

    setWvbTime() {
        let d = new Date()
        let date = `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()} ${d.getHours()}.${d.getMinutes()}`

        this.app.werkvoorbereiding.laatsteBewerking = date
    }

    WvbToFb(WVB) {
        if (this.app.appData.user && this.app.werkvoorbereiding) {
            this.setWvbTime()

            let userId = this.fb.auth().currentUser.uid;
            let userWvbRef = this.fb.database().ref(`users/${userId}/alleWVB/${WVB.id}`)
            userWvbRef.set(WVB);
        }
    }

    profileToFB(profile){
        let userId = this.fb.auth().currentUser.uid;
        let userProfileRef = this.fb.database().ref(`users/${userId}/profiel`)
        
        userProfileRef.set(profile);
    }

    /////////////////////////////////////////////////////
    /////////////////////  other    /////////////////////
    /////////////////////////////////////////////////////

    resetAppOnLogout(){
        this.app.appData.page = 1;
        this.app.appData.instellingen.kleur = 'groen';
        this.app.appData.user = null;
        this.app.userData = null;
        this.app.appData.admin = false
    }
} 
samlSbgLoginAlert = () =>{

    popupTools.popup('https://apimanager.mw.sbicdirectory.com:9000/passportjs/auth/oauthsbg', "Standard Bank SSO", {}, function (err, user) {
        if (err) {
        } else {
            localStorage.setItem('user_data', user);
            localStorage.setItem('redirect', "yes");
            location.reload();
        }
    });
}

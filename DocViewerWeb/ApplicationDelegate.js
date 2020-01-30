// Copyright © 2020 Breakside Inc.  MIT License.
// #import "ApplicationDelegateBase.js"
'use strict';

JSClass("ApplicationDelegate", ApplicationDelegateBase, {

    window: null,
    mainViewController: null,

    applicationDidFinishLaunching: function(application, launchOptions){
        this.setupDefaults();
        this.mainViewController.baseURL = application.baseURL;
        this.mainViewController.setup(launchOptions.uistate);
        this.window.makeKeyAndOrderFront();
    },

    applicationUpdateAvailable: function(application){
        this.mainViewController.indicateUpdateAvailable();
    }

});
// Copyright © 2020 Breakside Inc.  MIT License.
// #import "ApplicationDelegateShared.js"
'use strict';

JSClass("ApplicationDelegate", ApplicationDelegateShared, {

    window: null,
    mainViewController: null,
    sidebarViewController: null,
    contentViewController: null,

    applicationDidFinishLaunching: function(application, launchOptions){
        ApplicationDelegate.$super.applicationDidFinishLaunching.call(this, application, launchOptions);
        this.mainViewController.components = this.components;
        this.sidebarViewController.setComponents(this.components);
        this.mainViewController.initialComponent = this.initialComponents[this.initialComponents.length - 1];
        this.window.makeKeyAndOrderFront();
    },

    applicationUpdateAvailable: function(application){
        this.mainViewController.indicateUpdateAvailable();
    }

});
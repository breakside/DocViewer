// Copyright © 2020 Breakside Inc.  MIT License.
// #import UIKit
// #import "AboutWindowController.js"
'use strict';

JSClass("MainViewController", UISplitViewController, {

    baseURL: null,
    sidebarViewController: JSOutlet(),
    contentViewController: JSOutlet(),
    components: null,

    // --------------------------------------------------------------------
    // MARK: - View Lifecycle

    viewDidLoad: function(){
        MainViewController.$super.viewDidLoad.call(this);
    },

    initialComponent: null,

    viewDidAppear: function(){
        MainViewController.$super.viewDidAppear.call(this);
        if (this.initialComponent){
            this.sidebarViewController.selectComponent(this.initialComponent);
            this.initialComponent = null;
        }
    },

    sidebarViewDidSelectComponent: function(sidebarViewController, component){
        this.contentViewController.showComponent(component);
    },

    indicateUpdateAvailable: function(){
        this.sidebarViewController.indicateUpdateAvailable();
    },

    aboutWindowController: null,

    showAbout: function(){
        if (this.aboutWindowController === null){
            this.aboutWindowController = AboutWindowController.initWithSpecName("AboutWindowController");
            this.aboutWindowController.delegate = this;
        }
        this.aboutWindowController.makeKeyAndOrderFront();
    },

    windowControllerDidClose: function(windowController){
        if (windowController === this.aboutWindowController){
            this.aboutWindowController = null;
        }
    },

    reportAnIssue: function(){
        var url = JSURL.initWithString("https://github.com/breakside/JSKit/issues");
        UIApplication.shared.openURL(url);
    }

});
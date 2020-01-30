// Copyright © 2020 Breakside Inc.  MIT License.
// #import "ApplicationDelegateBase.js"
'use strict';

JSClass("ApplicationDelegateTouch", ApplicationDelegateBase, {

    window: null,
    navigationController: null,

    applicationDidFinishLaunching: function(application, launchOptions){
        this.setupDefaults();
        var rootComponent = JSBundle.mainBundle.metadataForResourceName('components').value.components[0];
        var rootComponentsViewController = this.navigationController.viewControllers[0];
        rootComponentsViewController.navigationItem.view = UIImageView.initWithImage(JSImage.initWithResourceName("JSKitLogo"));
        rootComponentsViewController.navigationItem.title = "JSKit";
        rootComponentsViewController.component = rootComponent;
        this.window.makeKeyAndOrderFront();
    }

});
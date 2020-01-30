// Copyright © 2020 Breakside Inc.  MIT License.
// #import "ApplicationDelegateShared.js"
// #import "ComponentsListViewController.js"
'use strict';

JSClass("ApplicationDelegateTouch", ApplicationDelegateShared, {

    window: null,
    splitViewController: null,
    navigationController: null,

    applicationDidFinishLaunching: function(application, launchOptions){
        ApplicationDelegateTouch.$super.applicationDidFinishLaunching.call(this, application, launchOptions);
        var rootComponentsViewController = this.navigationController.viewControllers[0];
        rootComponentsViewController.navigationItem.view = UIImageView.initWithImage(JSImage.initWithResourceName("JSKitLogo"));
        rootComponentsViewController.navigationItem.title = "JSKit";
        rootComponentsViewController.component = this.components[0];
        var viewController = rootComponentsViewController;
        var component = this.initialComponents[0];
        for (var i = 1, l = this.initialComponents.length; i < l; ++i){
            component = this.initialComponents[i];
            if (component.children && component.children.length > 0){
                viewController = ComponentsListViewController.initWithSpecName("ComponentsListViewController");
                viewController.component = component;
                viewController.navigationItem.title = component.name;
                this.navigationController.pushViewController(viewController, false);
            }
        }
        viewController.initialComponent = component;
        this.window.makeKeyAndOrderFront();
    }

});
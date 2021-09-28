// Copyright © 2020 Breakside Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// #import "ApplicationDelegateShared.js"
// #import "ComponentsListViewController.js"
'use strict';

JSClass("ApplicationDelegateTouch", ApplicationDelegateShared, {

    window: JSOutlet(),
    splitViewController: JSOutlet(),
    navigationController: JSOutlet(),

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
    },

    setupColors: function(){
        ApplicationDelegateTouch.$super.setupColors.call(this);
        JSColorSpace.ui.setColorForName("rootBackground", JSColor.window);
        JSColorSpace.ui.setStylesForName("navbar", JSColor.jskitPurple, JSColor.initWithWhite(0.075));
        JSColorSpace.ui.setStylesForName("listHeader", JSColor.initWithWhite(0.94), JSColor.initWithWhite(0.2));
        JSColorSpace.ui.setStylesForName("sidebarDivider", JSColor.initWithWhite(0.92), JSColor.black);
    }

});
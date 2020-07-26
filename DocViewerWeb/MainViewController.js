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
            this.contentViewController.showComponent(this.initialComponent);
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
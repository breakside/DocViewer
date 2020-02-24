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
'use strict';

JSClass("ApplicationDelegate", ApplicationDelegateShared, {

    window: JSOutlet(),
    mainViewController: JSOutlet(),
    sidebarViewController: JSOutlet(),
    contentViewController: JSOutlet(),

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
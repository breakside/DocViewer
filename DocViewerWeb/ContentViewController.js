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
'use strict';

JSClass("ContentViewController", UIViewController, {

    headerView: JSOutlet(),
    breadcrumbView: JSOutlet(),
    menuButton: JSOutlet(),
    webView: JSOutlet(),
    delegate: null,
    component: null,

    initWithSpec: function(spec){
        ContentViewController.$super.initWithSpec.call(this, spec);
        if (spec.containsKey("delegate")){
            this.delegate = spec.valueForKey("delegate");
        }
        this.menuButtonInsets = JSInsets(3, 7);
    },

    // --------------------------------------------------------------------
    // MARK: - View Lifecycle

    viewDidLoad: function(){
        ContentViewController.$super.viewDidLoad.call(this);
    },

    viewDidAppear: function(){
        ContentViewController.$super.viewDidAppear.call(this);
    },

    webViewDidLoadURL: function(webView, url){
        var components = UIApplication.shared.delegate.componentsForURL(url);
        this.breadcrumbView.setComponents(components);
        this.component = components[components.length - 1];
        JSNotificationCenter.shared.post("io.breakside.DocViewer.DocumentViewed", this, {url: url});
    },

    showComponent: function(component){
        var url = JSURL.initWithString('docs/' + component.url);
        this.webView.loadURL(url);
    },

    viewDidLayoutSubviews: function(){
        var headerHeight = 31;
        var buttonSize = headerHeight - 1 - this.menuButtonInsets.height;
        this.headerView.frame = JSRect(0, 0, this.view.bounds.size.width, headerHeight);
        this.menuButton.frame = JSRect(this.view.bounds.size.width - buttonSize - this.menuButtonInsets.right, this.menuButtonInsets.top, buttonSize, buttonSize);
        this.breadcrumbView.frame = JSRect(0, 0, this.menuButton.frame.origin.x - this.menuButtonInsets.left, headerHeight - 1);
        this.webView.frame = JSRect(0, headerHeight, this.view.bounds.size.width, this.view.bounds.size.height - headerHeight);
    },

    canPerformAction: function(action, sender){
        if (action == 'showSourceCode'){
            return this.component && this.component.codeURL;
        }
        return ContentViewController.$super.canPerformAction.call(this, action, sender);
    },

    showSourceCode: function(){
        var url = JSURL.initWithString(this.component.codeURL);
        UIApplication.shared.openURL(url);
    }

});
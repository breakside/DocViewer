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

JSClass("WebViewController", UIViewController, {

    component: null,

    // MARK: - View Lifecycle

    viewDidLoad: function(){
        WebViewController.$super.viewDidLoad.call(this);
        var url = JSURL.initWithString('docs/' + this.component.url);
        this.view.loadURL(url);
    },

    loadView: function(){
        this.view = UIWebView.init();
        this.view.delegate = this;
    },

    viewWillAppear: function(animated){
        WebViewController.$super.viewWillAppear.call(this, animated);
    },

    viewDidAppear: function(animated){
        WebViewController.$super.viewDidAppear.call(this, animated);
    },

    viewWillDisappear: function(animated){
        WebViewController.$super.viewWillDisappear.call(this, animated);
    },

    viewDidDisappear: function(animated){
        WebViewController.$super.viewDidDisappear.call(this, animated);
    },

    webViewDidLoadURL: function(webView, url){
        JSNotificationCenter.shared.post("io.breakside.DocViewer.DocumentViewed", this, {url: url});
    }

});
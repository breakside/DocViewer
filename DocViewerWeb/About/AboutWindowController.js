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

JSClass("AboutWindowController", UIWindowController, {

    iconView: JSOutlet(),
    titleLabel: JSOutlet(),
    versionLabel: JSOutlet(),
    copyrightLabel: JSOutlet(),
    creditLabel: JSOutlet(),
    sourceLabel: JSOutlet(),

    viewDidLoad: function(){
        AboutWindowController.$super.viewDidLoad.call(this);
        this.titleLabel.text = JSBundle.mainBundle.localizedStringForInfoKey("UIApplicationTitle");
        this.versionLabel.text = JSBundle.mainBundle.info.JSBundleVersion;
        this.copyrightLabel.text = JSBundle.mainBundle.localizedStringForInfoKey("JSCopyright");
        this.creditLabel.attributedText = this.attributedCredit();
        this.sourceLabel.attributedText = this.attributedSource();
    },

    attributedCredit: function(){
        var localizedCredit = JSBundle.mainBundle.localizedString("credit", "AboutWindowController");
        var attributedCredit = JSAttributedString.initWithString(localizedCredit);
        var url = JSURL.initWithString("https://jskit.dev");
        attributedCredit.replaceFormat("JSKit", {link: url, bold: true, cursor: UICursor.pointingHand});
        return attributedCredit;
    },

    attributedSource: function(){
        var localizedSource = JSBundle.mainBundle.localizedString("source", "AboutWindowController");
        var url = JSURL.initWithString("https://github.com/breakside/DocViewer");
        var attributedSource = JSAttributedString.initWithString(localizedSource, {link: url, cursor: UICursor.pointingHand});
        return attributedSource;
    },

});
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

JSClass("BetaAccessoryView", UIView, {

    color: JSDynamicProperty('_color', null),

    init: function(){
        BetaAccessoryView.$super.init.call(this);
        this.borderWidth = 1;
        this.cornerRadius = 2;
        this.label = UILabel.init();
        this.label.maximumNumberOfLines = 1;
        this.label.textInsets = JSInsets(1,3);
        this.label.font = this.label.font.fontWithPointSize(JSFont.Size.detail * 0.8);
        this.label.text = JSBundle.mainBundle.localizedString("beta").toLowerCase();
        this.addSubview(this.label);
        this.sizeToFit();
    },

    setColor: function(color){
        this._color = color;
        this.borderColor = this.color;
        this.label.textColor = this.color;
    },

    sizeToFit: function(){
        this.label.sizeToFit();
        this.bounds = JSRect(JSPoint.Zero, this.label.bounds.size);
    },

    sizeToFitSize: function(maxSize){
        this.label.sizeToFitSize(maxSize);
        this.bounds = JSRect(JSPoint.Zero, this.label.bounds.size);
    },

    getIntrinsicSize: function(){
        return this.label.intrinsicSize;
    },

    layoutSubviews: function(){
        this.label.frame = this.bounds;
    }

});
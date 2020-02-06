// Copyright © 2020 Breakside Inc.  MIT License.
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
// Copyright © 2020 Breakside Inc.  MIT License.
// #import UIKit
// #import "WebViewController.js"
// #import "BetaAccessoryView.js"
'use strict';

(function(){

JSClass("ComponentsListViewController", UIListViewController, {

    component: null,
    topics: null,
    initialComponent: null,

    // MARK: - View Lifecycle

    viewDidLoad: function(){
        ComponentsListViewController.$super.viewDidLoad.call(this);
        this.topics = [];
        var topic = {name: "Overview", components: [this.component]};
        this.topics.push(topic);
        var component;
        for (var i = 0, l = this.component.children.length; i < l; ++i){
            component = this.component.children[i];
            if (component.kind === 'topic'){
                topic = {name: component.name, components: []};
                this.topics.push(topic);
            }else{
                topic.components.push(component);
            }
        }
        this.listView.reloadData();
    },

    _didDisappear: false,

    viewWillAppear: function(animated){
        ComponentsListViewController.$super.viewWillAppear.call(this, animated);
        if (this._didDisappear){
            this._didDisappear = false;
            this.listView.setSelectedIndexPathAnimated(null);
        }
    },

    viewDidAppear: function(animated){
        ComponentsListViewController.$super.viewDidAppear.call(this, animated);
        if (this.initialComponent !== null && !this.splitViewController.splitView.mainHidden){
            var viewController = WebViewController.init();
            viewController.component = this.initialComponent;
            this.splitViewController.show(viewController);
            this.initialComponent = null;
        }
    },

    viewWillDisappear: function(animated){
        ComponentsListViewController.$super.viewWillDisappear.call(this, animated);
    },

    viewDidDisappear: function(animated){
        ComponentsListViewController.$super.viewDidDisappear.call(this, animated);
        this._didDisappear = true;
    },

    // MARK: - List View Data Source

    numberOfSectionsInListView: function(listView){
        return this.topics.length;
    },

    numberOfRowsInListViewSection: function(listView, sectionIndex){
        var topic = this.topics[sectionIndex];
        return topic.components.length;
    },

    cellForListViewAtIndexPath: function(listView, indexPath){
        var topic = this.topics[indexPath.section];
        var component = topic.components[indexPath.row];
        var cell;
        if (component.kind == 'topic'){
            cell = listView.dequeueReusableCellWithIdentifier("topic", indexPath);
        }else{
            cell = listView.dequeueReusableCellWithIdentifier('component', indexPath);
            cell.imageView.image = imageByKind[component.kind](component);
            if (component.beta){
                cell.accessoryView = BetaAccessoryView.init();
            }else{
                cell.accessoryView = null;
            }
        }
        cell.titleLabel.text = component.name;
        return cell;
    },

    headerViewForListViewSection: function(listView, sectionIndex){
        var topic = this.topics[sectionIndex];
        var header = listView.dequeueReusableHeaderWithIdentifier("header", sectionIndex);
        header.titleLabel.text = topic.name;
        return header;
    },

    listViewShouldSelectCellAtIndexPath: function(listView, indexPath){
        return true;
    },

    listViewDidSelectCellAtIndexPath: function(listView, indexPath){
        var topic = this.topics[indexPath.section];
        var component = topic.components[indexPath.row];
        var viewController;
        var cell = listView.cellAtIndexPath(indexPath);
        if (indexPath.section > 0 && component.children && component.children.length > 0){
            viewController = ComponentsListViewController.initWithSpecName("ComponentsListViewController");
            viewController.component = component;
            viewController.initialComponent = component;
            viewController.navigationItem.title = component.name;
            this.navigationController.pushViewController(viewController, true);
        }else{
            viewController = WebViewController.init();
            viewController.component = component;
            this.splitViewController.show(viewController, cell);
        }
    },

    splitViewController: JSReadOnlyProperty(),

    getSplitViewController: function(){
        var ancestor = this.navigationController;
        while (ancestor !== null && !ancestor.isKindOfClass(UISplitViewController)){
            ancestor = ancestor.parentViewController;
        }
        return ancestor;
    }

});

JSClass("ComponentsListViewStyler", UIListViewDefaultStyler, {

    updateCell: function(cell, indexPath){
        ComponentsListViewStyler.$super.updateCell.call(this, cell, indexPath);
        if (cell.accessoryView){
            if (cell.selected){
                cell.accessoryView.color = JSColor.white;
            }else{
                cell.accessoryView.color = betaColor;
            }
        }
    }

});

var betaColor = JSColor.initWithRGBA(180/255,111/255,51/255);

var imageByKind = {
    'index': function(){ return images.frameworkIcon; },
    'class': function(){ return images.classIcon; },
    'constructor': function(){ return images.constructorIcon; },
    'document': function(){ return images.docIcon; },
    'enum': function(){ return images.enumIcon; },
    'enumoption': function(){ return images.enumoptionIcon; },
    'enumfunction': function(){ return images.functionIcon; },
    'framework': function(){ return images.frameworkIcon; },
    'function': function(){ return images.functionIcon; },
    'init': function(){ return images.initIcon; },
    'method': function(component){ return component.static ? images.staticmethodIcon : images.methodIcon; },
    'property': function(component){ return component.static ? images.staticpropertyIcon : images.propertyIcon; },
    'protocol': function(){ return images.protocolIcon; },
    'spec': function(){ return images.specIcon; },
    'specproperty': function(){ return images.specpropertyIcon; },
    'command': function(){ return images.commandIcon; },
    'argv': function(){ return images.argvIcon; },
    'dictionary': function(){ return images.docIcon; },
    'dictproperty': function(component){ return images.propertyIcon; },
};

var images = JSImage.resourceCache([
    'classIcon',
    'constructorIcon',
    'docIcon',
    'enumIcon',
    'enumoptionIcon',
    'frameworkIcon',
    'functionIcon',
    'initIcon',
    'methodIcon',
    'propertyIcon',
    'protocolIcon',
    'staticmethodIcon',
    'staticpropertyIcon',
    'specIcon',
    'specpropertyIcon',
    'commandIcon',
    'argvIcon'
]);

})();
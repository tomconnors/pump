goog.provide("module$DOMPropertyOperations");
var module$DOMPropertyOperations = {};
goog.require("module$memoizeStringOnly");
goog.require("module$escapeTextForBrowser");
goog.require("module$DOMProperty");
var DOMProperty$$module$DOMPropertyOperations = module$DOMProperty;
var escapeTextForBrowser$$module$DOMPropertyOperations = module$escapeTextForBrowser;
var memoizeStringOnly$$module$DOMPropertyOperations = module$memoizeStringOnly;
var processAttributeNameAndPrefix$$module$DOMPropertyOperations = memoizeStringOnly$$module$DOMPropertyOperations(function(name) {
  return escapeTextForBrowser$$module$DOMPropertyOperations(name) + '="'
});
var DOMPropertyOperations$$module$DOMPropertyOperations = {createMarkupForProperty:function(name, value) {
  if(DOMProperty$$module$DOMPropertyOperations.isStandardName[name]) {
    if(value == null || DOMProperty$$module$DOMPropertyOperations.hasBooleanValue[name] && !value) {
      return""
    }
    var attributeName = DOMProperty$$module$DOMPropertyOperations.getAttributeName[name];
    return processAttributeNameAndPrefix$$module$DOMPropertyOperations(attributeName) + escapeTextForBrowser$$module$DOMPropertyOperations(value) + '"'
  }else {
    if(DOMProperty$$module$DOMPropertyOperations.isCustomAttribute(name)) {
      if(value == null) {
        return""
      }
      return processAttributeNameAndPrefix$$module$DOMPropertyOperations(name) + escapeTextForBrowser$$module$DOMPropertyOperations(value) + '"'
    }
  }
  return null
}, setValueForProperty:function(node, name, value) {
  if(DOMProperty$$module$DOMPropertyOperations.isStandardName[name]) {
    var mutationMethod = DOMProperty$$module$DOMPropertyOperations.getMutationMethod[name];
    if(mutationMethod) {
      mutationMethod(node, value)
    }else {
      if(DOMProperty$$module$DOMPropertyOperations.mustUseAttribute[name]) {
        if(DOMProperty$$module$DOMPropertyOperations.hasBooleanValue[name] && !value) {
          node.removeAttribute(DOMProperty$$module$DOMPropertyOperations.getAttributeName[name])
        }else {
          node.setAttribute(DOMProperty$$module$DOMPropertyOperations.getAttributeName[name], value)
        }
      }else {
        var propName = DOMProperty$$module$DOMPropertyOperations.getPropertyName[name];
        if(!DOMProperty$$module$DOMPropertyOperations.hasSideEffects[name] || node[propName] !== value) {
          node[propName] = value
        }
      }
    }
  }else {
    if(DOMProperty$$module$DOMPropertyOperations.isCustomAttribute(name)) {
      node.setAttribute(name, value)
    }
  }
}, deleteValueForProperty:function(node, name) {
  if(DOMProperty$$module$DOMPropertyOperations.isStandardName[name]) {
    var mutationMethod = DOMProperty$$module$DOMPropertyOperations.getMutationMethod[name];
    if(mutationMethod) {
      mutationMethod(node, undefined)
    }else {
      if(DOMProperty$$module$DOMPropertyOperations.mustUseAttribute[name]) {
        node.removeAttribute(DOMProperty$$module$DOMPropertyOperations.getAttributeName[name])
      }else {
        var propName = DOMProperty$$module$DOMPropertyOperations.getPropertyName[name];
        node[propName] = DOMProperty$$module$DOMPropertyOperations.getDefaultValueForProperty(node.nodeName, name)
      }
    }
  }else {
    if(DOMProperty$$module$DOMPropertyOperations.isCustomAttribute(name)) {
      node.removeAttribute(name)
    }
  }
}};
module$DOMPropertyOperations.module$exports = DOMPropertyOperations$$module$DOMPropertyOperations;
if(module$DOMPropertyOperations.module$exports) {
  module$DOMPropertyOperations = module$DOMPropertyOperations.module$exports
}
;

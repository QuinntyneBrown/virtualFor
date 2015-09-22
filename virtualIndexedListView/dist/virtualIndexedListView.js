/// <reference path="../typings/typescriptapp.d.ts" />
angular.module("virtualIndexedListView", ["rx"]);

//# sourceMappingURL=virtualIndexedListView.module.js.map
/// <reference path="../../typings/typescriptapp.d.ts" />
var VirtualIndexedListView;
(function (VirtualIndexedListView_1) {
    var VirtualIndexedListView = (function () {
        function VirtualIndexedListView(getHtml, virtualIndexedListViewRenderer) {
            var _this = this;
            this.getHtml = getHtml;
            this.virtualIndexedListViewRenderer = virtualIndexedListViewRenderer;
            this.restirct = "A";
            this.transclude = 'element';
            this.scope = false;
            this.compile = function (template) {
                var virtualIndexedListViewRenderer = _this.virtualIndexedListViewRenderer;
                var parentElement = template.parent();
                var getHtml = _this.getHtml;
                return function (scope, element, attributes, controller, transclude) {
                    transclude(scope.$new(), function (clone) {
                        removeVirtualListCustomAttributes(clone);
                        virtualIndexedListViewRenderer.createInstance({
                            element: angular.element(parentElement),
                            template: getHtml(clone[0], true),
                            scope: scope,
                            items: attributes["virtualIndexedListViewItems"] ? JSON.parse(attributes["virtualIndexedListViewItems"]) : scope[attributes["virtualIndexedListViewCollectionName"]],
                            itemName: attributes["virtualIndexedListViewItemName"],
                            itemHeight: attributes["virtualIndexedListViewItemHeight"]
                        }).render();
                    });
                };
                function removeVirtualListCustomAttributes(clone) {
                    clone[0].removeAttribute("virtual-indexed-list-view");
                    clone[0].removeAttribute("virtual-indexed-list-view-collection-name");
                    clone[0].removeAttribute("virtual-indexed-list-view-item-name");
                    clone[0].removeAttribute("virtual-indexed-list-view-item-height");
                    clone[0].removeAttribute("virtual-indexed-list-view-items");
                }
            };
        }
        VirtualIndexedListView.createInstance = function (getHtml, virtualIndexedListViewRenderer) {
            return new VirtualIndexedListView(getHtml, virtualIndexedListViewRenderer);
        };
        return VirtualIndexedListView;
    })();
    VirtualIndexedListView_1.VirtualIndexedListView = VirtualIndexedListView;
    angular.module("virtualIndexedListView").directive("virtualIndexedListView", ["virtualIndexedListView.getHtml", "virtualIndexedListViewRenderer", VirtualIndexedListView.createInstance]);
})(VirtualIndexedListView || (VirtualIndexedListView = {}));

//# sourceMappingURL=../directives/virtualIndexedListView.js.map
var VirtualIndexedListView;
(function (VirtualIndexedListView) {
    "use strict";
    (function (ScrollingDirection) {
        ScrollingDirection[ScrollingDirection["Up"] = 0] = "Up";
        ScrollingDirection[ScrollingDirection["Down"] = 1] = "Down";
        ScrollingDirection[ScrollingDirection["None"] = 2] = "None";
    })(VirtualIndexedListView.ScrollingDirection || (VirtualIndexedListView.ScrollingDirection = {}));
    var ScrollingDirection = VirtualIndexedListView.ScrollingDirection;
})(VirtualIndexedListView || (VirtualIndexedListView = {}));

//# sourceMappingURL=../enums/scrollingDirection.js.map
/// <reference path="../../typings/typescriptapp.d.ts" />
var VirtualIndexedListView;
(function (VirtualIndexedListView) {
    "use strict";
    var getHtml = function (who, deep) {
        if (!who || !who.tagName)
            return '';
        var txt, ax, el = document.createElement("div");
        el.appendChild(who.cloneNode(false));
        txt = el.innerHTML;
        if (deep) {
            ax = txt.indexOf('>') + 1;
            txt = txt.substring(0, ax) + who.innerHTML + txt.substring(ax);
        }
        el = null;
        return txt;
    };
    angular.module("virtualIndexedListView").value("virtualIndexedListView.getHtml", getHtml);
})(VirtualIndexedListView || (VirtualIndexedListView = {}));

//# sourceMappingURL=../functions/getHtml.js.map
/// <reference path="../../typings/typescriptapp.d.ts" />
var VirtualIndexedListView;
(function (VirtualIndexedListView) {
    VirtualIndexedListView.getY = function (element) {
        var transform = angular.element(element).css("transform");
        if (transform === "none") {
            return 0;
        }
        return JSON.parse(transform.replace(/^\w+\(/, "[").replace(/\)$/, "]"))[5];
    };
    angular.module("virtualIndexedListView").value("virtualIndexedListView.getY", VirtualIndexedListView.getY);
})(VirtualIndexedListView || (VirtualIndexedListView = {}));

//# sourceMappingURL=../functions/getY.js.map
/// <reference path="../../typings/typescriptapp.d.ts" />
var VirtualIndexedListView;
(function (VirtualIndexedListView) {
    VirtualIndexedListView.transformY = function (element, y) {
        angular.element(element).css({
            "-moz-transform": "translateY(" + y + "px)",
            "-webkit-transform": "translateY(" + y + "px)",
            "-ms-transform": "translateY(" + y + "px)",
            "-transform": "translateY(" + y + "px)"
        });
        return element;
    };
    angular.module("virtualIndexedListView").value("virtualIndexedListView.transformY", VirtualIndexedListView.transformY);
})(VirtualIndexedListView || (VirtualIndexedListView = {}));

//# sourceMappingURL=../functions/transformY.js.map
/// <reference path="../../typings/typescriptapp.d.ts" />
var VirtualIndexedListView;
(function (VirtualIndexedListView) {
    var ViewPort = (function () {
        function ViewPort($window) {
            var _this = this;
            this.$window = $window;
            this.createInstance = function (options) {
                var instance = new ViewPort(_this.$window);
                instance.scrollableParentElement = instance.getScrollableParent(options.element[0]);
                return instance;
            };
            this.getScrollableParent = function (hTMLElement) {
                if (hTMLElement.tagName == "HTML")
                    return null;
                var scrollYCssValue = angular.element(hTMLElement).css("overflowY");
                if (scrollYCssValue == "scroll" || scrollYCssValue == "auto")
                    return angular.element(hTMLElement);
                if (hTMLElement.parentNode)
                    return _this.getScrollableParent(hTMLElement.parentNode);
            };
        }
        Object.defineProperty(ViewPort.prototype, "scrollY", {
            get: function () {
                if (this.scrollableParentElement)
                    return this.scrollableParentElement[0].scrollTop;
                return this.$window.pageYOffset;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ViewPort.prototype, "height", {
            get: function () {
                if (this.scrollableParentElement)
                    return this.scrollableParentElement[0].offsetHeight;
                return this.$window.innerHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ViewPort.prototype, "bottom", {
            get: function () {
                return this.scrollY + this.height;
            },
            enumerable: true,
            configurable: true
        });
        return ViewPort;
    })();
    angular.module("virtualIndexedListView").service("virtualIndexedListView.viewPort", ["$window", ViewPort]);
})(VirtualIndexedListView || (VirtualIndexedListView = {}));

//# sourceMappingURL=../services/viewPort.js.map
/// <reference path="../../typings/typescriptapp.d.ts" />
var VirtualIndexedListView;
(function (VirtualIndexedListView) {
    "use strict";
    var VirtualIndexedListViewRenderer = (function () {
        function VirtualIndexedListViewRenderer($compile, $injector, $interval, $timeout, getY, observeOnScope, transformY) {
            var _this = this;
            this.$compile = $compile;
            this.$injector = $injector;
            this.$interval = $interval;
            this.$timeout = $timeout;
            this.getY = getY;
            this.observeOnScope = observeOnScope;
            this.transformY = transformY;
            this.createInstance = function (options) {
                var instance = new VirtualIndexedListViewRenderer(_this.$compile, _this.$injector, _this.$interval, _this.$timeout, _this.getY, _this.observeOnScope, _this.transformY);
                instance.items = options.items;
                instance.itemName = options.itemName;
                instance.scope = options.scope;
                instance.element = options.element;
                instance.template = options.template;
                instance.itemHeight = Number(options.itemHeight);
                instance.viewPort = _this.$injector.get("virtualIndexedListView.viewPort").createInstance({ element: instance.element });
                if (instance.numberOfRenderedItems > instance.items.length)
                    instance.numberOfRenderedItems = instance.items.length;
                instance.$interval(function () {
                    instance.render({
                        scrollY: instance.viewPort.scrollY,
                        lastScrollY: instance.lastYScroll,
                        viewPortHeight: instance.viewPort.height
                    });
                    instance.lastYScroll = instance.viewPort.scrollY;
                }, 10, null, false);
                var timeoutPromise = null;
                instance.observeOnScope(instance.scope, 'vm.filterTerm')
                    .map(function (data) {
                    return data;
                })
                    .subscribe(function (change) {
                    instance.filterTerm.observedChange = change;
                    instance.filterTerm.newValue = change.newValue;
                    instance.filterTerm.oldValue = change.oldValue;
                    instance.filterFn = function (value) {
                        return value.name.indexOf(instance.filterTerm.newValue) > -1;
                    };
                    if (timeoutPromise)
                        instance.$timeout.cancel(timeoutPromise);
                    timeoutPromise = instance.$timeout(function () {
                        instance.render({ force: true, lastScrollY: 0, scrollY: 0, viewPortHeight: instance.viewPort.height });
                    }, 10, false);
                });
                instance.filterFn = instance.scope.filterFn;
                return instance;
            };
            this._filterTerm = {};
            this.render = function (options) {
                if (!options) {
                    options = {
                        lastScrollY: 0,
                        scrollY: 0,
                        viewPortHeight: _this.viewPort.height
                    };
                }
                var containerElement;
                if (options.force) {
                    var container = _this.containerElement[0];
                    for (var i = 0; i < container.children.length; i++) {
                        var oldScope = angular.element(container.children[i]).scope();
                        oldScope.$destroy();
                    }
                    container.innerHTML = "";
                    angular.element(container).css("height", _this.containerHeight);
                    for (var i = 0; i < _this.numberOfRenderedItems; i++) {
                        var childScope = _this.scope.$new(true);
                        childScope[_this.itemName] = _this.items[i];
                        childScope.$$index = i;
                        var itemContent = _this.$compile(angular.element(_this.template))(childScope);
                        angular.element(container).append(itemContent);
                    }
                    try {
                        _this.scope.$digest();
                    }
                    catch (error) {
                    }
                    _this.hasRendered = true;
                }
                if (_this.hasRendered === false) {
                    containerElement = angular.element("<div class='container'></div>");
                    containerElement.css("height", _this.containerHeight);
                    _this.element.append(containerElement);
                    for (var i = 0; i < _this.numberOfRenderedItems; i++) {
                        var childScope = _this.scope.$new(true);
                        childScope[_this.itemName] = _this.items[i];
                        childScope.$$index = i;
                        var itemContent = _this.$compile(angular.element(_this.template))(childScope);
                        containerElement.append(itemContent);
                    }
                    var cachedItemsList = _this.computeCacheItemsList();
                    try {
                        _this.scope.$digest();
                    }
                    catch (error) {
                    }
                }
                if (_this.getScrollDirections(options.scrollY, options.lastScrollY) === VirtualIndexedListView.ScrollingDirection.Down) {
                    var reachedBottom = false;
                    var allNodesHaveBeenMoved = false;
                    var item = null;
                    var index = null;
                    do {
                        var cachedItemsList = _this.computeCacheItemsList();
                        if (cachedItemsList[_this.cacheItemsItemList.length - 1].bottom >= _this.containerBottom) {
                            reachedBottom = true;
                        }
                        else {
                            index = _this.cacheItemsItemList[_this.cacheItemsItemList.length - 1].index + 1;
                            item = _this.items[index];
                        }
                        if (cachedItemsList[0].bottom >= options.scrollY)
                            allNodesHaveBeenMoved = true;
                        if (!reachedBottom && !allNodesHaveBeenMoved) {
                            _this.transformY(_this.cacheItemsItemList[0].node, (_this.numberOfRenderedItems * _this.itemHeight) + _this.getY(_this.cacheItemsItemList[0].node));
                            var scope = angular.element(_this.cacheItemsItemList[0].node).scope();
                            scope[_this.itemName] = item;
                            scope.$$index = index;
                            scope.$digest();
                        }
                    } while (!reachedBottom && !allNodesHaveBeenMoved);
                }
                if (_this.getScrollDirections(options.scrollY, options.lastScrollY) === VirtualIndexedListView.ScrollingDirection.Up) {
                    var reachedTop = false;
                    var allNodesHaveBeenMoved = false;
                    var item = null;
                    var index = null;
                    do {
                        var cachedItemsList = _this.computeCacheItemsList({ desc: true });
                        if (_this.cacheItemsItemList[_this.cacheItemsItemList.length - 1].top <= 0) {
                            reachedTop = true;
                        }
                        else {
                            index = _this.cacheItemsItemList[_this.cacheItemsItemList.length - 1].index - 1;
                            item = _this.items[index];
                        }
                        if (cachedItemsList[0].top <= options.scrollY + options.viewPortHeight)
                            allNodesHaveBeenMoved = true;
                        if (!reachedTop && !allNodesHaveBeenMoved) {
                            _this.transformY(_this.cacheItemsItemList[0].node, _this.getY(_this.cacheItemsItemList[0].node) - (_this.numberOfRenderedItems * _this.itemHeight));
                            var scope = angular.element(_this.cacheItemsItemList[0].node).scope();
                            scope[_this.itemName] = item;
                            scope.$$index = index;
                            scope.$digest();
                        }
                    } while (!reachedTop && !allNodesHaveBeenMoved);
                }
                if (_this.hasRendered && _this.getScrollDirections(options.scrollY, options.lastScrollY) === VirtualIndexedListView.ScrollingDirection.None) {
                    var cachedItemsList = _this.computeCacheItemsList();
                    var top = cachedItemsList[0].top;
                    var bottom = cachedItemsList[cachedItemsList.length - 1].bottom;
                    if (top > options.scrollY) {
                        console.log("missing items on top");
                    }
                    if (bottom <= options.scrollY + options.viewPortHeight) {
                        console.log("missing items on bottom");
                        var reachedBottom = false;
                        var allNodesHaveBeenMoved = false;
                        var item = null;
                        var index = null;
                        do {
                            var cachedItemsList = _this.computeCacheItemsList();
                            if (_this.cacheItemsItemList[_this.cacheItemsItemList.length - 1].bottom >= (_this.items.length * _this.itemHeight)) {
                                reachedBottom = true;
                            }
                            else {
                                index = _this.cacheItemsItemList[_this.cacheItemsItemList.length - 1].index + 1;
                                item = _this.items[index];
                            }
                            if (cachedItemsList[0].bottom >= options.scrollY)
                                allNodesHaveBeenMoved = true;
                            if (!reachedBottom && !allNodesHaveBeenMoved) {
                                _this.transformY(_this.cacheItemsItemList[0].node, (_this.numberOfRenderedItems * _this.itemHeight) + _this.getY(_this.cacheItemsItemList[0].node));
                                var scope = angular.element(_this.cacheItemsItemList[0].node).scope();
                                scope[_this.itemName] = item;
                                scope.$$index = index;
                                scope.$digest();
                            }
                        } while (!reachedBottom && !allNodesHaveBeenMoved);
                    }
                }
                _this.hasRendered = true;
            };
            this.computeCacheItemsList = function (options) {
                _this.cacheItemsItemList = [];
                for (var i = 0; i < _this.renderedNodes.length; i++) {
                    var y = _this.getY(_this.renderedNodes[i]);
                    var offsetTop = _this.renderedNodes[i].offsetTop;
                    var itemHeight = _this.itemHeight;
                    _this.cacheItemsItemList.push({
                        top: y + offsetTop,
                        bottom: y + offsetTop + itemHeight,
                        index: angular.element(_this.renderedNodes[i]).scope().$$index,
                        node: _this.renderedNodes[i]
                    });
                }
                if (options && options.desc) {
                    _this.cacheItemsItemList.sort(function (a, b) {
                        return b.top - a.top;
                    });
                }
                else {
                    _this.cacheItemsItemList.sort(function (a, b) {
                        return a.top - b.top;
                    });
                }
                return _this.cacheItemsItemList;
            };
            this.cacheItemsItemList = [];
            this.getScrollDirections = function (scrollY, lastScrollY) {
                if (lastScrollY && scrollY > lastScrollY) {
                    return VirtualIndexedListView.ScrollingDirection.Down;
                }
                if (lastScrollY && scrollY < lastScrollY) {
                    return VirtualIndexedListView.ScrollingDirection.Up;
                }
                if (lastScrollY && scrollY === lastScrollY) {
                    return VirtualIndexedListView.ScrollingDirection.None;
                }
                return null;
            };
            this.hasRendered = false;
            this.lastYScroll = 0;
        }
        Object.defineProperty(VirtualIndexedListViewRenderer.prototype, "filterTerm", {
            get: function () {
                return this._filterTerm;
            },
            set: function (value) {
                this._filterTerm = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VirtualIndexedListViewRenderer.prototype, "containerHeight", {
            get: function () {
                return this.items.length * this.itemHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VirtualIndexedListViewRenderer.prototype, "items", {
            get: function () {
                if (this.filterFn && this.filterTerm.newValue)
                    return this._items.filter(this.filterFn);
                return this._items;
            },
            set: function (value) {
                this._items = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VirtualIndexedListViewRenderer.prototype, "numberOfRenderedItems", {
            get: function () {
                if (!this._numberOfRenderedItems)
                    return Math.ceil(1380 / Number(this.itemHeight));
                return this._numberOfRenderedItems;
            },
            set: function (value) {
                this._numberOfRenderedItems = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VirtualIndexedListViewRenderer.prototype, "containerElement", {
            get: function () {
                if (!this._containerElement)
                    return this.element.find(".container");
                return this._containerElement;
            },
            set: function (value) {
                this._containerElement = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VirtualIndexedListViewRenderer.prototype, "containerBottom", {
            get: function () {
                return this.containerElement[0].offsetHeight + this.containerElement[0].offsetTop;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VirtualIndexedListViewRenderer.prototype, "containerTop", {
            get: function () {
                return this.containerElement[0].offsetTop;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VirtualIndexedListViewRenderer.prototype, "renderedNodes", {
            get: function () {
                return this.containerElement[0].children;
            },
            enumerable: true,
            configurable: true
        });
        return VirtualIndexedListViewRenderer;
    })();
    angular.module("virtualIndexedListView").service("virtualIndexedListViewRenderer", ["$compile", "$injector", "$interval", "$timeout", "virtualIndexedListView.getY", "observeOnScope", "virtualIndexedListView.transformY", VirtualIndexedListViewRenderer]);
})(VirtualIndexedListView || (VirtualIndexedListView = {}));

//# sourceMappingURL=../services/virtualIndexedListViewRenderer.js.map
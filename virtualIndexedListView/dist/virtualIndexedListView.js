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
                            itemHeight: attributes["virtualIndexedListViewItemHeight"],
                            name: attributes["virtualIndexedListViewName"],
                            dataService: attributes["virtualIndexedListViewDataService"]
                        }).render();
                    });
                };
                function removeVirtualListCustomAttributes(clone) {
                    clone[0].removeAttribute("virtual-indexed-list-view");
                    clone[0].removeAttribute("virtual-indexed-list-view-collection-name");
                    clone[0].removeAttribute("virtual-indexed-list-view-item-name");
                    clone[0].removeAttribute("virtual-indexed-list-view-item-height");
                    clone[0].removeAttribute("virtual-indexed-list-view-items");
                    clone[0].removeAttribute("virtual-indexed-list-view-name");
                    clone[0].removeAttribute("virtual-indexed-list-view-data-service");
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
    (function (collectionType) {
        collectionType[collectionType["collection"] = 0] = "collection";
        collectionType[collectionType["scope"] = 1] = "scope";
        collectionType[collectionType["filterable"] = 2] = "filterable";
        collectionType[collectionType["lazyLoad"] = 3] = "lazyLoad";
    })(VirtualIndexedListView.collectionType || (VirtualIndexedListView.collectionType = {}));
    var collectionType = VirtualIndexedListView.collectionType;
})(VirtualIndexedListView || (VirtualIndexedListView = {}));

//# sourceMappingURL=../enums/collectionType.js.map
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
    "use strict";
    var getRenderedNodesComputedInfo = function (options) {
        var computedInfo = [];
        for (var i = 0; i < options.renderedNodes.length; i++) {
            var y = options.getY(options.renderedNodes[i]);
            var offsetTop = options.renderedNodes[i].offsetTop;
            var itemHeight = options.itemHeight;
            computedInfo.push({
                top: y + offsetTop,
                bottom: y + offsetTop + itemHeight,
                index: angular.element(options.renderedNodes[i]).scope().$$index,
                node: options.renderedNodes[i]
            });
        }
        if (options.desc) {
            computedInfo.sort(function (a, b) {
                return b.top - a.top;
            });
        }
        else {
            computedInfo.sort(function (a, b) {
                return a.top - b.top;
            });
        }
        return computedInfo;
    };
    angular.module("virtualIndexedListView").value("virtualIndexedListView.getRenderedNodesComputedInfo", getRenderedNodesComputedInfo);
})(VirtualIndexedListView || (VirtualIndexedListView = {}));

//# sourceMappingURL=../functions/getRenderedNodesComputedInfo.js.map
/// <reference path="../../typings/typescriptapp.d.ts" />
var VirtualIndexedListView;
(function (VirtualIndexedListView) {
    "use strict";
    var getScrollDirection = function (scrollY, lastScrollY) {
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
    angular.module("virtualIndexedListView").value("virtualIndexedListView.getScrollDirection", getScrollDirection);
})(VirtualIndexedListView || (VirtualIndexedListView = {}));

//# sourceMappingURL=../functions/getScrollDirection.js.map
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
    var CollectionManager = (function () {
        function CollectionManager($q) {
            var _this = this;
            this.$q = $q;
            this.createInstance = function (options) {
                var instance = new CollectionManager(_this.$q);
                instance.items = options.items;
                instance.numberOfItems = options.items.length;
                return instance;
            };
            this.getIndexByCriteriaAsync = function (options) {
                var deferred = _this.$q.defer();
                var index = null;
                for (var i = 0; i < _this.items.length; i++) {
                    if (_this.items[i][options.criteria.key] == options.criteria.value) {
                        index = i;
                    }
                }
                deferred.resolve({ index: index });
                return deferred.promise;
            };
            this.subscriptions = [];
            this.subscribe = function (options) {
                _this.subscriptions.push({
                    callback: options.callback,
                    id: _this.subscriptions.length + 1,
                    isActive: true
                });
                return _this.subscriptions.length;
            };
        }
        Object.defineProperty(CollectionManager.prototype, "numberOfItems", {
            get: function () {
                return this._numberOfItems;
            },
            set: function (value) {
                this._numberOfItems = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CollectionManager.prototype, "items", {
            get: function () {
                return this._items;
            },
            set: function (value) {
                this._items = value;
            },
            enumerable: true,
            configurable: true
        });
        return CollectionManager;
    })();
    angular.module("virtualIndexedListView").service("virtualIndexedListView.collectionManager", ["$q", CollectionManager]);
})(VirtualIndexedListView || (VirtualIndexedListView = {}));

//# sourceMappingURL=../services/collectionManager.js.map
/// <reference path="../../typings/typescriptapp.d.ts" />
var VirtualIndexedListView;
(function (VirtualIndexedListView) {
    var Container = (function () {
        function Container() {
            var _this = this;
            this.createInstance = function (options) {
                var instance = new Container();
                var container = angular.element("<div class='container'></div>");
                options.element.append(container);
                instance.augmentedJQuery = options.element.find(".container");
                return instance;
            };
            this.reInitialize = function (options) {
                for (var i = 0; i < _this.htmlElement.children.length; i++) {
                    var oldScope = angular.element(_this.htmlElement.children[i]).scope();
                    oldScope.$destroy();
                }
                _this.htmlElement.innerHTML = "";
                _this.setHeight(options.height);
            };
            this.setHeight = function (value) {
                _this.augmentedJQuery.css("height", value);
            };
        }
        Object.defineProperty(Container.prototype, "height", {
            get: function () {
                return this.htmlElement.offsetHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container.prototype, "bottom", {
            get: function () {
                return this.htmlElement.offsetHeight + this.htmlElement.offsetTop;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container.prototype, "top", {
            get: function () {
                return this.htmlElement.offsetTop;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container.prototype, "augmentedJQuery", {
            get: function () {
                return this._augmentedJQuery;
            },
            set: function (value) {
                this._augmentedJQuery = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container.prototype, "htmlElement", {
            get: function () {
                return this.augmentedJQuery[0];
            },
            enumerable: true,
            configurable: true
        });
        return Container;
    })();
    angular.module("virtualIndexedListView").service("virtualIndexedListView.container", [Container]);
})(VirtualIndexedListView || (VirtualIndexedListView = {}));

//# sourceMappingURL=../services/container.js.map
/// <reference path="../../typings/typescriptapp.d.ts" />
var VirtualIndexedListView;
(function (VirtualIndexedListView) {
    var FilterableCollectionManager = (function () {
        function FilterableCollectionManager($q, $timeout, observeOnScope) {
            var _this = this;
            this.$q = $q;
            this.$timeout = $timeout;
            this.observeOnScope = observeOnScope;
            this.createInstance = function (options) {
                var instance = new FilterableCollectionManager(_this.$q, _this.$timeout, _this.observeOnScope);
                instance.items = options.items;
                instance.numberOfItems = options.items.length;
                var timeoutPromise = null;
                instance.observeOnScope(options.scope, options.searchTermNameOnScope)
                    .map(function (data) {
                    return data;
                })
                    .subscribe(function (change) {
                    if (change.oldValue != change.newValue) {
                        options.filterFn = function (value) {
                            return value.name.indexOf(change.newValue) > -1;
                        };
                        if (timeoutPromise)
                            instance.$timeout.cancel(timeoutPromise);
                        timeoutPromise = instance.$timeout(function () {
                            for (var i = 0; i < instance.subscriptions.length; i++) {
                                instance.subscriptions[i].callback();
                            }
                        }, 10, false);
                    }
                });
                return instance;
            };
            this.getIndexByCriteriaAsync = function (options) {
                var deferred = _this.$q.defer();
                deferred.resolve(true);
                return deferred.promise;
            };
            this.subscriptions = [];
            this.subscribe = function (options) {
                _this.subscriptions.push({
                    callback: options.callback,
                    id: _this.subscriptions.length + 1,
                    isActive: true
                });
                return _this.subscriptions.length;
            };
        }
        Object.defineProperty(FilterableCollectionManager.prototype, "numberOfItems", {
            get: function () {
                return this._numberOfItems;
            },
            set: function (value) {
                this._numberOfItems = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FilterableCollectionManager.prototype, "items", {
            get: function () {
                return this._items;
            },
            set: function (value) {
                this._items = value;
            },
            enumerable: true,
            configurable: true
        });
        return FilterableCollectionManager;
    })();
    angular.module("virtualIndexedListView").service("virtualIndexedListView.filterableCollectionManager", ["$q", "$timeout", "observeOnScope", FilterableCollectionManager]);
})(VirtualIndexedListView || (VirtualIndexedListView = {}));

//# sourceMappingURL=../services/filterableCollectionManager.js.map
/// <reference path="../../typings/typescriptapp.d.ts" />
var VirtualIndexedListView;
(function (VirtualIndexedListView) {
    var LazyLoadCollectionManager = (function () {
        function LazyLoadCollectionManager($injector, $q) {
            var _this = this;
            this.$injector = $injector;
            this.$q = $q;
            this.createInstance = function (options) {
                var instance = new LazyLoadCollectionManager(_this.$injector, _this.$q);
                instance.items = options.items;
                instance.numberOfItems = options.items.length;
                instance.dataService = instance.$injector.get(options.dataService);
                instance.dataService.search({}).then(function (results) {
                    instance.numberOfItems = results.data.TotalHits;
                    for (var i = 0; i < results.data.TotalHits; i++) {
                        instance.items.push(null);
                    }
                    for (var i = 0; i < results.data.Data.length; i++) {
                        instance.items[i] = results.data.Data[i].Item;
                    }
                    for (var i = 0; i < instance.subscriptions.length; i++) {
                        instance.subscriptions[i].callback();
                    }
                });
                return instance;
            };
            this.getIndexByCriteriaAsync = function (options) {
                var deferred = _this.$q.defer();
                var index = null;
                for (var i = 0; i < _this.items.length; i++) {
                    if (_this.items[i][options.criteria.key] == options.criteria.value) {
                        index = i;
                    }
                }
                deferred.resolve({ index: index });
                return deferred.promise;
            };
            this.loadMore = function () {
                var lastLoadIndex = _this.lastLoadedIndex;
                if (!_this.loaded) {
                    _this.dataService.search({ params: { offset: lastLoadIndex, pageSize: _this.pageSize } }).then(function (results) {
                        for (var i = 0; i < results.data.Data.length; i++) {
                            _this.items[i + lastLoadIndex] = results.data.Data[i].Item;
                        }
                    });
                }
            };
            this.subscriptions = [];
            this.subscribe = function (options) {
                _this.subscriptions.push({
                    callback: options.callback,
                    id: _this.subscriptions.length + 1,
                    isActive: true
                });
                return _this.subscriptions.length;
            };
        }
        Object.defineProperty(LazyLoadCollectionManager.prototype, "loaded", {
            get: function () {
                var loaded = true;
                for (var i = 0; i < this.items.length; i++) {
                    if (this.items[i] === null) {
                        loaded = false;
                        i = this.items.length;
                    }
                }
                return loaded;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LazyLoadCollectionManager.prototype, "lastLoadedIndex", {
            get: function () {
                var index = null;
                for (var i = 0; i < this.items.length; i++) {
                    if (this.items[i] === null && index === null) {
                        index = i;
                        i = this.items.length;
                    }
                }
                return index;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LazyLoadCollectionManager.prototype, "pageSize", {
            get: function () {
                return 128;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LazyLoadCollectionManager.prototype, "numberOfItems", {
            get: function () {
                return this._numberOfItems;
            },
            set: function (value) {
                this._numberOfItems = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LazyLoadCollectionManager.prototype, "items", {
            get: function () {
                return this._items;
            },
            set: function (value) {
                this._items = value;
            },
            enumerable: true,
            configurable: true
        });
        return LazyLoadCollectionManager;
    })();
    angular.module("virtualIndexedListView").service("virtualIndexedListView.lazyLoadCollectionManager", ["$injector", "$q", LazyLoadCollectionManager]);
})(VirtualIndexedListView || (VirtualIndexedListView = {}));

//# sourceMappingURL=../services/lazyLoadCollectionManager.js.map


//# sourceMappingURL=../services/scopeCollectionManager.js.map
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
            this.scrollTo = function (value) {
                if (_this.scrollableParentElement) {
                    _this.scrollableParentElement[0].scrollTop = value;
                }
                else {
                    _this.$window.scrollTo(0, value);
                }
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
        function VirtualIndexedListViewRenderer($compile, $injector, $interval, getRenderedNodesComputedInfo, getScrollDirection, getY, observeOnScope, transformY) {
            var _this = this;
            this.$compile = $compile;
            this.$injector = $injector;
            this.$interval = $interval;
            this.getRenderedNodesComputedInfo = getRenderedNodesComputedInfo;
            this.getScrollDirection = getScrollDirection;
            this.getY = getY;
            this.observeOnScope = observeOnScope;
            this.transformY = transformY;
            this.createInstance = function (options) {
                var instance = new VirtualIndexedListViewRenderer(_this.$compile, _this.$injector, _this.$interval, _this.getRenderedNodesComputedInfo, _this.getScrollDirection, _this.getY, _this.observeOnScope, _this.transformY);
                instance.itemName = options.itemName;
                instance.scope = options.scope;
                instance.element = options.element;
                instance.template = options.template;
                instance.itemHeight = Number(options.itemHeight);
                instance.viewPort = _this.$injector.get("virtualIndexedListView.viewPort").createInstance({ element: instance.element });
                instance.container = _this.$injector.get("virtualIndexedListView.container").createInstance({ element: instance.element });
                instance.name = options.name;
                if (options.filterFn && options.searchTermNameOnScope) {
                    instance.collectionManager = _this.$injector.get("virtualIndexedListView.filterableCollectionManager").createInstance({ items: options.items });
                }
                else if (options.dataService) {
                    instance.collectionManager = _this.$injector.get("virtualIndexedListView.lazyLoadCollectionManager").createInstance({ items: options.items, dataService: options.dataService });
                    instance.$interval(function () {
                        instance.collectionManager.loadMore();
                    }, 1000, null, false);
                }
                else {
                    instance.collectionManager = _this.$injector.get("virtualIndexedListView.collectionManager").createInstance({ items: options.items });
                }
                instance.scope.$on(instance.scrollEventName, function (event, criteria) {
                    instance.collectionManager.getIndexByCriteriaAsync({ criteria: criteria }).then(function (result) {
                        instance.viewPort.scrollTo(result.index * instance.itemHeight);
                    });
                });
                instance.collectionManager.subscribe({
                    callback: function () {
                        instance.forceRender({
                            viewPortHeight: instance.viewPort.height
                        });
                    }
                });
                instance.container.setHeight(instance.collectionManager.numberOfItems * instance.itemHeight);
                instance.$interval(function () {
                    instance.render({
                        scrollY: instance.viewPort.scrollY,
                        lastScrollY: instance.lastYScroll,
                        viewPortHeight: instance.viewPort.height
                    });
                    instance.lastYScroll = instance.viewPort.scrollY;
                }, 10, null, false);
                return instance;
            };
            this.render = function (options) {
                if (!options) {
                    options = {
                        lastScrollY: 0,
                        scrollY: 0,
                        viewPortHeight: _this.viewPort.height
                    };
                }
                if (options.force) {
                    _this.forceRender(options);
                    return;
                }
                if (_this.hasRendered === false) {
                    _this.initialRender(options);
                }
                if (_this.getScrollDirection(options.scrollY, options.lastScrollY) === VirtualIndexedListView.ScrollingDirection.Down) {
                    _this.renderDown(options);
                    return;
                }
                if (_this.getScrollDirection(options.scrollY, options.lastScrollY) === VirtualIndexedListView.ScrollingDirection.Up) {
                    _this.renderUp(options);
                    return;
                }
                if (_this.getScrollDirection(options.scrollY, options.lastScrollY) === VirtualIndexedListView.ScrollingDirection.None) {
                    _this.stabilizeRender(options);
                    return;
                }
            };
            this.forceRender = function (options) {
                if (!_this.hasRendered)
                    return;
                _this.container.reInitialize({ height: _this.collectionManager.numberOfItems * _this.itemHeight });
                _this.initialRender(options);
                if (!_this.scope.$$phase && !_this.scope.$root.$$phase)
                    _this.scope.$digest();
            };
            this.initialRender = function (options) {
                for (var i = 0; i < _this.numberOfRenderedItems; i++) {
                    var childScope = _this.scope.$new(true);
                    childScope[_this.itemName] = _this.collectionManager.items[i];
                    childScope.$$index = i;
                    var itemContent = _this.$compile(angular.element(_this.template))(childScope);
                    _this.container.augmentedJQuery.append(itemContent);
                }
                _this.hasRendered = true;
            };
            this.renderDown = function (options) {
                var reachedBottom = false;
                var allNodesHaveBeenMoved = false;
                var item = null;
                var index = null;
                do {
                    var cachedItemsList = _this.getRenderedNodesComputedInfo({ getY: _this.getY, renderedNodes: _this.container.htmlElement.children, itemHeight: _this.itemHeight, desc: false });
                    if (cachedItemsList[cachedItemsList.length - 1].bottom >= _this.container.bottom) {
                        reachedBottom = true;
                    }
                    else {
                        index = cachedItemsList[cachedItemsList.length - 1].index + 1;
                        item = _this.collectionManager.items[index];
                    }
                    if (cachedItemsList[0].bottom >= options.scrollY)
                        allNodesHaveBeenMoved = true;
                    if (!reachedBottom && !allNodesHaveBeenMoved) {
                        _this.transformY(cachedItemsList[0].node, (_this.numberOfRenderedItems * _this.itemHeight) + _this.getY(cachedItemsList[0].node));
                        var scope = angular.element(cachedItemsList[0].node).scope();
                        scope[_this.itemName] = item;
                        scope.$$index = index;
                        scope.$digest();
                    }
                } while (!reachedBottom && !allNodesHaveBeenMoved);
            };
            this.renderUp = function (options) {
                var reachedTop = false;
                var allNodesHaveBeenMoved = false;
                var item = null;
                var index = null;
                do {
                    var cachedItemsList = _this.getRenderedNodesComputedInfo({ getY: _this.getY, renderedNodes: _this.container.htmlElement.children, itemHeight: _this.itemHeight, desc: true });
                    if (cachedItemsList[cachedItemsList.length - 1].top <= 0) {
                        reachedTop = true;
                    }
                    else {
                        index = cachedItemsList[cachedItemsList.length - 1].index - 1;
                        item = _this.collectionManager.items[index];
                    }
                    if (cachedItemsList[0].top <= options.scrollY + options.viewPortHeight)
                        allNodesHaveBeenMoved = true;
                    if (!reachedTop && !allNodesHaveBeenMoved) {
                        _this.transformY(cachedItemsList[0].node, _this.getY(cachedItemsList[0].node) - (_this.numberOfRenderedItems * _this.itemHeight));
                        var scope = angular.element(cachedItemsList[0].node).scope();
                        scope[_this.itemName] = item;
                        scope.$$index = index;
                        scope.$digest();
                    }
                } while (!reachedTop && !allNodesHaveBeenMoved);
            };
            this.stabilizeRender = function (options) {
                var cachedItemsList = _this.getRenderedNodesComputedInfo({ getY: _this.getY, renderedNodes: _this.container.htmlElement.children, itemHeight: _this.itemHeight, desc: false });
                var top = cachedItemsList[0].top;
                var bottom = cachedItemsList[cachedItemsList.length - 1].bottom;
                if (top > options.scrollY) {
                    _this.renderUp(options);
                }
                if (bottom <= options.scrollY + options.viewPortHeight) {
                    _this.renderDown(options);
                }
            };
            this.hasRendered = false;
            this.lastYScroll = 0;
        }
        Object.defineProperty(VirtualIndexedListViewRenderer.prototype, "scrollEventName", {
            get: function () {
                return "virtualIndexedListViewScroll" + this.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VirtualIndexedListViewRenderer.prototype, "numberOfRenderedItems", {
            get: function () {
                var max = Math.ceil(1380 / Number(this.itemHeight));
                if (this.collectionManager.numberOfItems < max)
                    return this.collectionManager.numberOfItems;
                return max;
            },
            enumerable: true,
            configurable: true
        });
        return VirtualIndexedListViewRenderer;
    })();
    angular.module("virtualIndexedListView").service("virtualIndexedListViewRenderer", ["$compile",
        "$injector",
        "$interval",
        "virtualIndexedListView.getRenderedNodesComputedInfo",
        "virtualIndexedListView.getScrollDirection",
        "virtualIndexedListView.getY",
        "observeOnScope",
        "virtualIndexedListView.transformY", VirtualIndexedListViewRenderer]);
})(VirtualIndexedListView || (VirtualIndexedListView = {}));

//# sourceMappingURL=../services/virtualIndexedListViewRenderer.js.map
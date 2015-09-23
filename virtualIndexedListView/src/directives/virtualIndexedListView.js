/// <reference path="../../typings/typescriptapp.d.ts" />
var VirtualIndexedListView;
(function (_VirtualIndexedListView) {
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
    _VirtualIndexedListView.VirtualIndexedListView = VirtualIndexedListView;
    angular.module("virtualIndexedListView").directive("virtualIndexedListView", ["virtualIndexedListView.getHtml", "virtualIndexedListViewRenderer", VirtualIndexedListView.createInstance]);
})(VirtualIndexedListView || (VirtualIndexedListView = {}));
//# sourceMappingURL=virtualIndexedListView.js.map
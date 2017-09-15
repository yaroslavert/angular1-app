export const equalHeights = function($timeout){
    function link($scope, element, attrs) {
        $scope.$on('equalHeights', (data)=> {
            $timeout(function() {
                mathHeight();
            });
        });

        function mathHeight() {
            if (!$scope.mathClass) {
                throw new Error('mathClass is undefined');
                return;
            }
           
            $scope.mathClass = $scope.mathClass.indexOf('.') === 0 ? $scope.mathClass : '.' + $scope.mathClass;
            let images = element[0].getElementsByTagName('img'),
                imgCount = images.length,
                curentImg = 0;

            if (!imgCount) {
                applyMathHeight();
            } else {
                Array.from(images).forEach((img) => {
                    let newImg = new Image();
                    newImg.src = img.src;
                    newImg.onerror = loadImg;
                    newImg.onload  = loadImg;
                });
            }

            function applyMathHeight() {
                let children = element[0].querySelectorAll($scope.mathClass),
                    currentMaxHeight = 0,
                    numImagesLoaded  = 0;
                angular.forEach(children, function(child) {
                    var childHeight = child.getBoundingClientRect().height;
                    child.style.height = 'none';
                    if (childHeight > currentMaxHeight) {
                        currentMaxHeight = childHeight;
                    }
                });
                angular.forEach(children, function(child) {
                    child.style.height = `${currentMaxHeight}px`;
                });
            }
            function loadImg(){
                curentImg++;
                if (curentImg >= imgCount) {
                    applyMathHeight();
                }
            }
        }
    };
    return {
        restrict: 'AE',
        scope: {
            mathClass : '@'
        },
        link: link
    }
}
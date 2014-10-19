var app = angular.module('app', []);

app.controller('MainCtrl', ['$scope', function ($scope) {

	// 檢查是否為質數
	var isPrime = function(n){
		var maxDivisor = Math.sqrt(n);
		for (var i = 2; i <= maxDivisor; i++) {
			if(n%i === 0) return false;
		}
		return true;
	};

	// 取得因數陣列
	var getFactors = function(n){
		$scope.factors=[];
		var maxDivisor = Math.sqrt(n);
		for (var i = 1; i <= maxDivisor; i++) {
			if(n%i === 0) $scope.factors.push({a: i, b: n/i});
		}
	};

	// 取得因數陣列，去除重複值
	$scope.getUniqueFactors = function(){
		$scope.uniqueFactors = [];
		angular.forEach($scope.factors, function(obj){
			$scope.uniqueFactors.push(obj.a);
			$scope.uniqueFactors.push(obj.b);
		});
		var length = $scope.uniqueFactors.length;
		if($scope.uniqueFactors[length-1] === $scope.uniqueFactors[length-2]){
			$scope.uniqueFactors.splice(length-1,1);
		}
		$scope.uniqueFactors.sort(function(a,b){return a-b;});
	};

	// 取得質因數陣列
	$scope.getPrimes = function(){
		$scope.primes = [];
		angular.forEach($scope.uniqueFactors, function(v){
			if(v > 1 && isPrime(v)) $scope.primes.push(v);
		});
	};

	// 
	$scope.doIt = function(n){
		$scope.target = $scope.n;
		getFactors($scope.target);
		$scope.n = null;
		$scope.getUniqueFactors();
		$scope.getPrimes();
	};

}]);
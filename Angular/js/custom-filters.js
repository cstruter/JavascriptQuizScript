angular.module('myApp', []).filter('paging', function() {
	function PagedData(data, pageSize) {
		this.data = data;
		this.pageSize = pageSize;
		this.currentPage = 0;

		this.numberOfPages = function(){
			return Math.ceil(data.length / pageSize);                
		}

		this.pagedData = function() 
		{
			var currentPage = this.currentPage;
			var start = this.pageSize * currentPage;
			var end = this.pageSize * (currentPage + 1);
			return this.data.slice(start, end);			
		}
		
		this.isMinPage = function() {
			return this.currentPage == 0;
		}
		
		this.isMaxPage = function() {
			 return this.currentPage >= this.numberOfPages() - 1;
		}
		
		this.back = function () {
			if (this.isMinPage()) return;
			this.currentPage--;
		}
		
		this.next = function() {
			if (this.isMaxPage()) return;
			this.currentPage++;
		}
	}	
	return function(input, pageSize) {			
		if (typeof input.paging === 'undefined') {
			input.paging = new PagedData(input, pageSize); 
		}
		return input.paging.pagedData();
	}
});
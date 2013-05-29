ko.extenders.paging = function (target, pageSize) 
{
	target.currentPage = ko.observable(0); 

	target.numberOfPages = ko.computed(function () {
		return Math.ceil(target().length / pageSize);
	});

	target.pagedData = ko.computed(function () {
		var currentPage = target.currentPage();
		var start = pageSize * currentPage;
		var end = pageSize * (currentPage + 1);
		return target().slice(start, end);
	});

	target.isMinPage = function() {
		return target.currentPage() == 0;
	}

	target.isMaxPage = function() {
		return target.currentPage() >= target.numberOfPages() - 1;
	}
	
	target.back = function () {				
		if (target.isMinPage()) return; 				
		target.currentPage(target.currentPage() - 1);
	}
	
	target.next = function () {
		if (target.isMaxPage()) return;
		target.currentPage(target.currentPage() + 1);
	}
	
	return target;
}
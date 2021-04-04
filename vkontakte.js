function calculateAgeInYears (date) {
    var now = new Date();
    var current_year = now.getFullYear();
    var year_diff = current_year - date.getFullYear();
    var birthday_this_year = new Date(current_year, date.getMonth(), date.getDate());
    var has_had_birthday_this_year = (now >= birthday_this_year);

    return has_had_birthday_this_year
        ? year_diff
        : year_diff - 1;
}


	var proxyEvents = {
	    'onApplicationAdded': 	function() {return '';},
	    'onSettingsChanged':	function(settings) { return settings + ''; },
	    'onBalanceChanged':   	function(balance) {return balance + '';}
	};	
	
	var ua = navigator.userAgent.toLowerCase();
	var browser = {
		msie: /msie/i.test(ua),
		mozilla: /firefox/i.test(ua)
	};
	
	function VKScrollTop()
	{
	}

	var frame_h = 0;
	function initProxyEvents()
	{
	}
	
	var waitInterval;
	function StartInitVK()
	{
	
	}


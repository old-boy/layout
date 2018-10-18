(function(owner) {
	/**
	 *  Ajax 相关配置参数
	 */
	owner.ajax = {
		timeout: 10000,
		type: 'get',
		dataType: 'json',
		contentType: 'application/json; charset=utf-8'
	};
	/**
	 *  BootstrapTable 
	 */
	owner.prepareDisplayData = function(data){
		return {
			total: data.totalCount,
            fixedScroll: false,
            rows: data.rows
		}
	}
}(window.C = {});

$(function(){
	com.siderBar();
	com.searchBar();
	com.shrinkSiderBar();
//	com.openSearchBar(); //搜索面板
	com.closeSearchBar();
	com.openFilterPannel();
	com.closeFilterPannel();
	com.getDate();
	com.searchData();
	com.getTree();
	com.replaceDateTimeIcon();
	com.modalShow();
	com.common();
});

var com = {
	siderBar: function(){
		$('.sidebar .menu-list .item').on('click',function(){
			$(this).addClass('active').siblings().removeClass('active');
			$(this).parent().siblings().children().removeClass('active');
			
			var title = $(this).find('.menu-info').text();
			$('.content').find('.content-title').text(title);
		});
	},
	shrinkSiderBar: function(){
		$('.sidebar .shrink-list .shrink-item a').on('click',function(){
			$(this).children().eq(3).animate({
				'transform':'rotate(180deg)'
			},350)
			$(this).siblings('.sub-menu').slideToggle('500');
			$(this).toggleClass('active');
		});
	},
	common: function(){
		$('.btn-secondary').text('Columns').siblings('.dropdown-menu').addClass('scroll-bar');
		$('.btn-box').on('click',function(){
			$(this).addClass('btn-box-selected').siblings().removeClass('btn-box-selected');
		});
		
		//单选框事件
		$('.filter-item>input[type="radio"]').change(function(e){
			var checked = $(this).is(':checked');
			if(checked){
				$(this).prop('checked',true);
				$(this).parent().siblings().children().prop('checked',false);
				$(this).parent().addClass('filter-active').siblings().removeClass('filter-active');
				$('.filter-bottm').animate({
					opacity: '1',
					height: '50px'
				},350);
			}else{
				$('.filter-bottm').animate({
					opacity: '0',
					height: '0'
				},350);
			}
			
			if(!$(this).is(e.target) && $(this).has(e.target).length === 0){
				$('.filter-bottm').animate({
					opacity: '0',
					height: '0'
				},350);
			}
		});
		
		//复选框事件
		$('.filter-item>input[type="checkbox"]').change(function(){
			var checked = $(this).is(':checked');
			if(checked){
				$(this).prop('checked',true);
				$(this).parent().addClass('filter-active');
			}else{
				$(this).prop('checked',false);
				$(this).parent().removeClass('filter-active');
			}
		})
	},
	searchBar: function(){
		//搜索框动画
		$('.filter').find('.search-bar').on('click',function(){
			$(this).children('.search-title').css('display','none');
			$(this).animate({
				position: 'absolute',
				left: '80%'
			},300,function(){
				$(this).children('.icon-search').addClass('icon-search-bg');
			});
			setTimeout(function(){
				$('.filter-input').focus().attr('placeholder','Name, Job number');
			},350);
		})
	},
	openSearchBar: function(){
		//打开相似搜索记录面板
		$('.filter').find('.search-bar').on('click',function(){
			$('.search-pannel').stop().animate({
				height: '80%',
				opacity: '1'
			},300);
			$('.record-list').stop().animate({
				height: '80%',
				opacity: '1'
			},300).css('display','block');
		})
	},
	closeSearchBar: function(){
		$(document).on('click',function(e){
			//关闭搜索框
			if(e.target == $('.record-list')[0] || e.target == $('.form-record')[0] || e.target == $('.content-pannel')[0]){
				$('.record-list').animate({
					height: '0',
					opacity: '0'
				}).css('display','none');
				$('.search-pannel').animate({
					height: '0',
					opacity: '0'
				});
				$('.search-bar').animate({
					position: 'absolute',
    					left: '50%'
				});
				$('.icon-search').removeClass('icon-search-bg');
				$('.search-title').css('display','block');
				$('.filter-input').removeAttr('placeholder');
			}
		})
	},
	openFilterPannel: function(){
		$('.filter-btn').on('click',function(e){
			e.stopPropagation();
			$('.filter-pannel').animate({
				zIndex: '200',
				height: '100%',
				opacity: '1'
			},300).css('display','block');
			$('.filter-close').animate({
				height: '40px',
				opacity: '1'
			});
		});
	},
	closeFilterPannel: function(){
		$('.filter-close').on('click',function(e){
			e.stopPropagation();
			$(this).parents('.filter-pannel').animate({
				height: '0',
				opacity: '0'
			}).css('display','none');
			$(this).animate({
				height: '0',
				opacity: '0'
			});
		});
	},
	getDate: function(){
		$('#startDate').datetimepicker({
		    format: "dd MM yyyy",
	        autoclose: true,
	        todayBtn: true,
	        startDate: "2013-02-14",
	        minuteStep: 10,
	        minView: "month"
		});
		$('#endDate').datetimepicker({
		    format: "dd MM yyyy",
	        autoclose: true,
	        todayBtn: true,
	        startDate: "2013-02-15",
	        minuteStep: 10,
	        minView: "month"
		});
	},
	searchData: function(){
		var url = 'http://192.168.70.181/cc2018/js/data.json';
		$.ajax({
			type: 'get',
			url:url,
			dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function(data) {
            		console.log(data);
            		var displayData = com.prepareDisplayData(data);
            		if(displayData.total > 0){
					$('#table').bootstrapTable('load', displayData.rows);
				}else{
					$('#table').bootstrapTable('load', 'table is not data');
				}
            },
            error: function(data) {
                console.log('123123');
            },
		});
		
		$('#table').bootstrapTable({
		    pagination: true, //开启分页
		    search: false, //开启搜索
		    showColumns: true, //开启自定义列显示
		    showRefresh: false, //开启刷新
		    pageSize: 10, //每页显示15条
		    pageList: [10, 15],
		    minimumCountColumns: 2, //至少显示2列
		    clickToSelect: true, //点击选中
		    columns: [
		    		{checkbox: true},
		    		{
                    field: 'id',
                    title: 'name',
                    width: '50',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'title',
                    title: '工号',
                    width: '50',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'link',
                    title: '职位',
                    width: '100',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'zwmc',
                    title: '组织',
                    width: '500',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'gsmc',
                    title: '日期',
                    width: '100',
                    align: 'center',
                    valign: 'middle'
                }, {
                		field: 'zwyx',
                    title: '排班',
                    width: '50',
                    align: 'center',
                    valign: 'middle'
                }, {
                		field: 'zwyx',
                    title: '上班',
                    width: '50',
                    align: 'center',
                    valign: 'middle'
                }, {
                		field: 'zwyx',
                    title: '下班',
                    width: '50',
                    align: 'center',
                    valign: 'middle'
                }, {
                		field: 'zwyx',
                    title: '应到(小时)',
                    width: '100',
                    align: 'center',
                    valign: 'middle'
                }, {
                		field: 'zwyx',
                    title: '工作时长(小时)',
                    width: '100',
                    align: 'center',
                    valign: 'middle'
                }, {
                		field: 'zwyx',
                    title: '迟到(分钟)',
                    width: '100',
                    align: 'center',
                    valign: 'middle'
                }, {
                		field: 'zwyx',
                    title: '早退(分钟)',
                    width: '100',
                    align: 'center',
                    valign: 'middle'
                }
                , {
                		field: 'zwyx',
                    title: '加班(分钟)',
                    width: '100',
                    align: 'center',
                    valign: 'middle'
                }
                , {
                		field: 'zwyx',
                    title: '旷工(分钟)',
                    width: '100',
                    align: 'center',
                    valign: 'middle'
                }
                , {
                		field: 'zwyx',
                    title: '正常(小时)',
                    width: '100',
                    align: 'center',
                    valign: 'middle'
                }
                , {
                		field: 'zwyx',
                    title: '异常数据',
                    width: '10',
                    align: 'center',
                    valign: 'middle'
                }
		    ]
		});
	},
	prepareDisplayData: function(data){
		return {
			total: data.totalCount,
            fixedScroll: false,
            rows: data.rows
		}
	},
	getTree: function(){
		var url = 'http://192.168.70.181/cc2018/js/tree.json';
		$.ajax({
			type:"get",
			url:url,
			dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function(data) {
            		console.log(data);
            		$('#tree').treeview({
            			levels: 1,
            			data:data,
					selectedBackColor: 'rgba(#000000,.12)'
            		});
            }
		});
	},
	replaceDateTimeIcon: function(){
		$('.datetimepicker').find('.next>span').removeClass('glyphicon glyphicon-arrow-right').addClass('icon icon-color icon-pixel-twenty cloudclocking-right-arrow');
		$('.datetimepicker').find('.prev>span').removeClass('glyphicon glyphicon-arrow-left').addClass('icon icon-color icon-pixel-twenty cloudclocking-left-arrow');
	},
	modalShow: function(){
		$('#myModal').modal({
			title: 'Add Department'
		});
	},
}







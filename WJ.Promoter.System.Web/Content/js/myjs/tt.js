$(function () {
    var w = top.document.getElementsByClassName('content-tabs')[0].clientWidth - 22;
    var col = [
               { name: 'GameID', hidden: true },
               { label: '游戏名称', name: 'GameName', align: 'center' },
               {
                   label: '日期', name: 'TheDate', align: 'center'
                   , formatter: "date", formatoptions: { srcformat: 'Y-m-d ', newformat: 'Y-m-d ' }
               },
               {
                   label: '日注册', name: 'DailyRegisteredUsers', align: 'center'
                  , formatter: function (v) {
                      if (!v || v == '0')
                          return '0';
                      var vv = arguments[1].rowId;
                      return '<a href="javascript:void(0)" style="color:#3f88bf; font-size:16px;" data-key="DailyRegisteredUsers"   data-v="' + arguments[2].DRUserIDs + '" data-rowid="' + vv + '">' + v + '</a>'
                  }
               },
               { label: '累积注册', name: 'AccumulatedRegisteredUsers', align: 'center' },
               {
                   label: '日登陆', name: 'DailyLoginedUsers', align: 'center'
                   , formatter: function (v) {
                       if (!v || v == '0')
                           return '0';
                       var vv = arguments[1].rowId;
                       return '<a href="javascript:void(0)" style="color:#3f88bf; font-size:16px;" data-key="DailyLoginedUsers"   data-v="' + arguments[2].DlUserIDs + '"  data-rowid="' + vv + '">' + v + '</a>'
                   }
               },
               { label: 'DAU', name: 'DAU', align: 'center', hidden: true },
               { label: '日收入', name: 'DailyRevenue', align: 'center', formatter: $.toMoney },
               {
                   label: '付费人数', name: 'PayUsers', align: 'center'
                  , formatter: function (v) {
                      if (!v || v == '0')
                          return '0';
                      var vv = arguments[1].rowId;
                      return '<a href="javascript:void(0)" style="color:#3f88bf; font-size:16px;" data-key="PayUsers"   data-v="' + arguments[2].PayUserIDs + '"  data-rowid="' + vv + '">' + v + '</a>'
                  }
               },
               { label: '付费渗透率', name: 'PayUsersPate', align: 'center' },
               { label: 'ARPPU', name: 'ARPPU', align: 'center', formatter: $.toMoney },
               { label: 'ARPU', name: 'ARPU', align: 'center', formatter: $.toMoney },
               {
                   label: '注册次日留存率', name: 'R2RetentionRate', align: 'center'
                    , formatter: $.toPercent
               },
               {
                   label: '注册七日留存率', name: 'R7RetentionRate', align: 'center'
                  , formatter: $.toPercent
               },
               {
                   label: '登陆次日留存率', name: 'L2RetentionRate', align: 'center'
                   , formatter: $.toPercent
               },
               {
                   label: '登陆七日留存率', name: 'L7RetentionRate', align: 'center'
                                       , formatter: $.toPercent
               },
               { label: '最高在线', name: 'PeakConcurrentUsers', align: 'center' },
               { label: '平均在线', name: 'AverageConcurrentUers', align: 'center' },
               { label: '玩牌人数', name: 'PlayUsers', align: 'center' },
               {
                   label: '未玩牌人数', name: 'NotPlayUsers', align: 'center'
                 , formatter: function (v) {
                     if (!v || v == '0')
                         return '0';
                     var vv = arguments[1].rowId;
                     return '<a href="javascript:void(0)" style="color:#3f88bf; font-size:16px;" data-key="NotPlayUsers"   data-v="' + arguments[2].NotPlayUserIDs + '"   data-rowid="' + vv + '">' + v + '</a>'
                 }
               },
               { label: '游戏时长', name: 'AvgOnlineTime', align: 'center' },
               { label: '日发放', name: 'DailyDiamondSent', align: 'center' },
               { label: '日消耗', name: 'DailyDiamondUsed', align: 'center' },
               { label: '新增日收入', name: 'NewDailyRevenue', align: 'center' },
               { label: '新增付费人数', name: 'NewPayUsers', align: 'center' },
               {
                   label: '新增付费渗透率', name: 'NewPayUsersPate', align: 'center'
                   , formatter: $.toPercent
               },
               { label: '新增ARPPU', name: 'NewARPPU', align: 'center' },
               { label: '新增ARPU', name: 'NewARPU', align: 'center' },
               { name: 'DRUserIDs', hidden: true },
              { name: 'DlUserIDs', hidden: true },
               { name: 'PayUserIDs', hidden: true },
               { name: 'NotPlayUserIDs', hidden: true },



    ];



    var colModel = [
         { name: 'GameID', hidden: true },
         { label: '玩家ID', name: 'UserID', align: 'center', width: 150 },
         { label: '游戏名称', name: 'GameName', align: 'center', width: 150 },
         //{ label: '真实姓名', name: 'RealName', align: 'center' },
         { label: '游戏昵称', name: 'NickName', align: 'center', width: 150 },
         { label: '手机号码', name: 'PhoneNo', align: 'center', width: 150 },
         {
             label: '注册时间', name: 'RegisterTime', align: 'center', width: 150
              , formatter: "date", formatoptions: { srcformat: 'Y-m-d', newformat: 'Y-m-d' }
         }, {
             label: '最后登陆时间', name: 'LastLoginTime', align: 'center', width: 250
              , formatter: "date", formatoptions: { srcformat: 'Y-m-d', newformat: 'Y-m-d' }
         },
         {
             label: '推荐人ID', name: 'ParentUserID', align: 'center', width: 150
         },
         { label: '推荐人昵称', name: 'AgentRealName', align: 'center', width: 80 },
         {
             label: '绑定时间', name: 'BindingTime', align: 'center', width: 150
             , formatter: "date", formatoptions: { srcformat: 'Y-m-d', newformat: 'Y-m-d' }
         },

         { label: '好友ID', name: 'FriendID', align: 'center', width: 150 },
         { label: '好友昵称', name: 'FriendNickName', align: 'center', width: 50 },
         {
             label: '好友绑定时间', name: 'FBindingTime', align: 'center', width: 150
             , formatter: "date", formatoptions: { srcformat: 'Y-m-d', newformat: 'Y-m-d' }
         },
         { label: '总充值', name: 'TotalCharge', align: 'center', width: 150, formatter: $.toMoney },
         { label: '今日充值', name: 'TodayCharge', align: 'center', width: 90, formatter: $.toMoney },
         { label: '玩牌总对局', name: 'TotalRound', align: 'center', width: 150 },
         { label: '玩牌今日对局', name: 'TodayRound', align: 'center', width: 150 },
         {
             label: '总胜率', name: 'TotalWinRound', align: 'center', width: 150
             , formatter: $.toPercent
         },
         {
             label: '今日胜率', name: 'TodayWinRound', align: 'center', width: 150
             , formatter: $.toPercent
         },
         { label: '版本号', name: 'GameVersion', align: 'center', width: 150 },
    ];


    this.init = function () {
        initEvent();
        AuthManage([{
            'action': 'GetAllGameInfo',
            'elementid': 'tool'
        }, {
            'action': 'GetAllGameInfo',
            'elementid': 'bb'
        }
        ]);

    }

    function initEvent() {
        $('#liDetail').hide();
        initDropDown("/DataCenter/SysData.aspx?method=GetAllGameInfo");
        //$('body').on('click', '#pd-detail', detailHandler);
        $('body').on('click', '#btn_search', searchHandler);
        $('body').on('click', '#b_excel', exportExcelHandler);
        $('body').on('click', '#tabRemove', function (e) {
            e.preventDefault();
            event.stopPropagation();
            $('#liDetail').addClass('fadeOut animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                $('#liHome').addClass('active');
                $(this).removeClass('active').removeClass('fadeOut animated').hide();
            });
            //$li_this.removeClass('active').hide();
            //$li_prethis.show().addClass('active');
            $('#detail').addClass('fadeOut animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                $(this).removeClass('in').removeClass('active').removeClass('fadeOut animated');
                $('#home').addClass('in active');
                return false;
            });
            //$('#liDetail').removeClass('active');
            //$('#detail').removeClass('in active');
            //$('#liDetail').hide();
            return false;
        });

        $('.mypopover').popover({ trigger: "hover" });

    }

    function exportExcelHandler() {
        var url = "/DataCenter/StatisticalData.aspx?method=ExportEachProductOperationStatistics&begintime=" + $('#pd-bdate').val() + "&endtime=" + $('#pd-edate').val() + "&gid=" + $('#ag-select').val();
        $(this).attr('href', url);
    }

    function initDropDown(url) {
        $("#ag-select").bindSelect({
            id: 'GameId',
            text: 'GameName',
            url: url,
        });
        gridList(col);
        setGroup();
        setShowOrHideCol1();
    }

    function setGroup() {
        $("#gridList").jqGrid('setGroupHeaders', {
            useColSpanStyle: true,
            groupHeaders: [
                { startColumnName: 'GameName', numberOfColumns: 1, titleText: '游戏' },
                { startColumnName: 'TheDate', numberOfColumns: 1, titleText: '日期' },
                { startColumnName: 'DailyRegisteredUsers', numberOfColumns: 1, titleText: '日注册' },
                { startColumnName: 'AccumulatedRegisteredUsers', numberOfColumns: 1, titleText: '累计数据' },
                { startColumnName: 'DailyLoginedUsers', numberOfColumns: 2, titleText: '活跃人数' },
                { startColumnName: 'DailyRevenue', numberOfColumns: 5, titleText: '日收入' },
                { startColumnName: 'R2RetentionRate', numberOfColumns: 4, titleText: '留存' },
                { startColumnName: 'PeakConcurrentUsers', numberOfColumns: 5, titleText: '活跃度' },
                { startColumnName: 'DailyDiamondSent', numberOfColumns: 2, titleText: '钻石' },
                { startColumnName: 'NewDailyRevenue', numberOfColumns: 5, titleText: '新增玩家数据' },
            ]
        })
    }

    function setShowOrHideCol1() {

        var myTempl = Handlebars.compile($('#qq_templ').html());
        var d = myTempl(col);
        var html = ' <div id="btn_parent" class="keep-open btn-group pull-right" title="显示/隐藏列" style="margin-right: 2px;" > ' +
                       ' <button id="btn_toggle" type="button" aria-label="columns" class="btn btn-default btn-outline dropdown-toggled" data-toggle="dropdownd" aria-expanded="false">' +
                       '     <i class="glyphicon glyphicon-list"></i><span class="caret"></span>' +
                       ' </button>' +
                       ' <ul class="dropdown-menu" role="menu" id="tmplid">' +
                       d
        ' </ul>' +
   '  </div>'
        $('#gview_gridList .ui-jqgrid-titlebar').after(html);

        $('#tmplid input').each(function () {
            $(this).on('click', function () {
                var that = $(this);
                var field = that.attr('data-field');
                var len = $("#gridList").getGridParam("width");//top.document.getElementsByClassName('content-tabs')[0].clientWidth//
                if (!that.is(':checked'))
                    $("#gridList").setGridParam().hideCol(field);
                else
                    $("#gridList").setGridParam().showCol(field);
                $("#gridList").setGridWidth(len)
            })
        })

        $('#btn_toggle').on('click', function () {
            $('#btn_parent').toggleClass('open');
        })

    }

    function gridList(col) {
        var $gridList = $("#gridList");
        $gridList.dataGrid({
            url: "/DataCenter/StatisticalData.aspx?method=EachProductOperationStatistics",
            height: $(window).height() - 240,
            //width: $('.topPanel')[0].clientWidth - 25,// top.document.getElementsByClassName('content-tabs')[0].clientWidth,
            autowidth: true,
            //width:2000,
            shrinkToFit: true,
            footerrow: false,
            colModel: col,
            pager: "#gridPager",
            sortname: 'GameName',
            viewrecords: true,
            rowNum: 15,
            rowList: [15,20, 40],
            gridComplete: function () {
                //var rowNum = parseInt($(this).getGridParam("records"), 10);
                //if (rowNum > 0) {
                //var a = $(this).getCol('SubAgentCount', false, 'sum');
                //var b = $(this).getCol('DUserCount', false, 'sum');
                //var c = $(this).getCol('IUserCount', false, 'sum');
                //var d = $(this).getCol('TotalFlow', false, 'sum');
                //var e = $(this).getCol('TotalProfit', false, 'sum');
                //var f = $(this).getCol('DUserProfit', false, 'sum');
                //var g = $(this).getCol('IUserProfit', false, 'sum');
                //var aa = $(this).getCol('TodayProfit', false, 'sum');
                //var bb = $(this).getCol('YesterdayProfit', false, 'sum');
                //var cc = $(this).getCol('WeekProfit', false, 'sum');
                //var dd = $(this).getCol('MonthProfit', false, 'sum');
                //var ee = $(this).getCol('TodayNewUser', false, 'sum');
                //var ff = $(this).getCol('YesterdayNewUser', false, 'sum');
                //var gg = $(this).getCol('WeekNewUser', false, 'sum');
                //var hh = $(this).getCol('MonthNewUser', false, 'sum');
                //$(this).footerData('set', {
                //    "rn": '合计',
                //    'SubAgentCount': a.toFixed(2),
                //    'DUserCount': b.toFixed(2),
                //    'IUserCount': c.toFixed(2),
                //    'TotalFlow': d.toFixed(2),
                //    'TotalProfit': e.toFixed(2),
                //    'DUserProfit': f.toFixed(2),
                //    'IUserProfit': g.toFixed(2),
                //    'TodayProfit': aa.toFixed(2),
                //    'YesterdayProfit': bb.toFixed(2),
                //    'WeekProfit': cc.toFixed(2),
                //    'MonthProfit': dd.toFixed(2),
                //    'TodayNewUser': ee.toFixed(2),
                //    'YesterdayNewUser': ff.toFixed(2),
                //    'WeekNewUser': gg.toFixed(2),
                //    'MonthNewUser': hh.toFixed(2),
                //});
                //var h1 = $('#gridList tr:nth(1)')[0].clientHeight;
                //var h2 = (rowNum + 1) * h1;
                //var w1 = $(this)[0].clientHeight + h1;
                //var w2 = $('#gridList')[0].offsetHeight;
                //var x = $('.ui-jqgrid-bdiv').attr('style');
                //var y = x.split(';');
                //y[0] = 'Height:' + Math.max(h2, Math.min(w1, w2)) + 'px';
                //x = y.join(';');
                //$('.ui-jqgrid-bdiv').attr('style', y)
                //$(".ui-jqgrid-sdiv").show();
                $('#gridList a[data-key="DailyRegisteredUsers"]').on('click', function () {
                    var vv = $(this).attr('data-rowid');
                    var dv = $(this).attr('data-v');
                    if (vv) {
                        $('#sptab').text('日注册详细');
                        detailHandler(vv, '日注册', dv);

                    }

                })
                $('#gridList a[data-key="DailyLoginedUsers"]').on('click', function () {
                    var vv = $(this).attr('data-rowid');
                    var dv = $(this).attr('data-v');
                    if (vv) {
                        $('#sptab').text('日登陆详细');
                        detailHandler(vv, '日登陆', dv);
                    }

                })
                $('#gridList a[data-key="PayUsers"]').on('click', function () {
                    var vv = $(this).attr('data-rowid');
                    var dv = $(this).attr('data-v');
                    if (vv) {
                        $('#sptab').text('付费人数详细');
                        detailHandler(vv, '付费人数', dv);
                    }
                })

                $('#gridList a[data-key="NotPlayUsers"]').on('click', function () {
                    var vv = $(this).attr('data-rowid');
                    var dv = $(this).attr('data-v');
                    if (vv) {
                        $('#sptab').text('未玩牌人数详细');
                        detailHandler(vv, '未玩牌人数', dv);
                    }
                })
                //}
                //else {
                //    $(".ui-jqgrid-sdiv").hide();
                //}


                //$(this).setGridWidth(w);
            }

        });
    }

    function searchHandler() {
        //var len = $("#gridList").getGridParam("width");
        $("#gridList").jqGrid('setGridParam', {
            url: "/DataCenter/StatisticalData.aspx?method=EachProductOperationStatistics&begintime=" + $('#pd-bdate').val() + "&endtime=" + $('#pd-edate').val() + "&gid=" + $('#ag-select').val(),
        }).trigger('reloadGrid');

    }

    function detailHandler(vv, field, dv) {
        $('#myTab li:eq(1) a').tab('show');
        $("#gridList").jqGrid('setSelection', vv);
        $('#liDetail').show();
        var aa = $('#gridList').jqGrid('getRowData', vv);
        var a = aa.GameID
        var e = $('#liDetail').attr('gid');
        var f = $('#liDetail').attr('rowid');
        var i = $('#liDetail').attr('field');
        var h = $('#home').css('width');
        var g = $('#home').css('height');

        if (vv != f || i != field) {
            $('#liDetail').attr({
                'gid': aa.GameID,
                'gameuids': '',
                'rowid': vv,
                'field': field
            });
            if ($('#fdetail').length > 0)
                $('#fdetail').remove();

            var str1 = '<iframe  class="NFine_iframe"  id="fdetail"  rowid="' + vv + '"  gid="' + a + '"  width="' + h + '"  height="' + g + '"  src="' + "./OperationDataAnalysisDetail.html?a=" + a + '&b=' + field + '&c=' + dv + '" ></iframe>';
            $('#detail').append(str1);

            $('#detail iframe').css({
                width: h,
                height: g,
                border: 'none'
            })
            $.loading(true);
            $('#detail iframe:visible').load(function () {
                $.loading(false);
            });
        }




        //$("#gridList").jqGrid('setSelection', vv);
        //$('#liDetail').show();
        //$('#myTab li:eq(1) a').tab('show');
        //var aa = $('#gridList').jqGrid('getRowData', vv);
        //var a = aa.GameID
        //var d = $('#liDetail').attr('gameuids');
        //var e = $('#liDetail').attr('gid');
        //var f = $('#liDetail').attr('rowid');
        //if (vv != f) {
        //    $('#liDetail').attr({
        //        'gid': aa.GameID,
        //        'gameuids': '',
        //        'rowid': vv
        //    });
        //    if ($('#gview_gridList2').length > 0) {
        //        Detail_TabSearch(a, '');    
        //    } else
        //        Detail_gridList(a, '');
        //}

    }

    function detailEvent() {
        $('body').on('click', '#btn_search2', Deatil_searchHandler);

    }

    function Detail_gridList(a, b) {
        var $gridList = $("#gridList2");
        $gridList.dataGrid({
            url: "/DataCenter/StatisticalData.aspx?method=EachProductUserDistributionDetail&gid=" + a + "&gameuids=" + b,
            height: $(window).height() - 223,
            width: 1700,
            //autowidth: true,
            shrinkToFit: true,
            colModel: colModel,
            pager: "#gridPager2",
            sortname: 'RegisterTime',
            sortorder: 'desc',
            viewrecords: true,
            rowNum: 20,//每页显示记录数
            rowList: [20, 40],
            rownumbers: true,
            rownumWidth: 50,
            gridComplete: function () {
                //$(this).setGridWidth(w);
            }
        });
        Detail_Group();
        //Detail_ShowOrHidenCol();
        //Detail_Group();
        //detailEvent();
        detailEvent();
    }

    function Deatil_searchHandler() {
        var gid = $('#liDetail').attr('gid');
        $("#gridList2").jqGrid('setGridParam', {
            url: "/DataCenter/StatisticalData.aspx?method=EachProductUserDistributionDetail&gid=" + gid + "&gameuid=" + $('#txt_keyword2').val(),
        }).trigger('reloadGrid');
    }

    function Detail_TabSearch(a, b) {
        $('#txt_keyword2').val('');
        $("#gridList2").jqGrid('setGridParam', {
            url: "/DataCenter/StatisticalData.aspx?method=EachProductUserDistributionDetail&gid=" + a + "&gameuid=" + b,
        }).trigger('reloadGrid');
    }

    function Detail_Group() {
        $("#gridList2").jqGrid('setGroupHeaders', {
            useColSpanStyle: false,
            groupHeaders: [
                { startColumnName: 'UserID', numberOfColumns: 6, titleText: '基础信息' },
                { startColumnName: 'ParentUserID', numberOfColumns: 3, titleText: '推荐关系' },
                { startColumnName: 'FriendID', numberOfColumns: 3, titleText: '好友关系' },
                { startColumnName: 'TotalCharge', numberOfColumns: 2, titleText: '充值' },
                { startColumnName: 'TotalRound', numberOfColumns: 2, titleText: '玩牌局数' },
                { startColumnName: 'TotalWinRound', numberOfColumns: 2, titleText: '胜率' },
                { startColumnName: 'GameVersion', numberOfColumns: 1, titleText: '版本' }
            ]
        })
    }

    function Detail_ShowOrHidenCol() {
        var myTempl = Handlebars.compile($('#qq_templ').html());
        var d = myTempl(colModel);
        var html = ' <div id="btn_parent2" class="keep-open btn-group pull-right" style="margin-right: 10px;" title="显示/隐藏列" > ' +
                       ' <button id="btn_toggle2"  style="padding: 4.5px 7px;" type="button" aria-label="columns" class="btn btn-default btn-outline dropdown-toggled" data-toggle="dropdownd" aria-expanded="false">' +
                       '     <i class="glyphicon glyphicon-list"></i><span class="caret"></span>' +
                       ' </button>' +
                       ' <ul class="dropdown-menu" role="menu" id="tmplid2">' +
                       d
        ' </ul>' +
   '  </div>'
        $('#gview_gridList2 .ui-jqgrid-titlebar').after(html);

        $('#tmplid2 input').each(function () {
            $(this).on('click', function () {
                var that = $(this);
                var field = that.attr('data-field');
                var len = $("#gridList2").getGridParam("width");//top.document.getElementsByClassName('content-tabs')[0].clientWidth//
                if (!that.is(':checked'))
                    $("#gridList2").setGridParam().hideCol(field);
                else
                    $("#gridList2").setGridParam().showCol(field);
                $("#gridList2").setGridWidth(len)
            })
        })

        $('#btn_toggle2').on('click', function () {
            $('#btn_parent2').toggleClass('open');
        })
    }

    this.init();
})


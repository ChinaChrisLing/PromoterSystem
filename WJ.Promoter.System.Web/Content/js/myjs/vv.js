$(function () {
    var gid = $.request("a");
    var filename = $.request("b");
    var gameuids = $.request("c");
    var colModel = [
               { name: 'GameID', hidden: true },
               { label: '玩家ID', name: 'UserID', align: 'center' },
               { label: '游戏名称', name: 'GameName', align: 'center' },
               //{ label: '真实姓名', name: 'RealName', align: 'center' },
               { label: '游戏昵称', name: 'NickName', align: 'center' },
               { label: '手机号码', name: 'PhoneNo', align: 'center' },
               {
                   label: '注册时间', name: 'RegisterTime', align: 'center'
                    , formatter: "date", formatoptions: { srcformat: 'Y-m-d', newformat: 'Y-m-d' }
               }, {
                   label: '最后登陆时间', name: 'LastLoginTime', align: 'center'
                    , formatter: "date", formatoptions: { srcformat: 'Y-m-d', newformat: 'Y-m-d' }
               },
               //{ label: '代理等级', name: 'MyAgentLevel', align: 'center' },
               {
                   label: '推荐人ID', name: 'ParentUserID', align: 'center'

               },
               { label: '推荐人昵称', name: 'AgentRealName', align: 'center' },
               {
                   label: '绑定时间', name: 'BindingTime', align: 'center'
                   , formatter: "date", formatoptions: { srcformat: 'Y-m-d', newformat: 'Y-m-d' }
               },

               { label: '好友ID', name: 'FriendID', align: 'center' },
               { label: '好友昵称', name: 'FriendNickName', align: 'center' },
               {
                   label: '好友绑定时间', name: 'FBindingTime', align: 'center'
                   , formatter: "date", formatoptions: { srcformat: 'Y-m-d', newformat: 'Y-m-d' }
               },
               { label: '总充值', name: 'TotalCharge', align: 'center', formatter: $.toMoney },
               { label: '今日充值', name: 'TodayCharge', align: 'center', formatter: $.toMoney },
               { label: '玩牌总对局', name: 'TotalRound', align: 'center' },
               { label: '玩牌今日对局', name: 'TodayRound', align: 'center' },
               {
                   label: '总胜率', name: 'TotalWinRound', align: 'center'
                   , formatter: $.toPercent
               },
               {
                   label: '今日胜率', name: 'TodayWinRound', align: 'center'
                   , formatter: $.toPercent
               },
               { label: '版本号', name: 'GameVersion', align: 'center' },
    ];

    this.init = function () {
        setTimeout(function () { initEvent(); }, 100)

        //AuthManage([{
        //    'action': 'GetAllGameInfo',
        //    'elementid': 'tool'
        //}, {
        //    'action': 'BindGameUserToAgent',
        //    'elementid': 'pd-binda'
        //}, {
        //    'action': 'UnBindGameUserRelation',
        //    'elementid': 'pd-ubinda'
        //}
        //]);
    }
    function initEvent() {
        initDropDown("/DataCenter/SysData.aspx?method=GetAllGameInfo");
        $('body').on('click', '#btn_search', searchHandler);
        $('body').on('click', '#b_excel', exportExcelHandler);
        $('.mypopover').popover({ trigger: "hover" });
    }


    function exportExcelHandler() {
        var url = "/DataCenter/StatisticalData.aspx?method=ExportEachProductUserDistributionDetail&gid=" + gid
     + "&gameuid=" + $('#txt_keyword').val()
     + "&gameuids=" + gameuids
     + "&filename=" + filename
        $(this).attr('href', url);
    }

    function setHideCol() {
        var myTempl = Handlebars.compile($('#qq_templ').html());
        var d = myTempl(colModel);
        var html = ' <div id="btn_parent" class="keep-open btn-group pull-right" style="margin-right: 15px;" title="显示/隐藏列" > ' +
                       ' <button id="btn_toggle"  style="padding: 4.5px 7px;" type="button" aria-label="columns" class="btn btn-default btn-outline dropdown-toggled" data-toggle="dropdownd" aria-expanded="false">' +
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
    function setGroupCol() {
        $("#gridList").jqGrid('setGroupHeaders', {
            useColSpanStyle: true,
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
    function initDropDown(url) {
        gridList();
        setGroupCol();
    }
    function gridList() {
        var $gridList = $("#gridList");
        $("#gridList").dataGrid({
            url: "/DataCenter/StatisticalData.aspx?method=EachProductUserDistributionDetail&gid=" + gid + "&gameuids=" + gameuids,
            height: $(window).height() - 170,
            //width: top.document.getElementsByClassName('content-tabs')[0].clientWidth - 25,
            autowidth: true,
            shrinkToFit: true,
            footerrow: false,
            colModel: colModel,
            pager: "#gridPager",
            sortname: 'RegisterTime',
            sortorder: 'desc',
            viewrecords: true,
            rowNum: 15,
            rowList: [15, 20, 40],
            gridComplete: function () {
                $(this).setGridHeight($(window).height() - 170);
            }
        });

    }
    function searchHandler() {
        $("#gridList").jqGrid('setGridParam', {
            url: "/DataCenter/StatisticalData.aspx?method=EachProductUserDistributionDetail&gid=" + gid + "&gameuid=" + $('#txt_keyword').val() + "&gameuids=" + gameuids,
        }).trigger('reloadGrid');
    }
    this.init();
})


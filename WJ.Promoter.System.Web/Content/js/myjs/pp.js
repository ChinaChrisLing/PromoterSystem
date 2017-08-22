$(function () {
    var v1;
    this.init = function () {
        initEvent();
        AuthManage([{
            'action': 'EachProductRetainedStatistics',
            'elementid': 'tool'
        }]);

    }
    function initEvent() {
        initDropDown("/DataCenter/SysData.aspx?method=GetAllGameInfo");
        //$('body').on('click', '#pd-detail', detailHandler);
        $('body').on('click', '#btn_search', searchHandler);
    }

    function initDropDown(url) {
        $("#ag-select").bindSelect({
            id: 'GameId',
            text: 'GameName',
            url: url,
        });
        gridList();
    }

    function gridList() {
        var $gridList = $("#gridList");
        $gridList.dataGrid({
            url: "/DataCenter/StatisticalData.aspx?method=EachProductRetainedStatistics&gid=" + $('#ag-select').val(),
            height: $(window).height() - 160,
            width: top.document.getElementsByClassName('content-tabs')[0].clientWidth - 25,
            autowidth: true,
            shrinkToFit: true,
            footerrow: true,
            colModel: [
                { label: '主键', name: 'GameID', hidden: true },
                { label: '游戏名称', name: 'GameName', align: 'center' },
                { label: '统计日', name: 'TheDate', align: 'center' },
                { label: '注册数', name: 'RegistCount', align: 'center' },
                { label: '隔日留存数', name: 'Second_day', align: 'center' },
                {
                    label: '隔日留存率', name: 'SecondDayRate', align: 'center'
                    , formatter: $.toPercent
                },
                { label: '3日留存数', name: 'Third_day', align: 'center' },
                {
                    label: '3日留存率', name: 'ThirdDayRate', align: 'center'
                    , formatter: $.toPercent
                },
                { label: '7日留存数', name: 'Seventh_day', align: 'center' },
                {
                    label: '7日留存率', name: 'SeventhDayRate', align: 'center'
                    , formatter: $.toPercent
                },
                { label: '30日留存数', name: 'Thirtieth_day', align: 'center' },
                {
                    label: '30日留存率', name: 'SThirtiethDayRate', align: 'center'
                    , formatter: $.toPercent
                },
            ],
            pager: "#gridPager",
            sortname: 'GameName',
            viewrecords: true,
            rowNum: 20,//每页显示记录数
            rowList: [20, 40],//用于改变显示行数的下拉列表框的元素数组。
            gridComplete: function () {
                var a = $(this).getCol('RegistCount', false, 'sum');
                var b = $(this).getCol('Second_day', false, 'sum');
                var c = $(this).getCol('Third_day', false, 'sum');
                var d = $(this).getCol('Seventh_day', false, 'sum');
                var e = $(this).getCol('Thirtieth_day', false, 'sum');
                $(this).footerData('set', {
                    "rn": '合计',
                    'RegistCount': a,
                    'Second_day': b,
                    'Third_day': c,
                    'Seventh_day': d,
                    'Thirtieth_day': e,
                });
            }

        });

    }
    function detailHandler() {
        var a = $("#gridList").jqGridRowValue().GameID;
        var b = $("#gridList").jqGridRowValue().GameName;
        $.modalOpenGrid({
            id: "Form",
            title: "流水详细",
            url: "./StatisticPages/ProductFlowManageDetail.html?a=" + a + "&b=" + b,
            width: "1600px",
            height: "1400px",
            callBack: function (iframeId) {
                top.frames[iframeId].submitForm();
            }
        });
    }

    function searchHandler() {
        $("#gridList").jqGrid('setGridParam', {
            url: "/DataCenter/StatisticalData.aspx?method=EachProductRetainedStatistics&begintime=" + $('#pd-bdate').val() + "&endtime=" + $('#pd-edate').val() + "&gid=" + $('#ag-select').val(),
        }).trigger('reloadGrid');
    }

    this.init();
})


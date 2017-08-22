$(function () {
    var v1;
    this.init = function () {
        initEvent();
        AuthManage([{
            'action': 'EachProductFlowStatistics',
            'elementid': 'tool'
        }, {
            'action': 'EachProductFlowStatisticsDetail',
            'elementid': 'operate'
        }
        ]);

    }
    function initEvent() {
        initDropDown("/DataCenter/SysData.aspx?method=GetAllGameInfo");
        $('body').on('click', '#pd-detail', detailHandler);
        $('body').on('click', '#btn_search', searchHandler);
        $('.mypopover').popover({ trigger: "hover" });
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
            url: "/DataCenter/StatisticalData.aspx?method=EachProductFlowStatistics&begintime=" + $('#pd-bdate').val() + "&endtime=" + $('#pd-edate').val() + "&gid=" + $('#ag-select').val(),
            height: $(window).height() - 160,
            width: top.document.getElementsByClassName('content-tabs')[0].clientWidth - 25,
            autowidth: true,
            shrinkToFit: true,
            footerrow: true,
            colModel: [
                { label: '主键', name: 'GameID', hidden: true },
                { label: '游戏名称', name: 'GameName', align: 'center' },
                { label: '流水金额', name: 'Flow', align: 'center' },
            ],
            pager: "#gridPager",
            sortname: 'GameName',
            viewrecords: true,
            rowNum: 20,
            rowList: [20, 40],
            gridComplete: function () {
                var a = $(this).getCol('Flow', false, 'sum');
                $(this).footerData('set', {
                    "rn": '合计',
                    'Flow': a,
                });
            }
        });

    }
    function detailHandler() {
        var a = $("#gridList").jqGridRowValue().GameID;
        var b = $("#gridList").jqGridRowValue().GameName;
        $.modalOpenGrid({
            type: 2,
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
            url: "/DataCenter/StatisticalData.aspx?method=EachProductFlowStatistics&begintime=" + $('#pd-bdate').val() + "&endtime=" + $('#pd-edate').val() + "&gid=" + $('#ag-select').val(),
        }).trigger('reloadGrid');
    }

    this.init();
})


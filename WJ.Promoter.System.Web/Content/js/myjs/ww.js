$(function () {
    var v1;
    this.init = function () {
        initEvent();
        //AuthManage([{
        //    'action': 'GetAllGameInfo',
        //    'elementid': 'tool'
        //}, {
        //    'action': 'ExportDayRebatesAnalysis',
        //    'elementid': 'bb'
        //}
        //]);
    }
    function initEvent() {
        initDropDown("/DataCenter/SysData.aspx?method=GetAllGameInfo");
        $('body').on('click', '#btn_search', searchHandler);
        $('body').on('click', '#b_excel', excelHandler);
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
            url: "/DataCenter/StatisticalData.aspx?method=GetRoomNumberOfGame&gid=" + $('#ag-select').val()
                + "&uid=" + $('#txt_keyword').val()
                + "&status=" + $('#ag-selstus').val()
                + "&begintime=" + $('#pd-bdate').val()
                + "&endtime=" + $('#pd-edate').val()
            ,
            height: $(window).height() - 160,
            width: top.document.getElementsByClassName('content-tabs')[0].clientWidth - 25,
            autowidth: true,
            shrinkToFit: true,
            //footerrow: true,
            colModel: [
                { label: '主键', name: 'GameID', hidden: true },
                { label: '游戏名称', name: 'GameName', align: 'center' },
                {
                    label: '统计日', name: 'TheDate', align: 'center'
                    , formatter: "date", formatoptions: { srcformat: 'Y-m-d ', newformat: 'Y-m-d ' }
                },
                { label: '总局数', name: 'TotalRecord', align: 'center' },
                { label: '房主开房局数', name: 'HOTotalRecord', align: 'center' },
                {
                    label: '4局开房', name: 'Round4Count', align: 'center'
                },
                {
                    label: '8局开房', name: 'Round8Count', align: 'center'
                },
                { label: '16局开房', name: 'Round16Count', align: 'center' },
                {
                    label: 'AA开房局数', name: 'AATotalRecord', align: 'center'
                }, {
                    label: 'AA4局开房', name: 'AARound4Count', align: 'center'
                }, {
                    label: 'AA8局开房', name: 'AARound8Count', align: 'center'
                }, {
                    label: 'AA16局开房', name: 'AARound16Count', align: 'center'
                },
            ],
            pager: "#gridPager",
            sortname: 'TheDate',
            sortorder: 'desc',
            viewrecords: true,
            rowNum: 20,//每页显示记录数
            rowList: [20, 40],//用于改变显示行数的下拉列表框的元素数组。
            gridComplete: function () {
                //var a = $(this).getCol('RegistCount', false, 'sum');
                //var b = $(this).getCol('Second_day', false, 'sum');
                //var c = $(this).getCol('Third_day', false, 'sum');
                //var d = $(this).getCol('Seventh_day', false, 'sum');
                //var e = $(this).getCol('Thirtieth_day', false, 'sum');
                //$(this).footerData('set', {
                //    "rn": '合计',
                //    'RegistCount': a,
                //    'Second_day': b,
                //    'Third_day': c,
                //    'Seventh_day': d,
                //    'Thirtieth_day': e,
                //});
            }

        });

    }


    function searchHandler() {
        $("#gridList").jqGrid('setGridParam', {
            url: "/DataCenter/StatisticalData.aspx?method=GetRoomNumberOfGame&gid=" + $('#ag-select').val()
                    + "&begintime=" + $('#pd-bdate').val()
                    + "&endtime=" + $('#pd-edate').val()

            ,
        }).trigger('reloadGrid');
    }

    function excelHandler() {
        var url = "/DataCenter/StatisticalData.aspx?method=ExportGetRoomNumberOfGame&gid=" + $('#ag-select').val()
                + "&begintime=" + $('#pd-bdate').val()
                + "&endtime=" + $('#pd-edate').val()

        $(this).attr('href', url);
    }

    this.init();
})


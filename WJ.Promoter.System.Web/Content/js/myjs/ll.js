$(function () {
    var v1;
    var gid = $.request("a");
    var gname = $.request("b");
    this.init = function () {
        initEvent();

        //AuthManage([{
        //    'action': 'GetUserRoleDropDown',
        //    'elementid': 'pd-role'
        //}, {
        //    'action': 'EditAccount',
        //    'elementid': 'pd-edit'
        //}, {
        //    'action': 'EditAccount',
        //    'elementid': 'pd-delete'
        //}, {
        //    'action': 'AddAccount',
        //    'elementid': 'pd-add'
        //}
        //]);

    }
    function initEvent() {
        initDropDown("/DataCenter/SysData.aspx?method=GetAllGameInfo");
        $('body').on('click', '#btn_search', searchHandler);
        $('.mypopover').popover({ trigger: "hover" });
    }

    function initDropDown(url) {
        //$("#ag-select").bindSelect({
        //    id: 'GameId',
        //    text: 'GameName',
        //    url: url,
        //});

        $('#ag-select').append($("<option></option>").val(gid).html(gname));
        gridList();
    }

    function gridList() {
        var $gridList = $("#gridList");
        $gridList.dataGrid({
            url: "/DataCenter/StatisticalData.aspx?method=EachProductFlowStatisticsDetail&begintime=" + $('#pd-bdate').val() + "&endtime=" + $('#pd-edate').val() + "&guser=" + $('#txt_keyword').val() + "&gid=" + $('#ag-select').val(),
            height: $(window).height() - 160,
            //width: top.document.getElementsByClassName('content-tabs')[0].clientWidth - 25,
            autowidth: true,
            shrinkToFit: true,
            footerrow: true,
            colModel: [
                { label: '主键', name: 'GameID', hidden: true },
                { label: '玩家ID', name: 'UserID', align: 'center' },
                { label: '游戏名称', name: 'GameName', align: 'center' },
                { label: '玩家名称', name: 'NickName', align: 'center' },
                { label: '订单编号', name: 'OrderNo', align: 'center' },
                { label: '充值金额', name: 'Amount', align: 'center' },
                {
                    label: '充值时间', name: 'ChargeTime', align: 'center'
                    , formatter: "date", formatoptions: { srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d H:i:s' }
                },
                { label: '充值渠道', name: 'ChargeWay', align: 'center' },
            ],
            pager: "#gridPager",
            sortname: 'ChargeTime',
            sortorder: 'desc',
            viewrecords: true,
            rowNum: 20,//每页显示记录数
            rowList: [20, 40],
            gridComplete: function () {
                var a = $(this).getCol('Amount', false, 'sum');
                $(this).footerData('set', {
                    "rn": '合计',
                    'Amount': a,
                });
            }
        });

    }
    function addHandler() {
        $.modalOpen({
            id: "Form",
            title: "新增用户",
            url: "./SystemPages/Form_NewUser.html",
            width: "600px",
            height: "400px",
            callBack: function (iframeId) {
                top.frames[iframeId].submitForm();
            }
        });
    }

    function searchHandler() {
        $("#gridList").jqGrid('setGridParam', {
            url: "/DataCenter/StatisticalData.aspx?method=EachProductFlowStatisticsDetail&begintime=" + $('#pd-bdate').val() + "&endtime=" + $('#pd-edate').val() + "&guser=" + $('#txt_keyword').val() + "&gid=" + $('#ag-select').val(),
        }).trigger('reloadGrid');
    }

    this.init();
})


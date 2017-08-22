$(function () {
    var gid = $.request("a");
    var aglid = $.request("c");
    var puid = $.request("b");

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
        setTimeout(function () { initDropDown(); }, 200)
        $('body').on('click', '#btn_search', searchHandler);
        $('body').on('click', '#b_excel', exportExcelHandler);
        $('.mypopover').popover({ trigger: "hover" });
    }

    function initDropDown() {
        gridList();
    }

    function gridList() {
        var $gridList = $("#gridList");
        $gridList.dataGrid({
            url: "/DataCenter/StatisticalData.aspx?method=EachProductAgentCountDistributionDetail&gid=" + gid + "&aglid=" + aglid + "&key=" + $('#txt_keyword').val() + "&puid=" + puid,
            height: $(window).height() - 150,
            //width: top.document.getElementsByClassName('content-tabs')[0].clientWidth - 25,
            autowidth: true,
            shrinkToFit: true,
            footerrow: false,
            colModel: [
                { label: '游戏ID', name: 'GameID', hidden: true },
                { label: '代理ID', name: 'UserId', align: 'center' },
                { label: '游戏名称', name: 'GameName', align: 'center' },
                { label: '代理等级', name: 'AgentLevel', align: 'center' },
                { label: '真实姓名', name: 'RealName', align: 'center' },
                { label: '游戏昵称', name: 'NickName', align: 'center' },
                { label: '手机号码', name: 'PhoneNo', align: 'center' },
                { label: '代理商等级', name: 'AgentLevel', align: 'center' },
                {
                    label: '加入时间', name: 'JoinTime', align: 'center'
                    , formatter: "date", formatoptions: { srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d H:i:s' }
                },
                { label: '推广码', name: 'AgentCode', align: 'center' },
                { label: '总业绩', name: 'TotalPerformance', align: 'center', formatter: $.toMoney },
                { label: '直接用户总业绩', name: 'CustomerPerformance', align: 'center', formatter: $.toMoney },
                //{ label: '下属2级代理总业绩', name: 'Level2Performance', align: 'center' },
                //{ label: '下属3级代理总业绩', name: 'Level3Performance', align: 'center' },
                { label: '总收益应返', name: 'TotalReadyRepay', align: 'center', formatter: $.toMoney },
                { label: '总收益已返', name: 'TotalAlreadyRepay', align: 'center', formatter: $.toMoney },
                { label: '直接用户收益应返', name: 'CustomerReadyRepay', align: 'center', formatter: $.toMoney },
                { label: '直接用户收益已返', name: 'CustomerAlreadyRepay', align: 'center', formatter: $.toMoney },
                //{ label: '2级代理贡献收益应返', name: 'Level2ReadyRepay', align: 'center' },
                //{ label: '2级代理收益已返', name: 'Level2AlreadyRepay ', align: 'center' },
                //{ label: '3级代理贡献收益应返', name: 'Level3ReadyRepay', align: 'center' },
                //{ label: '3级代理收益已返', name: 'Level3AlreadyRepay', align: 'center' },
                {
                    label: '直接用户数量', name: 'CustomerNum', align: 'center'

                },
                //{
                //    label: '下级代理数量', name: 'AgentNum', align: 'center',width:220
                //},
            ],
            pager: "#gridPager",
            sortname: 'UserID',
            viewrecords: true,
            rowNum: 15,
            rowList: [15, 20, 40],
            gridComplete: function () {
                $(this).setGridHeight(670);
            }
        });
    }





    function searchHandler() {
        $("#gridList").jqGrid('setGridParam', {
            url: "/DataCenter/StatisticalData.aspx?method=EachProductAgentCountDistributionDetail&gid=" + gid + "&aglid=" + aglid + "&key=" + $('#txt_keyword').val() + "&puid=" + puid + "&begintime=" + $('#pd-bdate').val() + "&endtime=" + $('#pd-edate').val()
        }).trigger('reloadGrid');
    }

    function exportExcelHandler() {
        var url = "/DataCenter/StatisticalData.aspx?method=ExportEachProductAgentCountDistributionDetail&gid=" + gid + "&aglid=" + aglid + "&key=" + $('#txt_keyword').val() + "&puid=" + puid + "&begintime=" + $('#pd-bdate').val() + "&endtime=" + $('#pd-edate').val();
        $(this).attr('href', url);
    }
    this.init();
})


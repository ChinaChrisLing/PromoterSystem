$(function () {
    var v1;
    var gid = $.request("a");
    var gname = $.request("b");
    var agid = $.request("c");
    var aginame = $.request("d");
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
        $('#ag-selag').append($("<option></option>").val(agid).html(aginame));
        gridList();
    }

    function gridList() {
        var $gridList = $("#gridList");
        $gridList.dataGrid({
            url: "/DataCenter/StatisticalData.aspx?method=EachProductAgentCountDistributionDetail&begintime=" + $('#pd-bdate').val() + "&endtime=" + $('#pd-edate').val() + "&aglid=" + agid + "&gid=" + $('#ag-select').val(),
            height: $(window).height() - 128,
            //width: top.document.getElementsByClassName('content-tabs')[0].clientWidth - 25,
            autowidth: true,
            shrinkToFit: true,
            footerrow: false,
            colModel: [
                { label: '主键', name: 'GameID', hidden: true },
                { label: '玩家ID', name: 'UserID', align: 'center' },
                { label: '游戏名称', name: 'GameName', align: 'center' },
                { label: '代理商等级ID', name: 'MyAgentLevel', align: 'center', hidden: true },
                { label: '代理商等级', name: 'AgentLevelName', align: 'center' },
                { label: '真实姓名', name: 'RealName', align: 'center' },
                { label: '游戏昵称', name: 'NickName', align: 'center' },
                { label: '手机号码', name: 'PhoneNo', align: 'center' },
                {
                    label: '直接分成比例', name: 'DProportion', align: 'center'
                   , formatter: $.toPercent
                },
                {
                    label: '间接分成比例', name: 'IProportion', align: 'center'
                 , formatter: $.toPercent
                },
                { label: '推广码', name: 'AgentCode', align: 'center' },
                {
                    label: '代理开始时间', name: 'CreateTime', align: 'center'
                    , formatter: "date", formatoptions: { srcformat: 'Y-m-d', newformat: 'Y-m-d' }
                },

            ],
            pager: "#gridPager",
            sortname: 'CreateTime',
            viewrecords: true,
            rowNum: 20,//每页显示记录数
            rowList: [20, 40],
        });

    }


    function searchHandler() {
        $("#gridList").jqGrid('setGridParam', {
            url: "/DataCenter/StatisticalData.aspx?method=EachProductAgentCountDistributionDetail&begintime=" + $('#pd-bdate').val() + "&endtime=" + $('#pd-edate').val() + "&aglid=" + agid + "&gid=" + $('#ag-select').val(),
        }).trigger('reloadGrid');
    }

    this.init();
})


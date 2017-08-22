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
        initDropDown();
        $('body').on('click', '#btn_search', searchHandler);
        $('.mypopover').popover({ trigger: "hover" });
    }

    function initDropDown() {

        if (gid && gid > 0)
            $('#ag-select').append($("<option></option>").val(gid).html(gname));
        else
            $('#ag-select').hide();

        if (agid && agid > 0)
            $('#ag-selag').append($("<option></option>").val(agid).html(aginame));
        else
            $('#ag-selag').hide();

        gridList();
    }

    function gridList() {
        var $gridList = $("#gridList");
        $gridList.dataGrid({
            url: "/DataCenter/StatisticalData.aspx?method=EachProductUserDistributionDetail&gid=" + gid + "&agentuid=" + agid + "&gameuid=" + $('#txt_keyword').val(),
            height: $(window).height() - 128,
            //width: top.document.getElementsByClassName('content-tabs')[0].clientWidth - 25,
            autowidth: true,
            shrinkToFit: true,
            footerrow: false,
            colModel: [
                { label: '游戏ID', name: 'GameID', hidden: true },
                { label: '玩家ID', name: 'UserID', align: 'center' },
                { label: '游戏名称', name: 'GameName', align: 'center' },
                { label: '代理等级', name: 'MyAgentLevel', align: 'center' },
                { label: '真实姓名', name: 'RealName', align: 'center' },
                { label: '游戏昵称', name: 'NickName', align: 'center' },
                { label: '手机号码', name: 'PhoneNo', align: 'center' },
                { label: '直属代理ID', name: 'ParentUserID', align: 'center' },
                { label: '三级代理ID', name: 'AgentLevel3', align: 'center' },
                { label: '二级代理ID', name: 'AgentLevel2', align: 'center' },
                { label: '一级代理ID', name: 'AgentLevel1', align: 'center' },
                {
                    label: '绑定时间', name: 'BindingTime', align: 'center'
                    , formatter: "date", formatoptions: { srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d H:i:s' }
                },

            ],
            pager: "#gridPager",
            sortname: 'UserID',
            viewrecords: true,
            rowNum: 20,//每页显示记录数
            rowList: [20, 40],
        });

    }


    function searchHandler() {
        $("#gridList").jqGrid('setGridParam', {
            url: "/DataCenter/StatisticalData.aspx?method=EachProductUserDistributionDetail&gid=" + gid + "&agentuid=" + agid + "&gameuid=" + $('#txt_keyword').val(),
        }).trigger('reloadGrid');
    }

    this.init();
})


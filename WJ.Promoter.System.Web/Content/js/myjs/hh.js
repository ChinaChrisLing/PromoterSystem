$(function () {
    var v1;
    this.init = function () {
        initEvent();
        AuthManage([{
            'action': 'AgentApplyAudit',
            'elementid': 'ag-enabled'
        }, {
            'action': 'AgentApplyAudit',
            'elementid': 'ag-disabled'
        }, {
            'action': 'GetAllGameInfo',
            'elementid': 'tool'
        },
        {
            'action': 'EditAgentCustomLevelProportion',
            'elementid': 'pd-edit'
        }, {
            'action': 'AgentUpgrade',
            'elementid': 'pd-up'
        }, {
            'action': 'BindGameUserToAgent',
            'elementid': 'pd-bindu'
        }
        ,
        {
            'action': 'BindAgentToAgent',
            'elementid': 'pd-binda'
        }, {
            'action': 'UnBindGameUserRelation',
            'elementid': 'pd-ubindu'
        }, {
            'action': 'UnBindAgentRelation',
            'elementid': 'pd-ubinda'
        }
        ]);
    }
    /// 请求参数：默认 gid 游戏ID，guid 游戏玩家ID，agentstatus 代理状态  1正常 0已封停
    function initEvent() {
        initDropDown("/DataCenter/SysData.aspx?method=GetAllGameInfo");
        $('body').on('click', '#ag-disabled', disabledHandler);
        $('body').on('click', '#ag-enabled', enabledHandler);
        $('body').on('click', '#btn_search', searchHandler);
        $('body').on('click', '#pd-edit', editHandler);
        $('body').on('click', '#pd-up', upHandler);
        $('body').on('click', '#pd-bindu', binduHandler);
        $('body').on('click', '#pd-binda', bindaHandler);
        $('body').on('click', '#pd-ubinda', ubindaHandler);
        $('body').on('click', '#pd-ubindu', ubinduHandler);
        $('.mypopover').popover({ trigger: "hover" });

    }

    function gridList() {
        var $gridList = $("#gridList");
        $gridList.dataGrid({
            url: "/DataCenter/SysData.aspx?method=GetAllAgent",
            height: $(window).height() - 128,
            width: top.document.getElementsByClassName('content-tabs')[0].clientWidth - 25,
            autowidth: true,
            shrinkToFit: true,
            footerrow: false,
            //multiselect: true,
            colModel: [
                { label: '主键', name: 'GameID', hidden: true },
                { label: '产品名称', name: 'GameName', align: 'center' },
                { label: '代理商姓名', name: 'RealName', align: 'center' },
                { label: '代理商ID', name: 'UserID', align: 'center' },
                { label: '昵称', name: 'NickName', align: 'center' },
                { label: '手机号码', name: 'PhoneNo', align: 'center', },
                { label: '代理商等级', name: 'AgentLevelName', align: 'center' },
                {
                    label: '直接分成比例', name: 'DProportion', align: 'center',
                    formatter: $.toPercent
                },
                {
                    label: '间接分成比例', name: 'IProportion', align: 'center'
                  , formatter: $.toPercent
                },
                { label: '代理商等级ID', name: 'MyAgentLevel', align: 'center' },
                { label: '代理商等级名称', name: 'AgentLevelName', align: 'center' },
                { label: '推荐人ID', name: 'ParentUserID', align: 'center', },
                { label: '二级代理ID', name: 'AgentLevel2', align: 'center' },
                { label: '一级代理ID', name: 'AgentLevel1', align: 'center' },
                { label: '推广码', name: 'AgentCode', align: 'center' },
                {
                    label: '代理时间', name: 'CreateTime', align: 'center',
                    formatter: "date", formatoptions: { srcformat: 'Y-m-d', newformat: 'Y-m-d' }
                },
                {
                    label: '代理商状态', name: 'AgentStatus', align: 'center',
                    formatter: function (v) {
                        if (v == '1')
                            return '正常';
                        else
                            return '已封停'
                    }
                }],
            pager: "#gridPager",
            sortname: 'CreateTime',
            sortorder:'desc',
            viewrecords: true,
            rowNum: 20,//每页显示记录数
            rowList: [20, 35, 50],//用于改变显示行数的下拉列表框的元素数组。
        });

    }

    function initDropDown(url) {
        $("#pd-selgame").bindSelect({
            id: 'GameId',
            text: 'GameName',
            url: url,
        });
        gridList();
    }

    function searchHandler() {
        $("#gridList").jqGrid('setGridParam', {
            url: "/DataCenter/SysData.aspx?method=GetAllAgent",
            postData: { gid: $('#pd-selgame').val(), guid: $('#txt_keyword').val(), agentstatus: $('#pd-selstat').val() },
        }).trigger('reloadGrid');
    }

    function editHandler() {

        var a = $("#gridList").jqGridRowValue().GameID;
        var b = $("#gridList").jqGridRowValue().GameName;
        var c = $("#gridList").jqGridRowValue().MyAgentLevel;
        var d = $("#gridList").jqGridRowValue().AgentLevelName;
        var e = $("#gridList").jqGridRowValue().UserID;
        var g = $.toPoint($("#gridList").jqGridRowValue().DProportion);
        var h = $.toPoint($("#gridList").jqGridRowValue().IProportion)
        $.modalOpen({
            id: "Form",
            title: "修改代理商",
            url: encodeURI("./AgencyPages/Form_EditAgency.html?a=" + a + "&b=" + b + "&c=" + c + "&d=" + d + "&e=" + e + "&g=" + g + "&h=" + h),
            width: "600px",
            height: "400px",
            callBack: function (iframeId) {
                top.frames[iframeId].submitForm();
            }
        });
    }
    function disabledHandler() {
        var a = $("#gridList").jqGridRowValue().GameID;
        var b = $("#gridList").jqGridRowValue().GameName;
        var c = $("#gridList").jqGridRowValue().UserID;
        var d = $("#gridList").jqGridRowValue().NickName;
        $.modalOpen({
            id: "Form",
            title: "封停代理",
            url: encodeURI("./AgencyPages/Form_EditAgencyAccount.html?a=" + a + "&b=" + b + "&c=" + c + "&d=" + d + "&e=" + 0),
            width: "600px",
            height: "400px",
            callBack: function (iframeId) {
                top.frames[iframeId].submitForm();
            }
        });
    }

    function enabledHandler() {
        var a = $("#gridList").jqGridRowValue().GameID;
        var b = $("#gridList").jqGridRowValue().GameName;
        var c = $("#gridList").jqGridRowValue().UserID;
        var d = $("#gridList").jqGridRowValue().NickName;
        $.modalOpen({
            id: "Form",
            title: "解封代理",
            url: encodeURI("./AgencyPages/Form_EditAgencyAccount.html?a=" + a + "&b=" + b + "&c=" + c + "&d=" + d + "&e=" + 1),
            width: "600px",
            height: "400px",
            callBack: function (iframeId) {
                top.frames[iframeId].submitForm();
            }
        });
    }

    function upHandler() {
        var a = $("#gridList").jqGridRowValue().GameID;
        var b = $("#gridList").jqGridRowValue().GameName;
        var c = $("#gridList").jqGridRowValue().MyAgentLevel;
        var d = $("#gridList").jqGridRowValue().AgentLevelName;
        var e = $("#gridList").jqGridRowValue().UserID
        var g = $("#gridList").jqGridRowValue().NickName

        $.modalOpen({
            id: "Form",
            title: "升级代理",
            url: encodeURI("./AgencyPages/Form_UpAgency.html?a=" + a + "&b=" + b + "&c=" + c + "&d=" + d + "&e=" + e + "&g=" + g),
            width: "600px",
            height: "400px",
            callBack: function (iframeId) {
                top.frames[iframeId].submitForm();
            }
        });
    }

    function binduHandler() {
        var a = $("#gridList").jqGridRowValue().GameID;
        var b = $("#gridList").jqGridRowValue().GameName;
        var e = $("#gridList").jqGridRowValue().UserID
        var g = $("#gridList").jqGridRowValue().NickName

        $.modalOpen({
            id: "Form",
            title: "绑定玩家",
            url: encodeURI("./AgencyPages/Form_BindAgency.html?a=" + a + "&b=" + b + "&e=" + e + "&g=" + g + "&m=" + 0),
            width: "600px",
            height: "400px",
            callBack: function (iframeId) {
                top.frames[iframeId].submitForm();
            }
        });
    }


    function ubinduHandler() {
        $.modalOpen({
            id: "Form",
            title: "解绑玩家",
            url: encodeURI("./AgencyPages/Form_UbindUser.html"),
            width: "600px",
            height: "400px",
            callBack: function (iframeId) {
                top.frames[iframeId].submitForm();
            }
        });
    }

    function bindaHandler() {
        var a = $("#gridList").jqGridRowValue().GameID;
        var b = $("#gridList").jqGridRowValue().GameName;
        var e = $("#gridList").jqGridRowValue().UserID
        var g = $("#gridList").jqGridRowValue().RealName
        var h = '';
        var i = $("#gridList").jqGridRowValue().MyAgentLevel;
        var j = $("#gridList").jqGridRowValue().AgentLevel2;
        var k = $("#gridList").jqGridRowValue().AgentLevel1;
        var ii = '';
        if (i && i > 0) {
            if (i == 2 && k && k > 0) {
                ii = 1
                h = k;
            } else if (i == 3 && j && j > 0) {
                ii = 2;
                h = j;
            }              
        }

        $.modalOpen({
            id: "Form",
            title: "代理关系调整",
            url: encodeURI("./AgencyPages/Form_BindAgency.html?a=" + a + "&b=" + b + "&e=" + e + "&g=" + g + "&m=" + 1 + "&h=" + h + "&i=" + ii),
            width: "600px",
            height: "600px",
            callBack: function (iframeId) {
                top.frames[iframeId].submitForm();
            }
        });
    }

    function ubindaHandler() {
        var a = $("#gridList").jqGridRowValue().GameID;
        var e = $("#gridList").jqGridRowValue().UserID
        var g = $("#gridList").jqGridRowValue().NickName
        $.modalConfirm("注：您确定要解绑【" + g + "】与上级代理商的代理关系吗？", function (r) {
            if (r) {
                $.submitForm({
                    url: "/DataCenter/SysData.aspx?method=UnBindAgentRelation",
                    param: { gid: a, aguid: e },
                    success: function () {
                        $.currentWindow().$("#gridList").trigger("reloadGrid");
                    }
                })
            }
        });
    }

    this.init();
})


$(function () {
    var v1;
    this.init = function () {
        initEvent();
        AuthManage([{
            'action': 'AddAgentLevel',
            'elementid': 'pd-add'
        }, {
            'action': 'EditAgentLevel',
            'elementid': 'pd-edit'
        }, {
            'action': 'DeleteAgentLevel',
            'elementid': 'pd-delete'
        }, {
            'action': 'GetAllGameInfo',
            'elementid': 'pd-select'
        }]);
    }
    function initEvent() {
        initDropDown("/DataCenter/SysData.aspx?method=GetAllGameInfo");
        gridList();
        $('body').on('click', '#pd-add', addHandler);
        $('body').on('click', '#pd-edit', editHandler);
        $('body').on('click', '#pd-delete', deleteHandler);
        $('.mypopover').popover({ trigger: "hover" });
    }

    function gridList() {
        var $gridList = $("#gridList");
        $gridList.dataGrid({
            url: "/DataCenter/SysData.aspx?method=GetAllAgentLevel",
            height: $(window).height() - 128,
            width: top.document.getElementsByClassName('content-tabs')[0].clientWidth - 25,
            autowidth: true,
            shrinkToFit: true,
            footerrow: false,
            colModel: [
                { label: '主键', name: 'GameID', hidden: true },
                { label: '产品ID', name: 'GameID', align: 'left' },
                { label: '产品名称', name: 'GameName', align: 'left' },
                { label: '代理等级ID', name: 'AgentLevelID', align: 'left' },
                { label: '代理等级', name: 'AgentLevelName', align: 'left' },
                {
                    label: '代理商直接用户分成比例', name: 'DProportion', align: 'left'
                    , formatter: $.toPercent
                },
                {
                    label: '代理商非直接用户分成比例', name: 'IProportion', align: 'left'
                    , formatter: $.toPercent
                },
                {
                    label: '是否有效', name: 'IsValid', align: 'left',
                    formatter: function (v) {
                        if (v == "1")
                            return "是";
                        else
                            return "否";
                    }
                },
            ],
            pager: "#gridPager",
            sortname: 'GameId',
            viewrecords: true
        });

    }

    function initDropDown(url) {
        $.ajax({
            async: true,
            type: "get",
            url: url,
            dataType: "json",
            success: function (data) {
                var d = [{ GameId: 0, GameName: '全部' }]
                $(data.rows).each(function (i, n) {
                    d.push({ GameId: n.GameId, GameName: n.GameName });
                })
                if (data && !$.isEmptyObject(data)) {
                    v1 = v1 || new Vue({
                        el: "#tool",
                        data: {
                            s1: d[0].GameId,
                            g: d
                        },
                        methods: {
                            m: searchHandler
                        }
                    })
                    gridList();
                }
            }
        })
    }

    function searchHandler() {
        $("#gridList").jqGrid('setGridParam', {
            url: "/DataCenter/SysData.aspx?method=GetAllAgentLevel&gid=" + arguments[0].target.value,
        }).trigger('reloadGrid');
    }

    function addHandler() {
        $.modalOpen({
            id: "Form",
            title: "新增代理级别",
            url: "./AgencyPages/Form_NewAgencyLevel.html",
            width: "600px",
            height: "400px",
            callBack: function (iframeId) {
                top.frames[iframeId].submitForm();
            }
        });
    }

    function editHandler() {
        var a = $("#gridList").jqGridRowValue().GameID;
        var b = $("#gridList").jqGridRowValue().GameName;
        var c = $("#gridList").jqGridRowValue().AgentLevelID;
        var d = $("#gridList").jqGridRowValue().AgentLevelName;
        var e = $.toPoint($("#gridList").jqGridRowValue().DProportion);
        var f = $.toPoint($("#gridList").jqGridRowValue().IProportion)
        $.modalOpen({
            id: "Form",
            title: "修改代理级别",
            url: encodeURI("./AgencyPages/Form_EditAgencyLevel.html?a=" + a + "&b=" + b + "&c=" + c + "&d=" + d + "&e=" + e + "&f=" + f),
            width: "800px",
            height: "500px",
            callBack: function (iframeId) {
                top.frames[iframeId].submitForm();
            }
        });
    }
    function deleteHandler() {
        var a = $("#gridList").jqGridRowValue().GameID;
        var c = $("#gridList").jqGridRowValue().AgentLevelID;
        $.deleteForm({
            url: "/DataCenter/SysData.aspx?method=DeleteAgentLevel",
            param: { gid: a, lid: c },
            success: function () {
                $.currentWindow().$("#gridList").trigger("reloadGrid");
            }
        })
    }
    this.init();
})


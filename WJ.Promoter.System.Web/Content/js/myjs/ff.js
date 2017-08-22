$(function () {
    var v1;
    this.init = function () {
        initEvent();
        AuthManage([{
            'action': 'EditAgentCustomLevel',
            'elementid': 'pd-edit'
        }, {
            'action': 'GetAllGameInfo',
            'elementid': 'ag-select'
        }]);
    }
    function initEvent() {
        initDropDown("/DataCenter/SysData.aspx?method=GetAllGameInfo");
        //gridList();
        $('body').on('click', '#pd-edit', editHandler);
    }

    function gridList() {
        var $gridList = $("#gridList");
        $gridList.dataGrid({
            url: "/DataCenter/SysData.aspx?method=GetAllAgentCustomLevel",
            height: $(window).height() - 128,
            colModel: [
                { label: '主键', name: 'GameID', hidden: true },
                { label: '产品ID', name: 'GameID', width: 180, align: 'left' },
                { label: '产品名称', name: 'GameName', width: 180, align: 'left' },
                { label: '代理商（用户）ID', name: 'UserID', width: 180, align: 'left' },
                { label: '真实姓名', name: 'RealName', width: 180, align: 'left' },
                { label: '代理商等级ID', name: 'AgentLevelID', width: 180, align: 'left' },
                { label: '代理商等级名称', name: 'AgentLevelName', width: 180, align: 'left' },
                { label: '代理商等级ID', name: 'AgentLevelID', width: 180, align: 'left' },
                { label: '代理商等级名称', name: 'AgentLevelName', width: 180, align: 'left' },
                {
                    label: '代理商直接用户分成比例', name: 'DProportion', width: 180, align: 'left'
                    , formatter: $.toPercent
                },
                {
                    label: '代理商非直接用户分成比例', name: 'IProportion', width: 180, align: 'left'
                    , formatter: $.toPercent
                },
                {
                    label: '是否有效', name: 'IsValid', width: 200, align: 'left',
                    formatter: function (v) {
                        if (v == "1")
                            return "是";
                        else
                            return "否";
                    }
                },
                {
                    label: '创建时间', name: 'CreateTime', width: 200, align: 'left',
                    formatter: "date", formatoptions: {
                        srcformat: 'Y-m-d', newformat: 'Y-m-d'
                    }
                }
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
            url: "/DataCenter/SysData.aspx?method=GetAllAgentCustomLevel&gid=" + arguments[0].target.value,
        }).trigger('reloadGrid');
    }


    function editHandler() {
        var a = $("#gridList").jqGridRowValue().GameID;
        var b = $("#gridList").jqGridRowValue().GameName;
        var c = $("#gridList").jqGridRowValue().AgentLevelID;
        var d = $("#gridList").jqGridRowValue().AgentLevelName;
        var e = $("#gridList").jqGridRowValue().UserID
        $.modalOpen({
            id: "Form",
            title: "修改代理商",
            url: encodeURI("./AgencyPages/Form_EditAgency.html?a=" + a + "&b=" + b + "&c=" + c + "&d=" + d + "&e=" + e),
            width: "600px",
            height: "400px",
            callBack: function (iframeId) {
                top.frames[iframeId].submitForm();
            }
        });
    }

    this.init();
})


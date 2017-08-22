$(function () {
    var v1;
    this.init = function () {
        initEvent();
        AuthManage([{
            'action': 'AgentApplyAudit',
            'elementid': 'ag-enabled'
        }, {
            'action': 'AgentApplyAudit',
            'elementid': 'ag-enabled'
        }, {
            'action': 'GetAllGameInfo',
            'elementid': 'ag-select'
        },
        {
            'action': 'GetAgentApply',
            'elementid': 'ag-refuse'
        },


        ]);
    }
    function initEvent() {
        initDropDown("/DataCenter/SysData.aspx?method=GetAllGameInfo");
        $('body').on('click', '#ag-disabled', disabledHandler);
        $('body').on('click', '#ag-enabled', enabledHandler);
        $('body').on('click', '#btn_search', searchHandler);
        $('body').on('click', '#ag-refuse', toggleHandler);
        $('.mypopover').popover({ trigger: "hover" });
    }

    function gridList() {
        var $gridList = $("#gridList");
        $gridList.dataGrid({
            url: "/DataCenter/SysData.aspx?method=GetAgentApply",
            height: $(window).height() - 160,
            width: top.document.getElementsByClassName('content-tabs')[0].clientWidth - 25,
            autowidth: true,
            shrinkToFit: true,
            footerrow: true,
            colModel: [
                { label: '主键', name: 'GameID', hidden: true },
                { label: '产品名称', name: 'GameName', align: 'left' },
                { label: '申请人姓名', name: 'RealName', align: 'left' },
                { label: '用户ID', name: 'UserID', align: 'left' },
                { label: '昵称', name: 'NickName', align: 'left' },
                { label: '手机号码', name: 'PhoneNo', align: 'left', },
                { label: '游戏局数', name: 'GameRounds', align: 'center' },
                { label: '房卡消耗', name: 'RoomCardUsed', align: 'center', },
                {
                    label: '注册时间', name: 'RegisterTime', align: 'center',
                    formatter: "date", formatoptions: { srcformat: 'Y-m-d', newformat: 'Y-m-d' }
                },
                {
                    label: '申请时间', name: 'ApplyTime', align: 'center',
                    formatter: "date", formatoptions: { srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d H:i:s' }
                },
                {
                    label: '审核状态', name: 'PassFlag', align: 'center',
                    formatter: function (v) {
                        if (v == 1) {
                            return '已通过';
                        } else if (v == 0) {
                            return '未审核';
                        }
                        else if (v == 2) {
                            return '已拒绝';
                        }
                    }
                },
                { label: '备注', name: 'Remark', align: 'left' }
            ],
            pager: "#gridPager",
            sortname: 'ApplyTime',
            viewrecords: true,
            rowNum: 20,//每页显示记录数
            rowList: [20, 25, 50],//用于改变显示行数的下拉列表框的元素数组。
            gridComplete: function () {
                var a = $(this).getCol('GameRounds', false, 'sum');
                var b = $(this).getCol('RoomCardUsed', false, 'sum');
                $(this).footerData('set', {
                    "rn": '合计',
                    'GameRounds': a,
                    'RoomCardUsed': b,
                });
            }
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
                        }
                    })
                    gridList();
                }
            }
        })
    }

    function toggleHandler() {
        var $f = $('#ag-refuse').find('i');
        var ispass = 0;
        if ($f.hasClass('fa-arrow-circle-down')) {
            $f.removeClass('fa-arrow-circle-down');
            $('#ag-refuse').html('<i class="fa fa-arrow-circle-up"></i>待处理');
            ispass = 0;
            $("#gridList").jqGrid('setGridParam', {
                url: "/DataCenter/SysData.aspx?method=GetProcessedAgentApply",
                postData: { gid: v1.s1, ispass: ispass, guid: $('#txt_keyword').val() },
            }).trigger('reloadGrid');
        }
        else if ($f.hasClass('fa-arrow-circle-up')) {
            $f.removeClass('fa-arrow-circle-up');
            $('#ag-refuse').html('<i class="fa fa-arrow-circle-down"></i>已处理');
            ispass = 1;
            $("#gridList").jqGrid('setGridParam', {
                url: "/DataCenter/SysData.aspx?method=GetAgentApply",
                postData: { gid: v1.s1, ispass: ispass, guid: $('#txt_keyword').val() },
            }).trigger('reloadGrid');
        }

    }

    function searchHandler() {
        var $f = $('#ag-refuse').find('i');
        if ($f.hasClass('fa-arrow-circle-down')) {
            $("#gridList").jqGrid('setGridParam', {
                url: "/DataCenter/SysData.aspx?method=GetAgentApply",
                postData: { gid: v1.s1, guid: $('#txt_keyword').val() },
            }).trigger('reloadGrid');
        }
        else if ($f.hasClass('fa-arrow-circle-up')) {
            $("#gridList").jqGrid('setGridParam', {
                url: "/DataCenter/SysData.aspx?method=GetProcessedAgentApply",
                postData: { gid: v1.s1, guid: $('#txt_keyword').val() },
            }).trigger('reloadGrid');
        }
    }

    function disabledHandler() {
        var gid = $("#gridList").jqGridRowValue().GameID;
        var guid = $("#gridList").jqGridRowValue().UserID;
        var c = $("#gridList").jqGridRowValue().GameName;
        var d = $("#gridList").jqGridRowValue().PhoneNo;
        $.modalConfirm("注：您确定要【拒绝】该项申请吗？", function (r) {
            if (r) {
                $.submitForm({
                    url: "/DataCenter/SysData.aspx?method=AgentApplyAudit",
                    param: { gid: gid, guid: guid, ispass: 2, gname: c, pn: d },
                    success: function () {
                        $.currentWindow().$("#gridList").trigger("reloadGrid");
                    }
                })
            }
        });
    }
    function enabledHandler() {
        var gid = $("#gridList").jqGridRowValue().GameID;
        var guid = $("#gridList").jqGridRowValue().UserID;
        var c = $("#gridList").jqGridRowValue().GameName;
        var d = $("#gridList").jqGridRowValue().PhoneNo;
        $.modalConfirm("注：您确定要【通过】该项申请吗？", function (r) {
            if (r) {
                $.submitForm({
                    url: "/DataCenter/SysData.aspx?method=AgentApplyAudit",
                    param: { gid: gid, guid: guid, ispass: 1, gname: c, pn: d },
                    success: function () {
                        $.currentWindow().$("#gridList").trigger("reloadGrid");
                    }
                })
            }
        });
    }
    this.init();
})


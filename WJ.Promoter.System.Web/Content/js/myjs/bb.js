$(function () {
    var v1;
    this.init = function () {
        initEvent();
        AuthManage([{
            'action': 'GetUserRoleDropDown',
            'elementid': 'pd-role'
        }, {
            'action': 'EditAccount',
            'elementid': 'pd-edit'
        }, {
            'action': 'EditAccount',
            'elementid': 'pd-delete'
        }, {
            'action': 'AddAccount',
            'elementid': 'pd-add'
        }
        ]);

    }
    function initEvent() {
        initDropDown("/DataCenter/SysData.aspx?method=GetUserRoleDropDown");
        $('body').on('click', '#pd-add', addHandler);
        $('body').on('click', '#pd-edit', editHandler);
        $('body').on('click', '#pd-delete', deleteHandler);
    }
    function gridList() {
        var $gridList = $("#gridList");
        $gridList.dataGrid({
            url: "/DataCenter/SysData.aspx?method=GetAllAccount",
            height: $(window).height() - 128,
            width: top.document.getElementsByClassName('content-tabs')[0].clientWidth - 25,
            autowidth: true,
            shrinkToFit: true,
            footerrow: false,
            colModel: [
                { label: '主键', name: 'AccountID', hidden: true },
                { label: '账号ID', name: 'AccountID', align: 'center' },
                { label: '用户名称', name: 'UserName', align: 'center' },
                {
                    label: '是否主账号', name: 'IsPrimary', align: 'center',
                    formatter: function (cellvalue, options, rowObject) {
                        if (cellvalue == '1') {
                            return '是';
                        } else {
                            return '否';
                        }
                    }
                },
                { label: '角色ID', name: 'RoleId', align: 'center' },
                { label: '创建者', name: 'Creater', align: 'center' },
                {
                    label: '是否有效', name: 'IsValid', align: 'center',
                    formatter: function (cellvalue, options, rowObject) {
                        if (cellvalue == '1') {
                            return '是';
                        } else {
                            return '否';
                        }
                    }
                },
                {
                    label: '创建时间', name: 'CreateTime', align: 'center',
                    formatter: "date", formatoptions: { srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d H:i:s' }

                },
                { label: '备注', name: 'Remark', align: 'center' }
            ],
            pager: "#gridPager",
            sortname: 'AccountId',
            viewrecords: true,
            rowNum: 20,//每页显示记录数
            rowList: [20, 25,50],//用于改变显示行数的下拉列表框的元素数组。
        });

    }

    function initDropDown(url) {
        $.ajax({
            async: true,
            type: "get",
            url: url,
            dataType: "json",
            success: function (data) {
                if (data && !$.isEmptyObject(data) && data.length > 0) {
                    var d = [{ RoleID: 0, RoleName: "全部" }]
                    $(data).each(function (i, n) {
                        d.push({ RoleID: n.RoleID, RoleName: n.RoleName })
                    })
                    v1 = v1 || new Vue({
                        el: "#tool",
                        data: {
                            s1: d[0].RoleID,
                            s2: d[0].RoleID,
                            u: d,
                            g: d
                        },
                        methods: {
                            m: searchHandler
                        }
                    })

                    gridList(d[0].RoleID);
                }
            }
        })
    }

    function addHandler() {
        $.modalOpen({
            id: "Form",
            title: "新增用户",
            url: "./SystemPages/Form_NewUser.html",
            width: "800px",
            height: "800px",
            callBack: function (iframeId) {
                top.frames[iframeId].submitForm();
            }
        });
    }

    function searchHandler() {
        $("#gridList").jqGrid('setGridParam', {
            url: "/DataCenter/SysData.aspx?method=GetAccountByRoleId&rid=" + arguments[0].target.value,
        }).trigger('reloadGrid');
    }
    function editHandler() {
        var i = $("#gridList").jqGridRowValue().UserName;
        var n = $("#gridList").jqGridRowValue().AccountID;
        $.modalOpen({
            id: "Form",
            title: "修改用户",
            url: encodeURI("./SystemPages/Form_EditUser.html?i=" + i + "&n=" + n),
            width: "800px",
            height: "800px",
            callBack: function (iframeId) {
                top.frames[iframeId].submitForm();
            }
        });
    }
    function deleteHandler() {
        var i = $("#gridList").jqGridRowValue().AccountID;
        $.deleteForm({
            url: "/DataCenter/SysData.aspx?method=DeleteGameInfo",
            param: { gid: $("#gridList").jqGridRowValue().GameId },
            success: function () {
                $.currentWindow().$("#gridList").trigger("reloadGrid");
            }
        })
    }
    this.init();
})


$(function () {
    this.init = function () {
        initEvent();
        AuthManage([{
            'action': 'AddGameInfo',
            'elementid': 'pd-add'
        }, {
            'action': 'EditGameInfo',
            'elementid': 'pd-edit'
        }, {
            'action': 'DeleteGameInfo',
            'elementid': 'pd-delete'
        }
        ]);
    }
    function initEvent() {
        gridList();
        $('body').on('click', '#pd-add', addHandler);
        $('body').on('click', '#pd-edit', editHandler);
        $('body').on('click', '#pd-delete', deleteHandler);
        $('.mypopover').popover({ trigger: "hover" });
    }
    function gridList() {
        var $gridList = $("#gridList");
        $gridList.dataGrid({
            url: "/DataCenter/SysData.aspx?method=GetAllProduct",
            height: $(window).height() - 128,
            width: top.document.getElementsByClassName('content-tabs')[0].clientWidth - 25,
            autowidth: true,
            shrinkToFit: true,
            footerrow: false,
            colModel: [
                { label: '产品ID', name: 'GameId', align: 'center' },
                { label: '产品名称', name: 'GameName', align: 'center' },
                {
                    label: '是否有效', name: 'IsValid', align: 'center'
                    , formatter: function (v) {
                        if (v == '1') {
                            return '是';
                        } else if (v == '0') {
                            return '否';
                        }
                    }
                },
                { label: '备注', name: 'Remark', align: 'center' }
            ],
            pager: "#gridPager",
            sortname: 'GameId',
            viewrecords: true,
            rowNum: 20,//每页显示记录数
            rowList: [20, 25, 50],//用于改变显示行数的下拉列表框的元素数组。
        });

    }
    function addHandler() {
        $.modalOpen({
            id: "Form",
            title: "新增产品",
            url: "./ProductPages/From_NewProduct.html",
            width: "400px",
            height: "300px",
            callBack: function (iframeId) {
                top.frames[iframeId].submitForm();
            }
        });
    }
    function editHandler() {
        var i = $("#gridList").jqGridRowValue().GameId;
        var n = $("#gridList").jqGridRowValue().GameName;
        $.modalOpen({
            id: "Form",
            title: "修改产品",
            url: encodeURI("./ProductPages/From_EditProduct.html?i=" + i + "&n=" + n),
            width: "400px",
            height: "300px",
            callBack: function (iframeId) {
                top.frames[iframeId].submitForm();
            }
        });
    }
    function deleteHandler() {
        var i = $("#gridList").jqGridRowValue().GameId;
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


$(function () {
    var v1;
    this.init = function () {
        initEvent();
        gridList();
        AuthManage([{
            'action': 'GetOperationHistory',
            'elementid': 'tool'
        }
        ]);

    }
    function initEvent() {
        $('body').on('click', '#btn_search', searchHandler);

    }
    function gridList() {
        var $gridList = $("#gridList");
        $gridList.dataGrid({
            url: "/DataCenter/SysData.aspx?method=GetOperationHistory&begintime=" + $('#pd-bdate').val() + "&endtime=" + $('#pd-edate').val() + "&key=" + $('#txt_keyword').val(),
            height: $(window).height() - 128,
            width: top.document.getElementsByClassName('content-tabs')[0].clientWidth - 25,
            autowidth: true,
            shrinkToFit: true,
            footerrow: false,
            colModel: [
                { label: '主键', name: 'Id', hidden: true },
                { label: '账号ID', name: 'AccountID', align: 'center', hidden: true },
                { label: '用户名称', name: 'UserName', align: 'center' },
                { label: '操作内容', name: 'Content',width:800,  align: 'left' },
                {
                    label: '创建时间', name: 'CreateTime', align: 'center',
                    formatter: "date", formatoptions: { srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d H:i:s' }
                }
            ],
            pager: "#gridPager",
            sortname: 'CreateTime',
            viewrecords: true,
            rowNum: 20,//每页显示记录数
            rowList: [ 20, 40],//用于改变显示行数的下拉列表框的元素数组。
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
            url: "/DataCenter/SysData.aspx?method=GetOperationHistory&begintime=" + $('#pd-bdate').val() + "&endtime=" + $('#pd-edate').val() + "&key=" + $('#txt_keyword').val(),
        }).trigger('reloadGrid');
    }

    this.init();
})


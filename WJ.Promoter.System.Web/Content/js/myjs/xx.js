$(function () {
    var v1;
    this.init = function () {
        initEvent();
        AuthManage([{
            'action': 'GetAllGameInfo',
            'elementid': 'tool'
        }, {
            'action': 'ExportInstantRebatesAnalysis',
            'elementid': 'bb'
        }
        ]);

    }
    function initEvent() {
        initDropDown("/DataCenter/SysData.aspx?method=GetAllGameInfo");
        $('body').on('click', '#btn_search', searchHandler);
        $('body').on('click', '#b_excel', excelHandler);
        $('.mypopover').popover({ trigger: "hover" });

    }

    function initDropDown(url) {
        $("#ag-select").bindSelect({
            id: 'GameId',
            text: 'GameName',
            url: url,
        });
        gridList();
    }

    function gridList() {
        var $gridList = $("#gridList");
        var a = $('#ag-sels').val();
        var guid = a == 0 ? $('#txt_keyword').val() : '';
        var uid = a == 1 ? $('#txt_keyword').val() : '';
        $gridList.dataGrid({
            url: "/DataCenter/StatisticalData.aspx?method=InstantRebatesAnalysis&gid=" + $('#ag-select').val()
                + "&guid=" + guid
                + "&uid=" + uid
                + "&status=" + $('#ag-selstus').val()
                + "&begintime=" + $('#pd-bdate').val()
                + "&endtime=" + $('#pd-edate').val()
            ,
            height: $(window).height() - 160,
            width: top.document.getElementsByClassName('content-tabs')[0].clientWidth - 25,
            autowidth: true,
            shrinkToFit: true,
            //footerrow: true,
            colModel: [
                { label: '主键', name: 'GameID', hidden: true },
                { label: '游戏名称', name: 'GameName', align: 'center' },
                { label: '订单号', name: 'SourceOrderId', align: 'center' },
                { label: '商户订单号', name: 'OrderId', align: 'center' },
                { label: '微信付款流水号', name: 'PaymentId', align: 'center' },
                {
                    label: '状态码', name: 'OrderState', align: 'center'
                    , formatter: function (v) {
                        if (v == 1)
                            return '<span class="badge" style="background:#1abc9c;color:#ddd;">Success<span>';
                        else if (v == 2)
                            return '<span class="badge" style="background:#a26767;color:#ddd;">Failed<span>';
                    }
                }, {
                    label: '是否领取', name: 'IsReceive', align: 'center'
                    , formatter: function (v) {
                        if (v == 1)
                            return '是';
                        else if (v == 0)
                            return '否';
                    }
                }, {
                    label: '充值人ID', name: 'ChargeUserid', align: 'center'

                },
               {
                   label: '充值人昵称', name: 'NickName', align: 'center'
               }, {
                   label: '被返利人ID', name: 'UserID', align: 'center'
               }, {
                   label: '被返利人昵称', name: 'RealName', align: 'center'
               },

                {
                    label: '返利金额', name: 'RebateAmount', align: 'center'

                }, {
                    label: '充值金额', name: 'ChargeAmount', align: 'center'

                }, {
                    label: '返利百分比', name: 'DProportion', align: 'center'
                    , formatter: $.toPercent

                }, {
                    label: '时间', name: 'Writedate', align: 'center'
                    , formatter: "date", formatoptions: { srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d H:i:s' }

                },
            ],

            pager: "#gridPager",
            sortname: 'Writedate',
            sortorder: 'desc',
            viewrecords: true,
            rowNum: 20,//每页显示记录数
            rowList: [20, 40],//用于改变显示行数的下拉列表框的元素数组。
            gridComplete: function () {
                //var a = $(this).getCol('RegistCount', false, 'sum');
                //var b = $(this).getCol('Second_day', false, 'sum');
                //var c = $(this).getCol('Third_day', false, 'sum');
                //var d = $(this).getCol('Seventh_day', false, 'sum');
                //var e = $(this).getCol('Thirtieth_day', false, 'sum');
                //$(this).footerData('set', {
                //    "rn": '合计',
                //    'RegistCount': a,
                //    'Second_day': b,
                //    'Third_day': c,
                //    'Seventh_day': d,
                //    'Thirtieth_day': e,
                //});
            }

        });

    }
    function detailHandler() {
        var a = $("#gridList").jqGridRowValue().GameID;
        var b = $("#gridList").jqGridRowValue().GameName;
        $.modalOpenGrid({
            id: "Form",
            title: "流水详细",
            url: "./StatisticPages/ProductFlowManageDetail.html?a=" + a + "&b=" + b,
            width: "1600px",
            height: "1400px",
            callBack: function (iframeId) {
                top.frames[iframeId].submitForm();
            }
        });
    }

    function searchHandler() {
        var a = $('#ag-sels').val();
        var guid = a == 0 ? $('#txt_keyword').val() : '';
        var uid = a == 1 ? $('#txt_keyword').val() : '';
        $("#gridList").jqGrid('setGridParam', {
            url: "/DataCenter/StatisticalData.aspx?method=InstantRebatesAnalysis&gid=" + $('#ag-select').val()
     + "&guid=" + guid
     + "&uid=" + uid
     + "&status=" + $('#ag-selstus').val()
     + "&begintime=" + $('#pd-bdate').val()
     + "&endtime=" + $('#pd-edate').val()
            ,
        }).trigger('reloadGrid');
    }

    function excelHandler() {
        var a = $('#ag-sels').val();
        var guid = a == 0 ? $('#txt_keyword').val() : '';
        var uid = a == 1 ? $('#txt_keyword').val() : '';
        var url = "/DataCenter/StatisticalData.aspx?method=ExportInstantRebatesAnalysis&gid=" + $('#ag-select').val()
     + "&guid=" + guid
     + "&uid=" + uid
     + "&status=" + $('#ag-selstus').val()
     + "&begintime=" + $('#pd-bdate').val()
     + "&endtime=" + $('#pd-edate').val();
        $(this).attr('href', url);
    }

    this.init();
})


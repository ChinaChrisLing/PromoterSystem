$(function () {
    var v1;
    this.init = function () {
        initEvent();
        AuthManage([{
            'action': 'GetAllGameInfo',
            'elementid': 'tool'
        }
        ]);

    }
    function initEvent() {
        $('#liDetail').hide();
        initDropDown("/DataCenter/SysData.aspx?method=GetAllGameInfo");
        $('body').on('click', '#btn_search', searchHandler);
        $('body').on('click', '#pd-detail', detailHandler);
        $('.mypopover').popover({ trigger: "hover" });
        $('body').on('click', '#tabRemove', function (e) {
            e.preventDefault();
            event.stopPropagation();
            $('#liDetail').removeClass('active');
            $('#detail').removeClass('in active');
            $('#liDetail').hide();
            $('#liHome').addClass('active');
            $('#home').addClass('in active');
            return false;
        });

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
        $gridList.dataGrid({
            url: "/DataCenter/StatisticalData.aspx?method=EachProductUserDistribution&gid=" + $('#ag-select').val(),
            height: $(window).height() - 200,
            width: top.document.getElementsByClassName('content-tabs')[0].clientWidth - 25,
            autowidth: true,
            shrinkToFit: true,
            footerrow: false,
            colModel: [
                { label: '主键', name: 'GameID', hidden: true },
                { label: '游戏名称', name: 'GameName', align: 'center' },
                {
                    label: '用户数量', name: 'UserCount', align: 'center'
                    , formatter: function (v) {
                        if (!v || v == '0')
                            return v;
                        var vv = arguments[1].rowId;
                        return '<a href="javascript:void(0)" style="color:#3f88bf; font-size:16px;" data-key="UserCount"  data-rowid="' + vv + '">' + v + '</a>'
                    }
                },
            ],
            pager: "#gridPager",
            sortname: 'GameName',
            viewrecords: true,
            rowNum: 20,//每页显示记录数
            rowList: [20, 40],
            gridComplete: function () {
                //var a = $(this).getCol('UserCount', false, 'sum');
                //$(this).footerData('set', {
                //    "rn": '合计',
                //    'UserCount': a,
                //});
 
                $('#gridList a[data-key="UserCount"]').on('click', function () {
                    var vv = $(this).attr('data-rowid');
                    if (vv)
                        detailHandler(vv);
                })

            }
        });

    }
    function detailHandler(vv) {
        $('#myTab li:eq(1) a').tab('show');
        $("#gridList").jqGrid('setSelection', vv);
        $('#liDetail').show();
        var aa = $('#gridList').jqGrid('getRowData', vv);
        var a = aa.GameID
        var e = $('#liDetail').attr('gid');
        var f = $('#liDetail').attr('rowid');
        var h = $('#home').css('width');
        var g = $('#home').css('height');
        $.that = document;
        if (vv != f) {
            $('#liDetail').attr({
                'gid': aa.GameID,
                'gameuids': '',
                'rowid': vv
            });

            if ($('#fdetail').length > 0)
                $('#fdetail').remove();

            var str1 = '<iframe  class="NFine_iframe"  id="fdetail"  rowid="' + vv + '"  gid="' + a + '"  width="' + h + '"  height="' + g + '"  src="' + "./ProductUserAnalysisDetail.html?a=" + a + '" ></iframe>';
            $('#detail').append(str1);

            $('#detail iframe').css({
                width: h,
                height: g,
                border: 'none'
            })

            $.loading(true);
            $('#detail iframe:visible').load(function () {
                $.loading(false);
            });

        }


    }

    function searchHandler() {
        $("#gridList").jqGrid('setGridParam', {
            url: "/DataCenter/StatisticalData.aspx?method=EachProductUserDistribution&gid=" + $('#ag-select').val(),
        }).trigger('reloadGrid');
    }

    this.init();
})


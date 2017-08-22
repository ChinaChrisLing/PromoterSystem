$(function () {
    var gid = $.request("a");
    var aglid = $.request("c");;
    var puid = $.request("b");
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
        setTimeout(function () { initDropDown(); }, 200)
        $('body').on('click', '#btn_search', searchHandler);
        $('body').on('click', '#b_excel', exportExcelHandler);
        $('.mypopover').popover({ trigger: "hover" });
    }

    function initDropDown() {
        gridList();
    }

    function gridList() {
        var $gridList = $("#gridList");
        $gridList.dataGrid({
            url: "/DataCenter/StatisticalData.aspx?method=EachProductAgentCountDistributionDetail&gid=" + gid + "&aglid=" + aglid + "&key=" + $('#txt_keyword').val() + "&puid=" + puid + "&begintime=" + $('#pd-bdate').val() + "&endtime=" + $('#pd-edate').val(),
            height: $(window).height() - 150,
            height: $(window).height() - 128,
            //width: top.document.getElementsByClassName('content-tabs')[0].clientWidth - 25,
            autowidth: true,
            shrinkToFit: true,
            footerrow: false,
            colModel: [
                { label: '游戏ID', name: 'GameID', hidden: true },
                { label: '代理ID', name: 'UserId', align: 'center' },
                { label: '游戏名称', name: 'GameName', align: 'center' },
                { label: '代理等级', name: 'AgentLevel', align: 'center' },
                { label: '真实姓名', name: 'RealName', align: 'center' },
                { label: '游戏昵称', name: 'NickName', align: 'center' },
                { label: '手机号码', name: 'PhoneNo', align: 'center' },
                { label: '代理商等级', name: 'AgentLevel', align: 'center' },
                {
                    label: '加入时间', name: 'JoinTime', align: 'center'
                    , formatter: "date", formatoptions: { srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d H:i:s' }
                },
                { label: '推广码', name: 'AgentCode', align: 'center' },
                {
                    label: '总业绩', name: 'TotalPerformance', align: 'center'
                    , formatter: $.toMoney
                },
                {
                    label: '直接用户总业绩', name: 'CustomerPerformance', align: 'center'
                    , formatter: $.toMoney
                },
                {
                    label: '下属2级代理总业绩', name: 'Level2Performance', align: 'center'
                    , formatter: $.toMoney
                },
                {
                    label: '下属3级代理总业绩', name: 'Level3Performance', align: 'center'
                    , formatter: $.toMoney
                },
                {
                    label: '总收益应返', name: 'TotalReadyRepay', align: 'center'
                    , formatter: $.toMoney
                },
                {
                    label: '总收益已返', name: 'TotalAlreadyRepay', align: 'center'
                    , formatter: $.toMoney
                },
                {
                    label: '直接用户收益应返', name: 'CustomerReadyRepay', align: 'center'
                    , formatter: $.toMoney
                },
                {
                    label: '直接用户收益已返', name: 'CustomerAlreadyRepay', align: 'center'
                    , formatter: $.toMoney
                },
                {
                    label: '2级代理贡献收益应返', name: 'Level2ReadyRepay', align: 'center'
                , formatter: $.toMoney
                },
                {
                    label: '2级代理收益已返', name: 'Level2AlreadyRepay ', align: 'center'
                , formatter: $.toMoney
                },
                {
                    label: '3级代理贡献收益应返', name: 'Level3ReadyRepay', align: 'center'
                , formatter: $.toMoney
                },
                {
                    label: '3级代理收益已返', name: 'Level3AlreadyRepay', align: 'center'
                , formatter: $.toMoney
                },
                {
                    label: '直接用户数量', name: 'CustomerNum', align: 'center'

                },
                {
                    label: '下级代理数量', name: 'AgentNum', align: 'center', width: 220
                    , formatter: function (v) {
                        if (!v || v == '0')
                            return '0';
                        var vv = arguments[1].rowId;
                        return '<a href="javascript:void(0)" style="color:#3f88bf; font-size:16px;" data-key="AgentNum"  data-rowid="' + vv + '">' + v + '</a>'
                    }
                },
            ],
            pager: "#gridPager",
            sortname: 'UserID',
            viewrecords: true,
            rowNum: 15,
            rowList: [15, 20, 40],
            gridComplete: function () {
                $(this).setGridHeight(670);
                $('#gridList a[data-key="AgentNum"]').on('click', function () {
                    var vv = $(this).attr('data-rowid');
                    if (vv)
                        secondHandler(vv);
                });
                //$(this).setGridWidth(1600);
            }
        });
    }



    function secondHandler(vv) {
        var tab = parent.document.getElementById('myTab');
        var ldt = parent.document.getElementById('lisecdetail');
        var $ldt = $(ldt);
        var home = parent.document.getElementById('home');
        var $home = $(home);
        var sea = parent.document.getElementById('a_secdetail');
        //$(sea).tab('show');

        var secdetail = parent.document.querySelector('#secdetail');
        var $secdetail = $(secdetail);
        var detail = parent.document.querySelector('#myTabContent .active');
        var $detail = $(detail);
        var active = parent.document.querySelector('#myTab .active');
        var $active = $(active);

        $("#gridList").jqGrid('setSelection', vv);
        $ldt.show();
        $active.removeClass('active');
        $ldt.addClass('active');
        $detail.removeClass('in active');
        $secdetail.addClass('in active');
        var aa = $('#gridList').jqGrid('getRowData', vv);
        var a = aa.GameID
        var e = $ldt.attr('gid');
        var f = $ldt.attr('rowid');
        var hh = $ldt.attr('puid');
        var h = ($home.css('width').split('px')[0] - 7) + 'px';
        var g = ($home.css('height').split('px')[0] - 10) + 'px';
        if (vv != f || hh != aa.UserId) {
            $ldt.attr({
                'gid': aa.GameID,
                'rowid': vv,
                'puid': aa.UserId
            });

            var fsecdetail = parent.document.querySelector('#fsecdetail');

            var secdetail_iframe = secdetail.querySelector('iframe');
            var $fsecdetail = $(fsecdetail);

            if ($fsecdetail.length > 0)
                $fsecdetail.remove();
            var str1 = '<iframe  class="NFine_iframe"   id="fsecdetail"  frameborder="0"  rowid="' + vv + '"  gid="' + a + '"  width="' + h + '"  height="' + g + '"  src="' + "./SecondAgencyDataAnalysisDetail.html?a=" + a + '&c=0&b=' + aa.UserId + '" ></iframe>';
            $secdetail.append(str1);
            $(secdetail_iframe).css({
                width: h,
                height: g,
                border: 'none'
            })

            $.loading(true);
            $(secdetail_iframe).load(function () {
                $.loading(false);
            });
        }
    }

    function searchHandler() {
        $("#gridList").jqGrid('setGridParam', {
            url: "/DataCenter/StatisticalData.aspx?method=EachProductAgentCountDistributionDetail&gid=" + gid + "&aglid=" + aglid + "&key=" + $('#txt_keyword').val() + "&puid=" + puid + "&begintime=" + $('#pd-bdate').val() + "&endtime=" + $('#pd-edate').val(),
            height: $(window).height() - 128,
        }).trigger('reloadGrid');
    }

    function exportExcelHandler() {
        var url = "/DataCenter/StatisticalData.aspx?method=ExportEachProductAgentCountDistributionDetail&gid=" + gid + "&aglid=" + aglid + "&key=" + $('#txt_keyword').val() + "&puid=" + puid + "&begintime=" + $('#pd-bdate').val() + "&endtime=" + $('#pd-edate').val();
        $(this).attr('href', url);
    }
    this.init();
})


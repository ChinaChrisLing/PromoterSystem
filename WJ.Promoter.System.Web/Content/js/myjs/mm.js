$(function () {
    var v1;
    this.init = function () {
        initEvent();
        gridList();
        AuthManage([{
            'action': 'GetAllGameInfo',
            'elementid': 'tool'
        }
        ]);

    }
    function initEvent() {
        $('#lifirdetail').hide();
        $('#lisecdetail').hide();
        $('#lithrdetail').hide();
        $('.fa-remove').on('click', removeHandler);
        initDropDown("/DataCenter/SysData.aspx?method=GetAllGameInfo");
        //$('body').on('click', '#ad-one', oneHandler);
        //$('body').on('click', '#ad-sec', secHandler);
        //$('body').on('click', '#ad-thr', thrHandler);
        $('body').on('click', '#btn_search', searchHandler);
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
        $gridList.dataGrid({
            url: "/DataCenter/StatisticalData.aspx?method=EachProductAgentCountDistribution&begintime=" + $('#pd-bdate').val() + "&endtime=" + $('#pd-edate').val() + "&gid=" + $('#ag-select').val(),
            height: $(window).height() - 160,
            width: top.document.getElementsByClassName('content-tabs')[0].clientWidth - 25,
            autowidth: true,
            shrinkToFit: true,
            footerrow: false,
            colModel: [
                { label: '主键', name: 'GameID', hidden: true },
                { label: '游戏名称', name: 'GameName', align: 'center' },
                { label: '总代理数', name: 'AgentCount', align: 'center' },
                {
                    label: '一级代理数', name: 'AgentLevel1Count', align: 'center'
                   , formatter: function (v) {
                       if (!v || v == '0')
                           return '0';
                       var vv = arguments[1].rowId;
                       return '<a href="javascript:void(0)" style="color:#3f88bf; font-size:16px;" data-key="AgentLevel1Count"  data-rowid="' + vv + '">' + v + '</a>'
                   }
                },
                {
                    label: '二级代理数', name: 'AgentLevel2Count', align: 'center'
                    , formatter: function (v) {
                        if (!v || v == '0')
                            return '0';
                        var vv = arguments[1].rowId;
                        return '<a href="javascript:void(0)" style="color:#3f88bf; font-size:16px;" data-key="AgentLevel2Count"  data-rowid="' + vv + '">' + v + '</a>'
                    }
                },
                {
                    label: '三级代理数', name: 'AgentLevel3Count', align: 'center'
                   , formatter: function (v) {
                       if (!v || v == '0')
                           return '0';
                       var vv = arguments[1].rowId;
                       return '<a href="javascript:void(0)" style="color:#3f88bf; font-size:16px;" data-key="AgentLevel3Count"  data-rowid="' + vv + '">' + v + '</a>'
                   }
                },
            ],
            pager: "#gridPager",
            sortname: 'GameName',
            viewrecords: true,
            rowNum: 20,//每页显示记录数
            rowList: [20, 40],
            gridComplete: function () {
                $('#gridList a[data-key="AgentLevel1Count"]').on('click', function () {
                    var vv = $(this).attr('data-rowid');
                    if (vv)
                        firstHandler(vv);
                });
                $('#gridList a[data-key="AgentLevel2Count"]').on('click', function () {
                    var vv = $(this).attr('data-rowid');
                    if (vv)
                        secondHandler(vv);
                });
                $('#gridList a[data-key="AgentLevel3Count"]').on('click', function () {
                    var vv = $(this).attr('data-rowid');
                    if (vv)
                        thridHandler(vv);
                });
                //var a = $(this).getCol('AgentCount', false, 'sum');
                //var b = $(this).getCol('AgentLevel1Count', false, 'sum');
                //var c = $(this).getCol('AgentLevel2Count', false, 'sum');
                //var d = $(this).getCol('AgentLevel3Count', false, 'sum');
                //$(this).footerData('set', {
                //    "rn": '合计',
                //    'AgentCount': a,
                //    'AgentLevel1Count': b,
                //    'AgentLevel2Count': c,
                //    'AgentLevel3Count': d,
                //});
            }
        });

    }


    function removeHandler(e) {
        e.preventDefault();
        event.stopPropagation();
        var li_this = e.target.parentElement.parentElement;
        var $li_this = $(li_this);
        if ($li_this.hasClass('active')) {
            var div_this = $li_this.attr('data-v');
            var $div_this = $(div_this)
            var $li_prethis = $('#liHome');// $li_this.prev();
            var prediv_this = $li_prethis.attr('data-v');
            var $prediv_this = $(prediv_this);
            $li_this.addClass('fadeOut animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                $(this).removeClass('active').removeClass('fadeOut animated').hide();
            });
            //$li_this.removeClass('active').hide();
            $li_prethis.show().addClass('active');
            $div_this.addClass('fadeOut animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                $(this).removeClass('in').removeClass('active').removeClass('fadeOut animated');
                $prediv_this.addClass('in').addClass('active');
                return false;
            });
        } else
            $li_this.hide();
        //$div_this.removeClass('in').removeClass('active');        
        return false;
    }

    function firstHandler(vv) {
        $('#myTab li:eq(1) a').tab('show');
        $("#gridList").jqGrid('setSelection', vv);
        $('#lifirdetail').show();
        var aa = $('#gridList').jqGrid('getRowData', vv);
        var a = aa.GameID
        var e = $('#lifirdetail').attr('gid');
        var f = $('#lifirdetail').attr('rowid');
        var h = ($('#home').css('width').split('px')[0] - 7) + 'px';
        var g = ($('#home').css('height').split('px')[0] - 20) + 'px';
        var hh = $('#lithrdetail').attr('puid');
        if (vv != f || hh != 0) {
            $('#lifirdetail').attr({
                'gid': aa.GameID,
                'rowid': vv,
                'puid': 0
            });
            if ($('#ffirdetail').length > 0)
                $('#ffirdetail').remove();
            var str1 = '<iframe  class="NFine_iframe"  id="ffirdetail"  frameborder="0"  rowid="' + vv + '"  gid="' + a + '"  width="' + h + '"  height="' + g + '"  src="' + "./FristAgencyDataAnalysisDetail.html?a=" + a + '&b=0&c=1' + '" ></iframe>';
            $('#firdetail').append(str1);
            $('#firdetail iframe').css({
                width: h,
                height: g,
                border: 'none'
            })

            $.loading(true);
            $('#firdetail iframe:visible').load(function () {
                $.loading(false);
            });
        }
    }

    function secondHandler(vv) {
        $('#myTab li:eq(2) a').tab('show');
        $("#gridList").jqGrid('setSelection', vv);
        $('#lisecdetail').show();
        var aa = $('#gridList').jqGrid('getRowData', vv);
        var a = aa.GameID
        var e = $('#lisecdetail').attr('gid');
        var f = $('#lisecdetail').attr('rowid');
        var h = ($('#home').css('width').split('px')[0] - 7) + 'px';
        var g = ($('#home').css('height').split('px')[0] - 20) + 'px';
        var hh = $('#lithrdetail').attr('puid');
        if (vv != f || hh != 0) {
            $('#lisecdetail').attr({
                'gid': aa.GameID,
                'rowid': vv,
                'puid': 0
            });
            if ($('#fsecdetail').length > 0)
                $('#fsecdetail').remove();
            var str1 = '<iframe  class="NFine_iframe"  id="fsecdetail" frameborder="0"  rowid="' + vv + '"  gid="' + a + '"  width="' + h + '"  height="' + g + '"  src="' + "./SecondAgencyDataAnalysisDetail.html?a=" + a + '&b=0&c=2' + '" ></iframe>';
            $('#secdetail').append(str1);
            $('#secdetail iframe').css({
                width: h,
                height: g,
                border: 'none'
            })

            $.loading(true);
            $('#secdetail iframe:visible').load(function () {
                $.loading(false);
            });
        }
    }

    function thridHandler(vv) {
        $('#myTab li:eq(3) a').tab('show');
        $("#gridList").jqGrid('setSelection', vv);
        $('#lithrdetail').show();
        var aa = $('#gridList').jqGrid('getRowData', vv);
        var a = aa.GameID
        var e = $('#lithrdetail').attr('gid');
        var f = $('#lithrdetail').attr('rowid');
        var hh = $('#lithrdetail').attr('puid');
        var h = ($('#home').css('width').split('px')[0] - 7) + 'px';
        var g = ($('#home').css('height').split('px')[0] - 10) + 'px';
        if (vv != f || hh != 0) {
            $('#lithrdetail').attr({
                'gid': aa.GameID,
                'rowid': vv,
                'puid': 0
            });
            if ($('#fthrdetail').length > 0)
                $('#fthrdetail').remove();
            var str1 = '<iframe  class="NFine_iframe"  id="fthrdetail"  frameborder="0"  rowid="' + vv + '"  gid="' + a + '"  width="' + h + '"  height="' + g + '"  src="' + "./ThridAgencyDataAnalysisDetail.html?a=" + a + '&b=0&c=3' + '" ></iframe>';
            $('#thrdetail').append(str1);
            $('#thrdetail iframe').css({
                width: h,
                height: g,
                border: 'none'
            })

            $.loading(true);
            $('#thrdetail iframe:visible').load(function () {
                $.loading(false);
            });
        }
    }


    function oneHandler() {
        var a = $("#gridList").jqGridRowValue().GameID;
        var b = $("#gridList").jqGridRowValue().GameName;
        $.modalOpenGrid({
            id: "Form",
            title: "一级代理详细",
            url: "./StatisticPages/ProductAgentAnalysisDetail.html?a=" + a + "&b=" + b + "&c=" + 1 + "&d=一级代理",
            width: "1600px",
            height: "1400px",
            callBack: function (iframeId) {
                top.frames[iframeId].submitForm();
            }
        });
    }
    function secHandler() {
        var a = $("#gridList").jqGridRowValue().GameID;
        var b = $("#gridList").jqGridRowValue().GameName;
        $.modalOpenGrid({
            id: "Form",
            title: "二级代理详细",
            url: "./StatisticPages/ProductAgentAnalysisDetail.html?a=" + a + "&b=" + b + "&c=" + 2 + "&d=二级代理",
            width: "1600px",
            height: "1400px",
            callBack: function (iframeId) {
                top.frames[iframeId].submitForm();
            }
        });
    }
    function thrHandler() {
        var a = $("#gridList").jqGridRowValue().GameID;
        var b = $("#gridList").jqGridRowValue().GameName;
        $.modalOpenGrid({
            id: "Form",
            title: "三级代理详细",
            url: "./StatisticPages/ProductAgentAnalysisDetail.html?a=" + a + "&b=" + b + "&c=" + 3 + "&d=三级代理",
            width: "1600px",
            height: "1400px",
            callBack: function (iframeId) {
                top.frames[iframeId].submitForm();
            }
        });
    }

    function searchHandler() {
        $("#gridList").jqGrid('setGridParam', {
            url: "/DataCenter/StatisticalData.aspx?method=EachProductAgentCountDistribution&begintime=" + $('#pd-bdate').val() + "&endtime=" + $('#pd-edate').val() + "&gid=" + $('#ag-select').val(),
        }).trigger('reloadGrid');
    }

    this.init();
})


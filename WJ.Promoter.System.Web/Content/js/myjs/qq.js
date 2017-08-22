$(function () {
    var v1;

    Handlebars.registerHelper('expression', function () {
        var exps = [];
        try {
            //最后一个参数作为展示内容，也就是平时的options。不作为逻辑表达式部分
            var arg_len = arguments.length;
            var len = arg_len - 1;
            for (var j = 0; j < len; j++) {
                exps.push(arguments[j]);
            }
            var result = eval(exps.join(' '));
            if (result) {
                return arguments[len].fn(this);
            } else {
                return arguments[len].inverse(this);
            }
        } catch (e) {
            throw new Error('Handlerbars Helper "expression" can not deal with wrong expression:' + exps.join(' ') + ".");
        }
    });

    this.init = function () {
        initEvent();
        //AuthManage([{
        //    'action': 'EachAgentAchievement',
        //    'elementid': 'tool'
        //}
        //]);

    }
    function initEvent() {
        initDropDown("/DataCenter/SysData.aspx?method=GetAllGameInfo");
        $('body').on('click', '#pd-detail', detailHandler);
        $('body').on('click', '#btn_search', searchHandler);
        $('.mypopover').popover({ trigger: "hover" });
    }

    function initDropDown(url) {
        $("#ag-select").bindSelect({
            id: 'GameId',
            text: 'GameName',
            url: url,
        });
        gridList(col);
        var myTempl = Handlebars.compile($('#qq_templ').html());
        var d = myTempl(col);
        var html = ' <div id="btn_parent" class="keep-open btn-group pull-right" title="显示/隐藏列" > ' +
                       ' <button id="btn_toggle" type="button" aria-label="columns" class="btn btn-default btn-outline dropdown-toggled" data-toggle="dropdownd" aria-expanded="false">' +
                       '     <i class="glyphicon glyphicon-list"></i><span class="caret"></span>' +
                       ' </button>' +
                       ' <ul class="dropdown-menu" role="menu" id="tmplid">' +
                       d
        ' </ul>' +
   '  </div>'
        $('#gview_gridList .ui-jqgrid-titlebar').after(html);

        $('#tmplid input').each(function () {
            $(this).on('click', function () {
                var that = $(this);
                var field = that.attr('data-field');
                var len = $("#gridList").getGridParam("width");//top.document.getElementsByClassName('content-tabs')[0].clientWidth//
                if (!that.is(':checked'))
                    $("#gridList").setGridParam().hideCol(field);
                else
                    $("#gridList").setGridParam().showCol(field);
                $("#gridList").setGridWidth(len)
            })
        })

        $('#btn_toggle').on('click', function () {
            $('#btn_parent').toggleClass('open');
        })
    }

    var col = [
                { name: 'GameID', hidden: true },
                { label: '游戏名称', name: 'GameName', align: 'center' },
                { label: '代理商ID', name: 'UserID', align: 'center' },
                { label: '真实姓名', name: 'RealName', align: 'center' },
                { label: '代理商等级ID', name: 'MyAgentLevel', align: 'center' },
                { label: '下级代理数', name: 'SubAgentCount', align: 'center' },
                {
                    label: '直接用户数', name: 'DUserCount', align: 'center'
                    , formatter: function (v) {
                        var c = arguments[2].UserID, d = arguments[2].RealName, a = arguments[2].GameID, b = arguments[2].GameName;
                        var vv = "&a=" + a + "&b=" + b + "&c=" + c + "&d=" + d
                        return '<a href="javascript:void(0)" style="color:#3f88bf; font-size:16px;" data-key="DUserCount" data-value="' + vv + '">' + v + '</a>'
                    }
                },
                { label: '下级代理发展用户数', name: 'IUserCount', align: 'center', hidden: true },
                { label: '总流水', name: 'TotalFlow', align: 'center' },
                { label: '总收益', name: 'TotalProfit', align: 'center' },
                { label: '直接用户收益', name: 'DUserProfit', align: 'center' },
                { label: '间接用户收益', name: 'IUserProfit', align: 'center' },
                { label: '今日收益', name: 'TodayProfit', align: 'center' },
                { label: '昨日收益', name: 'YesterdayProfit', align: 'center' },
                { label: '本周收益', name: 'WeekProfit', align: 'center' },
                { label: '本月收益', name: 'MonthProfit', align: 'center' },
                { label: '今日推广', name: 'TodayNewUser', align: 'center' },
                { label: '昨日推广', name: 'YesterdayNewUser', align: 'center' },
                { label: '本周推广', name: 'WeekNewUser', align: 'center' },
                { label: '本月推广', name: 'MonthNewUser', align: 'center' },
    ];

    function gridList(col) {
        var $gridList = $("#gridList");
        $gridList.dataGrid({
            url: "/DataCenter/StatisticalData.aspx?method=EachAgentAchievement&begintime=" + $('#pd-bdate').val() + "&endtime=" + $('#pd-edate').val() + "&gid=" + $('#ag-select').val() + "&agentlevelid=" + $('#ag-selag').val() + "&agentid=" + $('#txt_keyword').val(),
            height: $(window).height() - 190,
            width: $('.topPanel')[0].clientWidth,// top.document.getElementsByClassName('content-tabs')[0].clientWidth,
            autowidth: true,
            shrinkToFit: true,
            footerrow: true,
            colModel: col,
            pager: "#gridPager",
            sortname: 'GameName',
            viewrecords: true,
            rowNum: 20,
            rowList: [20, 40],
            gridComplete: function () {
                var rowNum = parseInt($(this).getGridParam("records"), 10);
                if (rowNum > 0) {
                    var a = $(this).getCol('SubAgentCount', false, 'sum');
                    var b = $(this).getCol('DUserCount', false, 'sum');
                    var c = $(this).getCol('IUserCount', false, 'sum');
                    var d = $(this).getCol('TotalFlow', false, 'sum');
                    var e = $(this).getCol('TotalProfit', false, 'sum');
                    var f = $(this).getCol('DUserProfit', false, 'sum');
                    var g = $(this).getCol('IUserProfit', false, 'sum');
                    var aa = $(this).getCol('TodayProfit', false, 'sum');
                    var bb = $(this).getCol('YesterdayProfit', false, 'sum');
                    var cc = $(this).getCol('WeekProfit', false, 'sum');
                    var dd = $(this).getCol('MonthProfit', false, 'sum');
                    var ee = $(this).getCol('TodayNewUser', false, 'sum');
                    var ff = $(this).getCol('YesterdayNewUser', false, 'sum');
                    var gg = $(this).getCol('WeekNewUser', false, 'sum');
                    var hh = $(this).getCol('MonthNewUser', false, 'sum');
                    $(this).footerData('set', {
                        "rn": '合计',
                        'SubAgentCount': a.toFixed(2),
                        'DUserCount': b.toFixed(2),
                        'IUserCount': c.toFixed(2),
                        'TotalFlow': d.toFixed(2),
                        'TotalProfit': e.toFixed(2),
                        'DUserProfit': f.toFixed(2),
                        'IUserProfit': g.toFixed(2),
                        'TodayProfit': aa.toFixed(2),
                        'YesterdayProfit': bb.toFixed(2),
                        'WeekProfit': cc.toFixed(2),
                        'MonthProfit': dd.toFixed(2),
                        'TodayNewUser': ee.toFixed(2),
                        'YesterdayNewUser': ff.toFixed(2),
                        'WeekNewUser': gg.toFixed(2),
                        'MonthNewUser': hh.toFixed(2),
                    });
                    //var h1 = $('#gridList tr:nth(1)')[0].clientHeight;
                    //var h2 = (rowNum + 1) * h1;
                    //var w1 = $(this)[0].clientHeight + h1;
                    //var w2 = $('#gridList')[0].offsetHeight;
                    //var x = $('.ui-jqgrid-bdiv').attr('style');
                    //var y = x.split(';');
                    //y[0] = 'Height:' + Math.max(h2, Math.min(w1, w2)) + 'px';
                    //x = y.join(';');
                    //$('.ui-jqgrid-bdiv').attr('style', y)
                    //$(".ui-jqgrid-sdiv").show();
                    $('#gridList a[data-key="DUserCount"]').on('click', function () {
                        var vv = $(this).attr('data-value');
                        if (vv)
                            detailHandler(vv);
                    })
                }
                else {
                    $(".ui-jqgrid-sdiv").hide();
                }
            }

        });



    }
    function detailHandler(vv) {

        $.modalOpenGrid({
            id: "Form",
            title: "直接用户详细",
            url: "./AgencyPages/AgentAchievementAnlysisDetail.html?" + vv,
            width: "1250px",
            height: "1000px",
            callBack: function (iframeId) {
                top.frames[iframeId].submitForm();
            }
        });
    }

    function searchHandler() {
        var len = $("#gridList").getGridParam("width");//top.document.getElementsByClassName('content-tabs')[0].clientWidth//

        $("#gridList").jqGrid('setGridParam', {
            width: len,
            url: "/DataCenter/StatisticalData.aspx?method=EachAgentAchievement&begintime=" + $('#pd-bdate').val() + "&endtime=" + $('#pd-edate').val() + "&gid=" + $('#ag-select').val() + "&agentlevelid=" + $('#ag-selag').val() + "&agentid=" + $('#txt_keyword').val(),
        }).trigger('reloadGrid');

        //$("#gridList").setGridWidth(len)
    }

    this.init();
})


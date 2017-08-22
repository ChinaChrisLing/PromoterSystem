$(function () {
    var v1;
    //{
    //    label: '三级代理ID', name: 'AgentLevel3', align: 'center'
    //    , formatter: function (v) {
    //        if (v) {
    //            var b = arguments[2].AgentLevel3, a = arguments[2].GameID;
    //            var vv = "&gid=" + a + "&gameuid=" + b
    //            return '<a href="javascript:void(0)" style="color:#3f88bf; font-size:16px;" data-toggle="modal" data-target="#myModal"  data-key="key" data-value="' + vv + '">' + v + '</a>'
    //        }
    //        return '';
    //    }
    //},
    //{
    //    label: '二级代理ID', name: 'AgentLevel2', align: 'center'
    //    , formatter: function (v) {
    //        if (v) {
    //            var b = arguments[2].AgentLevel2, a = arguments[2].GameID;
    //            var vv = "&gid=" + a + "&gameuid=" + b
    //            return '<a href="javascript:void(0)" style="color:#3f88bf; font-size:16px;" data-toggle="modal" data-target="#myModal"  data-key="key" data-value="' + vv + '">' + v + '</a>'
    //        }
    //        return '';
    //    }
    //},
    //{
    //    label: '一级代理ID', name: 'AgentLevel1', align: 'center'
    //  , formatter: function (v) {
    //      if (v) {
    //          var b = arguments[2].AgentLevel1, a = arguments[2].GameID;
    //          var vv = "&gid=" + a + "&gameuid=" + b
    //          return '<a href="javascript:void(0)" style="color:#3f88bf; font-size:16px;" data-toggle="modal" data-target="#myModal"  data-key="key" data-value="' + vv + '">' + v + '</a>'
    //      }
    //      return '';
    //  }
    //},

    var colModel = [
               { name: 'GameID', hidden: true },
               { label: '玩家ID', name: 'UserID', align: 'center' },
               { label: '游戏名称', name: 'GameName', align: 'center' },
               //{ label: '真实姓名', name: 'RealName', align: 'center' },
               { label: '游戏昵称', name: 'NickName', align: 'center' },
               { label: '手机号码', name: 'PhoneNo', align: 'center' },
               {
                   label: '注册时间', name: 'RegisterTime', align: 'center'
                    , formatter: "date", formatoptions: { srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d H:i:s' }
               }, {
                   label: '最后登陆时间', name: 'LastLoginTime', align: 'center'
                    , formatter: "date", formatoptions: { srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d H:i:s' }
               },
               //{ label: '代理等级', name: 'MyAgentLevel', align: 'center' },
               {
                   label: '推荐人ID', name: 'ParentUserID', align: 'center'
                   , formatter: function (v) {
                       if (v) {
                           var b = arguments[2].ParentUserID, a = arguments[2].GameID;
                           var vv = "&gid=" + a + "&gameuid=" + b
                           return '<a href="javascript:void(0)" style="color:#3f88bf; font-size:16px;" data-toggle="modal" data-target="#myModal" data-key="key"  data-value="' + vv + '">' + v + '</a>'
                       }
                       return '';
                   }
               },
               { label: '推荐人昵称', name: 'AgentRealName', align: 'center' },
               {
                   label: '绑定时间', name: 'BindingTime', align: 'center'
                   , formatter: "date", formatoptions: { srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d H:i:s' }
               },

               { label: '好友ID', name: 'FriendID', align: 'center' },
               { label: '好友昵称', name: 'FriendNickName', align: 'center' },
               {
                   label: '好友绑定时间', name: 'FBindingTime', align: 'center'
                   , formatter: "date", formatoptions: { srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d H:i:s' }
               },
               { label: '总充值', name: 'TotalCharge', align: 'center' },
               { label: '今日充值', name: 'TodayCharge', align: 'center' },
               { label: '玩牌总对局', name: 'TotalRound', align: 'center' },
               { label: '玩牌今日对局', name: 'TodayRound', align: 'center' },
               {
                   label: '总胜率', name: 'TotalWinRound', align: 'center'
                   , formatter: $.toPercent
               },
               {
                   label: '今日胜率', name: 'TodayWinRound', align: 'center'
                   , formatter: $.toPercent
               },
               { label: '版本号', name: 'GameVersion', align: 'center' },
    ];



    this.init = function () {
        $('#myModal').modal('hide');
        initEvent();
        AuthManage([{
            'action': 'GetAllGameInfo',
            'elementid': 'tool'
        }, {
            'action': 'BindGameUserToAgent',
            'elementid': 'pd-binda'
        }, {
            'action': 'UnBindGameUserRelation',
            'elementid': 'pd-ubinda'
        }
        ]);
    }

    function initEvent() {
        initDropDown("/DataCenter/SysData.aspx?method=GetAllGameInfo");
        $('body').on('click', '#btn_search', searchHandler);
        //$('body').on('click', '#pd-bindu', binduHandler);
        $('body').on('click', '#pd-binda', bindaHandler);
        $('body').on('click', '#pd-bindf', bindfHandler);
        //$('body').on('click', '#pd-ubinda', ubindaHandler);
        //$('body').on('click', '#pd-ubindu', ubinduHandler);
        $('.mypopover').popover({ trigger: "hover" });
    }

    function initDropDown(url) {

        $("#ag-select").bindSelect({
            id: 'GameId',
            text: 'GameName',
            url: url,
        });
        gridList(1);
        $("#gridList").jqGrid('setGroupHeaders', {
            useColSpanStyle: true,
            groupHeaders: [
                { startColumnName: 'UserID', numberOfColumns: 6, titleText: '基础信息' },
                { startColumnName: 'ParentUserID', numberOfColumns: 3, titleText: '推荐关系' },
                { startColumnName: 'FriendID', numberOfColumns: 3, titleText: '好友关系' },
                { startColumnName: 'TotalCharge', numberOfColumns: 2, titleText: '充值' },
                { startColumnName: 'TotalRound', numberOfColumns: 2, titleText: '玩牌局数' },
                { startColumnName: 'TotalWinRound', numberOfColumns: 2, titleText: '胜率' },
                { startColumnName: 'GameVersion', numberOfColumns: 1, titleText: '版本' }
            ]
        })

        var myTempl = Handlebars.compile($('#qq_templ').html());
        var d = myTempl(colModel);
        var html = ' <div id="btn_parent" class="keep-open btn-group pull-right" style="margin-top:10px;" title="显示/隐藏列" > ' +
                       ' <button id="btn_toggle"  style="padding: 4.5px 7px;" type="button" aria-label="columns" class="btn btn-default btn-outline dropdown-toggled" data-toggle="dropdownd" aria-expanded="false">' +
                       '     <i class="glyphicon glyphicon-list"></i><span class="caret"></span>' +
                       ' </button>' +
                       ' <ul class="dropdown-menu" role="menu" id="tmplid">' +
                       d
        ' </ul>' +
   '  </div>'
        $('.nav-pills').after(html);

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

    function gridList() {
        var $gridList = $("#gridList");
        $gridList.dataGrid({
            url: "/DataCenter/StatisticalData.aspx?method=EachProductUserDistributionDetail&gid=" + $("#ag-select").val() + "&gameuid=" + $('#txt_keyword').val(),
            height: $(window).height() - 210,
            width: top.document.getElementsByClassName('content-tabs')[0].clientWidth - 25,
            autowidth: true,
            shrinkToFit: true,
            footerrow: false,
            colModel: colModel,
            pager: "#gridPager",
            sortname: 'RegisterTime',
            sortorder: 'desc',
            viewrecords: true,
            rowNum: 15,
            rowList: [15, 20, 40],
            gridComplete: function () {
                $('#gridList a[data-key="key"]').on('click', function () {
                    var vv = $(this).attr('data-value');
                    if (vv)
                        detailHandler(vv);
                })

                $("#gridList").jqGrid('setSelection', 1);
            }
        });

    }

    Date.prototype.format = function (format) {
        var args = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
            "S": this.getMilliseconds()
        };
        if (/(y+)/.test(format))
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var i in args) {
            var n = args[i];
            if (new RegExp("(" + i + ")").test(format))
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
        }
        return format;
    };

    function detailHandler(vv) {
        $.ajax({
            url: "/DataCenter/StatisticalData.aspx?method=EachProductUserDistributionDetail" + vv,
            type: 'get',
            success: function (data) {
                var d = $.parseJSON(data)
                if (d && d.rows.length > 0) {
                    var r = d.rows[0];
                    //$('#RealName').html(r.RealName);
                    $('#NickName').html(r.NickName);
                    $('#UserID').html(r.UserID);
                    $('#PhoneNo').html(r.PhoneNo);
                    //$('#ParentUserID').html(r.ParentUserID);
                    //$('#AgentLevel3').html(r.AgentLevel3);
                    var a = r.MyAgentLevel;
                    $('#p2').css('color', '#475059')
                    $('#p1').css('color', '#475059')
                    if (!r.AgentLevel2) {
                        if (a == 2) {
                            r.AgentLevel2 = '---';
                            $('#p2').css('color', '#999')
                        } else
                            r.AgentLevel2 = '无';
                    }
                    if (!r.AgentLevel1) {
                        if (a == 1) {
                            r.AgentLevel2 = '---';
                            $('#p2').css('color', '#999')
                            r.AgentLevel1 = '---';
                            $('#p1').css('color', '#999')
                        } else
                            r.AgentLevel1 = '无';
                    }
                    $('#AgentLevel2').html(r.AgentLevel2);
                    $('#AgentLevel1').html(r.AgentLevel1);

                    //if (!r.BindingTime || r.BindingTime == '')
                    //    $('#BindingTime').html('');
                    //else {
                    //    var date = new Date(r.BindingTime);
                    //    $('#BindingTime').html(date.format("yyyy-MM-dd hh:mm:ss"));
                    //}
                    $('#GameName').html(r.GameName);
                }
            }
        })
    }
    function bindaHandler() {
        var a = $("#gridList").jqGridRowValue().GameID;
        var b = $("#gridList").jqGridRowValue().GameName;
        var e = $("#gridList").jqGridRowValue().UserID
        var g = $("#gridList").jqGridRowValue().NickName
        var h = $("#gridList").jqGridRowValue().ParentUserID
        var i = '';
        var hh = '';
        if (h) {
            var x = h.indexOf('>');
            var y = h.indexOf('</');
            if (y > 0) {
                hh = h.substring(x + 1, y);
            }
        }

        if (hh && hh > 0) {
            $.ajax({
                url: "/DataCenter/StatisticalData.aspx?method=EachProductUserDistributionDetail&gid=" + $("#ag-select").val() + "&gameuid=" + hh,
                type: 'get',
                success: function (data) {
                    var dss = $.parseJSON(data);
                    i = dss.rows[0].MyAgentLevel
                    $.modalOpen({
                        id: "Form",
                        title: "推荐人关系管理",
                        url: encodeURI("./GamePages/Form_BindAgency.html?a=" + a + "&b=" + b + "&e=" + e + "&g=" + g + "&h=" + hh + "&i=" + i),
                        width: "600px",
                        height: "500px",
                        callBack: function (iframeId) {
                            top.frames[iframeId].submitForm();
                        }
                    });
                }
            })
        } else
            $.modalOpen({
                id: "Form",
                title: "推荐人关系管理",
                url: encodeURI("./GamePages/Form_BindAgency.html?a=" + a + "&b=" + b + "&e=" + e + "&g=" + g + "&h=" + hh + "&i=" + i),
                width: "600px",
                height: "500px",
                callBack: function (iframeId) {
                    top.frames[iframeId].submitForm();
                }
            });
    }
    function bindfHandler() {
        var a = $("#gridList").jqGridRowValue().GameID;
        var b = $("#gridList").jqGridRowValue().GameName;
        var e = $("#gridList").jqGridRowValue().UserID
        var g = $("#gridList").jqGridRowValue().NickName
        var h = $("#gridList").jqGridRowValue().FriendID
        var i = $("#gridList").jqGridRowValue().FriendNickName
        $.modalOpen({
            id: "Form",
            title: "好友关系管理",
            url: encodeURI("./GamePages/Form_BindFriend.html?a=" + a + "&b=" + b + "&e=" + e + "&g=" + g + "&h=" + h + "&i=" + i),
            width: "600px",
            height: "500px",
            callBack: function (iframeId) {
                top.frames[iframeId].submitForm();
            }
        });
    }
    function ubindaHandler() {
        var a = $("#gridList").jqGridRowValue().GameID;
        var e = $("#gridList").jqGridRowValue().UserID
        var g = $("#gridList").jqGridRowValue().NickName
        $.modalConfirm("注：您确定要解绑【" + g + "】与上级代理商的代理关系吗？", function (r) {
            if (r) {
                $.submitForm({
                    url: "/DataCenter/SysData.aspx?method=UnBindGameUserRelation",
                    param: { gid: a, guid: e },
                    success: function () {
                        $.currentWindow().$("#gridList").trigger("reloadGrid");
                    }
                })
            }
        });
    }
    function searchHandler() {
        $("#gridList").jqGrid('setGridParam', {
            url: "/DataCenter/StatisticalData.aspx?method=EachProductUserDistributionDetail&gid=" + $("#ag-select").val() + "&gameuid=" + $('#txt_keyword').val(),
        }).trigger('reloadGrid');

        //$('#midpanel').removeClass('flipInX animated').addClass('fadeOutUp animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        //    $(this).removeClass('fadeOutUp animated').addClass('midpanel');
        //});
    }

    this.init();
})


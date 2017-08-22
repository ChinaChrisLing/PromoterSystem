$(function () {
    var v1;
    this.init = function () {
        AuthManage([{
            'action': 'EditUserRoleJuris',
            'elementid': 'btn_save'
        }, {
            'action': 'GetUserRoleSysJuris',
            'elementid': 'btn_searchd'
        }, {
            'action': 'GetUserRoleDropDown',
            'elementid': 'pd-select'
        }
        ]);


        initEvent();
    }

    function initEvent(url) {
        initDropDown("/DataCenter/SysData.aspx?method=GetUserRoleDropDown");
        $("#gridList").on('click', gridClickHandler);
        $('body').on('click', '#btn_save', saveHandler);
        $('body').on('click', '#btn_searchd', searchHandler);
        $('.mypopover').popover({ trigger: "hover" });

    }

    function stringFormat() {
        if (arguments.length == 0)
            return null;
        var str = arguments[0];
        for (var i = 1; i < arguments.length; i++) {
            var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
            str = str.replace(re, arguments[i]);
        }
        return str;
    };

    function initDropDown(url) {
        $.ajax({
            async: true,
            type: "get",
            url: url,
            dataType: "json",
            success: function (data) {
                if (data && !$.isEmptyObject(data) && data.length > 0) {
                    v1 = v1 || new Vue({
                        el: "#tool",
                        data: {
                            s1: data[0].RoleID,
                            s2: data[0].RoleID,
                            u: data,
                            g: data
                        },
                        methods: {
                            m: searchHandler
                        }
                    })

                    gridList(data[0].RoleID);
                }
            }
        })
    }

    function saveHandler() {
        var o = $("#gridList i[data-check='true']");
        var a = [];
        o.length > 0 && o.each(function (i, n) {
            a.push($(n).attr('data-id'));
        })
        $.ajax({
            url: '/DataCenter/SysData.aspx?method=EditUserRoleJuris&urid=' + $('#role').val(),
            type: 'post',
            data: { 'ids': a.join(',') },
            success: function (data) {
                data = typeof data == 'string' ? $.parseJSON(data) : data;
                data.Message = data.Message == "" ? "操作成功！" : data.Message;
                data.Ret = data.Ret == "1" ? 'success' : 'error';
                $.modalMsg(data.Message, data.Ret);
            }
        })
    }

    function searchHandler() {
        $("#gridList").jqGrid('setGridParam', {
            url: "/DataCenter/SysData.aspx?method=GetUserRoleSysJuris&urid=" + arguments[0].target.value,
        }).trigger('reloadGrid');
    }

    function gridClickHandler(e) {
        e = e || arguments[0];
        if (e.target.tagName == 'I') {
            var t = $(e.target);
            if (t.hasClass('fa-toggle-on'))
                t.removeClass('fa-toggle-on').addClass('fa-toggle-off').attr('data-check', 'false');
            else
                t.removeClass('fa-toggle-off').addClass('fa-toggle-on').attr('data-check', 'true');
        }
    }

    function gridList(urid) {
        var $gridList = $("#gridList");
        $gridList.dataGrid({
            treeGrid: true,
            treeGridModel: "adjacency",
            ExpandColumn: "ModuleValue",
            url: "/DataCenter/SysData.aspx?method=GetUserRoleSysJuris&urid=" + urid,
            height: $(window).height() - 128,
            width: top.document.getElementsByClassName('content-tabs')[0].clientWidth - 25,
            autowidth: true,
            shrinkToFit: true,
            footerrow: false,
            colModel: [
            { label: "主键", name: "Id", hidden: true, key: true },
                 { label: "主键", name: "Pid", hidden: true, key: false },
            { label: '名称', name: 'ModuleName', align: 'left' },
            { label: '连接', name: 'ModuleValue', align: 'center' },
            {
                label: '图标', name: 'Icon', align: 'center',
            },
            {
                label: "权限", name: "Functions", width: 500, align: "center",
                formatter: function (cellvalue) {
                    var html = "";
                    var c = cellvalue;
                    if (c && c.length > 0) {
                        $.each(c, function (i, n) {
                            var s = "";
                            if (n.checked == true)
                                s = "<span >{2}：<i data-id={0} data-moduleid={1} data-check={3} class=\"fa fa-toggle-on fa-1-3 \"></i> </span>&nbsp; &nbsp;";
                            else
                                s = "<span >{2}：<i data-id={0} data-moduleid={1}  data-check={3} class=\"fa fa-toggle-off fa-1-3 \"></i> </span>&nbsp; &nbsp;";
                            html += stringFormat(s, n.id, n.moduleid, n.name, n.checked);
                        })

                    }
                    return html;
                }
            },

            ]
        });
    }

    this.init();
})


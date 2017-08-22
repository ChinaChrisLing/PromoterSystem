//$(function () {
//    document.body.className = localStorage.getItem('config-skin');
//    $("[data-toggle='tooltip']").tooltip();
//})
$.reload = function () {
    location.reload();
    return false;
}
$.loading = function (bool, text) {
    var $loadingpage = top.$("#loadingPage");
    var $loadingtext = $loadingpage.find('.loading-content');
    if (bool) {
        $loadingpage.show();
    } else {
        if ($loadingtext.attr('istableloading') == undefined) {
            $loadingpage.hide();
        }
    }
    if (!!text) {
        $loadingtext.html(text);
    } else {
        $loadingtext.html("数据加载中，请稍后…");
    }
    $loadingtext.css("left", (top.$('body').width() - $loadingtext.width()) / 2 - 50);
    $loadingtext.css("top", (top.$('body').height() - $loadingtext.height()) / 2);
}
$.request = function (name) {
    var search = decodeURI(location.search.slice(1));
    var arr = search.split("&");
    for (var i = 0; i < arr.length; i++) {
        var ar = arr[i].split("=");
        if (ar[0] == name) {
            if (unescape(ar[1]) == 'undefined') {
                return "";
            } else {
                return unescape(ar[1]);
            }
        }
    }
    return "";
}
$.currentWindow = function () {
    var iframeId = top.$(".NFine_iframe:visible").attr("id");
    return top.frames[iframeId];
}
$.browser = function () {
    var userAgent = navigator.userAgent;
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera"
    };
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    }
    if (userAgent.indexOf("Chrome") > -1) {
        if (window.navigator.webkitPersistentStorage.toString().indexOf('DeprecatedStorageQuota') > -1) {
            return "Chrome";
        } else {
            return "360";
        }
    }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    }
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    };
}
$.download = function (url, data, method) {
    if (url && data) {
        data = typeof data == 'string' ? data : jQuery.param(data);
        var inputs = '';
        $.each(data.split('&'), function () {
            var pair = this.split('=');
            inputs += '<input type="hidden" name="' + pair[0] + '" value="' + pair[1] + '" />';
        });
        $('<form action="' + url + '" method="' + (method || 'post') + '">' + inputs + '</form>').appendTo('body').submit().remove();
    };
};
$.modalOpen = function (options) {
    var defaults = {
        id: null,
        title: '系统窗口',
        width: "100px",
        height: "100px",
        url: '',
        shade: 0.3,
        btn: ['确认', '关闭'],
        btnclass: ['btn btn-primary', 'btn btn-danger'],
        callBack: null
    };
    var options = $.extend(defaults, options);
    var _width = top.$(window).width() > parseInt(options.width.replace('px', '')) ? options.width : top.$(window).width() + 'px';
    var _height = top.$(window).height() > parseInt(options.height.replace('px', '')) ? options.height : top.$(window).height() + 'px';
    top.layer.open({
        id: options.id,
        type: 2,
        shade: options.shade,
        title: options.title,
        fix: false,
        area: [_width, _height],
        content: options.url,
        btn: options.btn,
        btnclass: options.btnclass,
        yes: function () {
            options.callBack(options.id)
        }, cancel: function () {
            return true;
        }
    });
};
$.modalOpenGrid = function (options) {
    var defaults = {
        id: null,
        title: '系统窗口',
        width: "100px",
        height: "100px",
        url: '',
        shade: 0.3,
        btn: ['', ''],
        btnclass: ['', ''],
        callBack: null
    };
    var options = $.extend(defaults, options);
    var _width = top.$(window).width() > parseInt(options.width.replace('px', '')) ? options.width : top.$(window).width() + 'px';
    var _height = top.$(window).height() > parseInt(options.height.replace('px', '')) ? options.height : top.$(window).height() + 'px';
    top.layer.open({
        id: options.id,
        type: 2,
        shade: options.shade,
        title: options.title,
        fix: false,
        area: [_width, _height],
        content: options.url,
        btn: options.btn,
        btnclass: options.btnclass,
        yes: function () {
            options.callBack(options.id)
        }, cancel: function () {
            return true;
        }
    });

    //top.layer.open({
    //    type: 2,
    //    fix: false,
    //    area: [_width, _height],
    //    content: options.url,
    //    maxmin: false,
    //});
}
$.modalConfirm = function (content, callBack) {
    top.layer.confirm(content, {
        icon: "fa-exclamation-circle",
        title: "系统提示",
        btn: ['确认', '取消'],
        btnclass: ['btn btn-primary', 'btn btn-danger'],
    }, function () {
        callBack(true);
    }, function () {
        callBack(false)
    });
}
$.toPercent = function (a) {
    if (!a || a == "") return '0';
    else
        return (a * 100).toFixed(2) + "%"
}
$.toMoney = function (a) {
    if (!a || a == "") return '0.00';
    else
        return (a/100).toFixed(2);
}
$.toPoint = function (percent) {
    if (!percent || percent == '0')
        return 0;
    var str = percent.replace("%", "");
    str = str / 100;
    return str;
}
$.modalAlert = function (content, type) {
    var icon = "";
    if (type == 'success') {
        icon = "fa-check-circle";
    }
    if (type == 'error') {
        icon = "fa-times-circle";
    }
    if (type == 'warning') {
        icon = "fa-exclamation-circle";
    }
    top.layer.alert(content, {
        icon: icon,
        title: "系统提示",
        btn: ['确认'],
        btnclass: ['btn btn-primary'],
    });
}
$.modalMsg = function (content, type) {
    if (type != undefined) {
        var icon = "";
        if (type == 'success') {
            icon = "fa-check-circle";
        }
        if (type == 'error') {
            icon = "fa-times-circle";
        }
        if (type == 'warning') {
            icon = "fa-exclamation-circle";
        }
        top.layer.msg(content, { icon: icon, time: 2000, shift: 5 });
        top.$(".layui-layer-msg").find('i.' + icon).parents('.layui-layer-msg').addClass('layui-layer-msg-' + type);
    } else {
        top.layer.msg(content);
    }
}
$.modalClose = function () {
    var index = top.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
    var $IsdialogClose = top.$("#layui-layer" + index).find('.layui-layer-btn').find("#IsdialogClose");
    var IsClose = $IsdialogClose.is(":checked");
    if ($IsdialogClose.length == 0) {
        IsClose = true;
    }
    if (IsClose) {
        top.layer.close(index);
    } else {
        location.reload();
    }
}
$.submitForm = function (options) {
    var defaults = {
        url: "",
        param: [],
        loading: "正在提交数据...",
        success: null,
        close: true
    };
    var options = $.extend(defaults, options);
    $.loading(true, options.loading);
    window.setTimeout(function () {
        if ($('[name=__RequestVerificationToken]').length > 0) {
            options.param["__RequestVerificationToken"] = $('[name=__RequestVerificationToken]').val();
        }
        $.ajax({
            url: options.url,
            data: options.param,
            type: "post",
            dataType: "json",
            success: function (data) {
                if (data.Ret == "1") {
                    $.loading(false);
                    options.success(data);
                    data.Message = data.Message == "" ? "操作成功！" : data.Message;
                    data.Ret = data.Ret == "1" ? 'success' : 'error';
                    $.modalMsg(data.Message, data.Ret);
                    if (options.close == true) {
                        $.modalClose();
                    }
                } else {
                    $.loading(false);
                    data.Ret = data.Ret == "1" ? 'success' : 'error';
                    $.modalAlert(data.Message, data.Ret);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $.loading(false);
                $.modalMsg(errorThrown, "error");
            },
            beforeSend: function () {
                $.loading(true, options.loading);
            },
            complete: function () {
                $.loading(false);
            }
        });
    }, 500);
}
$.deleteForm = function (options) {
    var defaults = {
        prompt: "注：您确定要删除该项数据吗？",
        url: "",
        param: [],
        loading: "正在删除数据...",
        success: null,
        close: true
    };
    var options = $.extend(defaults, options);
    if ($('[name=__RequestVerificationToken]').length > 0) {
        options.param["__RequestVerificationToken"] = $('[name=__RequestVerificationToken]').val();
    }
    $.modalConfirm(options.prompt, function (r) {
        if (r) {
            $.loading(true, options.loading);
            window.setTimeout(function () {
                $.ajax({
                    url: options.url,
                    data: options.param,
                    type: "post",
                    dataType: "json",
                    success: function (data) {
                        if (data.Ret == "1") {
                            options.success(data);
                            data.Message = data.Message == "" ? "删除成功！" : data.Message;
                            data.Ret = data.Ret == "1" ? 'success' : 'error';
                            $.modalMsg(data.Message, data.Ret);
                        } else {
                            $.modalAlert(data.Message, data.Ret);
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        $.loading(false);
                        $.modalMsg(errorThrown, "error");
                    },
                    beforeSend: function () {
                        $.loading(true, options.loading);
                    },
                    complete: function () {
                        $.loading(false);
                    }
                });
            }, 500);
        }
    });

}
$.jsonWhere = function (data, action) {
    if (action == null) return;
    var reval = new Array();
    $(data).each(function (i, v) {
        if (action(v)) {
            reval.push(v);
        }
    })
    return reval;
}
$.fn.jqGridRowValue = function () {
    var $grid = $(this);
    var selectedRowIds = $grid.jqGrid("getGridParam", "selarrrow");
    if (selectedRowIds != "") {
        var json = [];
        var len = selectedRowIds.length;
        for (var i = 0; i < len ; i++) {
            var rowData = $grid.jqGrid('getRowData', selectedRowIds[i]);
            json.push(rowData);
        }
        return json;
    } else {
        return $grid.jqGrid('getRowData', $grid.jqGrid('getGridParam', 'selrow'));
    }
}
$.fn.formValid = function () {
    return $(this).valid({
        errorPlacement: function (error, element) {
            element.parents('.formValue').addClass('has-error');
            element.parents('.has-error').find('i.error').remove();
            element.parents('.has-error').append('<i class="form-control-feedback fa fa-exclamation-circle error" data-placement="left" data-toggle="tooltip" title="' + error + '"></i>');
            $("[data-toggle='tooltip']").tooltip();
            if (element.parents('.input-group').hasClass('input-group')) {
                element.parents('.has-error').find('i.error').css('right', '33px')
            }
        },
        success: function (element) {
            element.parents('.has-error').find('i.error').remove();
            element.parent().removeClass('has-error');
        }
    });
}
$.fn.formSerialize = function (formdate) {
    var element = $(this);
    if (!!formdate) {
        for (var key in formdate) {
            var $id = element.find('#' + key);
            var value = $.trim(formdate[key]).replace(/&nbsp;/g, '');
            var type = $id.attr('type');
            if ($id.hasClass("select2-hidden-accessible")) {
                type = "select";
            }
            switch (type) {
                case "checkbox":
                    if (value == "true") {
                        $id.attr("checked", 'checked');
                    } else {
                        $id.removeAttr("checked");
                    }
                    break;
                case "select":
                    $id.val(value).trigger("change");
                    break;
                default:
                    $id.val(value);
                    break;
            }
        };
        return false;
    }
    var postdata = {};
    element.find('input,select,textarea').each(function (r) {
        var $this = $(this);
        var id = $this.attr('id');
        var type = $this.attr('type');
        switch (type) {
            case "checkbox":
                postdata[id] = $this.is(":checked");
                break;
            default:
                var value = $this.val() == "" ? "&nbsp;" : $this.val();
                if (!$.request("keyValue")) {
                    if (value == null)
                        value = '';
                    if (value.constructor == Array) {
                        value = value.join(',');
                    } else
                        value = value.replace(/&nbsp;/g, '');
                }
                postdata[id] = value;
                break;
        }
    });
    if ($('[name=__RequestVerificationToken]').length > 0) {
        postdata["__RequestVerificationToken"] = $('[name=__RequestVerificationToken]').val();
    }
    return postdata;
};
$.fn.bindSelect = function (options) {
    var defaults = {
        id: "id",
        text: "text",
        search: false,
        url: "",
        param: [],
        change: null
    };
    var options = $.extend(defaults, options);
    var $element = $(this);
    if (options.url != "") {
        $.ajax({
            url: options.url,
            data: options.param,
            dataType: "json",
            async: false,
            success: function (data) {

                data = data.hasOwnProperty('rows') ? data['rows'] : data;
                $.each(data, function (i) {
                    $element.append($("<option></option>").val(data[i][options.id]).html(data[i][options.text]));
                });
                $element.select2 && $element.select2({
                    minimumResultsForSearch: options.search == true ? 0 : -1

                });
                $element.on("change", function (e) {
                    if (options.change != null) {
                        options.change(data[$(this).find("option:selected").index()]);
                    }
                    $("#select2-" + $element.attr('id') + "-container").html($(this).find("option:selected").text().replace(/　　/g, ''));
                });
            }
        });
    } else {
        $element.select2({
            minimumResultsForSearch: -1
        });
    }
}
$.fn.authorizeButton = function () {
    var moduleId = top.$(".NFine_iframe:visible").attr("id").substr(6);
    var dataJson = top.clients.authorizeButton[moduleId];
    var $element = $(this);
    $element.find('a[authorize=yes]').attr('authorize', 'no');
    if (dataJson != undefined) {
        $.each(dataJson, function (i) {
            $element.find("#" + dataJson[i].F_EnCode).attr('authorize', 'yes');
        });
    }
    $element.find("[authorize=no]").parents('li').prev('.split').remove();
    $element.find("[authorize=no]").parents('li').remove();
    $element.find('[authorize=no]').remove();
}


$.fn.dataGrid = function (options) {
    var defaults = {
        datatype: "json",
        //autowidth: true,
        rownumbers: true,
        //shrinkToFit: false,
        gridview: true
    };
    var options = $.extend(defaults, options);
    var $element = $(this);
    options["onSelectRow"] = function (rowid) {
        var length = $(this).jqGrid("getGridParam", "selrow").length;
        var $operate = $(".operate");
        var $midpanel = $('#midpanel');
        var $mark = $('#ag-refuse');
        if ($midpanel && $midpanel.length > 0) {
            $('#midpanel').removeClass('flipInX animated').removeClass('midpanel').addClass('flipInX animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                $(this).removeClass('flipInX animated');
            });
            $midpanel.find('.close').click(function () {
                $('#midpanel').removeClass('flipInX animated').addClass('fadeOutUp animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    $(this).removeClass('fadeOutUp animated').addClass('midpanel');
                });

            })

        } else {
            var m = 1;
            if ($mark.length > 0 && $mark.find('i').hasClass('fa-arrow-circle-up')) {
                m = 0;
            }
            if (m == 1) {
                $operate.find('.fa-angle-double-left').hide();
                if (length > 0) {
                    $operate.animate({ "left": 0 }, 200, function () {
                        $operate.find('.fa-angle-double-left').show();
                    });
                } else {
                    $operate.animate({ "left": '-100.1%' }, 200, function () {
                        $operate.find('.fa-angle-double-left').show();
                    });
                }
                $operate.find('.close').click(function () {
                    $operate.find('.fa-angle-double-left').hide();
                    $operate.animate({ "left": '-100.1%' }, 200, function () {
                        $operate.find('.fa-angle-double-left').show();
                    });
                })
            }
        }
    };

    options['onSortCol'] = function (index, iCol, sortorder) {
        var jd = $(this).jqGrid("getGridParam", "selrow");
        if (jd) {
            var $midpanel = $('#midpanel');
            if ($midpanel && $midpanel.length > 0) {
                //$('#midpanel').removeClass('flipInX animated').addClass('fadeOutUp animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                //    $(this).removeClass('fadeOutUp animated').addClass('midpanel');
                //});
            }
            else {
                var length = jd.length;
                var $operate = $(".operate");
                $operate.find('.fa-angle-double-left').hide();
                if (length > 0) {
                    $operate.animate({ "left": '-100.1%' }, 200, function () {
                        $operate.find('.fa-angle-double-left').show();
                    });
                }
            }
        }
    }

    options['onPaging'] = function (index, iCol, sortorder) {
        var jd = $(this).jqGrid("getGridParam", "selrow");
        if (jd) {
            var $midpanel = $('#midpanel');
            if ($midpanel && $midpanel.length > 0) {
                //$('#midpanel').removeClass('flipInX animated').addClass('fadeOutUp animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                //    $(this).removeClass('fadeOutUp animated').addClass('midpanel');
                //});
            }
            else {
                var length = jd.length;
                var $operate = $(".operate");
                $operate.find('.fa-angle-double-left').hide();
                if (length > 0) {
                    $operate.animate({ "left": '-100.1%' }, 200, function () {
                        $operate.find('.fa-angle-double-left').show();
                    });
                }
            }
        }
    }

    $element.jqGrid(options);
};

var _ajax = $.ajax;
//重写jquery的ajax方法  
$.ajax = function (opt) {
    //备份opt中error和success方法  
    var fn = {
        error: function (XMLHttpRequest, textStatus, errorThrown) { },
        success: function (data, textStatus) { }
    }
    if (opt.error) {
        fn.error = opt.error;
    }
    if (opt.success) {
        fn.success = opt.success;
    }
    //扩展增强处理  
    var _opt = $.extend(opt, {
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //错误方法增强处理  
            fn.error(XMLHttpRequest, textStatus, errorThrown);
        },
        success: function (data, textStatus) {
            if (data && data == 99) {
                $.modalMsg('登入超时', 'warning');
                top.location = '../login.html'
            }
            else if (data && data == 999) {
                $.modalMsg('您没有权限', 'warning');
            }
            //成功回调方法增强处理  
            fn.success(data, textStatus);
        },
        beforeSend: function (XHR) {
            ////提交前回调方法  
            //$('body').append("<div id='ajaxInfo' style=''>正在加载,请稍后...</div>");
        },
        complete: function (XHR, TS) {
            //请求完成后回调函数 (请求成功或失败之后均调用)。  
            $("#ajaxInfo").remove();;
        }
    });
    return _ajax(_opt);
};
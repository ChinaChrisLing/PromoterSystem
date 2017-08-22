var CurrentUserAuth;
Array.prototype.contains = function (needle) {
    for (i in this) {
        if (this[i] == needle) return true;
    }
    return false;
}
//全部替换
String.prototype.replaceAll = function (s1, s2) {
    return this.toString().replace(new RegExp(s1, "gm"), s2);
}





$(function () {
    IsLogin();
    $.ajax({
        async: false,
        type: "post",
        url: "/DataCenter/BaseData.aspx?method=GetAccountAuthFunctions",
        dataType: "json",
        data: {},
        success: function (ret) {
            CurrentUserAuth = ret;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
    });
})

function IsAuth(action) {
    if (action ==null||action=="") {
        return false;
    }
    action = action.replaceAll(" ","");
    var count = 0;
    for (var i = 0; i < CurrentUserAuth.length; i++) {
        if (CurrentUserAuth[i].Action.replaceAll(" ", "") == action || CurrentUserAuth[i].Action.replaceAll(" ", "").split(',').contains(action)) {
            count++
        }
    }
    return count > 0;
}
function IsLogin() {
    $.ajax({
        async: true,
        type: "post",
        url: "/DataCenter/BaseData.aspx?method=CurrentUser",
        dataType: "json",
        success: function (Callback) {
            if (Callback.length > 0) {
            } else {
                top.location.href = "/Pages/login.html";
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
    });
}

function AuthManage(config) {
    for (var i = 0; i < config.length; i++) {
        if (IsAuth(config[i].action)) {
            if ($('#' + config[i].elementid)) {
                $('#' + config[i].elementid).show().removeAttr('disabled');
            }
        } else {
            if ($('#' + config[i].elementid)) {
                $('#' + config[i].elementid).attr('disabled', 'disabled').unbind().hide();
            }
        };
    }
}

function BeforeAnalysis(ret) {
    if (ret == "99") {
        layer.msg("登录过期，请重新登录！");
        setTimeout(function () {
            top.location.href = "/Pages/login.htmllogin.html";
        }, 1000)
    } else if (ret == "999") {
        layer.msg("没有权限！");
    }
}
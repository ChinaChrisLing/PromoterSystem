var clients = [];
$(function () {
    clients = $.clientsInit();
})
$.clientsInit = function () {
    var dataJson = {
        dataItems: [],
        organize: [],
        role: [],
        duty: [],
        user: [],
        authorizeMenu: [],
        authorizeButton: []
    };
    var init = function () {
        $.ajax({
            url: "/Home/GetCurrentUserAuthModule",
            type: "get",
            dataType: "json",
            async: false,
            success: function (data) {
                dataJson.authorizeMenu = data.data;
            }
        });
    }
    init();
    return dataJson;
}
var $ = mdui.$;

var globalGengData;

function displayGengIndex(gengID, gengName, gengDesp, gengInfo) {
    gengInfoHTML = `<div class="mdui-dialog-title">` + gengName + `<div class="mdui-float-right">#` + gengID + `</div><div class="mdui-typo-subheading">` + gengDesp + `</div></div><div class="mdui-dialog-content">` + marked(gengInfo) + `</div><div class="mdui-dialog-actions"><button class="mdui-btn mdui-ripple" mdui-dialog-close>我悟力!</button></div>`;
    document.getElementById("geng-info").innerHTML = gengInfoHTML;
    var inst = new mdui.Dialog('#geng-info');
    inst.open();
    var dialog = document.getElementById('geng-info');
    dialog.addEventListener('closed.mdui.dialog', function () {
        window.history.pushState({
            status: 0
        }, "", "/");
    });
}


$.ajax({
    method: 'GET',
    url: './geng.json',
    data: {},
    success: function (gengData) {
        gengData = JSON.parse(gengData).gengs;
        globalGengData = gengData;
        gengTable = `<h2>梗</h2><div class="mdui-table-fluid"><table class="mdui-table mdui-table-hoverable"><thead><tr><th>#</th><th>梗</th><th>梗</th><th>详情</th></tr></thead><tbody>`;
        for (j = 0, len = gengData.length; j < len; j++) {
            gengTable += `<tr><td>` + (j + 1) + `</td><td>` + gengData[j]['name'] + `</td><td>` + gengData[j]['desp'] + `</td><td><button class="mdui-btn mdui-ripple geng-info-btn" onclick="displayGengIndexWithID(` + (j + 1) + `)">详情</button></td></tr>`;
        }
        gengTable += `</tbody></table></div>`;
        document.getElementById("geng-index").innerHTML = gengTable;
        var geng_id = window.location.search.split("?id=")[1]
        if (typeof (geng_id) != "undefined") {
            geng_id = Number(geng_id)
            displayGengIndex(geng_id, gengData[geng_id - 1]['name'], gengData[geng_id - 1]['desp'], gengData[geng_id - 1]['info']);
        }
    }
});

function displayGengIndexWithID(geng_id) {
    window.history.pushState({
        status: 0
    }, "", "?id=" + geng_id);
    displayGengIndex(geng_id, globalGengData[geng_id - 1]['name'], globalGengData[geng_id - 1]['desp'], globalGengData[geng_id - 1]['info']);
}

function changeTheme() {
    $('body').toggleClass('mdui-theme-layout-dark');
}

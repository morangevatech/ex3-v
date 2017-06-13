(function ($) {
    $(document).ready(function () {
        showLoading();
        var apiUrl = "../../api/Users/UsersRank";
        $.get(apiUrl)
        .done(function (data) {
            createTable(data);
            hideLoading();
        })
    })

    function createTable(data) {
        for (var i = 0; i < data.length; i++) {
            createRow(data[i]);
        }
    };

    function createRow(rowData) {
        var row = $("<tr />")
        $("#table-rankings").append(row);
        row.append($("<td>" + rowData.Id + "</td>"));
        row.append($("<td>" + rowData.Username + "</td>"));
        row.append($("<td>" + rowData.Wins + "</td>"));
        row.append($("<td>" + rowData.Losses + "</td>"));
    };

    function showLoading() {
        $("#loading-table").show();
    }

    function hideLoading() {
        $("#loading-table").hide();
    }
})(jQuery);
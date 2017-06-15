(function ($) {
    //when page upload
    $(document).ready(function () {
        showLoading();
        var apiUrl = "../../api/Users/UsersRank";
        //get request to users rankings
        $.get(apiUrl)
        .done(function (data) {
            createTable(data);
            hideLoading();
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 500) {
                hideLoading();
                alert("# error in connection to server")
            }
        })
    })

    //create table
    function createTable(data) {
        for (var i = 0; i < data.length; i++) {
            createRow(data[i]);
        }
    };

    //create rows
    function createRow(rowData) {
        var row = $("<tr />")
        $("#table-rankings").append(row);
        row.append($("<td>" + rowData.Id + "</td>"));
        row.append($("<td>" + rowData.Username + "</td>"));
        row.append($("<td>" + rowData.Wins + "</td>"));
        row.append($("<td>" + rowData.Losses + "</td>"));
    };

    //show loading spinner
    function showLoading() {
        $("#loading-table").show();
    }

    //hide loading spinner
    function hideLoading() {
        $("#loading-table").hide();
    }
})(jQuery);
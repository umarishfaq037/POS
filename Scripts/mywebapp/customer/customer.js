
$(document).ready(CustomerReadyFunction);

function CustomerReadyFunction() {

    $("#btnSave").click(function () {
        Save();
        return false;
    });

    $("#lnkClose").click(function () {
        $('#divoverlay').hide();
        $('#modal_dialog').hide();
        return false;
    });


    var settings = {
        type: "GET",
        dataType: "json",
        async: true,
        url: "/Customer/GetAllCustomers",
        success: function (d) {

            if (d.success) {
                for (var i = 0; i < d.Result.length; i++) {
                    var obj = d.Result[i];
                    //Store Customer ID as attribute
                    var $tr = $("<tr cid='" + obj.CustomerID + "'><td class='name'>" + obj.Name
                        + "</td><td class='address'>" + obj.Address + "</td><td class='phone'>" + obj.PhoneNumber
                        + "</td><td><a href='#' class='lnkEdit'>Edit</a></td></tr>");

                    $("#tblBody").append($tr);
                }

                $("#tblBody").find("a.lnkEdit").click(function () {
                    //Read content from row
                    var cid = $(this).closest("tr").attr("cid");
                    var name = $(this).closest("tr").find("td.name").text();
                    var addr = $(this).closest("tr").find("td.address").text();
                    var phn = $(this).closest("tr").find("td.Phone").text();

                    //Set in poup controls
                    $("span.customerid").text(cid);
                    $("#textName").val(name);
                    $("#textAddress").val(addr);
                    $("#textPhone").val(phn);
                    //Show modalpoup with overlay
                    $('#divoverlay').show();
                    $('#modal_dialog').show();
                    return false;
                });
            }
        }//End of success callback function
    };

    jQuery.ajax(settings);
}//End of Main Function

function Save() {

    var data = {};
    data.CustomerID = $("span.customerid").text();
    data.Name = $("#textName").val();
    data.Address = $("#textAddress").val();

    var settings = {
        type: "POST",
        data: data,
        async: true,
        url: "/Customer/SaveCustomer",
        success: function (d) {
            //Find TR to upate content in local table
            var $tr = $("#tblBody").find("tr[cid=" + data.CustomerID + "]");
            $tr.find("td.name").text(data.Name);
            $tr.find("td.address").text(data.Address);
            //Hide the modal popup
            $('#divoverlay').hide();
            $('#modal_dialog').hide();
            alert('Record is updated');
        }
    };
    jQuery.ajax(settings);
}

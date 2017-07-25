<script src="~Scripts/mywebapp/customer/jquery-1.10.0.min.js" type="text/javascript"></script>
<script src="~Scripts/mywebapp/customer/1.9.2/jquery-ui.min.js" type="text/javascript"></script>
<link href="~Scripts/mywebapp/customer/jquery-ui.css"
rel="Stylesheet" type="text/css" />
<script type="text/javascript">
    $(function () {
        $("[id$=txtSearch]").autocomplete({
            source: function (request, response) {
                $.ajax({
                    url: ("~/Customer/Home)",
                    data: "{ 'prefix': '" + request.term + "'}",
                    dataType: "json",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        response($.map(data.d, function (item) {
                            return {
                                label: item.split('-')[0],
                                val: item.split('-')[1]
                            }
                        }))
                    },
                    error: function (response) {
                        alert(response.responseText);
                    },
                    failure: function (response) {
                        alert(response.responseText);
                    }
                });
            },
            select: function (e, i) {
                $("[id$=hfCustomerId]").val(i.item.val);
            },
            minLength: 1
        });
    });  
</script>

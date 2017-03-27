$(document).ready(function () {


    var api = "http://swapi.co/api/planets/";

    function appendTableData(data) {
        for (var indx in data) {
            $(".table tbody").append("<tr></tr>")
            $(".table tbody tr:last").append("<td></td>")
            $(".table tbody tr td:last").html(data[indx]['name'])
            $(".table tbody tr:last").append("<td></td>")
            $(".table tbody tr td:last").html(data[indx]['diameter'] + " Km")
            $(".table tbody tr:last").append("<td></td>")
            $(".table tbody tr td:last").html(data[indx]['climate'])
            $(".table tbody tr:last").append("<td></td>")
            $(".table tbody tr td:last").html(data[indx]['terrain'])
            $(".table tbody tr:last").append("<td></td>")
            if (data[indx]['surface_water'] === 'unknown') {
                $(".table tbody tr td:last").html(data[indx]['surface_water'])
            } else {
                $(".table tbody tr td:last").html(data[indx]['surface_water'] + " %")
            }
            $(".table tbody tr:last").append("<td></td>")
            $(".table tbody tr td:last").html(data[indx]['population'])
            $(".table tbody tr:last").append("<td><button class='btn btn-default btn-sm' data-toggle='modal' data-target='#myModal'></button></td>")
            if (data[indx]['residents'].length === 0) {
                $(".table tbody tr td:last").html("No known residents")
                $(".table tbody tr td button:last").attr("disabled", "disabled")
            } else {
                $(".table tbody tr td button:last").html(data[indx]['residents'].length + " residents")
                $(".table tbody tr td button:last").attr("data-planet", data[indx]['url'])
            }
            ;
        }
        ;
    };

    $.getJSON(api.replace('http':'https'), function (response) {
        var planets = response['results'];
        appendTableData(planets);
    });


    $('#myModal').on('show.bs.modal', function (event) {
        var modal = $(this)
        var button = $(event.relatedTarget);
        var apiPlanet = button.data('planet');
        $.getJSON(apiPlanet.replace('http':'https'), function (response) {
            var planetName = response['name'];
            modal.find('.modal-title').text('Residents of ' + planetName)
            var residents = response['residents'];
            for (indx in residents) {
                var apiResident = residents[indx];
                $.getJSON(apiResident.replace('http':'https'), function (response) {
                    modal.find('.table tbody').append("<tr></tr>")
                    modal.find('.table tbody tr:last').append("<td></td>")
                    modal.find('.table tbody tr td:last').text(response['name'])
                    modal.find('.table tbody tr:last').append("<td></td>")
                    modal.find('.table tbody tr td:last').text(response['height'] + " cm")
                    modal.find('.table tbody tr:last').append("<td></td>")
                    modal.find('.table tbody tr td:last').text(response['mass'] + " kg")
                    modal.find('.table tbody tr:last').append("<td></td>")
                    modal.find('.table tbody tr td:last').text(response['skin_color'])
                    modal.find('.table tbody tr:last').append("<td></td>")
                    modal.find('.table tbody tr td:last').text(response['hair_color'])
                    modal.find('.table tbody tr:last').append("<td></td>")
                    modal.find('.table tbody tr td:last').text(response['eye_color'])
                    modal.find('.table tbody tr:last').append("<td></td>")
                    modal.find('.table tbody tr td:last').text(response['birth_year'])
                    modal.find('.table tbody tr:last').append("<td></td>")
                    modal.find('.table tbody tr td:last').text(response['gender'])

                });
            }
            ;
        });
    });

    $(".close, #close").click(function () {
        $("#myModal").find('.table tbody tr').remove()
    })


    $("#next").click(function () {
        $.getJSON(api.replace('http':'https'), function (response) {
            api = response['next'];
            $(".table tbody tr").remove();
            $.getJSON(api.replace('http':'https'), function (response) {
                var planets = response['results'];
                appendTableData(planets);

                $("#pre").removeAttr("disabled");
                $("#pre").removeClass("disabled");

                if (response['next'] === null) {
                    $("#next").addClass("disabled");
                    $("#next").attr("disabled", "disabled");
                }
                ;
            });
        });
    });

    $("#pre").click(function () {
        $.getJSON(api.replace('http':'https'), function (response) {
            api = response['previous'];
            $(".table tbody tr").remove();
            $.getJSON(api.replace('http':'https'), function (response) {
                var planets = response['results'];
                appendTableData(planets);

                if (response['previous'] === null) {
                    $("#pre").addClass("disabled");
                    $("#pre").attr("disabled", "disabled");
                }
                ;

                if ($("#next").attr("disabled") === "disabled") {
                    $("#next").removeAttr("disabled");
                    $("#next").removeClass("disabled");
                }
                ;
            });
        });
    });

});
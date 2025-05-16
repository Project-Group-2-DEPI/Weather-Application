$(document).ready(() => {
    $('#go').click(() => {
        getWeather($('#city').val())
    })
    $('#city').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            getWeather($('#city').val())
        }
    });

    function getWeather(city) {
        $.ajax({
            type: 'get',
            url: '/weather/' + city,
            success: function (res){
                $('#result').show();
                $('#weather_icon').attr("src", "https://openweathermap.org/img/wn/" + res.weather[0].icon + ".png");
                $('#weather_text').html(res.weather[0].description);
                $('#city_name').html(res.name);
                $('#country_name').html(res.sys.country);
                $('#temp').html(res.main.temp + "&deg;F");
                $('#feels_like').html(res.main.feels_like + "&deg;F");

            }
        })
    }
})

var city="";
var APIKEY="60a594dacad383764f2d858a42d8ffdb";

var UMBRELLA_IMG_SRC='<div id="rain_icon" style="margin-top:3%"><img src="https://maxcdn.icons8.com/Color/PNG/96/Clothing/umbrella-96.png" title="Umbrella" width="96"><Br><Br><span>今天要带伞哦~</span></div>';

var SUN_IMG_SRC='<div id="rain_icon"><img src="https://maxcdn.icons8.com/Color/PNG/96/Weather/sun-96.png" title="Sun" width="96"><Br><Br><span>今天太阳公公会出来散步～</span></div>'

var MOON_IMG_SRC='<div id="rain_icon"><img src="https://maxcdn.icons8.com/Color/PNG/96/Weather/bright_moon-96.png" title="Bright Moon" width="96"><Br><Br><span>好大的一个月饼在天上！</span></div>'

var SUN_CLOUD_IMG_SRC='<div id="rain_icon"><img src="https://maxcdn.icons8.com/Color/PNG/96/Weather/partly_cloudy_day-96.png" title="Partly Cloudy Day" width="96"><Br><br><span>太阳躲在云后头</span></div>'

var MOON_CLOUD_IMG_SRC='<div id="rain_icon"><img src="https://maxcdn.icons8.com/Color/PNG/96/Weather/partly_cloudy_night-96.png" title="Partly Cloudy Night" width="96"><Br><Br><span>云遮月了</span></div>'

//T-SHIRT TEMPERATURE BOUNDS
var T_SHIRT_LOWERBOUND="20";
var T_SHIRT_UPPERBOUND="999";
var T_SHIRT_IMG_SRC='<div id="clothes" style="margin-top:3%"><img src="https://maxcdn.icons8.com/Color/PNG/96/Clothing/t-shirt-96.png" title="T-Shirt" width="96"><Br><Br><span>穿短袖衫就可以啦 ^o^</span></div>'

//SHIRT TEMPERATURE BOUNDS
var SHIRT_LOWERBOUND="15";
var SHIRT_UPPERBOUND="20";
var SHIRT_IMG_SRC='<div id="clothes" style="margin-top:3%"><img src="https://maxcdn.icons8.com/Color/PNG/96/Clothing/shirt-96.png" title="Shirt" width="96"><Br><Br><span>可能有点冷，要穿长袖哦 ヽ(‘ ∇‘ )ノ</span></div>'

//JACKET TEMPERATURE BOUNDS
var JACKET_TEMPERATURE_LOWERBOUND="10";
var JACKET_TEMPERATURE_UPPPERBOUND="15";
var JACKET_IMG_SRC='<div id="clothes" style="margin-top:3%"><img src="https://maxcdn.icons8.com/Color/PNG/96/Clothing/jacket-96.png" title="Jacket" width="96"><Br><Br><span>要穿外套啦！！！٩◔‿◔۶</span></div>';

//SWEATER TEMP BOUNDS
var SWEATER_TEMP_LOWER="5";
var SWEATER_TEMP_UPPER="15";
var SWEATER_IMG_SRC='<div id="clothes" style="margin-top:3%"><img src="https://maxcdn.icons8.com/Color/PNG/96/Clothing/jumper-96.png" title="Jumper" width="96"><Br><Br><span>穿上一件厚毛衣吧~ ٩◔‿◔۶</span></div>';

//COAT TEMP BOUNDS
var COAT_LOWER="-5";
var COAT_UPPER="5";
var COAT_IMG_SRC='<div id="clothes" style="margin-top:3%"><img src="https://maxcdn.icons8.com/Color/PNG/96/Clothing/coat-96.png" title="Coat" width="96"><Br><Br><span>好冷o(╥﹏╥)o 要穿大衣了!</span></div>';

//EXTREME COLD BOUNDS
var EXTREME_LOWER="-1000";
var EXTREME_UPPER="-5";
var EXTREME_IMG_SRC='<div id="clothes" style="margin-top:3%"><img src="https://maxcdn.icons8.com/Color/PNG/96/Clothing/coat-96.png" title="Coat" width="96"><Br><Br><span>温度在零度以下...<Br> 要穿好多好多衣服！</span></div>';

//the js file to retrieve the weather condition
var getWeather = function(){
	$.getJSON( "http://api.openweathermap.org/data/2.5/forecast?q="+city+"&mode=json&units=metric&APPID="+APIKEY, function( data ) {
            parse_weather(data);
	});
}

//get the name of city by user's ip address
//http://ip-api.com/json
var getCity = function(callback){
    JSON_REQUEST("http://ipinfo.io", function(data){
            city=data["city"];
            $('#city_name').append(conscruct_city_tag(city));
            callback();
    });
}

var conscruct_city_tag=function(city){
    return '<span> 我是'+city+'的龙王宝宝 ≧◡≦</span><Br><Br><span>下面是今天的小贴士</span>';
}

//data should be passed in with json format
var parse_weather = function(data){
    var list =  data["list"];
    var effective_list=[];//stores the weather data for the next 24 hours
    var now=(new Date).getTime()/1000;//convert the unix time to same precision
    var will_rain=false;
    var lowest_temp=1000;//the lowest temperature
    var night_lowest_temp=1000;
    var night_lowest_hr=0;
    var highest_temp=-1000;
    var day_lowest_temp=1000;
    var day_lowest_hr=0;
    var hr = (new Date()).getHours(); //get hours of the day in 24Hr format (0-23)
    /*
     * @param shirt_type 
     *        0 T-Shirt
     *        1 Shirt
     */
    var shirt_type=-1;
    for (var i=0;i<list.length;i++){
        //we only want the data for the next 24 hours
        if(list[i].dt<now+24*60*60){
            effective_list.push(list[i]);
        }
    }
    for(var i=0;i<effective_list.length;i++) {
        var weather_main= effective_list[i].weather[0].main;
        forcast_time=(new Date(parseInt(effective_list[i].dt)*1000)).getHours();
        if(weather_main.toLowerCase()=="rain") will_rain=true;
        if(lowest_temp>parseInt(effective_list[i].main.temp_min)){
            lowest_temp=parseInt(effective_list[i].main.temp_min);
        }
        if(highest_temp<parseInt(effective_list[i].main.temp_max)){
            highest_temp=parseInt(effective_list[i].main.temp_max);
        }
        if(forcast_time>=0&&forcast_time<12||forcast_time>=17&&forcast_time<=24){
            if(night_lowest_temp>parseInt(effective_list[i].main.temp)) {
                night_lowest_hr=forcast_time;
                night_lowest_temp=effective_list[i].main.temp;
            }
        } else {
            if (day_lowest_temp>parseInt(effective_list[i].main.temp)){
                day_lowest_hr=forcast_time;
                day_lowest_temp=effective_list[i].main.temp;
            }
        }
    }
    
    if(will_rain)
        $('#main').append(UMBRELLA_IMG_SRC);
    else if (effective_list[0].weather[0].main.toLowerCase()=="clouds"){
        if(hr>=0&&hr<=6||hr>=18) $('#main').append(MOON_CLOUD_IMG_SRC);
        else $('#main').append(SUN_CLOUD_IMG_SRC);
    } else if(effective_list[0].weather[0].main.toLowerCase()=="clear"){
        if(hr>=0&&hr<=6||hr>=18) $('#main').append(MOON_IMG_SRC);
        else $('#main').append(SUN_IMG_SRC);
    }
    console.log(day_lowest_temp);
    console.log(night_lowest_temp);
    //the normal conditions
    if(day_lowest_temp>T_SHIRT_LOWERBOUND&&night_lowest_temp>T_SHIRT_LOWERBOUND){
        $('#main').append(T_SHIRT_IMG_SRC);
    } else if (day_lowest_temp>SHIRT_LOWERBOUND&&night_lowest_temp>SHIRT_LOWERBOUND
               &&day_lowest_temp<SHIRT_LOWERBOUND&&night_lowest_temp<SHIRT_LOWERBOUND){
        $('#main').append(SHIRT_IMG_SRC);
    } else if(day_lowest_temp>JACKET_TEMPERATURE_LOWERBOUND&&night_lowest_temp>JACKET_TEMPERATURE_LOWERBOUND
              &&day_lowest_temp<JACKET_TEMPERATURE_LOWERBOUND&&night_lowest_temp<JACKET_TEMPERATURE_LOWERBOUND){
        $('#main').append(JACKET_IMG_SRC);
    } else if(day_lowest_temp>SWEATER_TEMP_LOWER&&night_lowest_temp>SWEATER_TEMP_LOWER
              &&day_lowest_temp<JACKET_TEMPERATURE_LOWERBOUND&&night_lowest_temp<JACKET_TEMPERATURE_LOWERBOUND){
        $('#main').append(SWEATER_IMG_SRC);
    } else if(day_lowest_temp>COAT_LOWER&&night_lowest_temp>COAT_LOWER
              &&day_lowest_temp<JACKET_TEMPERATURE_LOWERBOUND&&night_lowest_temp<JACKET_TEMPERATURE_LOWERBOUND){
        $('#main').append(COAT_IMG_SRC);
    } else if(day_lowest_temp>EXTREME_LOWER&&night_lowest_temp>COAT_LOWER
              &&day_lowest_temp<JACKET_TEMPERATURE_LOWERBOUND&&night_lowest_temp<JACKET_TEMPERATURE_LOWERBOUND) {
        $('#main').append(EXTREME_IMG_SRC);
    }
    //the case when day and night temperature is large
    else {
        $('#main').append('<Br><span>白天：</span><Br>');
        if(day_lowest_temp>T_SHIRT_LOWERBOUND){
            $('#main').append(T_SHIRT_IMG_SRC);
        } else if (day_lowest_temp>SHIRT_LOWERBOUND){
            $('#main').append(SHIRT_IMG_SRC);
        } else if(day_lowest_temp>JACKET_TEMPERATURE_LOWERBOUND){
            $('#main').append(JACKET_IMG_SRC);
        } else if(day_lowest_temp>SWEATER_TEMP_LOWER){
            $('#main').append(SWEATER_IMG_SRC);
        } else if(day_lowest_temp>COAT_LOWER){
            $('#main').append(COAT_IMG_SRC);
        } else if(day_lowest_temp>EXTREME_LOWER) {
            $('#main').append(EXTREME_IMG_SRC);
        }
        $('#main').append('<Br><span>晚上：</span><Br>');
        if(night_lowest_temp>T_SHIRT_LOWERBOUND){
            $('#main').append(T_SHIRT_IMG_SRC);
        } else if (night_lowest_temp>SHIRT_LOWERBOUND){
            $('#main').append(SHIRT_IMG_SRC);
        } else if(night_lowest_temp>JACKET_TEMPERATURE_LOWERBOUND){
            $('#main').append(JACKET_IMG_SRC);
        } else if(night_lowest_temp>SWEATER_TEMP_LOWER){
            $('#main').append(SWEATER_IMG_SRC);
        } else if(night_lowest_temp>COAT_LOWER){
            $('#main').append(COAT_IMG_SRC);
        } else if(night_lowest_temp>EXTREME_LOWER) {
            $('#main').append(EXTREME_IMG_SRC);
        }
        
    }
    if(highest_temp-lowest_temp>10)
        $('#main').append("<div><br><span>昼夜温差大，别感冒啦～</span></div>");

    
    $('#main').append("<div><br><span>最低温度是"+lowest_temp+"&#8451; , 最高温度是"+highest_temp+"&#8451;</span></div>");

    $('#main').append('<div style="margin-top:5%"><a href="about.html">About</a><br><br><span></span></div>');
    
}

//the function to make json request to the server
var JSON_REQUEST = function(url, callback){
    $.getJSON(url, function( data ) {
            callback(data);
    });
}

getCity(getWeather);
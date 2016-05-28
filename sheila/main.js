$(document).ready(function(){

    var activityTypes = [
        "Short Kata",
        "Sparring Technique",
        "Long Form",
        "Weapon Form"
    ];

    var shortKatas = [
        1,2,3,4,5,6,7,8,9,10,
        11,12,13,14,15,16,17,18,19,20,
        21,22,23,24,25,26,27,28,29,30
    ];

    var sparringTechniques = [
        1,2,3,4,5,6,7,8,9,10,
        11,12,13,14,15,16,17,18,19,20
    ];

    var longForms = [
        ["Four Doorways", "Se Men Dao Lian"],
        ["Flying Tiger Comes Out of the Cave", "Fei Hu Ch\'u Tong"],
    ];

    var init = function() {

        // Hide activity
        $('.activity-duration').hide();
        $('.activity-selection').hide();

        // Get practice options
        selectOptions();

        setInterval(
            function(){
                // Select activity
                var activity = Math.floor(Math.random()*3);
                var name = "";
                var count = "";
                var description = "";
                switch (activity) {
                    case 0:
                        name = activityTypes[activity];
                        description = shortKatas[Math.floor(Math.random()*30)];
                        break;
                    case 1:
                        name = activityTypes[activity];
                        description = sparringTechniques[Math.floor(Math.random()*20)];
                        break;
                    case 2:
                        var entry = [Math.floor(Math.random()*2)];
                        name = longForms[entry][0];
                        description = longForms[entry][1];
                        break;
                }
                $('.activity-type-title').text(name);
                $('.activity-type-number').text(count);
                $('.activity-type-description').text(description);
            },
            4000  /* 10000 ms = 10 sec */
        );


    };

    var selectOptions = function() {

    };

    init();

});
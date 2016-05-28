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
        $('.activity-type').hide();

        // Get practice options
        selectOptions();

        //$('.activity-type-title').text(longForms[0][0]);
        //$('.activity-type-number').text(shortKatas[0]);
        //$('.activity-type-description').text(longForms[0][1]);
    };

    var selectOptions = function() {

    };

    init();

});
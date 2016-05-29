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

    var weaponForms = [
        ["First Level Staff", "Chu Chi Kuan Su"],
        ["Northern Beggar\'s Stick", "Bei Huang Ch\'k Kai Pang"],
        ["Night Battle 8 Way Broadsword", "Ye Chan Pa Huang Tao"],
        ["Sai", "Tie Cha Chuan"]
    ];

    var activityLength = 5000;

    var init = function() {

        // Hide activity setup
        $('.activity-duration').hide();
        $('.activity-selection').hide();

        // Hide activity
        //$('.activity-type').hide();

        // Get practice options
        selectOptions();

        // Start showing activities
        activityFlow();
        setInterval(activityFlow, 5000);

    };

    var activityFlow = function(){
        $('.activity-type').addClass('change');
        var timeout = setTimeout(getActivity, 400);
    };

    var getActivity = function(){

        // Select activity
        var activity = Math.floor(Math.random()*4);
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
            case 3:
                var entry = [Math.floor(Math.random()*2)];
                name = weaponForms[entry][0];
                description = weaponForms[entry][1];
                break;
        }
        $('.activity-type-title').text(name);
        $('.activity-type-number').text(count);
        $('.activity-type-description').text(description);

        // Animate out
        $('.activity-type').removeClass('change');
    };

    var selectOptions = function() {

    };

    init();

});
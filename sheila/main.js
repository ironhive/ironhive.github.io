function Timer(duration, element) {
    var self = this;
    this.duration = duration;
    this.element = element;
    this.running = false;

    this.els = {
        ticker: document.getElementById('ticker'),
        seconds: document.getElementById('seconds'),
    };

    /*document.getElementById('toggle').addEventListener('click', function() {
        var cl = 'countdown--wide';
        if (self.element.classList.contains(cl)) {
            self.element.classList.remove(cl);
        } else {
            self.element.classList.add(cl);
        }
    });*/

    var hammerHandler = new Hammer(this.element);
    hammerHandler.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });
    hammerHandler.on('panup pandown', function(ev) {
        if (!self.running) {
            if (ev.direction === Hammer.DIRECTION_UP && self.duration < 999000) {
                self.setDuration(self.duration + 1000);
            } else if (ev.direction === Hammer.DIRECTION_DOWN && self.duration > 0) {
                self.setDuration(self.duration - 1000);
            }
        }
    });

    /*hammerHandler.on('tap', function() {
        if (self.running) {
            self.reset();
        } else {
            self.start();
        }
    })*/
}

Timer.prototype.start = function() {
    var self = this;
    var start = null;
    this.running = true;
   // var remainingSeconds = this.els.seconds.textContent = this.duration / 1000;
    var remainingSeconds = this.duration / 1000;

    function draw(now) {
        if (!start) start = now;
        var diff = now - start;
        var newSeconds = Math.ceil((self.duration - diff)/1000);

        if (diff <= self.duration) {
            self.els.ticker.style.width = 100 - (diff/self.duration*100) + '%';

            if (newSeconds != remainingSeconds) {
                //self.els.seconds.textContent = newSeconds;
                remainingSeconds = newSeconds;
            }

            self.frameReq = window.requestAnimationFrame(draw);
        } else {
            //self.running = false;
            self.els.seconds.textContent = 0;
            self.els.ticker.style.width = '0%';
            self.element.classList.add('countdown--ended');
        }
    };

    self.frameReq = window.requestAnimationFrame(draw);
}

Timer.prototype.reset = function() {
    this.running = false;
    window.cancelAnimationFrame(this.frameReq);
    this.els.seconds.textContent = this.duration / 1000;
    this.els.ticker.style.height = null;
    this.element.classList.remove('countdown--ended');
}

Timer.prototype.setDuration = function(duration) {
    this.duration = duration;
    this.els.seconds.textContent = this.duration / 1000;
}



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

    var selectionsArray = [false, false, false, false];
    var availableActivities = [];

    var activityLength = 400;

    // Flags
    var includeCombos = true;

    var init = function() {

        // Start showing activities
        //activityFlow();
        $('.activity').click(toggleActivity);
        $('#go').click(setOptions);
    };

    var activityFlow = function(){
        $('.activity-type').addClass('change');
       window.setTimeout(function(){
            getActivity();
            var timer = new Timer(activityLength-400, document.getElementById('countdown'));
            timer.start();
            window.setTimeout(activityFlow, activityLength);
        }, 400);
    };

    var getActivity = function(){

        // Select activity
        var activity = Math.floor(Math.random() * availableActivities.length);

        var name = "";
        var count = "";
        var description = "";
        switch (availableActivities[activity]) {
            case 0:
                name = activityTypes[availableActivities[activity]];
                if(includeCombos) {
                    for (var i = 0; i < 3; i++) {
                        description += shortKatas[Math.floor(Math.random()*30)];
                        description += "   ";
                    }
                    description = description.trim();
                    activityLength = 3000;
                } else {
                    description += shortKatas[Math.floor(Math.random()*30)];
                }
                break;
            case 1:
                name = activityTypes[availableActivities[activity]];
                if(includeCombos) {
                    for (var i = 0; i < 3; i++) {
                        description += sparringTechniques[Math.floor(Math.random()*20)];
                        description += "   ";
                    }
                    description = description.trim();
                    activityLength = 5000;
                } else {
                    description += sparringTechniques[Math.floor(Math.random()*20)];
                }
                break;
            case 2:
                var entry = [Math.floor(Math.random()*2)];
                name = longForms[entry][0];
                description = longForms[entry][1];
                activityLength = 10000;
                break;
            case 3:
                var entry = [Math.floor(Math.random()*2)];
                name = weaponForms[entry][0];
                description = weaponForms[entry][1];
                activityLength = 10000;
                break;
        }
        $('.activity-type-title').text(name);
        $('.activity-type-number').text(count);
        $('.activity-type-description').text(description);

        // Animate out
        $('.activity-type').removeClass('change');
    };

    var toggleActivity = function() {
        var activityNumber = $(this).data('activity');

        selectionsArray[activityNumber] = !selectionsArray[activityNumber];
        console.log(selectionsArray);
    };

    var setOptions = function() {

        for(var i = 0; i < selectionsArray.length; i++) {
            if (selectionsArray[i] == true) {
                availableActivities.push(i);
            }
        }

        // No activities were selected, don't proceed
        if (availableActivities.length == 0) {
            return;
        } else {
            $('.activity-selection').fadeOut();
            window.setTimeout(activityFlow, 1000);
        }
    };

    init();

});


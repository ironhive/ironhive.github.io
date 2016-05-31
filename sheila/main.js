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

    var activityLength = 5000;

    // Flags
    var includeWeapons = true;
    var includeCombos = true;

    var init = function() {

        // Hide activity setup
        //$('.activity-duration').hide();
        //$('.activity-selection').hide();

        // Get practice options
        selectOptions();

        // Start showing activities
        activityFlow();
        setInterval(activityFlow, 10000);

    };

    var activityFlow = function(){
        $('.activity-type').addClass('change');
        var timeout = setTimeout(getActivity, 400);
    };

    var getActivity = function(){

        var timer = new Timer(10000, document.getElementById('countdown'));
        timer.start();

        // Select activity
        if (includeWeapons) {
            var activity = Math.floor(Math.random() * 4);
        } else {
            var activity = Math.floor(Math.random() * 3);
        }
        var name = "";
        var count = "";
        var description = "";
        switch (activity) {
            case 0:
                name = activityTypes[activity];
                if(includeCombos) {
                    for (var i = 0; i < 3; i++) {
                        description += shortKatas[Math.floor(Math.random()*30)];
                        description += "   ";
                    }
                    description = description.trim();
                } else {
                    description += shortKatas[Math.floor(Math.random()*30)];
                }
                break;
            case 1:
                name = activityTypes[activity];
                if(includeCombos) {
                    for (var i = 0; i < 3; i++) {
                        description += sparringTechniques[Math.floor(Math.random()*20)];
                        description += "   ";
                    }
                    description = description.trim();
                } else {
                    description += sparringTechniques[Math.floor(Math.random()*20)];
                }
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


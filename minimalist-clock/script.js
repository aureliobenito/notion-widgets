var FlipClock = function(selector) {
    var animationEndEvents = 'animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd';

    var me = this;

    me.mainEl = $(selector);

    me.frontTopEl = me.mainEl.find('div.flip-top.flip-front');
    me.frontBottomEl = me.mainEl.find('div.flip-bottom.flip-front');
    me.backTopEl = me.mainEl.find('div.flip-top.flip-back');
    me.backBottomEl = me.mainEl.find('div.flip-bottom.flip-back');

    me.frontTopEl.on(animationEndEvents, function(event) {
        me.frontTopEl.removeClass('flip-top-animate');

        me.frontTopEl.find('number').html(me.nextNumber);
        me.frontBottomEl.find('number').html(me.nextNumber);

        me.frontBottomEl.addClass('flip-bottom-animate');
    });

    me.frontBottomEl.on(animationEndEvents, function(event) {
        me.frontBottomEl.removeClass('flip-bottom-animate');

        me.backTopEl.find('number').html(me.nextNumber);
        me.backBottomEl.find('number').html(me.nextNumber);
    });

    return {
        update: function(number) {
            if (number == me.nextNumber)
                return;

            me.nextNumber = number;
            me.frontTopEl.addClass('flip-top-animate');
            me.backTopEl.find('number').html(me.nextNumber);
        }
    }
};

var FlipClockManager = function(selector, cls) {
    var me = this;
    me.mainEl = $(selector);

    FlipClockManager.idx = (FlipClockManager.idx || 0) + 1;

    var generateCounterHtml = function(id, cls) {
        var date = new Date();
        hrs = date.getHours();
        min = date.getMinutes();
        return ['<div id="' + id + '" class="flip-clock ' + cls + '">',
            '<div class="flip-top flip-front"><span class="number">' + (id.includes('fc-hours') ? twelveHrFormat(hrs) : doubleDigitFormat(min)) + '</span></div>',
            '<div class="flip-bottom flip-front"><span class="number">' + (id.includes('fc-hours') ? twelveHrFormat(hrs) : doubleDigitFormat(min)) + '</span>' + (id.includes('fc-hours') ? '<span class="week-day">' + getDay(date) + '</span></div>' : '</div>'),
            '<div class="flip-top flip-back"><span class="number">' + (id.includes('fc-hours') ? twelveHrFormat(hrs) : doubleDigitFormat(min)) + '</span></div>',
            '<div class="flip-bottom flip-back"><span class="number">' + (id.includes('fc-hours') ? twelveHrFormat(hrs) : doubleDigitFormat(min)) + '</span></div>',
            '</div>'
        ].join('');
    }

    var twelveHrFormat = function(value) {
        if (value == 0) {
            value = 12;
        } else if (value > 12) {
            value = value - 12;
        }
        return doubleDigitFormat(value);
    }

    var getDay = function(date) {
        day = date.getDay();

        switch (day) {
            case 0:
                return 'SUNDAY';
                break;
            case 1:
                return 'MONDAY';
                break;
            case 2:
                return 'TUESDAY';
                break;
            case 3:
                return 'WEDNESDAY';
                break;
            case 4:
                return 'THURSDAY';
                break;
            case 5:
                return 'FRIDAY';
                break;
            case 6:
                return 'SATURDAY';
                break;
            default:
                return '';
        }
    }

    var doubleDigitFormat = function(value) {
        if (value < 10) {
            return '0' + value;
        } else {
            return value;
        }
    }

    var initializeClock = function(callback) {
        var mainHTML = '';
        mainHTML += generateCounterHtml('fc-hours' + FlipClockManager.idx, cls);
        mainHTML += generateCounterHtml('fc-minutes' + FlipClockManager.idx, cls);

        me.mainEl.html(mainHTML);
        me.hours = new FlipClock('#fc-hours' + FlipClockManager.idx);
        me.minutes = new FlipClock('#fc-minutes' + FlipClockManager.idx);

        if (me.currentInterval)
            clearInterval(me.currentInterval);

        me.currentInterval = setInterval(callback, 1000);
    }

    return {
        currentTime: function() {
            initializeClock(function() {
                var date = new Date();

                me.hours.update(twelveHrFormat(date.getHours()));
                me.minutes.update(doubleDigitFormat(date.getMinutes()));
            });
        },
        countdownToDate: function(countdownDate) {
            initializeClock(function() {
                var dateDiff = Math.round((countdownDate.getTime() - new Date().getTime()) / 1000);

                me.hours.update(Math.round(dateDiff / 3600));
                me.minutes.update(Math.round(dateDiff / 60) % 60);
            });
        },
        countFromDate: function(startDate) {
            initializeClock(function() {
                var dateDiff = Math.round((new Date().getTime() - startDate.getTime()) / 1000);

                me.hours.update(Math.round(dateDiff / 3600));
                me.minutes.update(Math.round(dateDiff / 60) % 60);
            });
        }
    }
};

$(function() {
    new FlipClockManager('#countdown').currentTime();
});

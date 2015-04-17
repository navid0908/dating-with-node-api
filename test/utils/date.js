Date.prototype.dateAdd = function(size,value) {
    value = parseInt(value);
    var incr = 0;
    switch (size) {
        case 'year':
            this.setFullYear(this.getUTCFullYear()+value);
            break;
        case 'month':
            value = value + this.getUTCMonth();
            if (value/12>0) {
                this.dateAdd('year',value/12);
                value = value % 12;
            }
            this.setUTCMonth(value);
            break;
        case 'week':
            incr = value * 7;
            this.dateAdd('day',incr);
            break;
        case 'day':
            incr = value * 24;
            this.dateAdd('hour',incr);
            break;
        case 'hour':
            incr = value * 60;
            this.dateAdd('minute',incr);
            break;
        case 'minute':
            incr = value * 60;
            this.dateAdd('second',incr);
            break;
        case 'second':
            incr = value * 1000;
            this.dateAdd('millisecond',incr);
            break;
        case 'millisecond':
            this.setTime(this.getTime() + value);
            break;
        default:
            throw new Error('Invalid date increment passed');
            break;
    }
}
Date.prototype.dateSub = function(size,value) {
    value = parseInt(value);
    var decr = 0;
    switch (size) {
        case 'day':
            decr = value * 24;
            this.dateSub('hour',decr);
            break;
        case 'hour':
            decr = value * 60;
            this.dateSub('minute',decr);
            break;
        case 'week':
            decr = value * 7;
            this.dateSub('day',decr);
            break;
        case 'minute':
            decr = value * 60;
            this.dateSub('second',decr);
            break;
        case 'second':
            decr = value * 1000;
            this.dateSub('millisecond',decr);
            break;
        case 'month':
            value = value - this.getUTCMonth();
            if (value/12>0) {
                this.dateSub('year',value/12);
                value = value % 12;
            }
            this.setUTCMonth(value);
            break;
        case 'millisecond':
            this.setTime(this.getTime() - value);
            break;
        case 'year':
            this.setFullYear(this.getUTCFullYear()-value);
            break;
        default:
            throw new Error('Invalid date decrement passed');
            break;
    }
}
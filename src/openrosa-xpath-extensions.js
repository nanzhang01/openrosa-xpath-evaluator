var openrosa_xpath_extensions = (function() {
  var ___start_vars___,
      MILLIS_PER_DAY = 1000 * 60 * 60 * 24,
      MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      raw_number = /^(-?[0-9]+)$/,
      date_string = /^\d\d\d\d-\d\d-\d\d(?:T\d\d:\d\d:\d\d(?:Z|[+-]\d\d:\d\d))?$/,
      xr = {
        boolean: function(val) { return { t:'bool', v:val }; },
        number: function(val) { return { t:'num', v:val }; },
        string: function(val) { return { t:'str', v:val }; },
        date: function(val) {
          if(!(val instanceof Date)) throw new Error('Cannot create date from ' + val + ' (' + (typeof val) + ')');
          return { t:'date', v:val };
        }
      },
      zeroPad = function(n, len) {
        len = len || 2;
        n = n.toString();
        while(n.length < len) n = '0' + n;
        return n;
      },
      num = function(o) {
        return o.t === 'num'? o.v: parseFloat(o.v);
      },
      dateToString = function(d) {
            return d.getFullYear() + '-' + zeroPad(d.getMonth()+1) + '-' +
                zeroPad(d.getDate());
      },
      _uuid_part = function(c) {
          var r = Math.random()*16|0,
                  v=c=='x'?r:r&0x3|0x8;
          return v.toString(16);
      },
      uuid = function() {
          return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
                  .replace(/[xy]/g, _uuid_part);
      },
      date = function(it) {
        if(raw_number.test(it)) {
          var tempDate = new Date(0);
          tempDate.setUTCDate(1 + parseInt(it, 10));
          return xr.date(tempDate);
        } else if(date_string.test(it)) {
          return xr.date(new Date(it.substring(0, 10)));
        } else {
          return xr.string('Invalid Date');
        }
      },
      format_date = function(date, format) {
        date = Date.parse(date);
        if(isNaN(date)) return '';
        date = new Date(date);
        var c, i, sb = '', f = {
          year: 1900 + date.getYear(),
          month: 1 + date.getMonth(),
          day: date.getDate(),
          hour: date.getHours(),
          minute: date.getMinutes(),
          second: date.getSeconds(),
          secTicks: date.getTime(),
          dow: date.getDay(),
        };

        for(i=0; i<format.length; ++i) {
          c = format.charAt(i);

          if (c === '%') {
            if(++i >= format.length) {
              throw new Error("date format string ends with %");
            }
            c = format.charAt(i);

            if (c === '%') { // literal '%'
              sb += '%';
            } else if (c === 'Y') {  //4-digit year
              sb += zeroPad(f.year, 4);
            } else if (c === 'y') {  //2-digit year
              sb += zeroPad(f.year, 4).substring(2);
            } else if (c === 'm') {  //0-padded month
              sb += zeroPad(f.month, 2);
            } else if (c === 'n') {  //numeric month
              sb += f.month;
            } else if (c === 'b') {  //short text month
              sb += MONTHS[f.month - 1];
            } else if (c === 'd') {  //0-padded day of month
              sb += zeroPad(f.day, 2);
            } else if (c === 'e') {  //day of month
              sb += f.day;
            } else if (c === 'H') {  //0-padded hour (24-hr time)
              sb += zeroPad(f.hour, 2);
            } else if (c === 'h') {  //hour (24-hr time)
              sb += f.hour;
            } else if (c === 'M') {  //0-padded minute
              sb += zeroPad(f.minute, 2);
            } else if (c === 'S') {  //0-padded second
              sb += zeroPad(f.second, 2);
            } else if (c === '3') {  //0-padded millisecond ticks (000-999)
              sb += zeroPad(f.secTicks, 3);
            } else if (c === 'a') {  //Three letter short text day
              sb += DAYS[f.dow - 1];
            } else if (c === 'Z' || c === 'A' || c === 'B') {
              throw new Error('unsupported escape in date format string [%' + c + ']');
            } else {
              throw new Error('unrecognized escape in date format string [%' + c + ']');
            }
          } else {
            sb += c;
          }
        }

        return sb;
      },
      func,
      ___end_vars___;

  func = {
    'boolean-from-string': function(string) {
      return xr.boolean(string === '1' || string === 'true');
    },
    coalesce: function(a, b) { return xr.string(a || b); },
    date: date,
    'decimal-date': function(date) {
        return xr.number(Date.parse(date) / MILLIS_PER_DAY); },
    'false': function() { return xr.boolean(false); },
    'format-date': function(date, format) {
        return xr.string(format_date(date, format)); },
    'if': function(con, a, b) { return xr.string(con? a: b); },
    int: function(v) { return xr.number(parseInt(v, 10)); },
    now: function() { return xr.number(Date.now()); },
    pow: function(x, y) { return xr.number(Math.pow(x, y)); },
    random: function() { return xr.number(Math.random()); },
    regex: function(haystack, pattern) {
        return xr.boolean(new RegExp(pattern).test(haystack)); },
    selected: function(haystack, needle) {
        return xr.boolean(haystack.split(' ').indexOf(needle) !== -1);
    },
    substr: function(string, startIndex, endIndex) {
        return xr.string(string.slice(startIndex, endIndex)); },
    today: function() { return xr.date(new Date()); },
    'true': function() { return xr.boolean(true); },
    uuid: function() { return xr.string(uuid()); },
  };

  // function aliases
  func['date-time'] = func.date;
  func['decimal-date-time'] = func['decimal-date'];
  func['format-date-time'] = func['format-date'];

  return {
    func:func,
    process: {
      toExternalResult: function(r) {
        if(r.t === 'date') return { resultType:XPathResult.STRING_TYPE, stringValue:dateToString(r.v) };
      },
      typefor: function(val) {
        if(val instanceof Date) return 'date';
      },
      handleInfix: function(lhs, op, rhs) {
        if(lhs.t === 'date' || rhs.t === 'date') {
          // For comparisons, we must make sure that both values are numbers
          // Dates would be fine, except for quality!
          if( op.t === '=' ||
              op.t === '<' ||
              op.t === '>' ||
              op.t === '<=' ||
              op.t === '>=' ||
              op.t === '!=') {
            if(lhs.t === 'str') lhs = date(lhs.v);
            if(rhs.t === 'str') rhs = date(rhs.v);
            if(lhs.t !== 'date' || rhs.t !== 'date') {
              return op.t === '!=';
            } else {
              lhs = { t:'num', v:lhs.v.getTime() };
              rhs = { t:'num', v:rhs.v.getTime() };
            }
          } else if(op.t === '+' || op.t === '-') {
            // for math operators, we need to do it ourselves
            if(lhs.t === 'date' && rhs.t === 'date') err();
            var d = lhs.t === 'date'? lhs.v: rhs.v,
                n = lhs.t !== 'date'? num(lhs): num(rhs),
                res = new Date(d.getTime());
            if(op.t === '-') n = -n;
            res.setUTCDate(d.getDate() + n);
            return res;
          }
          return { t:'continue', lhs:lhs, op:op, rhs:rhs };
        }
      },
    },
  };
}());

if(typeof define === 'function') {
  define(function() { return openrosa_xpath_extensions; });
} else if(typeof module === 'object' && typeof module.exports === 'object') {
  module.exports = openrosa_xpath_extensions;
}
